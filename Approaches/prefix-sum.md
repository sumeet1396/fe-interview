# Prefix Sum Approach

## Overview
Prefix Sum is a preprocessing technique that creates an array where each element at index `i` contains the sum of all elements from index 0 to i in the original array.

## Concept
```
Original Array:  [10, 20, 10, 5, 15]
Prefix Sum:      [10, 30, 40, 45, 60]
```

## Algorithm

### Steps:
1. Initialize a new array `prefixSumArr`
2. Set `prefixSumArr[0] = arr[0]` (first element remains same)
3. For each subsequent element: `prefixSumArr[i] = arr[i] + prefixSumArr[i-1]`

## Dry Run

**Input**: `[10, 20, 10, 5, 15]`

```
Iteration 0:
prefixSumArr[0] = arr[0] = 10
Result: [10]

Iteration 1:
prefixSumArr[1] = arr[1] + prefixSumArr[0]
                = 20 + 10 = 30
Result: [10, 30]

Iteration 2:
prefixSumArr[2] = arr[2] + prefixSumArr[1]
                = 10 + 30 = 40
Result: [10, 30, 40]

Iteration 3:
prefixSumArr[3] = arr[3] + prefixSumArr[2]
                = 5 + 40 = 45
Result: [10, 30, 40, 45]

Iteration 4:
prefixSumArr[4] = arr[4] + prefixSumArr[3]
                = 15 + 45 = 60
Result: [10, 30, 40, 45, 60]
```

## Time Complexity
- **O(n)**: Single pass through the array

## Space Complexity
- **O(n)**: Additional array to store prefix sums

## Use Cases

### 1. **Range Sum Queries**
Find sum of elements between indices L and R in O(1) time:
```javascript
sum(L, R) = prefixSum[R] - prefixSum[L-1]
```

### 2. **Subarray Sum Problems**
- Find subarrays with given sum
- Count subarrays with sum equal to K

### 3. **Equilibrium Index**
Find index where left sum equals right sum

### 4. **2D Matrix Sum Queries**
Extended to 2D prefix sums for matrix range queries

## Advantages
- Converts O(n) range sum queries to O(1)
- Efficient for multiple queries on static arrays
- Simple to implement and understand

## Example Problems
- Subarray Sum Equals K
- Contiguous Array
- Range Sum Query - Immutable
- Product of Array Except Self (variation)
