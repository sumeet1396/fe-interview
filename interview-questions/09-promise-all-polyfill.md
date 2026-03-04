# Promise.all Polyfill

## Overview
Promise.all is a method that takes an array of promises and returns a single promise that resolves when all input promises resolve, or rejects when any input promise rejects.

## Behavior

- ✅ **Resolves**: When ALL promises resolve
- ❌ **Rejects**: When ANY promise rejects (fail-fast)
- Returns array of results in same order as input

## Implementation

```javascript
Promise.all = function(input) {
    const result = [];
    let totalResolved = 0;
    
    return new Promise((resolve, reject) => {
        if (input.length === 0) return resolve(result);
        
        input.forEach((element, index) => {
            Promise.resolve(element)
                .then((value) => {
                    result[index] = value;
                    totalResolved++;
                    
                    if (totalResolved === input.length) {
                        return resolve(result);
                    }
                })
                .catch((error) => reject(error));
        });
    });
}
```

## How It Works

### Key Components:
1. **result[]**: Stores resolved values
2. **totalResolved**: Counts completed promises
3. **Promise.resolve()**: Handles non-promise values
4. **result[index]**: Maintains order
5. **Fail-fast**: Rejects immediately on first error

## Dry Run - Success Case

```javascript
const promise1 = Promise.all([
    Promise.resolve(1),
    new Promise((resolve) => setTimeout(() => resolve(2), 2000)),
    Promise.resolve(3),
    4
]);
```

**Step-by-Step**:
```
Initial State:
  result = []
  totalResolved = 0
  input.length = 4

Index 0: Promise.resolve(1)
  - Resolves immediately with value 1
  - result[0] = 1
  - totalResolved = 1
  - result = [1]

Index 2: Promise.resolve(3)
  - Resolves immediately with value 3
  - result[2] = 3
  - totalResolved = 2
  - result = [1, undefined, 3]

Index 3: Promise.resolve(4)
  - Non-promise value, wraps in Promise.resolve
  - Resolves immediately with value 4
  - result[3] = 4
  - totalResolved = 3
  - result = [1, undefined, 3, 4]

After 2000ms - Index 1: setTimeout promise
  - Resolves with value 2
  - result[1] = 2
  - totalResolved = 4
  - totalResolved === input.length ✓
  - resolve([1, 2, 3, 4])

Output: [1, 2, 3, 4]
```

## Dry Run - Rejection Case

```javascript
const promise2 = Promise.all([
    Promise.resolve(1),
    new Promise((resolve) => setTimeout(() => resolve(2), 2000)),
    Promise.reject(3),
    4
]);
```

**Step-by-Step**:
```
Initial State:
  result = []
  totalResolved = 0

Index 0: Promise.resolve(1)
  - Resolves with value 1
  - result[0] = 1
  - totalResolved = 1

Index 2: Promise.reject(3)
  - Rejects immediately with error 3
  - catch block executes
  - reject(3)
  - Promise.all rejects immediately ❌

Index 1 and 3: Never processed
  - Promise.all already rejected
  - Remaining promises ignored

Output: Rejected with value 3
```

## Visual Timeline

### Success Case:
```
Time:     0ms -------- 1000ms -------- 2000ms
Promise1: ✅ (1)
Promise2: ⏳ --------- ⏳ --------- ✅ (2)
Promise3: ✅ (3)
Promise4: ✅ (4)
Result:   Wait....... Wait....... [1,2,3,4] ✅
```

### Rejection Case:
```
Time:     0ms
Promise1: ✅ (1)
Promise2: ⏳ (cancelled)
Promise3: ❌ (3)
Promise4: ⏳ (cancelled)
Result:   ❌ Rejected with 3
```

## Key Features

### 1. Order Preservation
```javascript
Promise.all([
    Promise.resolve('first'),
    Promise.resolve('second'),
    Promise.resolve('third')
]).then(console.log);
// Output: ['first', 'second', 'third']
// Order maintained regardless of resolution time
```

### 2. Non-Promise Values
```javascript
Promise.all([1, 2, 3]).then(console.log);
// Output: [1, 2, 3]
// Non-promise values are wrapped in Promise.resolve()
```

### 3. Empty Array
```javascript
Promise.all([]).then(console.log);
// Output: []
// Resolves immediately with empty array
```

### 4. Fail-Fast Behavior
```javascript
Promise.all([
    new Promise((resolve) => setTimeout(() => resolve(1), 3000)),
    Promise.reject('error'),
    new Promise((resolve) => setTimeout(() => resolve(3), 1000))
]).catch(console.log);
// Output: 'error'
// Rejects immediately, doesn't wait for other promises
```

## Real-World Use Cases

### 1. Multiple API Calls
```javascript
const fetchUserData = async (userId) => {
    const [user, posts, comments] = await Promise.all([
        fetch(`/api/users/${userId}`),
        fetch(`/api/users/${userId}/posts`),
        fetch(`/api/users/${userId}/comments`)
    ]);
    
    return {
        user: await user.json(),
        posts: await posts.json(),
        comments: await comments.json()
    };
};
```

### 2. Image Preloading
```javascript
const preloadImages = (urls) => {
    const promises = urls.map(url => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = url;
        });
    });
    
    return Promise.all(promises);
};
```

### 3. Batch Processing
```javascript
const processUsers = async (userIds) => {
    const results = await Promise.all(
        userIds.map(id => processUser(id))
    );
    return results;
};
```

## Time Complexity
- **O(n)**: Where n is the number of promises
- Execution time = slowest promise

## Space Complexity
- **O(n)**: Stores result array of size n

## Comparison with Other Promise Methods

| Method | Resolves When | Rejects When | Returns |
|--------|---------------|--------------|---------|
| Promise.all | All resolve | Any rejects | Array of values |
| Promise.allSettled | All settle | Never | Array of objects |
| Promise.any | Any resolves | All reject | First resolved value |
| Promise.race | Any settles | First rejects | First settled value |

## Common Pitfalls

### 1. Not Handling Rejections
```javascript
// ❌ Bad
Promise.all([promise1, promise2]);

// ✅ Good
Promise.all([promise1, promise2])
    .then(results => console.log(results))
    .catch(error => console.error(error));
```

### 2. Sequential Instead of Parallel
```javascript
// ❌ Bad (Sequential - slow)
const result1 = await fetch('/api/1');
const result2 = await fetch('/api/2');

// ✅ Good (Parallel - fast)
const [result1, result2] = await Promise.all([
    fetch('/api/1'),
    fetch('/api/2')
]);
```

### 3. Ignoring Order
```javascript
// Results maintain input order, not resolution order
const [slow, fast] = await Promise.all([
    slowPromise(),  // Takes 3s
    fastPromise()   // Takes 1s
]);
// slow is first, even though fastPromise resolved first
```

## Error Handling Strategies

### 1. Catch Individual Promises
```javascript
const promises = [
    promise1.catch(err => ({ error: err })),
    promise2.catch(err => ({ error: err })),
    promise3.catch(err => ({ error: err }))
];

const results = await Promise.all(promises);
// All promises "succeed", errors are in result objects
```

### 2. Use Promise.allSettled
```javascript
const results = await Promise.allSettled([
    promise1,
    promise2,
    promise3
]);

results.forEach(result => {
    if (result.status === 'fulfilled') {
        console.log('Success:', result.value);
    } else {
        console.log('Error:', result.reason);
    }
});
```

## Interview Questions

1. Implement Promise.all from scratch
2. What happens if one promise rejects?
3. How does Promise.all maintain order?
4. Difference between Promise.all and Promise.allSettled
5. How to handle partial failures?
6. What's the time complexity?

## Best Practices

1. Always add .catch() handler
2. Use for independent parallel operations
3. Consider Promise.allSettled for partial failures
4. Limit concurrent promises (use batching for large arrays)
5. Add timeout handling for long-running promises
6. Log errors with context for debugging
