function solveNQueens(N) {
    const board = Array.from({ length: N }, () => Array(N).fill('.')); // Create an N x N board
    const solutions = [];

    function isSafe(row, col) {
        // Check the column above
        for (let i = 0; i < row; i++) {
            if (board[i][col] === 'Q') return false;
        }

        // Check upper-left diagonal
        for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
            if (board[i][j] === 'Q') return false;
        }

        // Check upper-right diagonal
        for (let i = row - 1, j = col + 1; i >= 0 && j < N; i--, j++) {
            if (board[i][j] === 'Q') return false;
        }

        return true;
    }

    function backtrack(row) {
        // Base case: all queens are placed
        if (row === N) {
            // Convert board to a solution format and store it
            solutions.push(board.map(row => row.join('')));
            return;
        }

        for (let col = 0; col < N; col++) {
            if (isSafe(row, col)) {
                // Place the queen
                board[row][col] = 'Q';

                // Recur to the next row
                backtrack(row + 1);

                // Backtrack: remove the queen
                board[row][col] = '.';
            }
        }
    }

    backtrack(0); // Start from the first row
    return solutions;
}

// Example usage
const N = 4;
const solutions = solveNQueens(N);
console.log(`Number of solutions for ${N}-Queens: ${solutions.length}`);
solutions.forEach((solution, index) => {
    console.log(`Solution ${index + 1}:`);
    console.log(solution.join('\n'), '\n');
});