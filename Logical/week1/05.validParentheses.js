/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
    const opening = {
        "{": "}",
        "[": "]",
        "(": ")"
    }

    const closing = {
        "}": "{",
        "]": "[",
        ")": "("
    }

    if (closing[s[0]] || s.length < 2) return false;

    const stack = [];

    for (let i = 0; i < s.length; i++) {
        const len = stack.length-1
        
        if (opening[s[i]]) {
            if (stack.length === 0) stack.push(s[i])
            else if (opening[stack[len]]) stack.push(s[i])
            else return false
        } else {
            if (stack[len] === closing[s[i]]) stack.pop()
            else return false
        }
    }

    // const store = {
    //     "(": ")",
    //     "{": "}",
    //     "[": "]",
    // }

    // const stack = [];

    // for (let i = 0; i < s.length; i++) {
    //     if (s[i] === "(" || s[i] === "{" || s[i] === "[") {
    //         stack.push(s[i]);
    //     } else if (store[stack.pop()] !== s[i]) {
    //         return false;
    //     }
    // }

    return stack.length > 0 ? false : true
};

console.log(isValid("()")) //true
console.log(isValid("()[]{}")) //true
console.log(isValid("(]")) //false
console.log(isValid("([])")) //true
console.log(isValid("[")) //false
console.log(isValid("((")) //false