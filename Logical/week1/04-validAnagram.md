# Valid Anagram Problem

## Problem Statement
Given two strings `s` and `t`, return `true` if `t` is an anagram of `s`, and `false` otherwise.

**Anagram**: A word formed by rearranging the letters of another word, using all original letters exactly once.

## Examples

```javascript
Input: s = "anagram", t = "nagaram"
Output: true

Input: s = "rat", t = "car"
Output: false

Input: s = "aacc", t = "ccac"
Output: false
```

## Approach 1: String Manipulation (Naive)

### Algorithm
1. Check if lengths are equal
2. For each character in `s`, check if it exists in `t`
3. Remove matched character from `t`
4. Compare final string with original `s`

```javascript
var isAnagram = function(s, t) {
    if (s.length !== t.length) return false;
    
    let str = '';
    for (let i = 0; i < s.length; i++) {
        if (t.includes(s[i])) {
            str += s[i];
            t = t.replace(s[i], '');
        }
    }
    
    return s === str;
}
```

### Dry Run

**Example 1**: `s = "anagram", t = "nagaram"`

```
Initial: str = '', t = 'nagaram'

i=0: s[0] = 'a'
  t.includes('a') = true
  str = 'a'
  t = 'nagram' (removed first 'a')

i=1: s[1] = 'n'
  t.includes('n') = true
  str = 'an'
  t = 'agram'

i=2: s[2] = 'a'
  t.includes('a') = true
  str = 'ana'
  t = 'gram'

i=3: s[3] = 'g'
  t.includes('g') = true
  str = 'anag'
  t = 'ram'

i=4: s[4] = 'r'
  t.includes('r') = true
  str = 'anagr'
  t = 'am'

i=5: s[5] = 'a'
  t.includes('a') = true
  str = 'anagra'
  t = 'm'

i=6: s[6] = 'm'
  t.includes('m') = true
  str = 'anagram'
  t = ''

s === str → 'anagram' === 'anagram' ✓
Return: true
```

**Example 2**: `s = "rat", t = "car"`

```
Initial: str = '', t = 'car'

i=0: s[0] = 'r'
  t.includes('r') = true
  str = 'r'
  t = 'ca'

i=1: s[1] = 'a'
  t.includes('a') = true
  str = 'ra'
  t = 'c'

i=2: s[2] = 't'
  t.includes('t') = false
  str = 'ra' (unchanged)

s === str → 'rat' === 'ra' ✗
Return: false
```

### Complexity
- **Time**: O(n²) - includes() and replace() are O(n)
- **Space**: O(n) - storing str

### Issues
- Inefficient for large strings
- Multiple string operations

## Approach 2: Hash Map (Optimized) ✅

### Algorithm
1. Check if lengths are equal
2. Create frequency maps for both strings
3. Compare frequency maps

```javascript
var isAnagram2 = function(s, t) {
    if (t.length !== s.length) return false;
    
    let obj1 = {};
    let obj2 = {};
    
    for (let i = 0; i < s.length; i++) {
        obj1[s[i]] = (obj1[s[i]] || 0) + 1;
        obj2[t[i]] = (obj2[t[i]] || 0) + 1;
    }
    
    for (const key in obj1) {
        if (obj1[key] !== obj2[key]) return false;
    }
    
    return true;
};
```

### Dry Run

**Example 1**: `s = "anagram", t = "nagaram"`

```
Step 1: Length check
  s.length = 7, t.length = 7 ✓

Step 2: Build frequency maps
  obj1 = {}, obj2 = {}
  
  i=0: s[0]='a', t[0]='n'
    obj1 = {a: 1}
    obj2 = {n: 1}
  
  i=1: s[1]='n', t[1]='a'
    obj1 = {a: 1, n: 1}
    obj2 = {n: 1, a: 1}
  
  i=2: s[2]='a', t[2]='g'
    obj1 = {a: 2, n: 1}
    obj2 = {n: 1, a: 1, g: 1}
  
  i=3: s[3]='g', t[3]='a'
    obj1 = {a: 2, n: 1, g: 1}
    obj2 = {n: 1, a: 2, g: 1}
  
  i=4: s[4]='r', t[4]='r'
    obj1 = {a: 2, n: 1, g: 1, r: 1}
    obj2 = {n: 1, a: 2, g: 1, r: 1}
  
  i=5: s[5]='a', t[5]='a'
    obj1 = {a: 3, n: 1, g: 1, r: 1}
    obj2 = {n: 1, a: 3, g: 1, r: 1}
  
  i=6: s[6]='m', t[6]='m'
    obj1 = {a: 3, n: 1, g: 1, r: 1, m: 1}
    obj2 = {n: 1, a: 3, g: 1, r: 1, m: 1}

Step 3: Compare frequencies
  key='a': obj1[a]=3, obj2[a]=3 ✓
  key='n': obj1[n]=1, obj2[n]=1 ✓
  key='g': obj1[g]=1, obj2[g]=1 ✓
  key='r': obj1[r]=1, obj2[r]=1 ✓
  key='m': obj1[m]=1, obj2[m]=1 ✓

Return: true
```

**Example 2**: `s = "rat", t = "car"`

```
Step 1: Length check
  s.length = 3, t.length = 3 ✓

Step 2: Build frequency maps
  i=0: s[0]='r', t[0]='c'
    obj1 = {r: 1}
    obj2 = {c: 1}
  
  i=1: s[1]='a', t[1]='a'
    obj1 = {r: 1, a: 1}
    obj2 = {c: 1, a: 1}
  
  i=2: s[2]='t', t[2]='r'
    obj1 = {r: 1, a: 1, t: 1}
    obj2 = {c: 1, a: 1, r: 1}

Step 3: Compare frequencies
  key='r': obj1[r]=1, obj2[r]=1 ✓
  key='a': obj1[a]=1, obj2[a]=1 ✓
  key='t': obj1[t]=1, obj2[t]=undefined ✗

Return: false
```

**Example 3**: `s = "aacc", t = "ccac"`

```
Step 1: Length check
  s.length = 4, t.length = 4 ✓

Step 2: Build frequency maps
  Final:
    obj1 = {a: 2, c: 2}
    obj2 = {c: 2, a: 1}

Step 3: Compare frequencies
  key='a': obj1[a]=2, obj2[a]=1 ✗

Return: false
```

## Visual Representation

```
s = "anagram"
t = "nagaram"

Frequency Count:
s: a→3, n→1, g→1, r→1, m→1
t: n→1, a→3, g→1, r→1, m→1

Compare: All frequencies match ✓
Result: true
```

## Approach 3: Sorting

### Algorithm
Sort both strings and compare.

```javascript
var isAnagram3 = function(s, t) {
    if (s.length !== t.length) return false;
    
    return s.split('').sort().join('') === 
           t.split('').sort().join('');
};
```

### Complexity
- **Time**: O(n log n) - sorting
- **Space**: O(n) - creating arrays

## Complexity Comparison

| Approach | Time | Space | Best For |
|----------|------|-------|----------|
| String Manipulation | O(n²) | O(n) | Small strings |
| Hash Map | O(n) | O(n) | Large strings ✅ |
| Sorting | O(n log n) | O(n) | Simple implementation |

## Edge Cases

### 1. Empty Strings
```javascript
isAnagram("", "");
// Output: true
```

### 2. Different Lengths
```javascript
isAnagram("a", "ab");
// Output: false (early return)
```

### 3. Same Characters, Different Frequencies
```javascript
isAnagram("aab", "abb");
// Output: false
```

### 4. Case Sensitivity
```javascript
isAnagram("Anagram", "nagaram");
// Output: false (case matters)
```

### 5. Special Characters
```javascript
isAnagram("a@b", "b@a");
// Output: true
```

## Optimization: Single Hash Map

```javascript
var isAnagramOptimized = function(s, t) {
    if (s.length !== t.length) return false;
    
    let count = {};
    
    // Increment for s, decrement for t
    for (let i = 0; i < s.length; i++) {
        count[s[i]] = (count[s[i]] || 0) + 1;
        count[t[i]] = (count[t[i]] || 0) - 1;
    }
    
    // Check if all counts are 0
    for (let key in count) {
        if (count[key] !== 0) return false;
    }
    
    return true;
};
```

**Dry Run**:
```
s = "anagram", t = "nagaram"

After loop:
count = {
    a: 3 - 3 = 0,
    n: 1 - 1 = 0,
    g: 1 - 1 = 0,
    r: 1 - 1 = 0,
    m: 1 - 1 = 0
}

All values are 0 ✓
Return: true
```

## Common Mistakes

### 1. Not Checking Length First
```javascript
// ❌ Inefficient
if (s.split('').sort().join('') === t.split('').sort().join(''))

// ✅ Efficient
if (s.length !== t.length) return false;
```

### 2. Case Sensitivity
```javascript
// If case-insensitive required:
s = s.toLowerCase();
t = t.toLowerCase();
```

### 3. Unicode Characters
```javascript
// For Unicode support, use Array.from()
Array.from(s).sort().join('') === Array.from(t).sort().join('')
```

## Related Problems
- Group Anagrams
- Find All Anagrams in a String
- Valid Palindrome
- Permutation in String

## Interview Tips

1. **Clarify requirements**:
   - Case sensitive?
   - Unicode characters?
   - Spaces count?

2. **Discuss approaches**:
   - Sorting (simple but O(n log n))
   - Hash map (optimal O(n))

3. **Optimize**:
   - Early return on length mismatch
   - Single hash map instead of two

4. **Test edge cases**:
   - Empty strings
   - Single character
   - All same characters

## Key Takeaways

✅ Hash map approach is optimal: O(n) time
✅ Always check lengths first
✅ Can use single hash map for space optimization
✅ Sorting is simpler but slower
✅ Consider case sensitivity and special characters
