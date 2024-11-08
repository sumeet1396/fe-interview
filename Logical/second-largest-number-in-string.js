/*
Links:
https://leetcode.com/problems/second-largest-digit-in-a-string/description/
https://replit.com/@SumeetRane1396/Leetcode-Second-Largest-Digit-in-a-String#index.js
*/

var secondHighest = function(s) {
    if (s.length === 1) return -1
    let obj = {};
    for (let i of s) {
      if (!isNaN(i) && !obj[i]) obj[i] = i
    }
    const newArr = Array.from(Object.keys(obj));
    return newArr.length > 1 ? newArr.at(-2) : -1
  };
  
  console.log(secondHighest("dfa12321afd"))
  console.log(secondHighest("dfa125321afd"))
  console.log(secondHighest("abc1111"))
  
  const secondLargestNumber = (s) => {
    let largest = Number.NEGATIVE_INFINITY;
    let secondLargest = Number.NEGATIVE_INFINITY;
  
    for (let i = 0; i < s.length; i++) {
      if (s[i] > largest) {
        secondLargest = largest;
        largest = s[i];
      } else if (s[i] != largest && s[i] > secondLargest) {
        secondLargest = s[i];
      }
    }
  
    return secondLargest;
  }
  
  console.log(secondLargestNumber([10, 5, 10]))