/**
 * @param {number[]} nums
 * @return {boolean}
 */
var containsDuplicate = function(nums) {
    const obj = {}
    for (let i = 0; i < nums.length; i++) {
        if (obj[nums[i]]) return true
        else obj[nums[i]] = nums[i];
    }

    return false
};

console.log(containsDuplicate([1,2,3,1]))
console.log(containsDuplicate([1,2,3,4]))
console.log(containsDuplicate([1,1,1,3,3,4,3,2,4,2]))