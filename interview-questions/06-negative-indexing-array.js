const negativeIndex = (arr, index, val = undefined) => {
    if (index < 0){
        index += arr.length;
    }
    
    if (val) {
        arr[index] = val
    }

    return arr[index]
}

console.log(negativeIndex(['a','b','c','d','e'], -2)) // d
console.log(negativeIndex(['a','b','c','d','e'], -4, 'g'))
console.log(negativeIndex(['a','b','c','d','e'], 0))

// function using proxy
const negativeIndexProxy = (arr) => {
    return new Proxy(arr, {
        get(target, property) {
            let index = Number(property);

            if (index < 0) {
                index += target.length;
            }

            return target[index]
        },
        set(target, property, value) {
            let index = Number(property);

            if (index < 0) {
                index += target.length;

                if (index < 0) {
                    throw new Error('Index out of bound')
                }
            }

            target[index] = value
            return true;
        }
    })
}

let arr = ['a','b','c','d','e'];

arr = negativeIndexProxy(arr);

console.log(arr[-2]);

arr[-3] = 'z'

console.log(arr)
