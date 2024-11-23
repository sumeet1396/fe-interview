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

const _ = '_'; // Placeholder
const add = (a, b, c) => a + b + c;

const curriedAdd = curry(add, _);

// Examples:
console.log(curriedAdd(1)(2)(3));        // Output: 6
console.log(curriedAdd(_, 2)(1)(3));    // Output: 6
console.log(curriedAdd(1, _, 3)(2));    // Output: 6
console.log(curriedAdd(_, _, 3)(1)(2)); // Output: 6