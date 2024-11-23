/**
 * Creates a curried version of a function that supports placeholders for partial application.
 * 
 * @param {Function} func - The function to curry.
 * @param {*} [placeholder='_'] - A placeholder value used to skip arguments during partial application.
 * @returns {Function} A curried version of the input function.
 * 
 */
function curry(func, placeholder = '_') {
    return function curried(...args) {
      const completeArgs = (args.length >= func.length && !args.includes(placeholder));
  
      if (completeArgs) {
        return func(...args);
      }
  
      return function (...nextArgs) {
        const mergedArgs = args.map(arg =>
          arg === placeholder && nextArgs.length ? nextArgs.shift() : arg
        ).concat(nextArgs);
  
        return curried(...mergedArgs);
      };
    };
}

const _ = '_';
const add = (a, b, c) => a + b + c;

const curriedAdd = curry(add, _);

// Examples:
console.log(curriedAdd(1)(2)(3));        // Output: 6
console.log(curriedAdd(_, 2)(1)(3));    // Output: 6
console.log(curriedAdd(1, _, 3)(2));    // Output: 6
console.log(curriedAdd(_, _, 3)(1)(2)); // Output: 6


/*

Dry Run of curriedAdd(_, 2)(1)(3)

Step 1: Initialization

	1.	curry(add, _) creates a curried function.
	2.	The curried function is ready to process arguments.

Step 2: First Call (curriedAdd(_, 2))

	•	args = [_, 2]
	•	completeArgs Check:
	•	args.length = 2 (less than func.length = 3).
	•	args includes _.
	•	Result: Not complete.
	•	Returns a new curried function with args = [_, 2].

Step 3: Second Call (curriedAdd(_, 2)(1))

	•	args = [_, 2]
	•	nextArgs = [1]
	•	mergedArgs Calculation:
	•	Loop through args:
	•	First element (_): Replaced with nextArgs.shift() (value 1).
	•	Second element (2): Remains as-is.
	•	Remaining nextArgs = [].
	•	mergedArgs = [1, 2].
	•	completeArgs Check:
	•	mergedArgs.length = 2 (less than func.length = 3).
	•	Result: Not complete.
	•	Returns a new curried function with args = [1, 2].

Step 4: Third Call (curriedAdd(_, 2)(1)(3))

	•	args = [1, 2]
	•	nextArgs = [3]
	•	mergedArgs Calculation:
	•	Loop through args:
	•	First element (1): Remains as-is.
	•	Second element (2): Remains as-is.
	•	nextArgs appended to mergedArgs → mergedArgs = [1, 2, 3].
	•	completeArgs Check:
	•	mergedArgs.length = 3 (equal to func.length = 3).
	•	No placeholders in mergedArgs.
	•	Result: Complete.
	•	Executes func(...mergedArgs) → add(1, 2, 3) → 6.

*/