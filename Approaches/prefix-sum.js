const prefixSum = (arr) => {
    const prefixSumArr = [];
    prefixSumArr[0] = arr[0]
    for (let i = 1; i <arr.length; i++) {
        prefixSumArr[i] = arr[i] + prefixSumArr[i-1]
    }

    return prefixSumArr;
}

console.log(prefixSum([10, 20, 10, 5, 15])) // 10, 30, 40, 45, 60