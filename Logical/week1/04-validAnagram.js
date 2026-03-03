/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function(s, t) {
    if (s.length !== t.length) return false
    let str = '';
    for (let i =0; i <s.length; i++) {
        if (t.includes(s[i])) {
            str += s[i]
            t = t.replace(s[i], '')
        }
    }

    return s === str
}

console.log(isAnagram("anagram","nagaram"))
console.log(isAnagram("rat","car"))
console.log(isAnagram("aacc","ccac"))

// optimized
var isAnagram2 = function(s, t) {
  if (t.length !== s.length) return false
  
  let obj1 = {}
  let obj2 = {}
  for (let i = 0; i < s.length; i++) {
    obj1[s[i]] = (obj1[s[i]] || 0) + 1
    obj2[t[i]] = (obj2[t[i]] || 0) + 1
  }

  for (const key in obj1) if (obj1[key] !== obj2[key]) return false
  return true;
};

console.log(isAnagram2("anagram","nagaram"))
console.log(isAnagram2("rat","car"))
console.log(isAnagram2("aacc","ccac"))