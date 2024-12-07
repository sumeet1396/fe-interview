Promise.allSettled = function(input) {
    const result = [];
    let totalResolved = 0;
    return new Promise((resolve, reject) => {
        if (input.length === 0) return resolve(result)

        input.forEach((element, index) => {
            Promise.resolve(element)
            .then((value) => {
                result[index] = {status: 'fulfilled', value}
                totalResolved++;

                if (totalResolved === input.length) return resolve(result)
            })
            .catch((reason) => {
                result[index] = {status: 'rejected', reason}
                totalResolved++;

                if (totalResolved === input.length) return resolve(result)
            })
        });
    })
}

const promise1 = Promise.allSettled([
    Promise.resolve(1),
    new Promise((resolve) =>setTimeout(() => resolve(2), 2000)),
    Promise.reject(3),
    4
])

promise1
.then(value => console.log("resolved: ",value))
.catch(value => console.log("reject: ", value))