# Data Structures Documentation

This folder contains custom implementations of fundamental data structures in JavaScript.

## 📚 Contents

### 1. [Array](./array/array.md)
- Custom array implementation using objects
- Methods: push, pop, shift, unshift, delete, get
- Demonstrates how arrays work internally
- **Time**: O(1) for push/pop, O(n) for shift/unshift

### 2. [Hash Table](./hashtable/hashTable.md)
- Hash map implementation with collision handling
- Methods: set, get, keys
- Uses separate chaining for collisions
- **Time**: O(1) average, O(n) worst case

### 3. [Linked List](./linkedlist/linkedList.md)
- Singly linked list implementation
- Methods: append, prepend, insert, remove, reverse, traverse
- **Time**: O(1) for append/prepend, O(n) for insert/remove

### 4. [Doubly Linked List](./linkedlist/doubleLinkedList.md)
- Bidirectional linked list
- Methods: append, prepend, insert, traverse
- Allows backward traversal
- **Time**: Similar to singly linked list

### 5. [Stack](./stack/stack.md)
- LIFO (Last In First Out) structure
- Implemented using linked list
- Methods: push, pop, peek
- **Time**: O(1) for all operations

### 6. [Queue](./queue/queue.md)
- FIFO (First In First Out) structure
- Implemented using linked list
- Methods: enqueue, dequeue, peek
- **Time**: O(1) for all operations

### 7. [Binary Search Tree](./trees/trees.md)
- Tree structure with ordered nodes
- Methods: insert, lookup, remove
- **Time**: O(log n) average, O(n) worst case

## 🎯 Quick Reference

| Data Structure | Access | Insert | Delete | Search | Space |
|----------------|--------|--------|--------|--------|-------|
| Array | O(1) | O(n) | O(n) | O(n) | O(n) |
| Hash Table | O(1)* | O(1)* | O(1)* | O(1)* | O(n) |
| Linked List | O(n) | O(1)** | O(n) | O(n) | O(n) |
| Stack | O(n) | O(1) | O(1) | O(n) | O(n) |
| Queue | O(n) | O(1) | O(1) | O(n) | O(n) |
| BST | O(log n)* | O(log n)* | O(log n)* | O(log n)* | O(n) |

\* Average case  
\** At beginning/end

## 🔍 When to Use What?

### Array
- ✅ Need random access
- ✅ Know size in advance
- ✅ Frequent reads
- ❌ Frequent insertions/deletions at beginning

### Hash Table
- ✅ Fast lookups by key
- ✅ Counting frequencies
- ✅ Caching
- ❌ Need ordered data

### Linked List
- ✅ Frequent insertions/deletions
- ✅ Unknown size
- ✅ Implementing stacks/queues
- ❌ Need random access

### Stack
- ✅ Undo/redo functionality
- ✅ Function call stack
- ✅ Expression evaluation
- ✅ Backtracking

### Queue
- ✅ Task scheduling
- ✅ BFS traversal
- ✅ Request handling
- ✅ Print queue

### Binary Search Tree
- ✅ Sorted data
- ✅ Range queries
- ✅ Fast search/insert/delete
- ❌ Can become unbalanced

## 📊 Comparison

### Array vs Linked List

| Feature | Array | Linked List |
|---------|-------|-------------|
| Access | O(1) | O(n) |
| Insert at start | O(n) | O(1) |
| Insert at end | O(1) | O(1) |
| Memory | Contiguous | Scattered |
| Cache | Friendly | Not friendly |

### Stack vs Queue

| Feature | Stack | Queue |
|---------|-------|-------|
| Order | LIFO | FIFO |
| Use Case | Undo, recursion | Scheduling, BFS |
| Operations | push, pop | enqueue, dequeue |

## 📖 Learning Path

1. **Start with**: Array (most familiar)
2. **Then**: Linked List (understand pointers)
3. **Next**: Stack & Queue (built on linked list)
4. **Then**: Hash Table (important for interviews)
5. **Finally**: Trees (more complex)

## 💡 Implementation Tips

### Array
- Use objects to simulate array behavior
- Track length manually
- Understand shift operations cost

### Hash Table
- Good hash function is crucial
- Handle collisions (chaining or open addressing)
- Consider load factor for resizing

### Linked List
- Always check for null pointers
- Update head/tail carefully
- Draw diagrams for complex operations

### Stack/Queue
- Can use array or linked list
- Linked list avoids resizing issues
- Remember LIFO vs FIFO

### Trees
- Recursive operations are natural
- Handle edge cases (empty tree, single node)
- Understand traversal orders

## 🎓 Interview Focus

### Most Asked
1. Hash Table (Two Sum, Group Anagrams)
2. Linked List (Reverse, Cycle Detection)
3. Stack (Valid Parentheses, Min Stack)
4. Queue (BFS, Level Order Traversal)
5. Trees (Traversals, Validation)

### Key Concepts
- Time/space complexity
- When to use each structure
- Trade-offs between structures
- Implementation details
- Common operations

## 🔗 Related Topics

- Algorithms (sorting, searching)
- Dynamic Programming
- Graph Algorithms
- System Design
- Object-Oriented Design

## 📝 Practice Problems

### Array
- Two Sum, Best Time to Buy Stock

### Hash Table
- Group Anagrams, Subarray Sum

### Linked List
- Reverse List, Detect Cycle, Merge Lists

### Stack
- Valid Parentheses, Min Stack

### Queue
- Implement Queue using Stacks

### Trees
- Inorder Traversal, Validate BST, Max Depth
