function threeSum(nums) {
    const results = [];
    // Sort the array to use two-pointer technique
    nums.sort((a, b) => a - b);

    for (let i = 0; i < nums.length - 2; i++) {
        // Skip duplicates for the first element
        if (i > 0 && nums[i] === nums[i - 1]) continue;

        let left = i + 1;
        let right = nums.length - 1;

        while (left < right) {
            const sum = nums[i] + nums[left] + nums[right];

            if (sum === 0) {
                results.push([nums[i], nums[left], nums[right]]);
                
                // Skip duplicates for the second and third elements
                while (left < right && nums[left] === nums[left + 1]) left++;
                while (left < right && nums[right] === nums[right - 1]) right--;

                left++;
                right--;
            } else if (sum < target) {
                left++; // Increase the sum
            } else {
                right--; // Decrease the sum
            }
        }
    }

    return results;
}

// Example Usage
const nums = [-1, 0, 1, 2, -1, -4];
console.log(threeSum(nums)); // Output: [[-1, -1, 2], [-1, 0, 1]]