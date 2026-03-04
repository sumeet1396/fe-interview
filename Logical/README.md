# LeetCode Problems Documentation

This folder contains solutions and detailed explanations for common LeetCode problems.

## 📚 Contents

### Array Problems

#### 1. [Two Sum](./01-two-sums.md) - Easy
- **Problem**: Find two numbers that add up to target
- **Approach**: Hash map for O(n) solution
- **Time**: O(n), Space: O(n)
- **Pattern**: Hash map lookup

#### 2. Remove Duplicates from Sorted Array - Easy
- **Problem**: Remove duplicates in-place
- **Approach**: Two pointers
- **Time**: O(n), Space: O(1)
- **Pattern**: Two pointer, in-place modification

#### 3. Rotate Array - Medium
- **Problem**: Rotate array by k positions
- **Approach**: Reverse subarrays
- **Time**: O(n), Space: O(1)
- **Pattern**: Array manipulation

#### 4. Missing Number - Easy
- **Problem**: Find missing number in sequence
- **Approach**: Math formula (sum)
- **Time**: O(n), Space: O(1)
- **Pattern**: Mathematical approach

#### 5. Contains Duplicate - Easy
- **Problem**: Check if array has duplicates
- **Approach**: Hash set
- **Time**: O(n), Space: O(n)
- **Pattern**: Hash set for uniqueness

### String Problems

#### 6. [Valid Anagram](./week1/04-validAnagram.md) - Easy
- **Problem**: Check if two strings are anagrams
- **Approach**: Frequency map
- **Time**: O(n), Space: O(1)
- **Pattern**: Character frequency counting

#### 7. Valid Parentheses - Easy
- **Problem**: Check if brackets are balanced
- **Approach**: Stack
- **Time**: O(n), Space: O(n)
- **Pattern**: Stack for matching pairs

#### 8. Group Anagrams - Medium
- **Problem**: Group strings that are anagrams
- **Approach**: Hash map with sorted key
- **Time**: O(n * k log k), Space: O(n)
- **Pattern**: Hash map grouping

### Array - Advanced

#### 9. Product of Array Except Self - Medium
- **Problem**: Product of all elements except self
- **Approach**: Prefix and suffix products
- **Time**: O(n), Space: O(1)
- **Pattern**: Prefix/suffix technique

#### 10. Top K Frequent Elements - Medium
- **Problem**: Find k most frequent elements
- **Approach**: Hash map + sorting
- **Time**: O(n log n), Space: O(n)
- **Pattern**: Frequency counting + sorting

#### 11. Three Sum - Medium
- **Problem**: Find triplets that sum to zero
- **Approach**: Sort + two pointers
- **Time**: O(n²), Space: O(1)
- **Pattern**: Two pointer on sorted array

#### 12. Maximum Subarray - Medium
- **Problem**: Find contiguous subarray with max sum
- **Approach**: Kadane's algorithm
- **Time**: O(n), Space: O(1)
- **Pattern**: Dynamic programming

#### 13. Best Time to Buy and Sell Stock - Easy
- **Problem**: Maximize profit from stock prices
- **Approach**: Track minimum and max profit
- **Time**: O(n), Space: O(1)
- **Pattern**: Greedy approach

## 🎯 Problem Categories

### By Data Structure

#### Arrays (Most Common)
- Two Sum
- Remove Duplicates
- Rotate Array
- Product Except Self
- Maximum Subarray

#### Hash Tables
- Two Sum
- Group Anagrams
- Top K Frequent
- Contains Duplicate

#### Stacks
- Valid Parentheses

#### Two Pointers
- Remove Duplicates
- Three Sum
- Two Sum II

### By Difficulty

#### Easy (Good for Beginners)
- Two Sum ⭐
- Contains Duplicate
- Valid Anagram ⭐
- Valid Parentheses ⭐
- Best Time to Buy Stock ⭐
- Missing Number

#### Medium (Interview Focus)
- Group Anagrams ⭐
- Product of Array Except Self ⭐
- Top K Frequent Elements
- Three Sum ⭐
- Maximum Subarray ⭐
- Rotate Array

## 📊 Pattern Recognition

### 1. Hash Map Pattern
**When to use**: Need O(1) lookups, counting frequencies

**Problems**:
- Two Sum
- Group Anagrams
- Contains Duplicate
- Top K Frequent

**Template**:
```javascript
const map = {};
for (let item of array) {
    map[item] = (map[item] || 0) + 1;
}
```

### 2. Two Pointer Pattern
**When to use**: Sorted array, finding pairs

**Problems**:
- Remove Duplicates
- Three Sum
- Two Sum II

**Template**:
```javascript
let left = 0, right = arr.length - 1;
while (left < right) {
    // Process
    if (condition) left++;
    else right--;
}
```

### 3. Sliding Window Pattern
**When to use**: Contiguous subarray problems

**Problems**:
- Maximum Subarray

**Template**:
```javascript
let windowSum = 0;
for (let i = 0; i < arr.length; i++) {
    windowSum += arr[i];
    if (i >= k) windowSum -= arr[i - k];
}
```

### 4. Prefix/Suffix Pattern
**When to use**: Need product/sum of elements before/after

**Problems**:
- Product of Array Except Self

**Template**:
```javascript
const prefix = [];
for (let i = 0; i < arr.length; i++) {
    prefix[i] = (prefix[i-1] || 1) * arr[i];
}
```

### 5. Stack Pattern
**When to use**: Matching pairs, nested structures

**Problems**:
- Valid Parentheses

**Template**:
```javascript
const stack = [];
for (let char of string) {
    if (isOpening(char)) stack.push(char);
    else if (matches(stack[stack.length-1], char)) stack.pop();
}
```

## 🎓 Study Plan

### Week 1: Easy Problems (Foundation)
- Day 1-2: Two Sum, Contains Duplicate
- Day 3-4: Valid Anagram, Valid Parentheses
- Day 5-6: Best Time to Buy Stock, Missing Number
- Day 7: Review and practice

### Week 2: Medium Problems (Core)
- Day 1-2: Group Anagrams, Product Except Self
- Day 3-4: Top K Frequent, Maximum Subarray
- Day 5-6: Three Sum, Rotate Array
- Day 7: Review and practice

### Week 3: Advanced Techniques
- Day 1-2: Two pointer problems
- Day 3-4: Sliding window problems
- Day 5-6: Prefix/suffix problems
- Day 7: Mock interviews

## 💡 Problem-Solving Strategy

### 1. Understand the Problem
- Read carefully
- Identify inputs/outputs
- Check constraints
- Ask clarifying questions

### 2. Plan the Approach
- Identify pattern (hash map, two pointer, etc.)
- Think of brute force first
- Optimize time/space complexity
- Consider edge cases

### 3. Implement
- Write clean code
- Use meaningful variable names
- Add comments for complex logic
- Handle edge cases

### 4. Test
- Test with examples
- Test edge cases (empty, single element, duplicates)
- Trace through code
- Check time/space complexity

### 5. Optimize
- Can we do better?
- Trade-offs (time vs space)
- Alternative approaches

## 🔍 Common Patterns Summary

| Pattern | Time | Space | When to Use |
|---------|------|-------|-------------|
| Hash Map | O(n) | O(n) | Lookups, counting |
| Two Pointer | O(n) | O(1) | Sorted array, pairs |
| Sliding Window | O(n) | O(1) | Contiguous subarray |
| Prefix/Suffix | O(n) | O(n) | Range queries |
| Stack | O(n) | O(n) | Matching, nesting |
| Sorting | O(n log n) | O(1) | Order matters |

## 📈 Complexity Cheat Sheet

### Time Complexity
- O(1): Hash map lookup, array access
- O(log n): Binary search
- O(n): Single loop, two pointers
- O(n log n): Sorting
- O(n²): Nested loops
- O(2ⁿ): Recursion with branching

### Space Complexity
- O(1): Few variables
- O(n): Hash map, array
- O(log n): Recursion stack (balanced tree)
- O(n): Recursion stack (worst case)

## 🎯 Interview Tips

### Before Interview
1. Practice 2-3 problems daily
2. Focus on patterns, not memorization
3. Time yourself (30-45 min per problem)
4. Practice explaining your approach

### During Interview
1. **Clarify**: Ask about constraints, edge cases
2. **Communicate**: Think out loud
3. **Start Simple**: Brute force first, then optimize
4. **Test**: Walk through examples
5. **Optimize**: Discuss trade-offs

### Common Mistakes
- Not clarifying requirements
- Jumping to code too quickly
- Not testing edge cases
- Poor variable naming
- Not discussing complexity

## 🔗 Related Resources

### Practice Platforms
- LeetCode (primary)
- HackerRank
- CodeSignal
- AlgoExpert

### Learning Resources
- NeetCode (video explanations)
- LeetCode Discuss (solutions)
- Blind 75 (curated list)
- Grind 75 (study plan)

## 📝 Must-Know Problems (Top 10)

1. ⭐ Two Sum (Hash Map)
2. ⭐ Valid Parentheses (Stack)
3. ⭐ Best Time to Buy Stock (Greedy)
4. ⭐ Valid Anagram (Hash Map)
5. ⭐ Group Anagrams (Hash Map)
6. ⭐ Product Except Self (Prefix/Suffix)
7. ⭐ Maximum Subarray (Kadane's)
8. ⭐ Three Sum (Two Pointer)
9. ⭐ Contains Duplicate (Hash Set)
10. ⭐ Top K Frequent (Hash Map + Sort)

## 🎖️ Difficulty Progression

```
Easy → Medium → Hard
  ↓       ↓       ↓
Basic → Patterns → Complex
```

Start with Easy, master patterns, then tackle Medium problems. Hard problems combine multiple patterns.
