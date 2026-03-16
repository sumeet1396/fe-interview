/**
 *
 * https://leetcode.com/problems/majority-element/?envType=problem-list-v2&envId=array
 *
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function (nums) {
  const obj = {};
  for (num of nums) {
    obj[num] = (obj[num] || 0) + 1;
  }

  const max = Math.max(...Object.values(obj));
  return parseInt(Object.keys(obj).find((val) => obj[val] == max));

  // let candidate = 0;
  // let vote = 0;

  // for(let i = 0; i < nums.length;i++){
  //     if(vote == 0){
  //         candidate = nums[i];
  //     }
  //     if(candidate == nums[i]){
  //         vote++;
  //     }else{
  //         vote--;
  //     }
  // }
  // return candidate;
};

console.log(majorityElement([3, 2, 3]));
