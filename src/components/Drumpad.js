import React, { useState, useEffect } from "react";
import '../stylesheet/drumpad.css'
import { firstSounds, secondSounds, soundLetter } from "./sources";


function Drumpad() {

  
  /* Activate or deactivate the Drum Pad */
  const [power, setPower] = useState(true)

  const handlePower = () => {
    setPower(!power)
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
    }, 3500)
  }

  /* Play the audios with the mouse click */

  const playAudio = (key) => {
    const audio =  document.getElementById(key);
    audio.currentTime = 0;
    audio.play()
  }

  const handleMouse = (key, info) => {
    playAudio(key)
    updateDisplay(info)
  }
    
  const [pressedKey, setPressedKey] = useState('');

  const handleKeyDown = (event) => {
    
    const keyPressed = event.key.toUpperCase();
    if (firstSounds.some((sound) => sound.letter === keyPressed)) {
      playAudio(keyPressed);
      if(instrumentType === 2) {
        updateDisplay(soundLetter[keyPressed])
      }else{
        updateDisplay(soundLetter[keyPressed.toLowerCase()])
      }

    }else{
      console.log('The key is not mapped')
    }
  }

  const handleKeyUp = () => {
    setPressedKey('');
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  const [volume, setVolume] = useState(50); // Initial volume set to 50%

  const handleVolumeChange = (event) => {
    const newVolume = event.target.value; // Get the new volume value from the input
    setVolume(newVolume);
  }

  return(
    <div className='inner-container' id='drum-machine'>
      <div className='pad-bank'>
        {instrumentType==1 ? ( firstSounds.map(function(sound) {
          return (
            <button key={'button-'+sound.letter} className={power ? 'drum-pad button-20' : 'drum-pad button-30'} id={sound.instrument}
                    onClick={()=> handleMouse(sound.letter, sound.instrument)}
                    disabled={power}>{sound.letter}
              <audio className='clip' id={sound.letter} src={sound.sound}></audio>
            </button>) 
          })) : /* <---- here is my ternary else */
          ((secondSounds.map(function(sound) {
          return (
            <button key={'button-'+sound.letter} className={power ? 'drum-pad button-20' : 'drum-pad button-30'} id={sound.instrument}
                    onClick={()=> handleMouse(sound.letter, sound.instrument)}
                    disabled={power}>{sound.letter}
              <audio className='clip' id={sound.letter} src={sound.sound}></audio>
            </button>) 
          }) ))}
      </div>
      <div className='controls-container'>
        <label className='switch-names'>Power</label>
        <input className="tgl tgl-skewed" id="cb3" type="checkbox" onClick={() =>handlePower()}/>
        <label className="tgl-btn" sound-tg-off="OFF" sound-tg-on="ON" htmlFor="cb3">{power ? 'OFF' : 'ON'}</label>
        <div className='state-display' id='display'>
          {displayMsg}
        </div>
        <input className='volume range' type='range' min="0" max="100" value={volume} onChange={handleVolumeChange}/>
        <label className='switch-names'>Bank</label>
        <input className="tgl tgl-skewed2" id="cb4" type="checkbox" onClick={()=> handleSwitch()}
        disabled={power}/>
        <label className="tgl-btn" sound-tg-off="H" sound-tg-on="P" htmlFor="cb4">{instrumentType == 1 ? 'H' : 'P'}</label>
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

          const HandleKeyDown = (event) => {
    const keyPressed = event.key.toUpperCase()
    if (firstSounds.some((sound) => sound.letter === keyPressed)) {
      setPressedKey(keyPressed);
      playAudio(pressedKey)
    }
    
    if (instrumentType == 1){
      const soundKey = firstSounds.find((sound) => sound.letter === pressedKey)
      setPressedSound(soundKey)
    }else{
      const soundKey = secondSounds.find((sound) => sound.letter === pressedKey)
      setPressedSound(soundKey)
    }

    updateDisplay(pressedSound)
  }

*/