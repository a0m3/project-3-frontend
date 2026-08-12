import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import { moneyAmount, MoneyLadder } from "./MoneyLadder";
import { createHistory } from "../services/historyService";

import {
    getFiftyFiftyAnswers, getAudienceResult, getPhoneAnswer, checkAnswer
}
    from "../components/helping/gameHelper"

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
        audience: false,
        phone: false
    })

    const [hiddenOptions, setHiddenOptions] = useState([])
    const [audienceResult, setAudienceResult] = useState(null)
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
        setAudienceResult(null)
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

            const correct = checkAnswer(
                index,
                question.correctAnswer
            )

            setAnswerState("revealed")
            setAnsweredCount(count => count + 1)

            if (correct) {
                setCorrectCount(count => count + 1)
            }


            timer.current = setTimeout(() => {

                submitting.current = false

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

            }, revealAnswerDelay)

        }, checkAnswerWait)
    }


    function walkAway() {

        if (answerState !== "idle" || submitting.current) {
            return
        }

        setGameStatus("quit")
    }


    function useFiftyFifty() {

        if (usedLife.fiftyFifty || answerState !== "idle") {
            return
        }

        const hidden = getFiftyFiftyAnswers(
            question.correctAnswer
        )

        setHiddenOptions(hidden)

        setUsedLife({
            ...usedLife,
            fiftyFifty: true
        })
    }


    function useAudience() {

        if (usedLife.audience || answerState !== "idle") {
            return
        }

        const result = getAudienceResult(
            question.correctAnswer
        )

        setAudienceResult(result)

        setUsedLife({
            ...usedLife,
            audience: true
        })
    }


    function usePhone() {

        if (usedLife.phone || answerState !== "idle") {
            return
        }

        const answer = getPhoneAnswer(
            question.correctAnswer
        )

        setPhoneResult(answer)

        setUsedLife({
            ...usedLife,
            phone: true
        })
    }


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
                setSavingError("Could not save game history.")
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

    let moneyWon = 0
    if (correctCount > 0) {
        moneyWon = ladder[correctCount - 1]
    }

    if (gameStatus !== "playing") {
        return (
            <div className="end-screen card">
                {gameStatus === "won" && (
                    <>
                        <div className="emoji">🎉</div>
                        <h1>CONGRATULATIONS!</h1>
                        <p>You are a Millionaire!</p>
                    </>
                )}

                {gameStatus === "lost" && (
                    <>
                        <div className="emoji">✗</div>
                        <h1>Game Over</h1>
                        <p>Better luck next time.</p>
                    </>
                )}

                {gameStatus === "quit" && (
                    <>
                        <div className="emoji">👋</div>
                        <h1>You Walked Away</h1>
                        <p>Better luck next time.</p>
                    </>
                )}

                <div className="final-amount">
                    {moneyAmount(moneyWon)}
                </div>

                <div className="end-stats">
                    <div>
                        <strong>{answeredCount}</strong>
                        Questions Answered
                    </div>
                    <div>
                        <strong>{correctCount}</strong>
                        Correct Answers
                    </div>
                    <div>
                        <strong>{totalQuestions}</strong>
                        Total Questions
                    </div>
                </div>

                <div>

                    {onPlayAgain && (
                        <button
                            className="btn btn-primary"
                            onClick={onPlayAgain}
                        >
                            Play Again
                        </button>
                    )}

                    <button
                        className="btn btn-secondary"
                        onClick={() => navigate("/history")}
                    >
                        View History
                    </button>

                    <button
                        className="btn"
                        onClick={() => navigate("/dashboard")}>
                        Home
                    </button>
                </div>
            </div>
        )
    }

    return (

        <div className="game-page">
            <div className="game-header">
                <button
                    className="btn"
                    onClick={walkAway}>
                    Walk Away
                </button>

                <div>
                    Question {currentIndex + 1} / {totalQuestions}
                </div>

            </div>

            <div className="game-content">
                <div className="question-card">
                    <p className="question-text">
                        {question.question}
                    </p>
                    <div className="answer-grid">
                        {question.options.map((option, index) => {
                            const hidden = hiddenOptions.includes(index)
                            let className = "answer-btn"
                            if (hidden) {
                                className += " hidden"
                            }

                            if (selected === index) {
                                className += " selected"
                            }

                            if (answerState === "revealed") {
                                if (index === question.correctAnswer) {
                                    className += " correct"
                                }
                                if (
                                    index === selected &&
                                    index !== question.correctAnswer
                                ) {
                                    className += "wrong"
                                }
                            }

                            return (
                                <button
                                    key={index}
                                    className={className}
                                    onClick={() => answerQuestion(index)}
                                    disabled={hidden || answerState !== "idle"}>
                                    <span>{answerKeys[index]}</span>{option}
                                </button>

                            )

                        })}

                    </div>

                    {answerState === "checking" && (
                        <p>Checking answer...</p>
                    )}

                    {audienceResult && (
                        <div className="audience-result">
                            <h3>Ask the Audience</h3>
                            {audienceResult.map((percentage, index) => (
                                <p key={index}>
                                    {answerKeys[index]}: {percentage}%
                                </p>
                            ))}
                        </div>
                    )}

                    {phoneResult !== null && (

                        <div className="phone-result">
                            Your friend thinks the answer is {phoneResult}.
                        </div>

                    )}

                </div>

                <div className="lifelines">
                    <button
                        onClick={useFiftyFifty}
                        disabled={usedLife.fiftyFifty}>
                        50:50
                    </button>
                    <button
                        onClick={useAudience}
                        disabled={usedLife.audience}>
                        Ask Audience
                    </button>
                    <button
                        onClick={usePhone}
                        disabled={usedLife.phone}>
                        Phone a Friend
                    </button>
                </div>

                <MoneyLadder ladder={ladder} currentIndex={currentIndex} />
            </div>
        </div>
    )
}


export default GamePlay