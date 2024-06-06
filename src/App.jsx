import { useState, useEffect } from 'react'
import { nanoid } from "nanoid"
import Confetti from 'react-confetti'
import './App.css'
import Die from './components/Die'

import {dice1,dice2,dice3,dice4,dice5,dice6} from "./assets/dice-img"


function App() {

  const [dice, setDice] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)
  const [countRolls, setCountRolls] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [isActive, setIsActive] = useState(false)

  function resetGame() {
    setSeconds(0)
    setIsActive(false)
    setTenzies(false)
    setDice(allNewDice())
    setCountRolls(0)
  }

  function allNewDice() {
    const diceArray = []

    for(let i = 1; i <= 10; i++) {
      const randomNumber = Math.ceil(Math.random() * 6)
      const isHeld = false
      diceArray.push({id: nanoid(), value: randomNumber, isHeld: isHeld})
    }
    return diceArray
    
  }

  function rollDice() {
    if(!tenzies) {
      setDice(oldDice => oldDice.map(die => {
        const randomNumber = Math.ceil(Math.random() * 6)
        return die.isHeld === false ?
        {...die, id: nanoid(), value: randomNumber} :
        die
      }))
      {isActive && setCountRolls(prevCount => prevCount + 1)}
    } else { 
      resetGame()
    }
  }

  function holdDice(id) {
    setDice(prevDice => prevDice.map(
      die => {
        return die.id === id ? 
        {...die, isHeld: !die.isHeld} : 
        die}
      )
    )
    setIsActive(true)
  }

  useEffect(() => {

    const allEqualAndHeld = arr => 
      arr.every(val => 
        val.value === arr[0].value && val.isHeld === true);

    if(allEqualAndHeld(dice)) {
      setTenzies(true)
      setIsActive(false)
      console.log("You won!")
    }
  }, [dice])

  useEffect(() => {

    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  function whichDie(die) {
    switch (die) {
      case 1:
        return dice1;
        break;
      case 2:
        return dice2;
        break;
      case 3:
        return dice3;
        break;
      case 4:
        return dice4;
        break;
      case 5:
        return dice5;
        break;
      case 6:
        return dice6;
        break;
      default:
        return dice1;
    }
  }

  const diceElements = dice.map(die => 
    <Die 
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
      diepic={whichDie(die.value)}
    />  
  )

  return (
    <main className='main'>
      {tenzies && <Confetti />}
      <div className='rolls-sec'>
          <h3>Rolls: {countRolls}</h3>
          <h3>Time: {seconds}</h3>
        </div>
      <h1>Tenzies</h1>
      <div className='main--text'>
        <h2>Roll until all dice are the same. 
          Click each die to freeze it at its current value between rolls.
        </h2>
      </div>
      <div className='container'>
        {diceElements}
      </div>
      <button className='roll-button' onClick={rollDice}>
        {tenzies ? "Reset" : "Roll"}
      </button>
    </main>
  )
}

export default App
