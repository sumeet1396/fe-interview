var missingNumber = function(nums) {
    //   nums.sort((a,b) => a - b);
    //   let last = nums[nums.length - 1];
    //   for (let i = 0; i<nums.length; i++) {
    //     if (nums[i] !== i) return i
    //   }
      
    //   return ++last;
      
    let sumOfArray = 0
    let actualSum = (nums.length*(nums.length + 1)) / 2

    for(let i = 0; i<nums.length; i++){
    sumOfArray += nums[i]
    }
    return actualSum - sumOfArray;
    
};
    
console.log(missingNumber([3,0,1])); //2
console.log(missingNumber([0,1])); //2
console.log(missingNumber([9,6,4,2,3,5,7,0,1])); //8