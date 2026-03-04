# JavaScript Interview Questions Documentation

This folder contains detailed explanations of common JavaScript interview questions with implementations, dry runs, and real-world use cases.

## 📚 Contents

### Performance Optimization

#### 1. [Debounce](./01-debounce.md)
- Delays function execution until after inactivity period
- **Use Case**: Search input, form validation
- **Time**: O(1)
- **Pattern**: Wait for pause, then execute

#### 2. [Throttle](./02-throttle.md)
- Limits function execution to once per interval
- **Use Case**: Scroll events, resize, mouse move
- **Time**: O(1)
- **Pattern**: Execute at regular intervals

### Functional Programming

#### 3. [Currying](./03-currying.md)
- Transform multi-argument function into sequence of single-argument functions
- **Use Case**: Partial application, function composition
- **Pattern**: `f(a, b, c)` → `f(a)(b)(c)`

#### 4. [Currying with Placeholder](./04-currying-placeholder.md)
- Advanced currying with placeholder support
- **Use Case**: Skip arguments during partial application
- **Pattern**: `f(_, 2)(1)(3)` → `f(1, 2, 3)`

#### 5. [Pipe Function](./07-pipe-function.md)
- Compose functions left-to-right
- **Use Case**: Data transformation pipelines
- **Pattern**: `pipe(f, g, h)(x)` → `h(g(f(x)))`

### Array/Object Manipulation

#### 6. [Deep Flatten](./05-deep-flat.md)
- Flatten nested arrays and objects
- **Use Case**: Normalize nested data structures
- **Implementations**: Array flatten, object flatten, with prefix

#### 7. [Negative Array Indexing](./06-negative-indexing-array.md)
- Python-style negative indexing for arrays
- **Use Case**: Access elements from end
- **Pattern**: `arr[-1]` → last element

### Promises & Async

#### 8. [Auto Retry Promise](./08-auto-retry-promise.md)
- Automatically retry failed promises
- **Use Case**: Network requests, API calls
- **Pattern**: Retry n times before failing

#### 9. [Promise.all Polyfill](./09-promise-all-polyfill.md)
- Implement Promise.all from scratch
- **Behavior**: Resolve when all resolve, reject when any rejects
- **Pattern**: Parallel execution, fail-fast

#### 10. [Promise.allSettled Polyfill](./10-promise-all-settled.md)
- Implement Promise.allSettled
- **Behavior**: Wait for all to settle (resolve or reject)
- **Pattern**: No fail-fast, returns all results

#### 11. [Promise.any Polyfill](./11-promise-any.md)
- Implement Promise.any
- **Behavior**: Resolve when any resolves, reject when all reject
- **Pattern**: First success wins

#### 12. [Promise.race Polyfill](./12-promise-race.md)
- Implement Promise.race
- **Behavior**: Settle when first promise settles
- **Pattern**: First to finish wins

## 🎯 Quick Reference

### Performance Patterns

| Pattern | When to Use | Execution |
|---------|-------------|-----------|
| Debounce | Search, validation | After inactivity |
| Throttle | Scroll, resize | At intervals |

### Promise Methods

| Method | Resolves When | Rejects When | Use Case |
|--------|---------------|--------------|----------|
| Promise.all | All resolve | Any rejects | Parallel tasks, all needed |
| Promise.allSettled | All settle | Never | Partial failures OK |
| Promise.any | Any resolves | All reject | First success needed |
| Promise.race | First settles | First rejects | Timeout, fastest wins |

## 🔍 Topic Categories

### 1. Performance Optimization
- Debounce
- Throttle
- Memoization

### 2. Functional Programming
- Currying
- Currying with Placeholder
- Pipe Function
- Composition

### 3. Data Manipulation
- Deep Flatten (Array)
- Deep Flatten (Object)
- Negative Indexing

### 4. Asynchronous JavaScript
- Auto Retry Promise
- Promise.all
- Promise.allSettled
- Promise.any
- Promise.race

## 📖 Learning Path

### Beginner
1. Start with **Debounce** (easiest concept)
2. Learn **Throttle** (similar to debounce)
3. Understand **Promise.all** (common in interviews)

### Intermediate
4. Master **Currying** (functional programming)
5. Learn **Deep Flatten** (recursion practice)
6. Study **Promise.allSettled** (error handling)

### Advanced
7. **Currying with Placeholder** (complex logic)
8. **Pipe Function** (composition)
9. **Auto Retry Promise** (real-world pattern)
10. All Promise polyfills

## 💡 Interview Tips

### Debounce vs Throttle
```
Event:     ||||||||||||||||||||||||||||
Debounce:  ----------------------------|
Throttle:  |------|------|------|------|
```

**Remember**: 
- Debounce = "Wait for pause"
- Throttle = "Regular intervals"

### Currying Pattern
```javascript
// Normal
function sum(a, b, c) { return a + b + c; }

// Curried
const sum = a => b => c => a + b + c;
```

### Promise Methods
```javascript
// All must succeed
Promise.all([p1, p2, p3])

// Wait for all (success or failure)
Promise.allSettled([p1, p2, p3])

// First success
Promise.any([p1, p2, p3])

// First to finish
Promise.race([p1, p2, p3])
```

## 🎓 Common Interview Questions

### Performance
1. Implement debounce from scratch
2. Difference between debounce and throttle
3. When to use each?

### Functional Programming
1. What is currying?
2. Implement curry function
3. Difference between currying and partial application

### Promises
1. Implement Promise.all
2. What happens if one promise rejects?
3. Difference between Promise.all and Promise.allSettled

### Data Manipulation
1. Flatten nested array recursively
2. Flatten nested object with dot notation
3. Implement negative indexing using Proxy

## 🔧 Real-World Applications

### Debounce
- Search autocomplete
- Form validation
- Window resize handlers
- Auto-save functionality

### Throttle
- Scroll event handlers
- Mouse move tracking
- API rate limiting
- Infinite scrolling

### Currying
- Event handlers
- API request builders
- Data transformation
- Configuration functions

### Promise Methods
- Parallel API calls (Promise.all)
- Batch operations (Promise.allSettled)
- Fallback requests (Promise.any)
- Timeout handling (Promise.race)

## 📊 Complexity Analysis

| Function | Time | Space | Notes |
|----------|------|-------|-------|
| Debounce | O(1) | O(1) | Per call |
| Throttle | O(1) | O(1) | Per call |
| Currying | O(1) | O(n) | n = args |
| Deep Flatten | O(n) | O(d) | d = depth |
| Promise.all | O(n) | O(n) | n = promises |

## 🎯 Practice Strategy

1. **Understand the concept** (read documentation)
2. **Implement from scratch** (no looking)
3. **Dry run with examples** (trace execution)
4. **Test edge cases** (empty, null, errors)
5. **Optimize** (time/space complexity)
6. **Explain to others** (teach to learn)

## 🔗 Related Topics

- Closures
- Higher-Order Functions
- Recursion
- Event Loop
- Async/Await
- Functional Programming
- Design Patterns

## 📝 Additional Resources

### Practice Platforms
- LeetCode (Promise problems)
- JavaScript.info (Concepts)
- Frontend Masters (Deep dives)

### Key Concepts to Master
- Closures and scope
- this binding
- Promises and async/await
- Recursion
- Higher-order functions
- Event loop
