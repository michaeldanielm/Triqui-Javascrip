import React, { Component } from 'react';
import Stats from './Stats';
import './Menu.css';

class Menu extends Component {
  constructor () {
    super();
    this.state = {
      display: 'menu'
    }
  }
  changeDisplay(s) {
    this.setState({
      display: s
    })
  }
  render() {
    switch(this.state.display) {
      case 'menu':
        return (
          <div className="Menu">
          <button onClick={() => this.props.gameStart()}>Play</button>
          <button onClick={() => this.changeDisplay('stats')}>Stats</button>
          </div>
        );
        break;
      case 'stats':
        return (
          <Stats goToMenu={() => this.changeDisplay('menu')}/>
        )
    }
  }
}

export default Menu;
