Promise.any = function(input) {
    const errors = [];
    let totalRejected = 0;
    return new Promise((resolve, reject) => {
        if (input.length === 0) return reject(new AggregateError(errors, 'Empty Array'))

        input.forEach((element, index) => {
            Promise.resolve(element)
            .then((value) => {
                resolve(value)
            })
            .catch((reason) => {
                errors[index] = reason
                totalRejected++;

                if (totalRejected === input.length) return reject(new AggregateError(errors, 'All promises rejected'))
            })
        });
    })
}

const promise1 = Promise.any([
    Promise.resolve(1),
    new Promise((resolve) =>setTimeout(() => resolve(2), 2000)),
    Promise.reject(3),
    4
])

promise1
.then(value => console.log("resolved: ",value))
.catch(value => console.log("reject: ", value))

const promise2 = Promise.any([
    new Promise((_, reject) => setTimeout(() => reject(3), 2000)),
    Promise.reject(2),
    '4',
    new Promise((_, reject) => setTimeout(() => reject(1), 0)),
    Promise.reject(5)
])

promise2
.then((value) => console.log('Resolved with', value))
.catch(value => console.log("reject: ", value))