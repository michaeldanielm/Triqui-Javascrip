import React, { Component } from 'react';
import Question from './Question';
import Board from './Board';
import Menu from './Menu';
import './Game.css';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      displayStep: 0,
      playerOption: '',
      playerCoin: ''
    };
  }
  incrementDisplay() {
    this.setState({
      displayStep: this.state.displayStep + 1
    })
  }
  setAnswer(answer, value) {
    this.setState({
      [answer]: value,
    })
    this.incrementDisplay()
  }
  resetDisplay() {
    this.setState({
      displayStep: 0
    })
  }
  render() {
    let gameString;
    switch(this.state.displayStep) {
      case 0: gameString = <Menu gameStart={() => this.incrementDisplay()} />
        break
      case 1: gameString = <Question question='Whom do you want to play?' options={['2 players', 'Computer']}
      setAnswer={this.setAnswer.bind(this, 'playerOption')} />
        break
      case 2: gameString = <Question question = 'What do you choose?' options={['X', 'O']}
      setAnswer={this.setAnswer.bind(this, 'playerCoin')} />
        break
      case 3: gameString = <Board playerOption={this.state.playerOption} playerCoin={this.state.playerCoin}
      goToMenu={() => this.resetDisplay()} />
        break
    }
    return (
      <div className="Game">
        {gameString}
      </div>
    );
  }
}

export default Game;
