/**
link: https://leetcode.com/problems/product-of-array-except-self/description/
*/

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = function(nums) {
    let res = []
    let start = 1
    let start2 = 1
    
    for (let i = 0; i < nums.length; i++) {
      res.push(start)
      start *= nums[i]
    }

    for (let i = nums.length -1; i>=0; i--) {
      res[i] *= start2;
      start2 *= nums[i]
    }
  
    return res
};


console.log(productExceptSelf([1,2,3,4])); // [24,12,8,6]
console.log(productExceptSelf([-1,1,0,-3,3])); // [0,0,9,0,0]