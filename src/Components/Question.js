import React, { Component } from 'react';
import './Question.css';

class Question extends Component {
  render() {
    return (
      <div className="Question">
        <p>{this.props.question}</p>
        <div className="Question__answers">
          {this.props.options.map((option, index) =>
             <button key={index} onClick={this.props.setAnswer.bind(null, option)}>{option}</button>
          )}
        </div>
      </div>
    );
  }
}

export default Question;
