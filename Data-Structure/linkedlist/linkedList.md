# Linked List Implementation

## Overview
A linked list is a linear data structure where elements (nodes) are connected via pointers. Each node contains data and a reference to the next node.

## Structure

```
head → [value|next] → [value|next] → [value|next] → null
       Node 1         Node 2         Node 3
```

## Classes

### Node Class
```javascript
class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}
```

### LinkedList Class
```javascript
class Linkedlist {
    constructor(value) {
        this.head = {
            value: value,
            next: null
        };
        this.tail = this.head;
        this.length = 1;
    }
}
```

## Methods

### 1. **append(value)**
Adds node at the end.

**Time Complexity**: O(1)

```javascript
append(value) {
    const newNode = new Node(value);
    this.tail.next = newNode;
    this.tail = newNode;
    this.length++;
    return this;
}
```

**Dry Run**:
```
Initial: head → [sumeet|null], tail → [sumeet|null]

append('rane'):
  newNode = [rane|null]
  tail.next = newNode
  tail = newNode
  length = 2
  
Result: head → [sumeet|next] → [rane|null]
                                 ↑ tail
```

### 2. **prepend(value)**
Adds node at the beginning.

**Time Complexity**: O(1)

```javascript
prepend(value) {
    const newNode = new Node(value);
    newNode.next = this.head;
    this.head = newNode;
    this.length++;
    return this;
}
```

**Dry Run**:
```
Before: head → [sumeet|next] → [rane|null]

prepend(1):
  newNode = [1|null]
  newNode.next = head
  head = newNode
  length = 3
  
Result: head → [1|next] → [sumeet|next] → [rane|null]
```

### 3. **insert(index, value)**
Inserts node at specific position.

**Time Complexity**: O(n)

```javascript
insert(index, value) {
    if (index === 0) {
        this.prepend(value);
        return this.traverse();
    }
    if (index >= this.length) {
        this.append(value);
        return this.traverse();
    }
    
    const newNode = new Node(value);
    const leader = this.traverseToIndex(index - 1);
    const holdingPointer = leader.next;
    leader.next = newNode;
    newNode.next = holdingPointer;
    this.length++;
    return this.traverse();
}
```

**Dry Run**:
```
Before: [1] → [sumeet] → [rane] → null
         0       1          2

insert(2, 'j'):
  leader = traverseToIndex(1) = [sumeet]
  holdingPointer = leader.next = [rane]
  newNode = [j|null]
  leader.next = newNode
  newNode.next = holdingPointer
  
Result: [1] → [sumeet] → [j] → [rane] → null
         0       1        2       3
```

### 4. **remove(index)**
Removes node at specific position.

**Time Complexity**: O(n)

```javascript
remove(index) {
    if (index >= this.length) {
        console.log("node not found");
        return this.traverse();
    }
    
    const leader = this.traverseToIndex(index - 1);
    const unwantedNode = leader.next;
    leader.next = unwantedNode.next;
    this.length--;
    return this.traverse();
}
```

**Dry Run**:
```
Before: [1] → [sumeet] → [j] → [rane] → null
         0       1        2       3

remove(1):
  leader = traverseToIndex(0) = [1]
  unwantedNode = leader.next = [sumeet]
  leader.next = unwantedNode.next = [j]
  length = 3
  
Result: [1] → [j] → [rane] → null
         0     1       2
```

### 5. **traverseToIndex(index)**
Helper to reach a specific node.

**Time Complexity**: O(n)

```javascript
traverseToIndex(index) {
    let counter = 0;
    let currentNode = this.head;
    
    while (counter !== index) {
        currentNode = currentNode.next;
        counter++;
    }
    return currentNode;
}
```

### 6. **traverse()**
Returns array of all values.

**Time Complexity**: O(n)

```javascript
traverse() {
    const arr = [];
    let currentNode = this.head;
    
    while (currentNode !== null) {
        arr.push(currentNode.value);
        currentNode = currentNode.next;
    }
    return arr;
}
```

### 7. **indexOf(data)**
Finds index of a value.

**Time Complexity**: O(n)

```javascript
indexOf(data) {
    let ind = -1;
    let node = this.head;
    
    while (node) {
        ++ind;
        if (node.value === data) return ind;
        node = node.next;
    }
    return -1;
}
```

### 8. **reverse()**
Reverses the linked list.

**Time Complexity**: O(n)

```javascript
reverse() {
    if (!this.head.next) {
        return this.head;
    }
    
    let first = this.head;
    this.tail = this.head;
    let second = first.next;
    
    while (second) {
        const temp = second.next;
        second.next = first;
        first = second;
        second = temp;
    }
    
    this.head.next = null;
    this.head = first;
    return this.traverse();
}
```

**Dry Run**:
```
Before: [1] → [2] → [3] → null

Step 1:
first = [1], second = [2], temp = [3]
[2].next = [1]
first = [2], second = [3]

Step 2:
temp = null
[3].next = [2]
first = [3], second = null

Step 3:
[1].next = null
head = [3]

Result: [3] → [2] → [1] → null
```

## Complete Example

```javascript
const l1 = new Linkedlist("sumeet");
l1.append("rane");      // [sumeet] → [rane]
l1.append("aaa");       // [sumeet] → [rane] → [aaa]
l1.prepend(1);          // [1] → [sumeet] → [rane] → [aaa]
l1.append("sss");       // [1] → [sumeet] → [rane] → [aaa] → [sss]
l1.prepend("eee");      // [eee] → [1] → [sumeet] → [rane] → [aaa] → [sss]
l1.insert(2, "j");      // [eee] → [1] → [j] → [sumeet] → [rane] → [aaa] → [sss]
l1.remove(1);           // [eee] → [j] → [sumeet] → [rane] → [aaa] → [sss]
l1.reverse();           // [sss] → [aaa] → [rane] → [sumeet] → [j] → [eee]
```

## Time Complexity Summary

| Operation | Time Complexity |
|-----------|----------------|
| append | O(1) |
| prepend | O(1) |
| insert | O(n) |
| remove | O(n) |
| traverse | O(n) |
| indexOf | O(n) |
| reverse | O(n) |
| get | O(n) |

## Space Complexity
- **O(n)**: Where n is the number of nodes

## Advantages
- Dynamic size
- Efficient insertion/deletion at beginning: O(1)
- No memory waste
- Easy to implement

## Disadvantages
- No random access: O(n) to access element
- Extra memory for pointers
- Not cache-friendly
- Reverse traversal not possible (in singly linked list)

## Linked List vs Array

| Feature | Array | Linked List |
|---------|-------|-------------|
| Access | O(1) | O(n) |
| Insert at start | O(n) | O(1) |
| Insert at end | O(1) | O(1) |
| Insert at middle | O(n) | O(n) |
| Delete | O(n) | O(n) |
| Memory | Contiguous | Scattered |
| Cache | Friendly | Not friendly |

## Use Cases
- Implementing stacks and queues
- Undo functionality
- Browser history
- Music playlists
- Image viewer (next/previous)
- Hash table collision handling

## Common Interview Problems
- Reverse a linked list
- Detect cycle in linked list
- Find middle element
- Merge two sorted lists
- Remove nth node from end
- Palindrome linked list
