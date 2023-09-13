import React from 'react'

function Die(probs) {
    const styles = {
        backgroundColor: probs.isHeld? "#59E391": "white"
         
    }

  return (
    <div onClick={probs.holdDice} style={styles} className="die-face">
        <h2  className="die-num">{probs.number}</h2>
    </div>
  )
}

export default Die
