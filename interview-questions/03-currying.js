/**
 * A curried function to sum three numbers.
 *
 * @param {number} x - The first number.
 * @returns {function} - Returns a function that takes the second number.
 * 
 * @param {number} y - The second number.
 * @returns {function} - Returns a function that takes the third number.
 * 
 * @param {number} z - The third number.
 * @returns {number} - Returns the sum of x, y, and z.
 */

const currying = (x) => {
    return (y) => {
        return (z) => {
            return x + y + z
        }
    }
}
console.log(currying(1)(2)(3))

/* 

in simple terms, currying is when a function - intead of taking all arguments at one time, takes the first one & returns a new function until all arguments are completed

*/


// instead of having multiple return functions we have make a infinte currying function

const infiniteCurrying = (a) => {
    return function (b) {
        if (b) return infiniteCurrying (a + b)
        return a
    }
}

console.log(infiniteCurrying(1)(2)(3)(4)(5)())

