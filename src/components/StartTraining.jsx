import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import ReactDOM from 'react-dom'
import EndTraining from './EndTraining'
import style from './startTraining.module.scss'

export default function StartTraining() {
    const index = useSelector((state) => state.training.startTrainingIndex)
    const value = useSelector((state) => state.training.arr)
    const [numExercise, setNumExercise] = useState(1)
    const [showEndButton, setShowEndButton] = useState(false)
    const [exercise, setExercise] = useState(value[index][numExercise])
    const [titleExercise, setTitleExercise] = useState(
        generateProcessedTitle(value[index][1].title)
    )
    const [showEndTraining, setShowEndTraining] = useState(false)
    const [showTimer, setShowTimer] = useState(false)
    const [workTime, setWorkTime] = useState(0)
    const { register, handleSubmit } = useForm()
    const [infoApproach, setInfoApproach] = useState({})
    const [buttonValue, setButtonValue] = useState('Go')
    const [totalWeight, setTotalWeight] = useState(0)

    function generateProcessedTitle(title) {
        const newTitle = title.replaceAll(' ', '')
        let str = ''
        for (let i = 0; i < newTitle.length; i++) {
            if (i === 0) {
                str += newTitle[i].toLowerCase()
            } else {
                str += newTitle[i]
            }
        }
        return str
    }

    useEffect(() => {
        let newTitle = exercise.title.replaceAll(' ', '')
        let str = ''
        for (let i = 0; i < newTitle.length; i++) {
            if (i === 0) {
                str += newTitle[i].toLowerCase()
            } else {
                str += newTitle[i]
            }
        }
        setTitleExercise(str)
    }, [exercise])

    function calculateWeight(infoApproach) {
        let sum = 0

        for (let key in infoApproach) {
            for (let i = 0; i < infoApproach[key].length; i++) {
                sum += Number(infoApproach[key][i])
            }
        }
        setTotalWeight(sum)
        setShowEndTraining(true)
    }

    function onTimer(e) {
        if (e.target.value === 'Go') {
            setButtonValue('Work \n')
            setWorkTime(60)
        }
        if (e.target.value === 'Rest \n') {
            setButtonValue('Rest \n')
            setWorkTime(90)
        }
        setShowTimer(true)
    }
    function increment() {
        if (value[index].length - 2 === numExercise) {
            setShowEndButton(true)
        }
        if (value[index].length - 1 === numExercise) {
            return
        } else {
            setShowTimer(false)
            setNumExercise((prev) => prev + 1)
            setButtonValue('Go')
        }
    }
    function decrement() {
        if (numExercise === 1) {
            return
        } else {
            setShowTimer(false)
            setNumExercise((prev) => prev - 1)
            setButtonValue('Go')
        }
    }

    useEffect(() => {
        setExercise(value[index][numExercise])
    }, [numExercise, value, index])

    useEffect(() => {
        if (workTime === 0 && buttonValue === 'Work \n') {
            setShowTimer(false)
            setButtonValue('Rest \n')
        }
        if (workTime === 0 && buttonValue === 'Rest \n') {
            setShowTimer(false)
            setButtonValue('Go')
        }
    }, [workTime])

    useEffect(() => {
        let interval
        if (showTimer && workTime > 0) {
            interval = setInterval(() => {
                setWorkTime((prev) => prev - 1)
            }, 1000)
        } else if (workTime === 0) {
            clearInterval(interval)
            setShowTimer(false)
        }
        return () => {
            clearInterval(interval)
        }
    }, [showTimer, workTime])

    function onSubmit(data) {
        setInfoApproach(data)
    }

    const closeModal = () => {
        setShowEndTraining(false)
    }

    return (
        <>
            {showEndTraining ? (
                <EndTraining
                    totalWeight={totalWeight}
                    closeModal={closeModal}
                />
            ) : (
                <section className={style.section}>
                    <article className={style.infoBlock}>
                        <img src={exercise.img} />
                        <output>{`${numExercise}/${
                            value[index].length - 1
                        }`}</output>
                        <div>{exercise.title}</div>
                    </article>

                    <article className={style.blockApproach}>
                        <form onChange={handleSubmit(onSubmit)}>
                            <label>
                                First approach
                                <input
                                    type="text"
                                    {...register(`${titleExercise}[${0}]`)}
                                />
                            </label>
                            <label>
                                Second approach
                                <input
                                    type="text"
                                    {...register(`${titleExercise}[${1}]`)}
                                />
                            </label>
                            <label>
                                Third approach
                                <input
                                    type="text"
                                    {...register(`${titleExercise}[${2}]`)}
                                />
                            </label>
                            <label>
                                Fourth approach
                                <input
                                    type="text"
                                    {...register(`${titleExercise}[${3}]`)}
                                />
                            </label>
                        </form>
                    </article>
                    <article className={style.blockButton}>
                        <button
                            className={style.buttonDirection}
                            onClick={decrement}
                        >
                            Prev
                        </button>
                        {showTimer ? (
                            <button
                                className={style.buttonGo}
                                onClick={(e) => onTimer(e)}
                                value={buttonValue}
                            >
                                {buttonValue}
                                {workTime}
                            </button>
                        ) : (
                            <button
                                className={style.buttonGo}
                                onClick={(e) => onTimer(e)}
                                value={buttonValue}
                            >
                                {buttonValue}
                            </button>
                        )}
                        {showEndButton ? (
                            <button
                                className={style.buttonDirection}
                                onClick={() => calculateWeight(infoApproach)}
                            >
                                End
                            </button>
                        ) : (
                            <button
                                className={style.buttonDirection}
                                onClick={increment}
                            >
                                Next
                            </button>
                        )}
                    </article>
                </section>
            )}
        </>
    )
}
