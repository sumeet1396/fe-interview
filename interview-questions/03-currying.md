# Currying in JavaScript

## Overview
Currying is a functional programming technique where a function that takes multiple arguments is transformed into a sequence of functions, each taking a single argument.

## Basic Concept

**Normal Function**:
```javascript
function sum(a, b, c) {
    return a + b + c;
}
sum(1, 2, 3); // 6
```

**Curried Function**:
```javascript
function sum(a) {
    return function(b) {
        return function(c) {
            return a + b + c;
        }
    }
}
sum(1)(2)(3); // 6
```

## Simple Implementation

```javascript
const currying = (x) => {
    return (y) => {
        return (z) => {
            return x + y + z;
        }
    }
}

console.log(currying(1)(2)(3)); // 6
```

## Dry Run

```
Call: currying(1)(2)(3)

Step 1: currying(1)
  - x = 1
  - Returns: (y) => (z) => 1 + y + z

Step 2: currying(1)(2)
  - y = 2
  - Returns: (z) => 1 + 2 + z

Step 3: currying(1)(2)(3)
  - z = 3
  - Returns: 1 + 2 + 3 = 6
```

## Infinite Currying

```javascript
const infiniteCurrying = (a) => {
    return function(b) {
        if (b) return infiniteCurrying(a + b);
        return a;
    }
}

console.log(infiniteCurrying(1)(2)(3)(4)(5)()); // 15
```

### Dry Run

```
Call: infiniteCurrying(1)(2)(3)()

Step 1: infiniteCurrying(1)
  - a = 1
  - Returns: function(b) {...}

Step 2: infiniteCurrying(1)(2)
  - b = 2
  - b exists, so return infiniteCurrying(1 + 2)
  - Returns: infiniteCurrying(3)

Step 3: infiniteCurrying(3)(3)
  - b = 3
  - b exists, so return infiniteCurrying(3 + 3)
  - Returns: infiniteCurrying(6)

Step 4: infiniteCurrying(6)()
  - b = undefined
  - b doesn't exist, return a = 6
  - Returns: 6
```

## Generic Curry Function

```javascript
function curry(fn) {
    return function curried(...args) {
        if (args.length >= fn.length) {
            return fn(...args);
        }
        
        return (...nextArgs) => curried(...args, ...nextArgs);
    };
}
```

### How It Works

1. **Check if enough arguments**: `args.length >= fn.length`
2. **If yes**: Execute the original function
3. **If no**: Return a new function that collects more arguments

### Example Usage

```javascript
const join = (a, b, c) => `${a}_${b}_${c}`;
const curriedJoin = curry(join);

console.log(curriedJoin(1, 2, 3));    // "1_2_3"
console.log(curriedJoin(1)(2, 3));    // "1_2_3"
console.log(curriedJoin(1, 2)(3));    // "1_2_3"
console.log(curriedJoin(1)(2)(3));    // "1_2_3"
```

### Dry Run: curriedJoin(1)(2, 3)

```
Step 1: curriedJoin(1)
  - args = [1]
  - fn.length = 3
  - args.length (1) < fn.length (3)
  - Return: (...nextArgs) => curried(1, ...nextArgs)

Step 2: curriedJoin(1)(2, 3)
  - args = [1, 2, 3]
  - args.length (3) >= fn.length (3)
  - Execute: join(1, 2, 3)
  - Return: "1_2_3"
```

## Visual Representation

```
Normal Function:
join(a, b, c) → result

Curried Function:
join(a) → function
  ↓
join(a)(b) → function
  ↓
join(a)(b)(c) → result
```

## Real-World Applications

### 1. Event Handlers
```javascript
const handleEvent = curry((eventType, selector, callback) => {
    document.querySelector(selector)
        .addEventListener(eventType, callback);
});

const onClick = handleEvent('click');
const onClickButton = onClick('.button');

onClickButton(() => console.log('Clicked!'));
```

### 2. API Requests
```javascript
const apiRequest = curry((method, url, data) => {
    return fetch(url, {
        method: method,
        body: JSON.stringify(data)
    });
});

const postRequest = apiRequest('POST');
const postToUsers = postRequest('/api/users');

postToUsers({ name: 'John' });
```

### 3. Data Transformation
```javascript
const map = curry((fn, array) => array.map(fn));
const filter = curry((fn, array) => array.filter(fn));

const double = x => x * 2;
const isEven = x => x % 2 === 0;

const doubleAll = map(double);
const filterEven = filter(isEven);

console.log(doubleAll([1, 2, 3]));      // [2, 4, 6]
console.log(filterEven([1, 2, 3, 4]));  // [2, 4]
```

### 4. Logging
```javascript
const log = curry((level, message, data) => {
    console[level](`[${level.toUpperCase()}] ${message}`, data);
});

const logError = log('error');
const logUserError = logError('User error:');

logUserError({ userId: 123 });
// Output: [ERROR] User error: { userId: 123 }
```

## Advantages

1. **Reusability**: Create specialized functions from generic ones
2. **Composition**: Easier function composition
3. **Partial Application**: Apply arguments incrementally
4. **Readability**: More declarative code
5. **Testing**: Easier to test smaller functions

## Disadvantages

1. **Complexity**: Harder to understand for beginners
2. **Debugging**: Stack traces can be confusing
3. **Performance**: Slight overhead from closures
4. **Verbosity**: More function calls

## Currying vs Partial Application

### Currying
```javascript
const curry = (a) => (b) => (c) => a + b + c;
curry(1)(2)(3); // Each call takes exactly one argument
```

### Partial Application
```javascript
const partial = (a, b) => (c) => a + b + c;
partial(1, 2)(3); // Can take multiple arguments
```

## Common Patterns

### 1. Configuration
```javascript
const createUser = curry((role, permissions, name) => ({
    name,
    role,
    permissions
}));

const createAdmin = createUser('admin')(['read', 'write', 'delete']);
const createGuest = createUser('guest')(['read']);

const admin = createAdmin('Alice');
const guest = createGuest('Bob');
```

### 2. Validation
```javascript
const validate = curry((rule, message, value) => {
    if (!rule(value)) {
        throw new Error(message);
    }
    return value;
});

const isEmail = (str) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str);
const validateEmail = validate(isEmail)('Invalid email');

validateEmail('test@example.com'); // OK
validateEmail('invalid');          // Error
```

## Time Complexity
- **O(1)**: Each curried call is constant time

## Space Complexity
- **O(n)**: Closures store arguments (n = number of arguments)

## Common Interview Questions

1. Implement curry function from scratch
2. Difference between currying and partial application
3. Implement infinite currying
4. Implement curry with placeholder support
5. Real-world use cases of currying

## Best Practices

1. Use for functions with 2-4 parameters
2. Document expected argument order
3. Consider using libraries (Ramda, Lodash)
4. Balance between currying and readability
5. Use TypeScript for better type safety

## Related Concepts

- **Partial Application**: Apply some arguments, get function for rest
- **Function Composition**: Combine multiple functions
- **Higher-Order Functions**: Functions that take/return functions
- **Closures**: Inner functions accessing outer scope
