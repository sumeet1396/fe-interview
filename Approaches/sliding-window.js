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

    maxSum = currentSum; //2 + 1 + 5 = 8

    for (let i = k; i < arr.length; i++) {
        currentSum = currentSum - arr[i - k] + arr[i];
        /*
            Adding arr[i] = 1 and subtracting arr[i - k] = 2, new currentSum = 8 + 1 - 2 = 7
            Adding arr[i] = 3 and subtracting arr[i - k] = 1, new currentSum = 7 + 3 - 1 = 9
            Adding arr[i] = 2 and subtracting arr[i - k] = 5, new currentSum = 9 + 2 - 5 = 6
        */
        maxSum = Math.max(maxSum, currentSum);
        /*
            maxSum remains 8 as it is greater than currentSum (7)
            maxSum updated to 9 as currentSum (9) is greater
            maxSum remains 9 as it is greater than currentSum (6)
        */
    }

    return maxSum;
};

const arr = [2, 1, 5, 1, 3, 2];
const k = 3;
console.log(maxSubarraySum(arr, k)); // Output: 9