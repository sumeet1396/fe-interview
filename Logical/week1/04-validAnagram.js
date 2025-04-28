/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function(s, t) {
    if (s.length !== t.length) return false
    let str = '';
    for (let i =0; i <s.length; i++) {
        if (t.includes(s[i])) {
            str += s[i]
            t.replace(s[i], '')
        }
    }

    return s === str
}

console.log(isAnagram("anagram","nagaram"))
console.log(isAnagram("rat","car"))