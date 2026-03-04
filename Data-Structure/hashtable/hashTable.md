# Hash Table Implementation

## Overview
A hash table (hash map) is a data structure that implements an associative array, mapping keys to values using a hash function for fast lookups.

## Class Structure

```javascript
class HashTable {
    constructor(size) {
        this.data = new Array(size);
    }
}
```

## Core Concepts

### Hash Function
Converts a key into an array index.

```javascript
_hash(key) {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
        hash = (hash + key.charCodeAt(i) * i) % this.data.length;
    }
    return hash;
}
```

**Purpose**: Distribute keys uniformly across the array

**Example**:
```
key = "grapes", size = 2
i=0: hash = (0 + 103*0) % 2 = 0
i=1: hash = (0 + 114*1) % 2 = 0
i=2: hash = (0 + 97*2) % 2 = 0
i=3: hash = (0 + 112*3) % 2 = 0
i=4: hash = (0 + 101*4) % 2 = 0
i=5: hash = (0 + 115*5) % 2 = 1
Result: index = 1
```

## Methods

### 1. **set(key, value)**
Stores a key-value pair.

**Time Complexity**: O(1) average, O(n) worst case (collisions)

```javascript
set(key, value) {
    let address = this._hash(key);
    if (!this.data[address]) {
        this.data[address] = [];
    }
    this.data[address].push([key, value]);
    return this.data;
}
```

**Dry Run**:
```
Initial: data = [undefined, undefined]

set('grapes', 10000):
  address = _hash('grapes') = 1
  data[1] = []
  data[1].push(['grapes', 10000])
  Result: [undefined, [['grapes', 10000]]]

set('orange', 10000):
  address = _hash('orange') = 1
  data[1] already exists
  data[1].push(['orange', 10000])
  Result: [undefined, [['grapes', 10000], ['orange', 10000]]]
  ↑ Collision handled by chaining
```

### 2. **get(key)**
Retrieves value for a given key.

**Time Complexity**: O(1) average, O(n) worst case

```javascript
get(key) {
    const address = this._hash(key);
    const currentBucket = this.data[address];
    
    if (currentBucket) {
        for (let i = 0; i < currentBucket.length; i++) {
            if (currentBucket[i][0] === key) {
                return currentBucket[i][1];
            }
        }
    }
    return undefined;
}
```

**Dry Run**:
```
data = [undefined, [['grapes', 10000], ['orange', 10000]]]

get('grapes'):
  address = 1
  currentBucket = [['grapes', 10000], ['orange', 10000]]
  Loop:
    i=0: currentBucket[0][0] = 'grapes' === 'grapes' ✓
    return currentBucket[0][1] = 10000
```

### 3. **keys()**
Returns all keys in the hash table.

**Time Complexity**: O(n)

```javascript
keys() {
    if (!this.data.length) {
        return undefined;
    }
    
    let result = [];
    for (let i = 0; i < this.data.length; i++) {
        if (this.data[i] && this.data[i].length) {
            if (this.data[i].length > 1) {
                for (let j = 0; j < this.data[i].length; j++) {
                    result.push(this.data[i][j][0]);
                }
            } else {
                result.push(this.data[i][0]);
            }
        }
    }
    return result;
}
```

**Dry Run**:
```
data = [
    [['apples', 9]],
    [['grapes', 10000], ['orange', 10000], ['mango', 1]]
]

keys():
  result = []
  
  i=0: data[0] exists
    length = 1
    result.push('apples')
    result = ['apples']
  
  i=1: data[1] exists
    length = 3 > 1
    j=0: result.push('grapes')
    j=1: result.push('orange')
    j=2: result.push('mango')
    result = ['apples', 'grapes', 'orange', 'mango']
  
  return ['apples', 'grapes', 'orange', 'mango']
```

## Collision Handling

### Separate Chaining
When multiple keys hash to the same index, store them in a linked list (or array).

```
Index 0: [['apples', 9]]
Index 1: [['grapes', 10000], ['orange', 10000], ['mango', 1]]
         ↑ Multiple items at same index (collision)
```

## Complete Example

```javascript
const myHashTable = new HashTable(2);

myHashTable.set('grapes', 10000);
// data = [undefined, [['grapes', 10000]]]

myHashTable.set('orange', 10000);
// data = [undefined, [['grapes', 10000], ['orange', 10000]]]

myHashTable.get('grapes');
// Returns: 10000

myHashTable.set('apples', 9);
// data = [[['apples', 9]], [['grapes', 10000], ['orange', 10000]]]

myHashTable.set('mango', 1);
// data = [[['apples', 9]], [['grapes', 10000], ['orange', 10000], ['mango', 1]]]

myHashTable.keys();
// Returns: ['apples', 'grapes', 'orange', 'mango']
```

## Time Complexity

| Operation | Average | Worst Case |
|-----------|---------|------------|
| set | O(1) | O(n) |
| get | O(1) | O(n) |
| keys | O(n) | O(n) |
| delete | O(1) | O(n) |

**Note**: Worst case occurs when all keys collide (hash to same index)

## Space Complexity
- **O(n)**: Where n is the number of key-value pairs

## Advantages
- Fast lookups: O(1) average
- Flexible keys: Any hashable type
- Dynamic sizing: Can grow as needed

## Disadvantages
- Collisions: Performance degrades with many collisions
- Memory overhead: May waste space
- No ordering: Keys are not stored in order
- Hash function dependency: Poor hash function = poor performance

## Real-World Applications
- Database indexing
- Caching (LRU cache)
- Symbol tables in compilers
- Counting frequencies
- Detecting duplicates
- Implementing sets and maps

## Common Interview Problems
- Two Sum
- Group Anagrams
- First Non-Repeating Character
- Subarray Sum Equals K
- Longest Substring Without Repeating Characters

## Optimization Tips
1. **Choose good hash function**: Minimize collisions
2. **Load factor**: Keep ratio of items to buckets low
3. **Resize**: Double size when load factor exceeds threshold
4. **Prime number size**: Reduces collisions
