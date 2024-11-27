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