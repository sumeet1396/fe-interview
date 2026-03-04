# Sliding Window Approach

## Overview
The sliding window technique optimizes problems involving subarrays or subsequences by maintaining a window of elements and sliding it through the sequence, avoiding redundant calculations.

## Concept
Instead of recalculating the sum/property for each subarray from scratch, we:
1. Calculate for the first window
2. Slide the window by removing the leftmost element and adding the next element

## Problem: Maximum Sum of Subarray of Size K

**Input**: `arr = [2, 1, 5, 1, 3, 2]`, `k = 3`

## Algorithm

### Steps:
1. Calculate sum of first k elements
2. Slide window: subtract arr[i-k], add arr[i]
3. Track maximum sum

## Dry Run

```
Array: [2, 1, 5, 1, 3, 2]
k = 3

Step 1: Initial Window (indices 0-2)
Window: [2, 1, 5]
currentSum = 2 + 1 + 5 = 8
maxSum = 8

Step 2: Slide to indices 1-3
Remove arr[0] = 2, Add arr[3] = 1
Window: [1, 5, 1]
currentSum = 8 - 2 + 1 = 7
maxSum = max(8, 7) = 8

Step 3: Slide to indices 2-4
Remove arr[1] = 1, Add arr[4] = 3
Window: [5, 1, 3]
currentSum = 7 - 1 + 3 = 9
maxSum = max(8, 9) = 9

Step 4: Slide to indices 3-5
Remove arr[2] = 5, Add arr[5] = 2
Window: [1, 3, 2]
currentSum = 9 - 5 + 2 = 6
maxSum = max(9, 6) = 9

Final Answer: 9
```

## Visual Representation

```
[2, 1, 5, 1, 3, 2]
 -------            Window 1: sum = 8
    -------         Window 2: sum = 7
       -------      Window 3: sum = 9 ✓
          -------   Window 4: sum = 6
```

## Time Complexity
- **O(n)**: Single pass through array
- **Without sliding window**: O(n*k) - recalculating each window

## Space Complexity
- **O(1)**: Only storing sum variables

## Types of Sliding Window

### 1. **Fixed Size Window**
- Window size is constant (k)
- Example: Maximum sum of k consecutive elements

### 2. **Variable Size Window**
- Window size changes based on condition
- Example: Longest substring without repeating characters

## Use Cases

### Fixed Window:
- Maximum/minimum sum of k consecutive elements
- Average of subarrays of size k
- First negative in every window of size k

### Variable Window:
- Longest substring with k distinct characters
- Minimum window substring
- Longest substring without repeating characters
- Fruits into baskets

## Key Patterns

```javascript
// Fixed Size Window Template
function fixedWindow(arr, k) {
    let windowSum = 0;
    let maxSum = 0;
    
    // First window
    for (let i = 0; i < k; i++) {
        windowSum += arr[i];
    }
    maxSum = windowSum;
    
    // Slide window
    for (let i = k; i < arr.length; i++) {
        windowSum = windowSum - arr[i-k] + arr[i];
        maxSum = Math.max(maxSum, windowSum);
    }
    
    return maxSum;
}

// Variable Size Window Template
function variableWindow(arr, target) {
    let left = 0;
    let windowSum = 0;
    let result = 0;
    
    for (let right = 0; right < arr.length; right++) {
        windowSum += arr[right];
        
        while (windowSum > target) {
            windowSum -= arr[left];
            left++;
        }
        
        result = Math.max(result, right - left + 1);
    }
    
    return result;
}
```

## Advantages
- Reduces time complexity from O(n*k) to O(n)
- Efficient for contiguous subarray problems
- Easy to implement once pattern is understood

## Common Problems
- Maximum Sum Subarray of Size K
- Longest Substring with K Distinct Characters
- Minimum Window Substring
- Permutation in String
- Sliding Window Maximum
