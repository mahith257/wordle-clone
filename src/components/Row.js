import './Row.css'

export default function Row({ guess, currentGuess }) {
    if(guess){
        return (
            <div className='grid-row past'>
                {guess.map((obj, index) => (
                    <div key={index} className={obj.color}>{obj.key}</div>
                ))}
            </div>
        )
    }

    if(currentGuess){
        let letters = currentGuess.split('')

        return (
            <div className="grid-row current">
                {letters.map((letter, index) => (
                    <div key={index} className='filled'>
                        {letter}
                    </div>
                ))}
                {[...Array(5 - letters.length)].map((val, index) => (
                    <div key={index}></div>
                ))}
            </div>
        )
    }

    return (
        <div className="grid-row">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
}
