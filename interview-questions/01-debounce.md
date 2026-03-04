# Debounce Function

## Overview
Debouncing is a technique that delays the execution of a function until after a specified time has elapsed since the last time it was invoked. It ensures the function is called only once after the user stops triggering the event.

## Use Case
**Search Bar with Auto-Suggestions**: Making an API call for every keystroke would cause excessive network requests. Debouncing waits until the user stops typing before making the API call.

## Implementation

```javascript
const debounce = (func, wait) => {
    let timeout;
    return function(...args) {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
}
```

## How It Works

### Key Components:
1. **timeout**: Stores the timer ID
2. **clearTimeout**: Cancels previous timer
3. **setTimeout**: Sets new timer
4. **context**: Preserves `this` binding
5. **args**: Preserves function arguments

## Dry Run

```javascript
const debounceFn = debounce(() => {
    console.log(`Fetch Data called after ${Date.now() - startTime}ms`);
}, 500);

// User types rapidly
debounceFn(); // Call 1 at 0ms
debounceFn(); // Call 2 at 100ms
debounceFn(); // Call 3 at 200ms
debounceFn(); // Call 4 at 300ms
// User stops typing
// Function executes at 800ms (300ms + 500ms wait)
```

**Step-by-Step**:
```
Time 0ms: Call 1
  - timeout = setTimeout(func, 500)
  - Timer set to execute at 500ms

Time 100ms: Call 2
  - clearTimeout(timeout) → Cancel previous timer
  - timeout = setTimeout(func, 500)
  - Timer set to execute at 600ms

Time 200ms: Call 3
  - clearTimeout(timeout) → Cancel previous timer
  - timeout = setTimeout(func, 500)
  - Timer set to execute at 700ms

Time 300ms: Call 4
  - clearTimeout(timeout) → Cancel previous timer
  - timeout = setTimeout(func, 500)
  - Timer set to execute at 800ms

Time 800ms: Function executes
  - "Fetch Data called after 800ms"
```

## Visual Representation

```
User Actions:  |---|---|---|---|
Time (ms):     0   100 200 300 400 500 600 700 800
Calls:         1   2   3   4
Timers:        ❌  ❌  ❌  ⏱️ ⏱️ ⏱️ ⏱️ ⏱️ ✅
                                            Execute!
```

## Code Breakdown

### 1. Closure
```javascript
let timeout; // Persists across function calls
```

### 2. Clear Previous Timer
```javascript
clearTimeout(timeout); // Cancel pending execution
```

### 3. Set New Timer
```javascript
timeout = setTimeout(() => func.apply(context, args), wait);
```

### 4. Preserve Context
```javascript
const context = this; // Save 'this' for later use
func.apply(context, args); // Call with correct context
```

## Real-World Examples

### 1. Search Input
```javascript
const searchInput = document.getElementById('search');
const debouncedSearch = debounce((query) => {
    fetch(`/api/search?q=${query}`)
        .then(res => res.json())
        .then(data => displayResults(data));
}, 300);

searchInput.addEventListener('input', (e) => {
    debouncedSearch(e.target.value);
});
```

### 2. Window Resize
```javascript
const debouncedResize = debounce(() => {
    console.log('Window resized to:', window.innerWidth);
    adjustLayout();
}, 250);

window.addEventListener('resize', debouncedResize);
```

### 3. Form Validation
```javascript
const debouncedValidate = debounce((value) => {
    validateEmail(value);
}, 500);

emailInput.addEventListener('input', (e) => {
    debouncedValidate(e.target.value);
});
```

## Debounce vs Throttle

| Feature | Debounce | Throttle |
|---------|----------|----------|
| Execution | After inactivity period | At regular intervals |
| Use Case | Search input, form validation | Scroll events, resize |
| Behavior | Waits for pause | Executes periodically |
| Example | Type "hello" → 1 API call | Scroll 10s → 10 calls (1/sec) |

## Variations

### Leading Edge Debounce
Execute immediately, then wait before allowing next execution.

```javascript
const debounceLeading = (func, wait) => {
    let timeout;
    return function(...args) {
        const context = this;
        const callNow = !timeout;
        
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            timeout = null;
        }, wait);
        
        if (callNow) func.apply(context, args);
    };
}
```

### With Cancel Method
```javascript
const debounce = (func, wait) => {
    let timeout;
    
    const debounced = function(...args) {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
    
    debounced.cancel = function() {
        clearTimeout(timeout);
    };
    
    return debounced;
}
```

## Time Complexity
- **O(1)**: Constant time for each call

## Space Complexity
- **O(1)**: Only stores timeout ID

## Advantages
- Reduces API calls
- Improves performance
- Better user experience
- Saves bandwidth

## Disadvantages
- Delayed response
- May miss rapid changes
- Complexity in testing

## Common Interview Questions
1. Implement debounce from scratch
2. Difference between debounce and throttle
3. When to use debounce vs throttle
4. How to cancel a debounced function
5. Implement leading edge debounce

## Best Practices
1. Choose appropriate wait time (200-500ms typical)
2. Cancel on component unmount (React)
3. Use for expensive operations only
4. Test with different timing scenarios
5. Consider user experience impact
