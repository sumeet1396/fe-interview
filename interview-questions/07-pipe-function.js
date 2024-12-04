const getName = (input) => input.name;
const getUppercaseName = (input) => input.toUpperCase();
const getFirstName = (input) => input.split(' ')[0];
const getReversedName = (input) => input.split('').reverse().join('');


// Approach 1: loops
const pipe = (...func) => {
    return function (initialArgs) {
        let results = initialArgs;
        for (fn of func) {
            results = fn(results)
        }

        return results
    }
}

// Approach 2: reduce fun
const pipe2 = (...func) => {
    return function (initialArgs) {
        return func.reduce((accumulator, fn) => {
            return fn(accumulator)
        }, initialArgs)
    }
}

// Approach 2: reduce with async func
const pipe3 = (...func) => {
    return function (initialArgs) {
        return func.reduce((chain, fn) => {
            return chain.then(results => fn(results))
        }, Promise.resolve(initialArgs))
    }
}


const pipeSync = pipe(getName,getUppercaseName,getFirstName,getReversedName);
const pipeSync2 = pipe2(getName,getUppercaseName,getFirstName,getReversedName);

const results = pipeSync({name: 'sumeet'})
console.log(results)

const results2 = pipeSync2({name: 'Rane'})
console.log(results2)