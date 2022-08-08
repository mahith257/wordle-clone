import { useState } from 'react';
import './Keypad.css'

let letters = [
    {"key": "a"},
    {"key": "b"},
    {"key": "c"},
    {"key": "d"},
    {"key": "e"},
    {"key": "f"},
    {"key": "g"},
    {"key": "h"},
    {"key": "i"},
    {"key": "j"},
    {"key": "k"},
    {"key": "l"},
    {"key": "m"},
    {"key": "n"},
    {"key": "o"},
    {"key": "p"},
    {"key": "q"},
    {"key": "r"},
    {"key": "s"},
    {"key": "t"},
    {"key": "Enter"},
    {"key": "u"},
    {"key": "v"},
    {"key": "w"},
    {"key": "x"},
    {"key": "y"},
    {"key": "z"},
    {"key": "Backspace"}
  ]

export default function Keypad({ usedKeys, handleKeyup }) {

    // eslint-disable-next-line
    const [allLetters, setAllLetters] = useState(letters)
    
    return (
        <div className='keypad'>
            {allLetters && allLetters.map(letter => {
                const color = usedKeys[letter.key]
                let enterKey, backspaceKey
                if(letter.key === "Enter"){
                    enterKey = true
                }
                if(letter.key === "Backspace"){
                    backspaceKey = true
                }
                return (
                    <div key={letter.key} className={`${color} ${enterKey && 'enter-key'} ${backspaceKey && 'backspace-key'}`} style={{cursor: 'pointer'}} onClick={() => handleKeyup(letter)}>
                        {letter.key.toUpperCase()}
                    </div>
                )
            })}
        </div>
    );
}
