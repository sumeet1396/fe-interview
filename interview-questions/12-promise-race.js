Promise.race = function(input) {
    return new Promise((resolve, reject) => {
        input.forEach(element => {
            Promise.resolve(element)
            .then((value) => resolve(value))
            .catch((reason) => reject(reason))
        });
    })
}

const promise1 = Promise.race([
    Promise.reject(1),
    new Promise((resolve) =>setTimeout(() => resolve(2), 2000)),
    Promise.reject(3),
    Promise.reject(4),
])

promise1
.then(value => console.log("resolved: ",value))
.catch(value => console.log("reject: ", value))

const promise2 = Promise.race([
    null,
    undefined,
    new Promise((resolve) =>setTimeout(() => resolve(2), 2000)),
    {},
    'Hello'
])

promise2
.then(value => console.log("resolved with: ",value))
.catch(value => console.log("reject with: ", value))