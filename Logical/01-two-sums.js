// brute force approach
function twoSum1(nums, target) {
	for (var i = 0; i < nums.length; i++) {
		for (var j = 0; j < nums.length; j++) {
			if (i !== j && nums[i]+nums[j] === target) return [i,j];
		}
	}
}
  
// optimized approach
function twoSum(nums, target) {  
	let obj = {}
  for (var i = 0; i < nums.length; i++) {
    let num = nums[i]
    if (obj[target - num] >= 0) {
        return [obj[target - num], i]
    } else {
      obj[num] = i;
    }
  } 
}
  
console.log(twoSum([2,7,11,15], 9))
console.log(twoSum([3,2,4], 6))
console.log(twoSum([3,3], 6))