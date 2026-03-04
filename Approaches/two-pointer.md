# Two Pointer Approach

## Overview
The Two Pointer technique uses two pointers to traverse a data structure (usually an array) from different positions or at different speeds to solve problems efficiently.

## Common Patterns

### 1. **Opposite Direction** (Most Common)
- One pointer starts at the beginning
- Other pointer starts at the end
- Move towards each other

### 2. **Same Direction**
- Both pointers start at the beginning
- Move at different speeds (fast and slow)

## Problem: Reverse an Array

**Input**: `[4, 2, 6, 12, 64, 32]`

## Algorithm

### Steps:
1. Initialize `left = 0` and `right = array.length - 1`
2. While `left < right`:
   - Swap elements at left and right
   - Increment left
   - Decrement right

## Dry Run

```
Array: [4, 2, 6, 12, 64, 32]

Initial State:
left = 0, right = 5
[4, 2, 6, 12, 64, 32]
 ↑               ↑
left           right

Step 1: Swap arr[0] and arr[5]
[32, 2, 6, 12, 64, 4]
    ↑          ↑
   left      right

Step 2: Swap arr[1] and arr[4]
[32, 64, 6, 12, 2, 4]
        ↑   ↑
      left right

Step 3: Swap arr[2] and arr[3]
[32, 64, 12, 6, 2, 4]
           ↑
      left/right overlap

Result: [32, 64, 12, 6, 2, 4]
```

## Swap Without Temp Variable

The code uses arithmetic operations to swap:
```javascript
arr[left] = arr[left] + arr[right];   // left now holds sum
arr[right] = arr[left] - arr[right];  // right gets original left value
arr[left] = arr[left] - arr[right];   // left gets original right value
```

**Example**: Swap 4 and 32
```
left = 4, right = 32

arr[left] = 4 + 32 = 36
arr[right] = 36 - 32 = 4
arr[left] = 36 - 4 = 32

Result: left = 32, right = 4
```

## Time Complexity
- **O(n)**: Each element is visited once

## Space Complexity
- **O(1)**: In-place swapping, no extra space

## Common Use Cases

### 1. **Two Sum (Sorted Array)**
```javascript
function twoSum(arr, target) {
    let left = 0, right = arr.length - 1;
    
    while (left < right) {
        const sum = arr[left] + arr[right];
        if (sum === target) return [left, right];
        else if (sum < target) left++;
        else right--;
    }
    return [-1, -1];
}
```

### 2. **Remove Duplicates from Sorted Array**
```javascript
function removeDuplicates(nums) {
    let i = 0;
    for (let j = 1; j < nums.length; j++) {
        if (nums[i] !== nums[j]) {
            i++;
            nums[i] = nums[j];
        }
    }
    return i + 1;
}
```

### 3. **Container With Most Water**
```javascript
function maxArea(height) {
    let left = 0, right = height.length - 1;
    let maxWater = 0;
    
    while (left < right) {
        const width = right - left;
        const h = Math.min(height[left], height[right]);
        maxWater = Math.max(maxWater, width * h);
        
        if (height[left] < height[right]) left++;
        else right--;
    }
    return maxWater;
}
```

### 4. **Palindrome Check**
```javascript
function isPalindrome(s) {
    let left = 0, right = s.length - 1;
    
    while (left < right) {
        if (s[left] !== s[right]) return false;
        left++;
        right--;
    }
    return true;
}
```

### 5. **Three Sum**
```javascript
function threeSum(nums) {
    nums.sort((a, b) => a - b);
    const result = [];
    
    for (let i = 0; i < nums.length - 2; i++) {
        if (i > 0 && nums[i] === nums[i-1]) continue;
        
        let left = i + 1, right = nums.length - 1;
        
        while (left < right) {
            const sum = nums[i] + nums[left] + nums[right];
            if (sum === 0) {
                result.push([nums[i], nums[left], nums[right]]);
                left++;
                right--;
            } else if (sum < 0) left++;
            else right--;
        }
    }
    return result;
}
```

## When to Use Two Pointers

✅ **Use when:**
- Array/string is sorted
- Need to find pairs with specific properties
- Need to reverse or rearrange elements
- Comparing elements from both ends
- Partitioning problems

❌ **Don't use when:**
- Array is unsorted (unless sorting is allowed)
- Need to track multiple elements simultaneously
- Problem requires random access

## Advantages
- Reduces time complexity from O(n²) to O(n)
- Space efficient (O(1) extra space)
- Simple and intuitive once pattern is recognized

## Common Problems
- Two Sum II (sorted array)
- Three Sum
- Container With Most Water
- Trapping Rain Water
- Remove Duplicates from Sorted Array
- Valid Palindrome
- Reverse String
- Sort Colors (Dutch National Flag)
