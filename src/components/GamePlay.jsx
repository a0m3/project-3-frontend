import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import { money, MoneyLadder } from "./MoneyLadder";
import { createHistory } from "../services/historyService";

import {
    getFiftyFiftyAnswers,
    getAudienceResult,
    getPhoneAnswer,
    checkAnswer
} from "../components/helping/gameHelper"


const answerKeys = ["A", "B", "C", "D"]
const checkAnswerWait = 2500
const revealAnswerDelay = 2000


function GamePlay({ questions, ladder, mode, gameName, customGameId, onPlayAgain }) {
    const navigate = useNavigate()
    const [currentIndex, setCurrentIndex] = useState(0)
    const [selected, setSelected] = useState(null)
    const [answerState, setAnswerState] = useState("idle")
    const [correctCount, setCorrectCount] = useState(0)
    const [answeredCount, setAnsweredCount] = useState(0)
    const [gameStatus, setGameStatus] = useState("playing")



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

useEffect(() => {
    return () => {
        if (timer.current) {
            clearTimeout(timer.current)
        }
    }
}, [])

function resetQuestion() {
    setSelected(null)
    setAnswerState("idle")
    setHiddenOptions([])
    setAudienseResult(null)
    setPhoneResult(null)
}

function answerQuestion(index) {
    if (answerState !== "idle" || submitting.current) {
        return
    }

    submitting.current = true
    setSelected(index)
    setAnswerState("checking")

    timer.current = setTimeout(() => {
        const correct = index === question.correctAnswer

        setAnswerState("revealed")
        setAnsweredCount(count => count + 1)

        if (correct) {
            setCorrectCount(count => count + 1)
        }

        timer.current = setTimeout(() => {
            submitting.current(false)

            if (!correct) {
                setGameStatus("lost")
                return
            }

            if (currentIndex + 1 === totalQuestions) {
                setGameStatus("won")
                return
            }

            setCurrentIndex(index => index + 1)
            resetQuestion()
        }, 2000)
    }, 2500)

    function walkAway() {
        if (answerState !== "idle" || submitting.current) {
            return
        }
        setGameStatus("quit")
    }


    const wrong = [0, 1, 2, 3].filter(
        index => index !== question.correctAnswer
    );

    wrong.sort(() => Math.random() - 0.5)

    setHiddenOptions(wrong.slice(0, 2))

    setUsedLife({
        ...usedLife,
        fiftyFifty: true
    });

    useEffect(() => {
        if (gameStatus === "playing" || historySaved) {
            return
        }

        async function saveGame() {
            try {
                await createHistory({
                    mode: mode,
                    gameName: gameName,
                    customGame: customGameId || null,
                    totalQuestions: totalQuestions,
                    questionsAnswered: answeredCount,
                    correctCount: correctCount,
                    status: gameStatus
                })

                setHistorySaved(true)
            } catch (err) {
                console.log(err)

                setHistorySaved(true)
            }
        }

        saveGame()
    }, [
        gameStatus,
        historySaved,
        mode,
        gameName,
        customGameId,
        totalQuestions,
        answeredCount,
        correctCount
    ])
}
}


export default GamePlay