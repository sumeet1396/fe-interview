# LRU Cache Implementation in JavaScript

## Overview

This document explains a simple implementation of an **LRU (Least
Recently Used) Cache** using JavaScript's `Map`.

An **LRU Cache** is a data structure that stores a limited number of
items. When the cache reaches its capacity and a new item needs to be
inserted, the **least recently used item is removed**.

This pattern is commonly used in: - Browser caching - API response
caching - Database query caching - Memory management systems

---

# What is an LRU Cache?

LRU stands for **Least Recently Used**.

The rule is simple:

- When an item is **accessed**, it becomes the **most recently used**
- When the cache exceeds its **capacity**, the **least recently used
  item is removed**

Example:

Capacity = 2

    put(1, A) → [1]
    put(2, B) → [1,2]
    get(1)    → [2,1]  (1 becomes most recently used)
    put(3, C) → [1,3]  (2 removed because it was least recently used)

---

# Why Use JavaScript Map?

JavaScript `Map` maintains **insertion order**.

Example:

    const map = new Map()
    map.set(1, "A")
    map.set(2, "B")

Order:

    1 → A
    2 → B

The **first key in the Map is the least recently used item**.

This allows us to implement LRU logic without using a linked list.

---

# Code Implementation

```javascript
class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
  }

  put(key, value) {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    }

    this.cache.set(key, value);

    if (this.cache.size > this.capacity) {
      const cacheKey = this.cache.keys().next().value;
      this.cache.delete(cacheKey);
    }
  }

  get(key) {
    if (!this.cache.has(key)) return -1;

    const value = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, value);
    return value;
  }
}
```

---

# Class Explanation

## LRUCache

The main class responsible for managing the cache.

### Properties

Property Description

---

capacity Maximum number of items the cache can store
cache A JavaScript Map storing key-value pairs

---

# Functions

## constructor(capacity)

Initializes the cache.

    constructor(capacity) {
      this.capacity = capacity;
      this.cache = new Map();
    }

### Parameters

- `capacity` -- Maximum size of the cache.

---

# put(key, value)

Adds a new item to the cache.

    put(key, value)

### Steps

1.  If the key already exists:
    - Remove the old entry to update its position.

2.  Insert the key-value pair.

3.  If the cache exceeds capacity:
    - Remove the **least recently used key**.

### Example

    cache.put(10, "Hello")
    cache.put(20, "World")

Cache:

    10 → Hello
    20 → World

---

# get(key)

Retrieves a value from the cache.

    get(key)

### Steps

1.  If key does not exist → return `-1`
2.  If key exists:
    - Remove it from its current position
    - Reinsert it to mark it as **most recently used**
3.  Return the value

### Example

    cache.get(10)

Result:

    Hello

---

# Example Usage

```javascript
const cache = new LRUCache(2);

cache.put(10, "Hello");
cache.put(20, "World");

console.log(cache.get(10));
console.log(cache.get(20));
console.log(cache.get(30));
console.log(cache.get(10));

cache.put(40, "test");
console.log(cache);
```

---

# Step-by-Step Execution

Initial capacity = **2**

### Step 1

    put(10, "Hello")

Cache:

    10

---

### Step 2

    put(20, "World")

Cache:

    10, 20

---

### Step 3

    get(10)

10 becomes most recently used

Cache:

    20, 10

---

### Step 4

    put(40, "test")

Cache size exceeds capacity.

Remove **20** (least recently used)

Final cache:

    10, 40

---

# Time Complexity

Operation Complexity

---

get O(1)
put O(1)
delete O(1)

Because JavaScript `Map` operations are constant time.

---

# Advantages of This Approach

- Simple implementation
- Uses built-in JavaScript `Map`
- No need for complex linked lists

---

# Limitations

- Relies on JavaScript `Map` maintaining insertion order
- In lower-level languages, this approach may not work

For those languages, the standard approach uses:

- **HashMap**
- **Doubly Linked List**

---

# Conclusion

This implementation provides a clean and efficient way to implement an
**LRU Cache in JavaScript** using `Map`.

It is widely accepted in JavaScript coding interviews and practical
applications where caching is needed.
