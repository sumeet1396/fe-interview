
function memoizeFun(fun) {
    const store = new Map();

    return function(...args) {
        const key = JSON.stringify(args);
        if (store.has(key)) {
            console.log('Returning from cache');
            return store.get(key);
        } else {
            console.log("Not in cache")
            const result = fun.apply(this, args);
            store.set(key, result);
            return result;
        }
    }
}

const add = (a,b) => a + b;
const sub = (a,b) => a - b;

const memoizeAdd = memoizeFun(add)
const memoizeSub = memoizeFun(sub)
console.log(memoizeAdd(10,20))
console.log(memoizeAdd(10,20))
console.log(memoizeAdd(30,40))
console.log(memoizeSub(10,20))
