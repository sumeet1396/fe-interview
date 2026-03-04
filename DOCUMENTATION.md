# Frontend Interview Preparation - Complete Documentation

Comprehensive documentation for JavaScript algorithms, data structures, interview questions, and LeetCode problems with detailed explanations, dry runs, and real-world applications.

## 📁 Folder Structure

```
frontend/
├── Approaches/              # Algorithmic approaches
├── Data-Structure/          # Data structure implementations
├── interview-questions/     # JavaScript interview questions
└── Logical/                 # LeetCode problem solutions
```

## 🎯 Quick Navigation

### [Approaches](./Approaches/README.md)
Algorithmic techniques and problem-solving patterns.

- **[Backtracking](./Approaches/backtracking.md)** - N-Queens, constraint satisfaction
- **[Prefix Sum](./Approaches/prefix-sum.md)** - Range queries, subarray sums
- **[Sliding Window](./Approaches/sliding-window.md)** - Contiguous subarray problems
- **[Two Pointer](./Approaches/two-pointer.md)** - Sorted array problems, pairs

### [Data-Structure](./Data-Structure/README.md)
Custom implementations of fundamental data structures.

- **[Array](./Data-Structure/array/array.md)** - Custom array using objects
- **[Hash Table](./Data-Structure/hashtable/hashTable.md)** - Hash map with collision handling
- **[Linked List](./Data-Structure/linkedlist/linkedList.md)** - Singly linked list
- **[Doubly Linked List](./Data-Structure/linkedlist/doubleLinkedList.md)** - Bidirectional list
- **[Stack](./Data-Structure/stack/stack.md)** - LIFO structure
- **[Queue](./Data-Structure/queue/queue.md)** - FIFO structure
- **[Binary Search Tree](./Data-Structure/trees/trees.md)** - Ordered tree structure

### [Interview Questions](./interview-questions/README.md)
Common JavaScript interview questions with implementations.

**Performance Optimization:**
- **[Debounce](./interview-questions/01-debounce.md)** - Delay execution until inactivity
- **[Throttle](./interview-questions/02-throttle.md)** - Limit execution frequency

**Functional Programming:**
- **[Currying](./interview-questions/03-currying.md)** - Transform multi-arg functions
- **[Currying with Placeholder](./interview-questions/04-currying-placeholder.md)** - Advanced currying
- **[Pipe Function](./interview-questions/07-pipe-function.md)** - Function composition

**Data Manipulation:**
- **[Deep Flatten](./interview-questions/05-deep-flat.md)** - Flatten nested structures
- **[Negative Indexing](./interview-questions/06-negative-indexing-array.md)** - Python-style indexing

**Promises & Async:**
- **[Auto Retry Promise](./interview-questions/08-auto-retry-promise.md)** - Retry failed promises
- **[Promise.all Polyfill](./interview-questions/09-promise-all-polyfill.md)** - Parallel execution
- **[Promise.allSettled](./interview-questions/10-promise-all-settled.md)** - Wait for all
- **[Promise.any](./interview-questions/11-promise-any.md)** - First success
- **[Promise.race](./interview-questions/12-promise-race.md)** - First to finish

### [Logical Problems](./Logical/README.md)
LeetCode problem solutions with detailed explanations.

**Easy:**
- **[Two Sum](./Logical/01-two-sums.md)** - Hash map pattern
- **[Valid Anagram](./Logical/week1/04-validAnagram.md)** - Frequency counting
- Contains Duplicate, Valid Parentheses, Best Time to Buy Stock

**Medium:**
- Group Anagrams, Product of Array Except Self
- Top K Frequent Elements, Three Sum
- Maximum Subarray, Rotate Array

## 📊 Learning Paths

### Path 1: Data Structures First (Recommended for Beginners)
```
Week 1: Array → Linked List → Stack → Queue
Week 2: Hash Table → Trees
Week 3: Practice problems using these structures
Week 4: Learn algorithmic approaches
```

### Path 2: Problem-Solving First (For Quick Interview Prep)
```
Week 1: Easy LeetCode problems (Two Sum, Valid Anagram)
Week 2: Learn patterns (Hash Map, Two Pointer)
Week 3: Medium problems + Data structures
Week 4: JavaScript interview questions
```

### Path 3: Comprehensive (For Deep Understanding)
```
Week 1: Data Structures (Array, Linked List, Hash Table)
Week 2: Algorithmic Approaches (Two Pointer, Sliding Window)
Week 3: Easy + Medium LeetCode problems
Week 4: JavaScript interview questions (Debounce, Promises)
Week 5-6: Advanced topics + Mock interviews
```

## 🎯 Interview Preparation Checklist

### Data Structures (Must Know)
- [ ] Array operations and complexity
- [ ] Hash Table implementation and use cases
- [ ] Linked List (insert, delete, reverse)
- [ ] Stack (LIFO, use cases)
- [ ] Queue (FIFO, use cases)
- [ ] Trees (BST, traversals)

### Algorithms (Must Know)
- [ ] Two Pointer technique
- [ ] Sliding Window
- [ ] Hash Map pattern
- [ ] Prefix Sum
- [ ] Backtracking basics

### JavaScript Concepts (Must Know)
- [ ] Debounce vs Throttle
- [ ] Currying and partial application
- [ ] Promise methods (all, allSettled, any, race)
- [ ] Closures and scope
- [ ] Event loop and async/await

### LeetCode Problems (Must Solve)
- [ ] Two Sum ⭐
- [ ] Valid Parentheses ⭐
- [ ] Valid Anagram ⭐
- [ ] Best Time to Buy Stock ⭐
- [ ] Group Anagrams ⭐
- [ ] Product of Array Except Self ⭐
- [ ] Maximum Subarray ⭐
- [ ] Three Sum ⭐

## 📈 Complexity Quick Reference

### Time Complexity
| Notation | Name | Example |
|----------|------|---------|
| O(1) | Constant | Array access, hash lookup |
| O(log n) | Logarithmic | Binary search |
| O(n) | Linear | Single loop, two pointers |
| O(n log n) | Linearithmic | Merge sort, quick sort |
| O(n²) | Quadratic | Nested loops |
| O(2ⁿ) | Exponential | Recursive fibonacci |

### Space Complexity
| Notation | Example |
|----------|---------|
| O(1) | Few variables |
| O(n) | Array, hash map |
| O(log n) | Recursion (balanced tree) |
| O(n) | Recursion (worst case) |

## 🔍 Pattern Recognition Guide

### When you see...

**"Find pair/triplet that sums to target"**
→ Use Hash Map or Two Pointer

**"Maximum/minimum in subarray of size k"**
→ Use Sliding Window

**"Range sum queries"**
→ Use Prefix Sum

**"All possible combinations/permutations"**
→ Use Backtracking

**"Matching pairs (parentheses, brackets)"**
→ Use Stack

**"First in, first out"**
→ Use Queue

**"Last in, first out"**
→ Use Stack

**"Fast lookups by key"**
→ Use Hash Table

**"Sorted array, find pair"**
→ Use Two Pointer

## 💡 Interview Tips

### Before the Interview
1. **Practice consistently** (2-3 problems daily)
2. **Focus on patterns** over memorization
3. **Time yourself** (30-45 min per problem)
4. **Review mistakes** and understand why
5. **Mock interviews** with peers

### During the Interview
1. **Clarify requirements** (constraints, edge cases)
2. **Think out loud** (communicate your thought process)
3. **Start with brute force** (then optimize)
4. **Test your code** (walk through examples)
5. **Discuss trade-offs** (time vs space)

### Common Mistakes to Avoid
- ❌ Not asking clarifying questions
- ❌ Jumping to code immediately
- ❌ Not testing edge cases
- ❌ Poor variable naming
- ❌ Not discussing complexity
- ❌ Giving up too quickly

## 🎓 Study Schedule (4 Weeks)

### Week 1: Foundations
- **Mon-Tue**: Array, Hash Table
- **Wed-Thu**: Linked List, Stack, Queue
- **Fri**: Trees basics
- **Sat-Sun**: Practice easy problems

### Week 2: Patterns
- **Mon-Tue**: Two Pointer, Sliding Window
- **Wed-Thu**: Hash Map pattern, Prefix Sum
- **Fri**: Backtracking basics
- **Sat-Sun**: Practice medium problems

### Week 3: JavaScript
- **Mon-Tue**: Debounce, Throttle
- **Wed-Thu**: Currying, Pipe
- **Fri**: Promise polyfills
- **Sat-Sun**: Mixed practice

### Week 4: Integration
- **Mon-Wed**: Solve 2-3 problems daily
- **Thu-Fri**: Mock interviews
- **Sat-Sun**: Review weak areas

## 📚 Additional Resources

### Online Platforms
- **LeetCode** - Problem practice
- **NeetCode** - Video explanations
- **JavaScript.info** - JS concepts
- **Frontend Masters** - Deep dives

### Books
- "Cracking the Coding Interview" - Gayle McDowell
- "JavaScript: The Good Parts" - Douglas Crockford
- "Eloquent JavaScript" - Marijn Haverbeke

### YouTube Channels
- NeetCode
- Tech Interview Pro
- Clément Mihailescu

## 🎯 Success Metrics

Track your progress:
- [ ] Solved 50+ easy problems
- [ ] Solved 30+ medium problems
- [ ] Can explain all data structures
- [ ] Can identify patterns quickly
- [ ] Comfortable with JavaScript concepts
- [ ] Completed 5+ mock interviews

## 🚀 Next Steps

1. **Choose a learning path** based on your timeline
2. **Set daily goals** (e.g., 2 problems/day)
3. **Track progress** in a spreadsheet
4. **Join study groups** for accountability
5. **Schedule mock interviews** regularly
6. **Review this documentation** before interviews

## 📞 Quick Links

- [Approaches README](./Approaches/README.md)
- [Data Structures README](./Data-Structure/README.md)
- [Interview Questions README](./interview-questions/README.md)
- [Logical Problems README](./Logical/README.md)

---

**Good luck with your interview preparation! 🎉**

Remember: Consistency beats intensity. Practice daily, learn from mistakes, and stay confident!
