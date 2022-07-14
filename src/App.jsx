import React, { useEffect, useState } from "react";
import Die from "./Die";
import {nanoid} from "nanoid";
import './index.css';
import Confetti  from "react-confetti";


const App=()=> {

    const [dice, setDice]=useState(allNewDice())
    const [tenzies, setTenzies]=useState(false)

    useEffect(()=>{
        const allHeld= dice.every(die => die.isHeld)
        const firstValue=dice[0].value;
        const allSameValue=dice.every(die => die.value===firstValue)

        if (allHeld && allSameValue){
            setTenzies(true)
        }

    }, [dice])


    function allNewDice(){
        const newDice=[]
        for(let i=0;i<10;i++){
            newDice.push(generateNewDie())
        }
        return newDice
    }

    function rollDice(){
        if(!tenzies){
        setDice(oldDice => oldDice.map(die => {
            return die.isHeld ? die : generateNewDie()
        }))
    }
        else{
            setTenzies(false)
            setDice(allNewDice())
        }

    }


    function generateNewDie(){
        return {
            value: Math.ceil(Math.random()*6),
            isHeld: false,
            id: nanoid()
        }
    }
    
    function holdDice(id){
        setDice(oldDice => oldDice.map(die => {
            return die.id===id ? {...die, isHeld: !die.isHeld}:
            die
        }))
    }
    
 
    const diceElements= dice.map(die => 
    <Die key={die.id} value={die.value} 
    isHeld={die.isHeld} holdDice={()=>holdDice(die.id)}/>)

return(
    <main>
        {tenzies && <><Confetti /><h4>You won</h4></>}
        <h1>Tenzies</h1>
        <p>Roll until all die are the same. Click each dice to freeze it at its current value between rolls.</p>
        <div className="dice--container">
            {diceElements}
        </div>
        <button className="button1" onClick={rollDice}>
            {tenzies ? `Play Again` : `Roll`}</button>
    </main> 

)};

export default App;