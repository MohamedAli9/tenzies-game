import React from "react";
import Die from "./Die";
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'


function App() {
  //declare a state with an array of objects
  const [diceState, setDiceState] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);
    

  React.useEffect(() => {

    const allHeld = diceState.every(diceState => diceState.isHeld)
    const firstValue = diceState[0].value
    const allSameValue = diceState.every(diceState => diceState.value === firstValue)
    if (allHeld && allSameValue) {
      setTenzies(true)
      console.log("You won!")
    }


  }, [diceState])



  function generateNewDice() {
    return {
      value: Math.floor(Math.random() * ((6 - 1) + 1) + 1),
      isHeld: false,
      id: nanoid()
    }
  }
  //generate 10 random number and return 6 onjects
  function allNewDice() {
    let array = [];
    for (let i = 0; i < 10; i++) {
      array.push(generateNewDice()) 
    }
    
    return array;  
  }

    
    

  let randomDice = diceState.map(dice => (
    <Die holdDice={() => holdDice(dice.id)} isHeld={dice.isHeld} number={dice.value} key={dice.id}/>

  ));

    

  function roll() {
    // setDiceState(allNewDice());
    
    if(!tenzies) {
      setDiceState(prevDice => prevDice.map(dice => {
          return dice.isHeld ? dice: generateNewDice()
      }))
    } else {
      setTenzies(false)
      setDiceState(allNewDice())
    }

  }
  function holdDice(id) {
    setDiceState(oldDice => oldDice.map(dice => {
      return dice.id === id? {...dice, isHeld: !dice.isHeld}:
        dice
    }))
      
  }

  return (
    <main>
      {tenzies && <Confetti numberOfPieces={400} gravity={0.3}/>}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until 
      all dice are the same. Click each die 
      to freeze it at its current value
      between rolls.</p>
      <div  className="container">
        {randomDice}
      </div>
      <button onClick={roll} className="rollButton">{tenzies? "New Game": "Roll"}</button>
        
        
        
    </main>
  )

}

export default App;
