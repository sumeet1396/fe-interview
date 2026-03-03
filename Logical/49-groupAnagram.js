/**
link: https://leetcode.com/problems/group-anagrams/description/
*/


/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function(strs) {
    let obj = {}
    for (let i = 0; i <strs.length; i++) {
       let temp = strs[i].split("").sort().join("");
      if (obj[temp]) {
        obj[temp] = [...obj[temp], strs[i]]
      } else {
        obj[temp] = [strs[i]]
      }
    }
  
  return Object.values(obj)
};


console.log(groupAnagrams(["eat","tea","tan","ate","nat","bat"])); 
// [["bat"],["nat","tan"],["ate","eat","tea"]]

