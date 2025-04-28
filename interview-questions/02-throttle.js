/**
 * Creates a throttled version of the provided function that will only execute
 * at most once every `limit` milliseconds, regardless of how frequently it's called.
 * 
 * Use Case: When a user scrolls through a page, you might want to show/hide elements, update the progress bar, or trigger lazy-loading for images. Listening to the scroll event continuously can lead to performance issues since it fires rapidly as the user scrolls.
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
console.log(throttleFn());
console.log(throttleFn());
console.log(throttleFn());
console.log(throttleFn());
console.log(throttleFn());
console.log(throttleFn());
console.log(throttleFn());
console.log(throttleFn());
console.log(throttleFn());
console.log(throttleFn());

/*

Throttling: This code ensures that even if the function is called multiple times rapidly, it will only execute once every 3 seconds.

Des: it limits the execution of a event handler function, when the event is triggred continuously due to user actions.

*/