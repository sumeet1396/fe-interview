/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
    let lowest = prices[0];
    let profit = 0;

    for (let i = 1; i <prices.length; i++) {
        if (prices[i] < lowest) lowest = prices[i];

        if (prices[i]-lowest > profit) profit = prices[i] -lowest
    }

    return profit

};

console.log(maxProfit([7,1,5,3,6,4])) //5
console.log(maxProfit([7,6,4,3,1])) //0