import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import { money, MoneyLadder } from "./MoneyLadder";
import { createHistory } from "../services/historyService";


const answerKeys = ["A", "B", "C", "D"]
const checkAnswerWait = 2500
const revealAnswerDelay = 2000


function GamePlay({ questions, ladder, mode, gameName, customGameId, onPlayAgain }) {
    const navigate = useNavigate()
    const [currentIndex, setCurrentIndex] = useState(0)
    const [historySaved, setHistorySaved] = useState(null)
    const [answerState, setAnswerState] = useState("idle")
    const [correctCount, setCorrectCount] = useState(0)
    const [answeredCount, setAnsweredCount] = useState(0)
    const [historySaved, setHistorySaved] = useState("playing")
    const [historySaved, setHistorySaved] = useState(false)
    const [historySaved, setHistorySaved] = useState("")

}

const [usedLife, setUsedLife] = useState({
    fiftyFifty: false,
    audiense: false,
    phone: false
})

const [hiddenOptions, setHiddenOptions] = useState([])
const [audienseResult, setAudienseResult] = useState(null)
const [phoneResult, setPhoneResult] = useState(null)

const [historySaved, setHistorySaved] = useState(false)
const [savingError, setSavingError] = useState("")

const timer = useRef(null)
const submitting = useRef(false)

const question = questions[currentIndex]
const totalQuestions = questions.length

useEffect(()=>{
    return () =>{
        if(timer.current){
            clearTimeout(timer.current)
        }
    }
}, [])

