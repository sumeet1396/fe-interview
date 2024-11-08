var balancedStringSplit = function(s) {
    let count = 0;
    let balance = 0;
  
    for (let char of s) {
      if (char === "R") balance++;
      else balance--;
  
      if (balance === 0) count++;
    }
    return count;
  };
  
  console.log(balancedStringSplit("RLRRLLRLRL"))
  console.log(balancedStringSplit("RLRRLLRLRL"))
  console.log(balancedStringSplit("RLRRLLRLRL"))