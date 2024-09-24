/**
 * Creates a throttled version of the provided function that will only execute
 * at most once every `limit` milliseconds, regardless of how frequently it's called.
 *
 * @param {Function} func - The function to throttle.
 * @param {number} limit - The minimum time (in milliseconds) that must pass between function executions.
 * @returns {Function} - Returns a throttled version of the provided function.
 */

const throttle = (func, limit) => {
    let lastFunc;
    let lastRan;
    return function(...args) {
      const context = this;
      if (!lastRan) {
        func.apply(context, args);
        lastRan = Date.now();
      } else {
        clearTimeout(lastFunc);
        lastFunc = setTimeout(function() {
          if ((Date.now() - lastRan) >= limit) {
            func.apply(context, args);
            lastRan = Date.now();
          }
        }, limit - (Date.now() - lastRan));
      }
    };
}

let startTime = Date.now()

const throttleFn = throttle(() => {
    console.log(`Fetch Data called after ${Date.now() - startTime}ms`);
}, 3000);
  
console.log(throttleFn());
console.log(throttleFn());
console.log(throttleFn());
console.log(throttleFn());
console.log(throttleFn());