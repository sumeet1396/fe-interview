/**
link: https://leetcode.com/problems/top-k-frequent-elements/description/
*/

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var topKFrequent = function(nums, k) {
     if (nums.length <= k) return nums
     
     const obj = {}
     for (let num of nums) {
       obj[num] = (obj[num] || 0) + 1;
     }
  
   
    const sorted = Object.entries(obj).sort((a, b) => b[1] - a[1]);
    
    const res = []
    for (let i = 0; i < Math.min(k, sorted.length); i++) {
      res.push(Number(sorted[i][0]));
    }
    return res
};


console.log(topKFrequent([1,1,1,2,2,3],2)); //[1,2]
console.log(topKFrequent([1],1)); //[1]
console.log(topKFrequent([1,2,1,2,1,2,3,1,3,2],2)); //[1,2]