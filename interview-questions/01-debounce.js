/**
 * Creates a debounced function that delays invoking `func` until after `wait` milliseconds
 * have elapsed since the last time the debounced function was invoked.
 *
 * @param {Function} func - The function to debounce.
 * @param {number} wait - The number of milliseconds to delay.
 * @returns {Function} - Returns the new debounced function.
 */

const debounce = (func, wait) => {
    let timeout;
    return function(...args) {
      const context = this;
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(context, args), wait);
    };
}

let startTime = Date.now()

const debounceFn = debounce(() => {
    console.log(`Fetch Data called after ${Date.now() - startTime}ms`);
  }, 500);
  
console.log(debounceFn())

/*
  Debounce: limits the execution of a certain call & waits for a given time before running it again

  • let timeout: A variable (timeout) is declared to hold the ID of the timer, which will be used to delay the execution of func.
	•	return function(...args): The debounce function returns a new function that can accept any number of arguments. This is the debounced version of the original func.
	•	context: The value of this (the execution context) is stored in a variable context. This ensures that if the function is called with a particular context (e.g., within an object), it will maintain that context when func is eventually executed.
	•	clearTimeout(timeout): Every time the returned function is called, it first clears any existing timeout. This ensures that the function call will be delayed until no further calls are made within the wait time.
	•	timeout = setTimeout(() => func.apply(context, args), wait): After clearing the previous timeout, it sets a new timeout for the wait period. If no new calls are made within that period, the original func will be executed with the correct this context and any arguments passed.

*/