/**
 * Checks if the state in board is game over
 * @param {Array} board
 * @return ('X' | 'O' | 'Draw' | false)
*/
export const checkGameOver = (board) => {
  const winningStates = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]
  
  // check win
  for (let state of winningStates) {
    if (board[state[0]] && board[state[0]] === board[state[1]] && board[state[1]] === board[state[2]])
      return board[state[0]]
  }

  // check draw
  for (let i = 0; i < 9; ++i) {
    if (!board[i]) return false
  }

  return 'Draw'
}

/**
 * Returns the optimal computer Move
 * @param {Array} board
 * @param {'X' | 'O'} playerCoin
 * @return computerMove (0 - 8)
*/
export const makeComputerMove = (board, playerCoin) => {
  let computerCoin = (playerCoin === 'X')? 'O': 'X'
  const computeScore = (board) => {
    let gameOverState = checkGameOver(board)
    if (gameOverState === computerCoin) return 1
    else if (gameOverState === playerCoin) return -1
    else if (gameOverState === 'Draw') return 0
    else return false
  }
  const minimax = (board, coin) => {
    let score = computeScore(board)
    if (score !== false) return [score]

    let scores = [];
    for (let i = 0; i < 9; ++i) {
      if (!board[i]) {
        board[i] = coin
        scores.push([minimax(board, (coin === 'X')? 'O': 'X')[0], i])
        board[i] = undefined
      }
    }

    if (coin === computerCoin) {
      return scores.reduce((a, b) => (a[0] > b[0])? a : b )
    } else {
      return scores.reduce((a, b) => (a[0] < b[0])? a : b )
    }
  }

  return minimax(board, computerCoin)[1]
}
