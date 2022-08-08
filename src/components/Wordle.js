import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import useWordle from "../hooks/useWordle";
import Grid from "./Grid";
import Keypad from "./Keypad";
import Modal from "./Modal";

export default function Wordle({ solution }) {
    const [showModal, setShowModal] = useState(false)
    const {currentGuess, handleKeyup, guesses, isCorrect, turn, usedKeys } = useWordle(solution)
    
    useEffect(() => {
        window.addEventListener("keyup", handleKeyup)

        if(isCorrect){
            window.removeEventListener("keyup", handleKeyup)
            setTimeout(() => {
                setShowModal(true)
            }, 2000)
        }

        if(turn > 5){
            window.removeEventListener("keyup", handleKeyup)
            setTimeout(() => {
                setShowModal(true)
            }, 2000)
        }

        return () => window.removeEventListener("keyup", handleKeyup)
    }, [handleKeyup, isCorrect, turn])
    
    useEffect(() => {
        // console.log(guesses, turn, isCorrect)
    },[guesses, turn, isCorrect])

    return (
        <div>
            <Grid currentGuess = {currentGuess} guesses = {guesses} turn = {turn} />
            <Keypad usedKeys = {usedKeys} handleKeyup = {handleKeyup}  />
            {showModal && <Modal isCorrect = {isCorrect} turn = {turn} solution = {solution} />}
        </div>
    );
}
