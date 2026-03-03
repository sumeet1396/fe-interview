/* 
Links:
https://leetcode.com/problems/remove-duplicates-from-sorted-array/description/
https://replit.com/@SumeetRane1396/Leetcode-Remove-Duplicates-from-Sorted-Array-1#index.js
*/

const removeDuplicates2 = (nums) => {
    for (let i = 0; i < nums.length - 1; i++) {
      // O(n)
      if (nums[i] === nums[i + 1]) {
        nums.splice(i + 1, 1); // O(1)
        i--;
      }
    }
  
    return nums.length;
  }
  
  
  const removeDuplicates = (nums) => {
    let i = 0;
    let j = 1
  
    while (j < nums.length) {
      if (nums[i] === nums[j]) {
        j++
      } else {
        i++
        nums[i] = nums[j]
      }
    }
    return i+1
  }
  
  
  console.log(removeDuplicates([0, 0, 1, 1, 1, 2, 2, 3, 3, 4]));