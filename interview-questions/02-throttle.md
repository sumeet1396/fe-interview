# Throttle Function

## Overview
Throttling limits the execution of a function to once every specified time interval, regardless of how many times the event is triggered. It ensures the function executes at regular intervals.

## Use Case
**Scroll Event Handling**: When a user scrolls, the scroll event fires rapidly. Throttling ensures the handler executes at most once per specified interval (e.g., once per second).

## Implementation

```javascript
const throttle = (func, limit) => {
    let lastFunc;
    let lastRan;
    
    return function(...args) {
        const context = this;
        
        if (!lastRan) {
            func.apply(context, args);
            lastRan = Date.now();
        } else {
            clearTimeout(lastFunc);
            lastFunc = setTimeout(function() {
                if ((Date.now() - lastRan) >= limit) {
                    func.apply(context, args);
                    lastRan = Date.now();
                }
            }, limit - (Date.now() - lastRan));
        }
    };
}
```

## How It Works

### Key Components:
1. **lastFunc**: Stores timeout ID for pending execution
2. **lastRan**: Timestamp of last execution
3. **limit**: Minimum time between executions
4. **context**: Preserves `this` binding
5. **args**: Preserves function arguments

## Dry Run

```javascript
const throttleFn = throttle(() => {
    console.log(`Fetch Data called after ${Date.now() - startTime}ms`);
}, 3000);

// User triggers function rapidly
throttleFn(); // Call 1 at 0ms
throttleFn(); // Call 2 at 500ms
throttleFn(); // Call 3 at 1000ms
throttleFn(); // Call 4 at 1500ms
throttleFn(); // Call 5 at 2000ms
throttleFn(); // Call 6 at 2500ms
throttleFn(); // Call 7 at 3000ms
```

**Step-by-Step**:
```
Time 0ms: Call 1
  - lastRan is undefined
  - Execute immediately
  - lastRan = 0
  - Output: "Fetch Data called after 0ms"

Time 500ms: Call 2
  - lastRan = 0
  - Time elapsed = 500ms < 3000ms
  - Schedule execution for 2500ms later (3000 - 500)
  - clearTimeout(lastFunc)
  - lastFunc = setTimeout(..., 2500)

Time 1000ms: Call 3
  - Time elapsed = 1000ms < 3000ms
  - Cancel previous timeout
  - Schedule execution for 2000ms later (3000 - 1000)

Time 1500ms: Call 4
  - Time elapsed = 1500ms < 3000ms
  - Cancel previous timeout
  - Schedule execution for 1500ms later (3000 - 1500)

Time 2000ms: Call 5
  - Time elapsed = 2000ms < 3000ms
  - Cancel previous timeout
  - Schedule execution for 1000ms later (3000 - 2000)

Time 2500ms: Call 6
  - Time elapsed = 2500ms < 3000ms
  - Cancel previous timeout
  - Schedule execution for 500ms later (3000 - 2500)

Time 3000ms: Call 7
  - Time elapsed = 3000ms >= 3000ms
  - Execute immediately
  - lastRan = 3000
  - Output: "Fetch Data called after 3000ms"
```

## Visual Representation

```
User Actions:  |---|---|---|---|---|---|---|
Time (ms):     0   500 1000 1500 2000 2500 3000
Calls:         1   2   3   4   5   6   7
Executions:    ✅  ❌  ❌  ❌  ❌  ❌  ✅
               ^                       ^
            Execute                 Execute
```

## Code Breakdown

### 1. First Call
```javascript
if (!lastRan) {
    func.apply(context, args);
    lastRan = Date.now();
}
```
Execute immediately on first call.

### 2. Subsequent Calls
```javascript
clearTimeout(lastFunc); // Cancel pending execution
lastFunc = setTimeout(function() {
    if ((Date.now() - lastRan) >= limit) {
        func.apply(context, args);
        lastRan = Date.now();
    }
}, limit - (Date.now() - lastRan));
```
Schedule execution after remaining time.

## Real-World Examples

### 1. Scroll Event
```javascript
const throttledScroll = throttle(() => {
    const scrollPosition = window.scrollY;
    updateProgressBar(scrollPosition);
    lazyLoadImages();
}, 1000);

window.addEventListener('scroll', throttledScroll);
```

### 2. Button Click Prevention
```javascript
const throttledSubmit = throttle(() => {
    submitForm();
}, 2000);

submitButton.addEventListener('click', throttledSubmit);
```

### 3. Mouse Move Tracking
```javascript
const throttledMouseMove = throttle((e) => {
    console.log(`Mouse at: ${e.clientX}, ${e.clientY}`);
    updateCursor(e.clientX, e.clientY);
}, 100);

document.addEventListener('mousemove', throttledMouseMove);
```

### 4. API Rate Limiting
```javascript
const throttledFetch = throttle(() => {
    fetch('/api/data')
        .then(res => res.json())
        .then(data => updateUI(data));
}, 5000);

// Ensures API is called at most once every 5 seconds
setInterval(throttledFetch, 1000);
```

## Throttle vs Debounce

| Feature | Throttle | Debounce |
|---------|----------|----------|
| Execution | At regular intervals | After inactivity |
| Frequency | Multiple times | Once |
| Use Case | Scroll, resize, mouse move | Search, form validation |
| Behavior | Executes periodically | Waits for pause |
| Example | Scroll 10s → 10 calls (1/sec) | Type "hello" → 1 call |

**Visual Comparison**:
```
Event:     ||||||||||||||||||||||||||||
Throttle:  |------|------|------|------|
Debounce:  ----------------------------|
```

## Variations

### Simple Throttle (Leading Edge)
```javascript
const throttleSimple = (func, limit) => {
    let inThrottle;
    
    return function(...args) {
        const context = this;
        
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}
```

### Trailing Edge Throttle
```javascript
const throttleTrailing = (func, limit) => {
    let timeout;
    let lastRan;
    
    return function(...args) {
        const context = this;
        
        if (!lastRan) {
            lastRan = Date.now();
        } else {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                if ((Date.now() - lastRan) >= limit) {
                    func.apply(context, args);
                    lastRan = Date.now();
                }
            }, limit - (Date.now() - lastRan));
        }
    };
}
```

## Time Complexity
- **O(1)**: Constant time for each call

## Space Complexity
- **O(1)**: Only stores timeout ID and timestamp

## Advantages
- Guarantees regular execution
- Prevents performance issues
- Smooth user experience
- Predictable behavior

## Disadvantages
- May miss some events
- Adds complexity
- Requires careful timing selection

## When to Use

### Use Throttle:
- ✅ Scroll events
- ✅ Window resize
- ✅ Mouse move
- ✅ Animation frames
- ✅ Progress bar updates
- ✅ Infinite scrolling

### Use Debounce:
- ✅ Search input
- ✅ Form validation
- ✅ Auto-save
- ✅ Button click (prevent double-click)
- ✅ Text input processing

## Common Interview Questions
1. Implement throttle from scratch
2. Difference between throttle and debounce
3. When to use throttle vs debounce
4. Implement leading and trailing edge throttle
5. How to test throttled functions

## Best Practices
1. Choose appropriate limit (100-1000ms typical)
2. Consider leading vs trailing edge
3. Clean up on component unmount
4. Test with different timing scenarios
5. Document the throttle limit
6. Use for high-frequency events only

## Performance Impact

**Without Throttle**:
```
Scroll event fires: 1000 times in 1 second
Function executes: 1000 times
Performance: Poor ❌
```

**With Throttle (1000ms)**:
```
Scroll event fires: 1000 times in 1 second
Function executes: 1 time
Performance: Excellent ✅
```
