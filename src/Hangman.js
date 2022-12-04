import React, { Component } from "react";
import { randomWord } from "./stockWord";
import "./Hangman.css";

import img0 from "./images/0.png";
import img1 from "./images/1.png";
import img2 from "./images/2.png";
import img3 from "./images/3.png";
import img4 from "./images/4.png";
import img5 from "./images/5.png";
import img6 from "./images/6.png";

class Hangman extends Component {
  static defaultProps = {
    maxWrong: 6,
    images: [img0, img1, img2, img3, img4, img5, img6],
  };

  constructor(props) {
    super(props);
    this.state = {
      nWrong: 0,
      guessed: new Set(),
      // answer: "apple"
      answer: randomWord(),
    };
    this.handleGuess = this.handleGuess.bind(this);
    this.resetGame = this.resetGame.bind(this);
  }

  // reset the game and put things in default
  resetGame() {
    this.setState({
      nWrong: 0,
      guessed: new Set(),
      answer: randomWord(),
    });
  }
  guessWord() {
    let { answer, guessed } = this.state;
    return answer.split("").map((ltr) => (guessed.has(ltr) ? ltr : "_"));
  }

  /** handleGuess: handle a guessed letter:
    - add to guessed letters
    - if not in answer, increase number-wrong guesses
  */

  handleGuess(evt) {
    let ltr = evt.target.value;
    this.setState((st) => ({
      guessed: st.guessed.add(ltr),
      nWrong: st.nWrong + (st.answer.includes(ltr) ? 0 : 1),
    }));
  }

  generateButtons() {
    return "abcdefghijklmnopqrstuvwxyz".split("").map((ltr) => {
      <button
        key={ltr}
        value={ltr}
        onClick={this.handleGuess}
        disabled={this.state.guessed.has(ltr)}
      >
        {ltr}
      </button>;
    });
  }
  render() {
    const { nWrong, answer } = this.state;
    const { images, maxWrong } = this.props;
    let alternateText = `${this.state.nWrong} wrong guesses`;
    return (
      <div className="Hangman">
        <h1>H_A_N_G_M_A_N</h1>
        <img src={images[nWrong]} alt={alternateText}/>
        <p>Number Wrong: {nWrong}</p>
          
        { answer === this.guesseWord().join("") ? <p>You WIN!</p> :

          (nWrong === maxWrong ?
        <div>
          <p>YOU LOSE </p>
          <p>Correct Word is: {answer}</p>
        </div>
        :
        <div>
        <p className='Hangman-word'>{this.guesseWord()}</p>
        <p className='Hangman-btns'>{this.generateButtons()}</p>
      </div>)
      }
      <button id='reset' onClick={this.resetGame}>Reset Game</button>
      </div>
    );
  }
}
export default Hangman;
