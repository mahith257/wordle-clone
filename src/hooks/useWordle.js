import { useState } from "react"

const useWordle = (solution) => {
    const [turn, setTurn] = useState(0)
    const [currentGuess, setCurrentGuess] = useState('')
    // for formatted guesses
    const [guesses, setGuesses] = useState(Array(6).fill(null))
    // for guesses
    const [history, setHistory] = useState([])
    const [isCorrect, setIsCorrect] = useState(false)
    // {'a':'green'}
    const [usedKeys, setUsedKeys] = useState({})

    // [{key:'a', color: 'yellow'}]
    const formatGuess = () => {
        let solutionArray = [...solution]
        let formattedGuess = [...currentGuess].map((letter, index) => {
            return {key: letter, color: 'grey'} 
        })

        formattedGuess.forEach((obj, index) => {
            if(solutionArray[index] === obj.key){
                obj.color = 'green'
                solutionArray[index] = null
            }
        })

        formattedGuess.forEach((obj, index) => {
            if(solutionArray.includes(obj.key) && obj.color !== 'green'){
                obj.color = 'yellow'
                solutionArray[solutionArray.indexOf(obj.key)] = null
            }
        })

        return formattedGuess;

    }

    const addNewGuesss = (formattedGuess) => {
        if(currentGuess === solution){
            setIsCorrect(true)
        }
        setGuesses(prevGuesses => {
            let newGuesses = [...prevGuesses]
            newGuesses[turn] = formattedGuess
            return newGuesses
        })

        setHistory((prevHistory) => {
            return [...prevHistory, currentGuess]
        })

        setTurn(prevTurn => {
            return prevTurn + 1
        })

        setUsedKeys((prevState) => {
            let newUsedKeys = {...prevState}
            formattedGuess.forEach((letter) => {
                const currentColor = newUsedKeys[letter.key]
                if(letter.color === 'green'){
                    newUsedKeys[letter.key] = "green"
                    return
                }
                if(letter.color === 'yellow' && currentColor !== 'green'){
                    newUsedKeys[letter.key] = "yellow"
                    return
                }
                if(letter.color === 'grey' && currentColor !== 'green' && currentColor !== 'yellow' ){
                    newUsedKeys[letter.key] = "grey"
                    return
                }

            })
            return newUsedKeys
        })

        setCurrentGuess('')
    }

    const handleKeyup = ({ key }) => {
        if(key === "Backspace"){
            setCurrentGuess((prevState) => {
                return prevState.slice(0,-1)
            })
            return
        }
        if(key === "Enter"){
            if(turn > 5){
                return
            }
            if(history.includes(currentGuess)){
                return
            }
            if(currentGuess.length !== 5){
                return
            }
            const guessFormatted = formatGuess()
            addNewGuesss(guessFormatted)
        }
        if(/^[A-Za-z]$/.test(key)){
            if(currentGuess.length < 5){
                setCurrentGuess((prevState) => {
                    return prevState + key
                })
            }
        }
    }

    return {turn, currentGuess, guesses, isCorrect, handleKeyup, usedKeys}
}

export default useWordle