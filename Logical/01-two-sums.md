# Two Sum Problem

## Problem Statement
Given an array of integers `nums` and an integer `target`, return indices of the two numbers that add up to `target`.

**Constraints**:
- Each input has exactly one solution
- Cannot use the same element twice
- Return answer in any order

## Examples

```javascript
Input: nums = [2, 7, 11, 15], target = 9
Output: [0, 1]
Explanation: nums[0] + nums[1] = 2 + 7 = 9

Input: nums = [3, 2, 4], target = 6
Output: [1, 2]

Input: nums = [3, 3], target = 6
Output: [0, 1]
```

## Approach 1: Brute Force

### Algorithm
Check every pair of numbers.

```javascript
function twoSum1(nums, target) {
    for (var i = 0; i < nums.length; i++) {
        for (var j = 0; j < nums.length; j++) {
            if (i !== j && nums[i] + nums[j] === target) {
                return [i, j];
            }
        }
    }
}
```

### Dry Run
```
Input: nums = [2, 7, 11, 15], target = 9

i=0, j=0: i === j, skip
i=0, j=1: 2 + 7 = 9 === 9 ✓
Return: [0, 1]
```

### Complexity
- **Time**: O(n²) - nested loops
- **Space**: O(1) - no extra space

### Disadvantages
- Very slow for large arrays
- Checks same pairs multiple times

## Approach 2: Hash Map (Optimized) ✅

### Algorithm
1. Create a hash map to store seen numbers and their indices
2. For each number, check if `target - num` exists in map
3. If yes, return indices
4. If no, add current number to map

```javascript
function twoSum(nums, target) {
    let obj = {};
    
    for (var i = 0; i < nums.length; i++) {
        let num = nums[i];
        
        if (obj[target - num] >= 0) {
            return [obj[target - num], i];
        } else {
            obj[num] = i;
        }
    }
}
```

### Dry Run

**Example 1**: `nums = [2, 7, 11, 15], target = 9`

```
Initial: obj = {}

Iteration 0:
  num = 2
  target - num = 9 - 2 = 7
  obj[7] = undefined (not found)
  obj[2] = 0
  obj = {2: 0}

Iteration 1:
  num = 7
  target - num = 9 - 7 = 2
  obj[2] = 0 (found!) ✓
  return [0, 1]

Output: [0, 1]
```

**Example 2**: `nums = [3, 2, 4], target = 6`

```
Initial: obj = {}

Iteration 0:
  num = 3
  target - num = 6 - 3 = 3
  obj[3] = undefined
  obj[3] = 0
  obj = {3: 0}

Iteration 1:
  num = 2
  target - num = 6 - 2 = 4
  obj[4] = undefined
  obj[2] = 1
  obj = {3: 0, 2: 1}

Iteration 2:
  num = 4
  target - num = 6 - 4 = 2
  obj[2] = 1 (found!) ✓
  return [1, 2]

Output: [1, 2]
```

**Example 3**: `nums = [3, 3], target = 6`

```
Initial: obj = {}

Iteration 0:
  num = 3
  target - num = 6 - 3 = 3
  obj[3] = undefined
  obj[3] = 0
  obj = {3: 0}

Iteration 1:
  num = 3
  target - num = 6 - 3 = 3
  obj[3] = 0 (found!) ✓
  return [0, 1]

Output: [0, 1]
```

## Visual Representation

```
Array: [2, 7, 11, 15], target = 9

Step 1: Check 2
  Need: 9 - 2 = 7
  Map: {2: 0}
  Found? No

Step 2: Check 7
  Need: 9 - 7 = 2
  Map: {2: 0, 7: 1}
  Found? Yes! (index 0)
  Return: [0, 1]
```

## Why Use `obj[target - num] >= 0`?

```javascript
// ❌ Wrong
if (obj[target - num]) {
    // Fails when index is 0 (falsy)
}

// ✅ Correct
if (obj[target - num] >= 0) {
    // Works for index 0
}

// ✅ Also Correct
if (obj[target - num] !== undefined) {
    // Explicit check
}
```

## Complexity Analysis

### Time Complexity: O(n)
- Single pass through array
- Hash map lookup: O(1)
- Total: O(n)

### Space Complexity: O(n)
- Hash map stores up to n elements
- Worst case: all elements stored

## Edge Cases

### 1. Duplicate Numbers
```javascript
twoSum([3, 3], 6);
// Output: [0, 1]
// Works because we check before adding to map
```

### 2. Negative Numbers
```javascript
twoSum([-1, -2, -3, -4, -5], -8);
// Output: [2, 4]
// -3 + (-5) = -8
```

### 3. Zero
```javascript
twoSum([0, 4, 3, 0], 0);
// Output: [0, 3]
// 0 + 0 = 0
```

### 4. Large Numbers
```javascript
twoSum([1000000, 2000000, 3000000], 5000000);
// Output: [1, 2]
```

## Common Mistakes

### 1. Using Same Element Twice
```javascript
// ❌ Wrong
if (obj[target - num]) {
    return [i, i]; // Same index!
}

// ✅ Correct
if (obj[target - num] >= 0) {
    return [obj[target - num], i]; // Different indices
}
```

### 2. Not Checking Index 0
```javascript
// ❌ Wrong
if (obj[target - num]) {
    // Fails when index is 0
}

// ✅ Correct
if (obj[target - num] >= 0) {
    // Handles index 0
}
```

### 3. Adding Before Checking
```javascript
// ❌ Wrong
obj[num] = i;
if (obj[target - num] >= 0) {
    // Might use same element twice
}

// ✅ Correct
if (obj[target - num] >= 0) {
    return [obj[target - num], i];
}
obj[num] = i;
```

## Variations

### Two Sum II (Sorted Array)
Use two pointers instead of hash map.

```javascript
function twoSum(numbers, target) {
    let left = 0;
    let right = numbers.length - 1;
    
    while (left < right) {
        const sum = numbers[left] + numbers[right];
        
        if (sum === target) {
            return [left + 1, right + 1]; // 1-indexed
        } else if (sum < target) {
            left++;
        } else {
            right--;
        }
    }
}
```

### Two Sum - Count Pairs
Return count of pairs instead of indices.

```javascript
function twoSumCount(nums, target) {
    let count = 0;
    let map = new Map();
    
    for (let num of nums) {
        if (map.has(target - num)) {
            count += map.get(target - num);
        }
        map.set(num, (map.get(num) || 0) + 1);
    }
    
    return count;
}
```

## Related Problems
- Three Sum
- Four Sum
- Two Sum Less Than K
- Subarray Sum Equals K
- Two Sum BSTs

## Interview Tips

1. **Clarify requirements**:
   - Can we use same element twice? (No)
   - Is array sorted? (Usually no)
   - Multiple solutions? (Usually one)

2. **Start with brute force**:
   - Show you understand the problem
   - Then optimize

3. **Explain trade-offs**:
   - Time vs Space
   - O(n²) time, O(1) space vs O(n) time, O(n) space

4. **Test edge cases**:
   - Empty array
   - Two elements
   - Duplicates
   - Negative numbers

5. **Optimize**:
   - Hash map is optimal for unsorted array
   - Two pointers for sorted array

## Key Takeaways

✅ Hash map enables O(n) solution
✅ Check before adding to avoid using same element
✅ Use `>= 0` to handle index 0
✅ Single pass is sufficient
✅ Space-time tradeoff: O(n) space for O(n) time
