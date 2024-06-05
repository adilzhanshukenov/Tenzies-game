import { useState, useEffect } from 'react'
import { nanoid } from "nanoid"
import Confetti from 'react-confetti'
import './App.css'
import Die from './components/Die'


function App() {

  const [dice, setDice] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)

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
    } else { 
      setTenzies(false)
      setDice(allNewDice())
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
  }

  useEffect(() => {

    const allEqualAndHeld = arr => 
      arr.every(val => 
        val.value === arr[0].value && val.isHeld === true);

    if(allEqualAndHeld(dice)) {
      setTenzies(true)
      console.log("You won!")
    }
  }, [dice])

  const diceElements = dice.map(die => 
    <Die 
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />  
  )

  return (
    <main className='main'>
      {tenzies && <Confetti />}
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
