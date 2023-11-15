import React, { useState, useEffect } from "react";
import '../stylesheet/drumpad.css'
import { firstSounds, secondSounds } from "./sources";


function Drumpad() {

  
  /* Activate or deactivate the Drum Pad */
  const [power, setPower] = useState(true)

  const handlePower = () => {
    setPower(!power)
    console.log(power)
  }
  /* Establish the type of sounds */
  const [instrumentType, setType] = useState(1)

  const boxType = () => {
    if (instrumentType == 1){
      setType(2)
    } else {
      setType(1)
    }
  }

  const handleSwitch = () => {
    boxType()
    if (instrumentType == 1){
      updateDisplay('Piano')
    }else{
      updateDisplay('Heater')
    }
    setTimeout(() => {
      updateDisplay('');
    }, 2500)
  }

  /* Manage the display */
  const [displayMsg, SetDisplay] = useState('')
  const updateDisplay = (message) => {
    SetDisplay(message)
    setTimeout(() => {
      updateDisplay('');
    }, 2500)
  }

  /* Play the audios with the mouse click */

  const playAudio = (key) => {
    const audio =  document.getElementById(key);
    audio.play()
  }

  const handleMouse = (key, info) => {
    playAudio(key)
    updateDisplay(info)
  }
  
  const handleClick = (info) => {useEffect(()=> {
    document.addEventListener('keydown', (event)=> {
      playAudio(event.key.toUpperCase())
      })
    }, []);
  }

  return(
    <div className='inner-container' id='drum-machine'>
      <div className='pad-bank'>
        {instrumentType==1 ? ( firstSounds.map(function(sound) {
          return (
            <button key={'button-'+sound.letter} className={power ? 'drum-pad button-20' : 'drum-pad button-30'} id={sound.instrument}
                    onClick={()=> handleMouse(sound.letter, sound.instrument)}
                    onKeyDown={handleClick(sound.instrument)}
                    disabled={power}>{sound.letter}
              <audio className='clip' id={sound.letter} src={sound.sound}></audio>
            </button>) 
          })) : /* <---- here is my ternary else */
          ((secondSounds.map(function(sound) {
          return (
            <button key={'button-'+sound.letter} className={power ? 'drum-pad button-20' : 'drum-pad button-30'} id={sound.instrument}
                    onClick={()=> handleMouse(sound.letter, sound.instrument)}
                    onKeyDown={handleClick(sound.instrument)}
                    disabled={power}>{sound.letter}
              <audio className='clip' id={sound.letter} src={sound.sound}></audio>
            </button>) 
          }) ))}
      </div>
      <div className='controls-container'>
        <label className='switch-names'>Power</label>
        <input class="tgl tgl-skewed" id="cb3" type="checkbox" onClick={() =>handlePower()}/>
        <label class="tgl-btn" sound-tg-off="OFF" sound-tg-on="ON" for="cb3"></label>
        <div className='state-display' id='display'>
          {displayMsg}
        </div>
        <input className='volume range' type='range' min="0" max="100"/>
        <label className='switch-names'>Bank</label>
        <input class="tgl tgl-skewed2" id="cb4" type="checkbox" onClick={()=> handleSwitch()}
        disabled={power}/>
        <label class="tgl-btn" sound-tg-off="H" sound-tg-on="P" for="cb4"></label>
      </div>
      <div className='name-label'>
        MINT
      </div>
    </div>
  )
}

export default Drumpad;


/*
const handleClick = (msg, index, letter, number) => {
  const audio = new Audio(keyLetters[index][`${letter}${number}`])
  audio.play()
  updateDisplay(msg)
  setTimeout(() => {
    updateDisplay('');
  }, 3500)
}

{keyLetters.map(function(sound) {
          return (
            <div className="button-holder">
              <button key={'button'+sound.letter} className={power ? 'button-20' : 'button-30'} 
                      onClick={()=> handleClick(instrumentType == 1 ? `${sound.instrument1}` : `${sound.instrument2}`, sound.index, sound.letter, instrumentType)}
                      disabled={power}>
                      {sound.letter}
            </button>
            <audio id={`${sound.letter}+${sound.instrumentType}`} src={sound.A1}></audio>

          </div>
          
            ) 
          })
        }

keyLetters.map(function(sound) {
          return (
            <button key={sound.letter} className={power ? 'drum-pad button-20' : 'drum-pad button-30'} id={instrumentType == 1 ? sound.instrument1 : sound.instrument2}
                    onClick={()=> playAudio(sound.letter)}
                    onKeyDown={handleClick()}>{sound.letter}
              <audio className='clip' id={sound.letter} src={sound.sound1}></audio>
            </button>) 
          }


*/