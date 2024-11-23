// nested array flatten
const flattenArray = (arr) => {
    return arr.reduce(function (flatArr, element) {
      if (Array.isArray(element)) {
        return flatArr.concat(flattenArray(element));
      } else {
        return flatArr.concat(element);
      }
    }, []);
}
  
const nestedArray = [1, [2, [3, 4], 5], 6];
const flattenedArray = flattenArray(nestedArray);
console.log(flattenedArray); // Output: [1, 2, 3, 4, 5, 6]

const obj = {
    a: 1,
    b: 2,
    c: {
        d: 3,
        e: 4,
        f: {
            g: 5
        },
        h: null
    },
    i: 'H'
}


// nested object flatten
const flatten = (data) => {
    let results = {}
    for (let keys in data) {
        if (typeof data[keys] === 'object' && data[keys] !== null){
            results = {...results, ...flatten(data[keys])}
        } else {
            results[keys] = data[keys]
        }
    }

    return results
}

// nested object flatten with prefix
const flattenWithPrefix = (data, prefix = '') => {
    let results = {}
    const pre = (prefix.length > 0) ? prefix+'.' : ''
    for (let keys in data) {
        if (typeof data[keys] === 'object' && data[keys] !== null){
            results = {...results, ...flattenWithPrefix(data[keys], pre+keys)}
        } else {
            results[pre + keys] = data[keys]
        }
    }

    return results
}

console.log(flatten(obj, ''));
console.log(flattenWithPrefix(obj, ''));
