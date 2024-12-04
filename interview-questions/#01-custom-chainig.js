class Calculator {
    constructor(value = 0) {
        this.value = value;
    }

    add(num) {
        this.value += num;
        return this;
    }

    subtract(num) {
        this.value -= num;
        return this;
    }

    multiply(num) {
        this.value *= num;
        return this;
    }

    divide(num) {
        if (num !== 0) {
            this.value /= num;
        } else {
            console.error("Division by zero is not allowed.");
        }
        return this; 
    }

    printResult() {
        console.log(this.value);
        return this;
    }
}

const calc = new Calculator();
calc.add(10).subtract(2).multiply(3).divide(4).printResult(); // Output: 6