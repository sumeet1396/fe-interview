const fetchWithAutoRetry = (fetchData, retryLimit) => {
    return new Promise((resolve, reject) => {
        (function retryFetch() {
            fetchData() 
                .then((data) => resolve(data))
                .catch((error) => {
                    if (retryLimit-- > 0) retryFetch();
                    else reject(error);
                });
        })();
    });
};

const fetchData = (() => {
    let count = 0;
    return () => {
        if (count++ === 4) return Promise.resolve("Data Accepted: "+count);
        else return Promise.reject("Data Rejected: "+count);
    };
})();

fetchWithAutoRetry(fetchData, 3)
.then(console.log)
.catch(console.log)

fetchWithAutoRetry(fetchData, 5)
.then(console.log)
.catch(console.log)