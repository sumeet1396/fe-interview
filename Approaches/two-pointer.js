/**
 * The Two Pointer Approach is an algorithmic technique used to optimize problems 
 * that involve searching, sorting, or finding pairs in an array or list. 
 * It uses two pointers to traverse the data structure, often from opposite ends 
 * or at different speeds, to improve efficiency.
 *
 * Common use cases:
 * - Finding pairs with a given sum in a sorted array
 * - Merging sorted arrays
 * - Detecting palindromes
 * - Removing duplicates from a sorted array
 *
 * Example: Reversing an array.
 */

const twoPointer = (arr) => {
    let left = 0;
    let right = arr.length - 1;

    while (left < right) {
        arr[left] = arr[left] + arr[right];
        arr[right] = +(arr[left] - arr[right]);
        arr[left] = +(arr[left] - arr[right]);

        left++;
        right--;
    }

    return arr;

}

console.log(twoPointer([4,2,6,12,64,32]))
console.log(twoPointer([-1,0,5,-5,22,-30]))