import React, { Component } from 'react';
import { checkGameOver, makeComputerMove } from '../Utils';
import './Board.css';

class Board extends Component {
  constructor(props) {
    super(props)
    this.state = this.getInitialState()
  }
  getInitialState() {
    return {
      board: [],
      playerCoin: this.props.playerCoin,
      turn: this.props.playerCoin,
      isComputerPlaying: (this.props.playerOption === 'Computer'),
      winner: false
    };
  }
  setInitialState() {
    this.setState(this.getInitialState());
  }
  toggleTurn() {
    this.setState({
      turn: this.state.turn === 'X'? 'O': 'X'
    })
  }
  goToMenu() {
    console.log('hello')
    this.setInitialState();
    this.props.goToMenu();
  }
  checkGameOver() {
    let gameOverState = checkGameOver(this.state.board)
    let winner;
    if (this.state.isComputerPlaying) {
      if (this.state.playerCoin === gameOverState) winner = 'You'
      else if (gameOverState === 'Draw') winner = 'Draw'
      else winner = 'Computer'
    } else {
      if (this.state.playerCoin === gameOverState) winner = 'First player'
      else if (gameOverState === 'Draw') winner = 'Draw'
      else winner = 'Second player'
    }
    if (gameOverState)  {
      this.setState({
        winner
      }, this.storeStats)
    }
    return gameOverState
  }
  storeStats() {
    let stats = JSON.parse(localStorage.getItem('stats')) || {}
    if (this.state.isComputerPlaying) {
      if (!stats['computer']) stats['computer'] = {}
      stats['computer'][this.state.winner] = (stats['computer'][this.state.winner] + 1) || 1
    } else {
      if (!stats['2players']) stats['2players'] = {}
      stats['2players'][this.state.winner] = (stats['2players'][this.state.winner] + 1) || 1
    }
    localStorage.setItem('stats', JSON.stringify(stats))
  }
  playerMove(pos) {
    if (this.state.board[pos])
      return
    let board = [...this.state.board]
    board[pos] = this.state.turn

    this.setState({
      board
    }, function() {
      let gameOver = this.checkGameOver()
      if (gameOver) return
      if (this.state.isComputerPlaying) {
        let computerMove = makeComputerMove(this.state.board, this.state.playerCoin)
        let board = [...this.state.board]
        board[computerMove] = (this.state.playerCoin === 'X')? 'O': 'X'

        this.setState({
          board
        }, this.checkGameOver)
      } else {
        this.toggleTurn()
      }
    })
  }
  render() {
    let gameOverString;
    if (this.state.winner) {
      gameOverString = (
        <div className="gameOver">
          <div>
          {(this.state.winner) === 'Draw'? 'Draw': `${this.state.winner} wins`}
          </div>
          <div className="gameOver__buttons">
            <button onClick={() => this.setInitialState()}>Retry</button>
            <button onClick={() => this.goToMenu()}>Menu</button>
          </div>
        </div>
      )
    }
    return (
        <div className="Board">
          {gameOverString}
          <table>
            <tbody>
              <tr>
                <td onClick={() => this.playerMove(0)}><div>{this.state.board[0]}</div></td>
                <td onClick={() => this.playerMove(1)}><div>{this.state.board[1]}</div></td>
                <td onClick={() => this.playerMove(2)}><div>{this.state.board[2]}</div></td>
              </tr>
              <tr>
                <td onClick={() => this.playerMove(3)}><div>{this.state.board[3]}</div></td>
                <td onClick={() => this.playerMove(4)}><div>{this.state.board[4]}</div></td>
                <td onClick={() => this.playerMove(5)}><div>{this.state.board[5]}</div></td>
              </tr>
              <tr>
                <td onClick={() => this.playerMove(6)}><div>{this.state.board[6]}</div></td>
                <td onClick={() => this.playerMove(7)}><div>{this.state.board[7]}</div></td>
                <td onClick={() => this.playerMove(8)}><div>{this.state.board[8]}</div></td>
              </tr>
            </tbody>
          </table>
        </div>
    );
  }
}

export default Board;
