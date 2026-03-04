# Custom Array Implementation

## Overview
A custom implementation of an array data structure using JavaScript objects, demonstrating how arrays work under the hood.

## Class Structure

```javascript
class MyArray {
    constructor() {
        this.length = 0;
        this.data = {};
    }
}
```

## Methods

### 1. **get(index)**
Retrieves element at given index.

**Time Complexity**: O(1)

```javascript
get(index) {
    return this.data[index];
}
```

### 2. **push(item)**
Adds element at the end.

**Time Complexity**: O(1)

```javascript
push(item) {
    this.data[this.length] = item;
    this.length++;
    return this.data;
}
```

**Dry Run**:
```
Initial: data = {}, length = 0
push('hi'):
  data[0] = 'hi'
  length = 1
  Result: {0: 'hi'}, length = 1
```

### 3. **pop()**
Removes and returns last element.

**Time Complexity**: O(1)

```javascript
pop() {
    const lastItem = this.data[this.length - 1];
    delete this.data[this.length - 1];
    this.length--;
    return lastItem;
}
```

**Dry Run**:
```
Before: {0: 'hi', 1: 'you', 2: '!'}, length = 3
pop():
  lastItem = '!'
  delete data[2]
  length = 2
  Result: {0: 'hi', 1: 'you'}, length = 2
```

### 4. **unshift(item)**
Adds element at the beginning.

**Time Complexity**: O(n) - shifts all elements

```javascript
unshift(item) {
    for (let i = this.length; i >= 1; i--) {
        this.data[i] = this.data[i-1];
    }
    this.data[0] = item;
    this.length++;
    return this.data;
}
```

**Dry Run**:
```
Before: {0: 'hi', 1: 'you'}, length = 2
unshift('this'):
  
  i = 2: data[2] = data[1] = 'you'
  i = 1: data[1] = data[0] = 'hi'
  data[0] = 'this'
  length = 3
  
  Result: {0: 'this', 1: 'hi', 2: 'you'}, length = 3
```

### 5. **shift()**
Removes and returns first element.

**Time Complexity**: O(n) - shifts all elements

```javascript
shift() {
    const item = this.data[0];
    this.shiftItems(0);
    return item;
}
```

### 6. **deleteAtIndex(index)**
Removes element at specific index.

**Time Complexity**: O(n)

```javascript
deleteAtIndex(index) {
    const item = this.data[index];
    this.shiftItems(index);
    return item;
}
```

### 7. **shiftItems(index)**
Helper method to shift elements left from given index.

**Time Complexity**: O(n)

```javascript
shiftItems(index) {
    for (let i = index; i < this.length - 1; i++) {
        this.data[i] = this.data[i + 1];
    }
    delete this.data[this.length - 1];
    this.length--;
}
```

**Dry Run**:
```
Before: {0: 'a', 1: 'b', 2: 'c'}, length = 3
shiftItems(1):
  
  i = 1: data[1] = data[2] = 'c'
  delete data[2]
  length = 2
  
  Result: {0: 'a', 1: 'c'}, length = 2
```

## Complete Example

```javascript
const myArray = new MyArray();

myArray.push('hi');      // {0: 'hi'}, length = 1
myArray.push('you');     // {0: 'hi', 1: 'you'}, length = 2
myArray.push('!');       // {0: 'hi', 1: 'you', 2: '!'}, length = 3
myArray.pop();           // {0: 'hi', 1: 'you'}, length = 2
myArray.deleteAtIndex(0);// {0: 'you'}, length = 1
myArray.push('are');     // {0: 'you', 1: 'are'}, length = 2
myArray.push('nice');    // {0: 'you', 1: 'are', 2: 'nice'}, length = 3
myArray.shiftItems(0);   // {0: 'are', 1: 'nice'}, length = 2
myArray.unshift("this"); // {0: 'this', 1: 'are', 2: 'nice'}, length = 3
myArray.shift();         // {0: 'are', 1: 'nice'}, length = 2
```

## Time Complexity Summary

| Operation | Time Complexity | Reason |
|-----------|----------------|---------|
| get | O(1) | Direct access |
| push | O(1) | Add at end |
| pop | O(1) | Remove from end |
| unshift | O(n) | Shift all elements right |
| shift | O(n) | Shift all elements left |
| deleteAtIndex | O(n) | Shift elements after index |

## Space Complexity
- **O(n)**: Where n is the number of elements stored

## Key Learnings

1. **Arrays use objects internally**: JavaScript arrays are objects with numeric keys
2. **Index-based access is O(1)**: Direct property access
3. **Operations at the end are fast**: No shifting required
4. **Operations at the beginning are slow**: Require shifting all elements
5. **Dynamic sizing**: Length property tracks current size

## Real-World Applications
- Understanding array internals
- Building custom data structures
- Performance optimization decisions
- Interview preparation

## Advantages
- Simple implementation
- Demonstrates array fundamentals
- O(1) access time

## Disadvantages
- No built-in methods like map, filter, reduce
- Manual length management
- No type safety
