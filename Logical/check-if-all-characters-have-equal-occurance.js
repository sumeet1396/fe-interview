// leetcode: 1941

var areOccurrencesEqual = function(s) {
    const obj = {};
      for (let i = 0; i < s.length; i++) {
        if (obj[s[i]]) {
          obj[s[i]] = obj[s[i]] + 1; 
        } else {
          obj[s[i]] = 1;
        }
      }
  
    const value = Object.values(obj).every(val => obj[s[0]] === val)
  
    return value;
};

console.log(areOccurrencesEqual("abacbc"))
console.log(areOccurrencesEqual("aaabb"))