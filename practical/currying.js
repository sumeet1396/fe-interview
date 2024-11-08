const log = (importance, date, message) => {
    console.log(`${importance} Log on Day${date.getUTCDay()} -- ${message}`)
}

const curryLog = (mainFun) => {
    return function curried(...args) {
        if (args.length > mainFun.length) {
            return mainFun(...args)
        } else {
            return curried.bind(null, ...args)
        }
    }
}

const curriedLog = curryLog(log)

const severeLog = curriedLog('SEVERE');
const warnLog = curriedLog('WARN');
const errorLog = curriedLog('ERROR');

console.log(severeLog(new Date, 'This is severe'))
console.log(severeLog(new Date, 'A new severe bug'))
console.log(warnLog(new Date, 'This is a warn'))