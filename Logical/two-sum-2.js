const twoSum = (arr, target) => {
    let left = 0;
    let right = arr.length - 1;

    while (left < right) {
        if (arr[left] + arr[right] === target) return [left + 1, right + 1]
        else if (arr[right] >= target) right--
        else left++
    }
}

console.log(twoSum([2,7,11,15], 9))
console.log(twoSum([2,3,4], 6))
console.log(twoSum([-1,0], -1))