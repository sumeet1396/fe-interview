# Algorithmic Approaches Documentation

This folder contains detailed explanations of common algorithmic approaches used in problem-solving.

## 📚 Contents

### 1. [Backtracking](./backtracking.md)
- **Concept**: Recursive approach that tries solutions and backtracks on failure
- **Problem**: N-Queens
- **Time Complexity**: O(N!)
- **Use Cases**: Sudoku, maze solving, permutations, constraint satisfaction

### 2. [Prefix Sum](./prefix-sum.md)
- **Concept**: Preprocessing technique for efficient range sum queries
- **Time Complexity**: O(n) preprocessing, O(1) queries
- **Use Cases**: Range sum queries, subarray problems, equilibrium index

### 3. [Sliding Window](./sliding-window.md)
- **Concept**: Maintain a window of elements and slide through array
- **Problem**: Maximum sum of subarray of size K
- **Time Complexity**: O(n)
- **Types**: Fixed size, variable size
- **Use Cases**: Maximum/minimum in subarrays, longest substring problems

### 4. [Two Pointer](./two-pointer.md)
- **Concept**: Use two pointers to traverse data structure
- **Problem**: Reverse array, two sum in sorted array
- **Time Complexity**: O(n)
- **Patterns**: Opposite direction, same direction
- **Use Cases**: Pair finding, palindrome check, array manipulation

## 🎯 Quick Reference

| Approach | Best For | Time | Space |
|----------|----------|------|-------|
| Backtracking | Constraint satisfaction, permutations | O(N!) | O(N) |
| Prefix Sum | Range queries, subarray sums | O(n) | O(n) |
| Sliding Window | Contiguous subarray problems | O(n) | O(1) |
| Two Pointer | Sorted array problems, pairs | O(n) | O(1) |

## 🔍 When to Use What?

### Use Backtracking when:
- Need to explore all possible solutions
- Problem has constraints to satisfy
- Can prune invalid paths early

### Use Prefix Sum when:
- Multiple range sum queries
- Subarray sum problems
- Array is static (no updates)

### Use Sliding Window when:
- Problem involves contiguous subarrays
- Need to find max/min in subarrays
- Can maintain window property efficiently

### Use Two Pointer when:
- Array is sorted
- Need to find pairs with specific property
- Comparing elements from different positions

## 📖 Learning Path

1. **Start with**: Two Pointer (easiest to understand)
2. **Then learn**: Sliding Window (builds on two pointer)
3. **Next**: Prefix Sum (preprocessing technique)
4. **Finally**: Backtracking (most complex)

## 💡 Tips

- Practice identifying which approach fits the problem
- Understand the trade-offs (time vs space)
- Learn to recognize patterns in problem statements
- Combine approaches when needed (e.g., sliding window + hash map)

## 🔗 Related Topics

- Dynamic Programming
- Greedy Algorithms
- Divide and Conquer
- Binary Search
- Graph Algorithms
