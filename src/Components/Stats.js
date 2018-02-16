import React, { Component } from 'react';
import {Bar} from 'react-chartjs-2';
import './Stats.css';

class Stats extends Component {
  constructor() {
    super()
    let stats = JSON.parse(localStorage.getItem('stats')) || {}
    this.state = {
      stats
    }
  }
  clearData() {
    localStorage.removeItem('state')
    this.setState({
      stats: {}
    })
  }
  render() {
    let stats = this.state.stats
    let options = {
      responsive: true,
      legend: {
        display: false
      },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }

    if (!stats['computer']) stats['computer'] = {}
    let data1 = {
      labels: ['Human', 'Computer', 'Draw'],
      datasets: [{
        label: 'No of matches',
        backgroundColor: ['#f44336', '#673AB7', '#03A9F4'],
        data: [stats['computer']['You'] || 0, stats['computer']['Computer'] || 0, stats['computer']['Draw'] || 0]
      }]
    }

    if (!stats['2players']) stats['2players'] = {}
    let data2 = {
      labels: ['First Player', 'Second Player', 'Draw'],
      datasets: [{
        label: 'No of matches',
        backgroundColor: ['#CDDC39', '#FFC107', '#795548'],
        data: [stats['2players']['First player'] || 0, stats['2players']['Second player'] || 0, stats['2players']['Draw'] || 0]
      }]
    }
    return (
       <div className='statsContainer'>
        <div className='statsContainer__heading'>
          <h4> Stats </h4>
          <a id="menuLink" href="javascript:void(0)" onClick={this.props.goToMenu}>Go Back</a>
        </div>
         <div>
           <h6>Vs Computer</h6>
           <Bar data={data1} options={options}/>
         </div>
         <div>
           <h6>2 Players</h6>
           <Bar data={data2} options={options}/>
         </div>
         <br/>
         <button onClick={() => this.clearData()}>Clear Data</button>
       </div>
    )
  }
}

export default Stats;
