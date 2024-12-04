/*
The sliding window approach is a powerful technique to optimize problems that involve subsets or subarrays of a given array or sequence. It works by maintaining a window (range) of elements that satisfies certain conditions and “sliding” it through the sequence to find the solution efficiently.
*/

const maxSubarraySum = (arr, k) => {
    if (arr.length < k) {
        throw new Error("Array length is smaller than the window size.");
    }

    let maxSum = 0;
    let currentSum = 0;

    for (let i = 0; i < k; i++) {
        currentSum += arr[i];
    }

    maxSum = currentSum;

    for (let i = k; i < arr.length; i++) {
        currentSum = currentSum - arr[i - k] + arr[i];
        maxSum = Math.max(maxSum, currentSum);
    }

    return maxSum;
};

const arr = [2, 1, 5, 1, 3, 2];
const k = 3;
console.log(maxSubarraySum(arr, k)); // Output: 9