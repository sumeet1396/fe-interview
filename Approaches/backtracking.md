# Backtracking - N-Queens Problem

## Overview
Backtracking is an algorithmic technique for solving problems recursively by trying to build a solution incrementally and abandoning solutions ("backtracking") as soon as it determines that the solution cannot be completed.

## Problem: N-Queens
Place N queens on an N×N chessboard so that no two queens attack each other.

## Approach

### 1. **Board Initialization**
- Create an N×N board filled with '.' (empty cells)
- Queens will be represented by 'Q'

### 2. **Safety Check (isSafe function)**
Checks if placing a queen at position (row, col) is safe by verifying:
- **Column check**: No queen exists in the same column above
- **Upper-left diagonal**: No queen on the diagonal going up-left
- **Upper-right diagonal**: No queen on the diagonal going up-right

### 3. **Backtracking Logic**
- Start from row 0
- For each row, try placing a queen in each column
- If safe, place the queen and move to the next row
- If all queens are placed (row === N), save the solution
- Backtrack by removing the queen and trying the next position

## Dry Run (N=4)

```
Initial Board:
. . . .
. . . .
. . . .
. . . .

Step 1: Place queen at (0,0)
Q . . .
. . . .
. . . .
. . . .

Step 2: Try (1,0) - Not safe (same column)
Step 3: Try (1,1) - Not safe (diagonal)
Step 4: Try (1,2) - Safe! Place queen
Q . . .
. . Q .
. . . .
. . . .

Continue this process...

Solution 1:
. Q . .
. . . Q
Q . . .
. . Q .

Solution 2:
. . Q .
Q . . .
. . . Q
. Q . .
```

## Time Complexity
- **O(N!)**: For each row, we try N positions, then N-1, N-2, etc.

## Space Complexity
- **O(N²)**: For storing the board
- **O(N)**: Recursion stack depth

## Key Concepts
1. **Backtracking**: Try a solution, if it fails, undo and try another
2. **Pruning**: Skip invalid paths early using isSafe check
3. **State Management**: Board state changes and reverts during exploration

## Use Cases
- Sudoku solver
- Maze solving
- Constraint satisfaction problems
- Permutation/combination generation
