/*
Links:
https://leetcode.com/problems/rotate-array/description/
https://replit.com/@SumeetRane1396/Leetcode-Rotate-Array#index.js

*/

const reverse = (nums, left, right) =>  {
    while (left < right) {
      const temp = nums[left];
      nums[left++] = nums[right];
      nums[right--] = temp;
    }
  }
  
  var rotate = function (nums, k) {
  
    const oldNums = [...nums];
  
    for (let i = 0; i < oldNums.length; i++) {
        const index = (i + k) % oldNums.length;
  
        nums[index] = oldNums[i];
    }
    
    return nums;
  };
  
  console.log(rotate([1, 2, 3, 4, 5, 6, 7], 3)); //[5,6,7,1,2,3,4]
  console.log(rotate([-1, -100, 3, 99], 2)); // [3,99,-1,-100]
  console.log(rotate([1, 2], 3)); // [2,1]
  console.log(rotate([3, 2, 1], 4)); // [3,1,2]
  