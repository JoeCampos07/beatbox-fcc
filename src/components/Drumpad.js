import React, { useState, useEffect } from "react";
import '../stylesheet/drumpad.css'
import Q1 from '../audios/Q1.mp3'
import Q2 from '../audios/Q2.mp3'
import W1 from '../audios/W1.mp3'
import W2 from '../audios/W2.mp3'
import E1 from '../audios/E1.mp3'
import E2 from '../audios/E2.mp3'
import A1 from '../audios/A1.mp3'
import A2 from '../audios/A2.mp3'
import S1 from '../audios/S1.mp3'
import S2 from '../audios/S2.mp3'
import D1 from '../audios/D1.mp3'
import D2 from '../audios/D2.mp3'
import Z1 from '../audios/Z1.mp3'
import Z2 from '../audios/Z2.mp3'
import X1 from '../audios/X1.mp3'
import X2 from '../audios/X2.mp3'
import C1 from '../audios/C1.mp3'
import C2 from '../audios/C2.mp3'


function Drumpad() {

  const keyLetters = [{letter:'Q',
                       instrument1: 'Heater 1',
                       instrument2: 'Chord 1',
                       Q1: Q1,
                       Q2: Q2,
                       index: 0
                      },
                      {letter:'W',
                       instrument1: 'Heater 2',
                       instrument2: 'Chord 2',
                       W1: W1,
                       W2: W2,
                       index: 1
                      },
                      {letter:'E',
                       instrument1: 'Heater 3',
                       instrument2: 'Chord 3',
                       E1: E1,
                       E2: E2,
                       index: 2
                      },
                      {letter:'A',
                       instrument1: 'Heater 4',
                       instrument2: 'Shaker',
                       A1: A1,
                       A2: A2,
                       index: 3
                      },
                      {letter:'S',
                       instrument1: 'Clap',
                       instrument2: 'Open HH',
                       S1: S1,
                       S2: S2,
                       index: 4
                      },
                      {letter:'D',
                       instrument1: 'Open HH',
                       instrument2: 'Closed HH',
                       D1: D1,
                       D2: D2,
                       index: 5
                      },
                      {letter:'Z',
                       instrument1: 'Kick n\' Hat',
                       instrument2: 'Punchy Kick',
                       Z1: Z1,
                       Z2: Z2,
                       index: 6
                      },
                      {letter:'X',
                       instrument1: 'Kick',
                       instrument2: 'Side stick',
                       X1: X1,
                       X2: X2,
                       index: 7
                      },
                      {letter:'C',
                       instrument1: 'Closed HH',
                       instrument2: 'Snare',
                       C1: C1,
                       C2: C2,
                       index: 8
                      }] 

  
  const [power, setPower] = useState(true)

  const handlePower = () => {
    setPower(!power)
    console.log(power)
  }

  const [instrumentType, setType] = useState(1)

  const boxType = () => {
    if (instrumentType == 1){
      setType(2)
    } else {
      setType(1)
    }
  }

  const [displayMsg, SetDisplay] = useState('')

  const updateDisplay = (message) => {
    SetDisplay(message)
  }

  const handleClick = (msg, index, letter, number) => {
    const audio = new Audio(keyLetters[index][`${letter}${number}`])
    audio.play()
    updateDisplay(msg)
    setTimeout(() => {
      updateDisplay('');
    }, 3500)
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


  return(
    <div className='inner-container'>
      <div className='pad-bank'>
        {keyLetters.map(function(data) {
          return (
            <button key={data.letter} className={power ? 'button-20' : 'button-30'} 
          onClick={()=> handleClick(instrumentType == 1 ? `${data.instrument1}` : `${data.instrument2}`, data.index, data.letter, instrumentType)}
          disabled={power}
          >{data.letter}

          </button>
          
            ) 
          })
        }
      </div>
      <div className='controls-container'>
      <label className='switch-names'>Power</label>
      <input class="tgl tgl-skewed" id="cb3" type="checkbox" onClick={() =>handlePower()}/>
      <label class="tgl-btn" data-tg-off="OFF" data-tg-on="ON" for="cb3"></label>
        <div className='state-display'>
          {displayMsg}
        </div>
        <input className='volume range' type='range' 
               min="0" 
               max="100" 
               ></input>
      <label className='switch-names'>Bank</label>
      <input class="tgl tgl-skewed2" id="cb4" type="checkbox" onClick={()=> handleSwitch()}
      disabled={power}/>
      <label class="tgl-btn" data-tg-off="H" data-tg-on="P" for="cb4"></label>
      </div>
      <div className='name-label'>
        MINT
      </div>
    </div>
  )
}

export default Drumpad;
