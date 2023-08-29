import React, { useEffect, useState } from 'react'
import { SlCheck, SlClose, SlPlus } from 'react-icons/sl'
import { FcStart } from 'react-icons/fc'
import { useDispatch, useSelector } from 'react-redux'
import { LuChevronDown } from 'react-icons/lu'
import {
    changeCompleted,
    changeStepForm,
    changeBul,
    changeBulTextArea,
    writeArr,
    setIndexStartTraining,
} from '../store/generatorTrainingReduser'
import DownloadButton from './DownloadButton'
import AddExercise from './AddExercise'
import style from './finishedTraining.module.scss'
import MenuExercise from './MenuExercise'
import { useNavigate } from 'react-router-dom'

function FinishedTraining({ onDataChange, onShowTextArea }) {
    const value = useSelector((state) => state.training.arr)
    const bulTextArea = useSelector((state) => state.training.bulTextArea)
    const data = useSelector((state) => state.training.formData)
    const [reps, setReps] = useState(null)

    const [showList, setShowList] = useState({
        0: '0',
        10: '10',
        20: '20',
    })
    const [showDialog, setShowDialog] = useState({
        0: false,
        10: false,
        20: false,
    })
    const [thisCategories, setThisCategories] = useState([])
    const [thisDragElement, setThisDragElement] = useState(null)
    const [checked, setChecked] = useState(0)
    const [currentTarget, setCurrentTarget] = useState(null)
    const [startTraining, setStartTraining] = useState(9999)
    const [showMenuExercise, setShowMenuExercise] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()
    function showStartTraining(index) {
        dispatch(setIndexStartTraining(index))
        navigate('/start_training')
    }
    const toggleTodo = (index, id) => {
        const clonedValue = structuredClone(value)

        clonedValue[index] = clonedValue[index].map((el) =>
            el.id === id
                ? {
                      ...el,
                      isComplited: !el.isComplited,
                  }
                : el
        )
        let count = 0
        clonedValue.forEach((el) => {
            el.forEach((element) => {
                if (element.isComplited === true) {
                    count += 1
                    setChecked(count)
                }
            })
        })
        if (count === 0) {
            setChecked(0)
        }

        dispatch(writeArr(clonedValue))
    }

    useEffect(() => {
        if (data.bodyType === 'skinny') {
            setReps(8)
        }
    }, [value])
    const deleteExercises = (index, id) => {
        const clonedValue = structuredClone(value)
        clonedValue[index] = clonedValue[index].filter((el) => el.id !== id)
        dispatch(changeCompleted(clonedValue))
        onDataChange(clonedValue)
    }

    function toggleList(num, id) {
        if (showList[num] === id) {
            setShowList({ ...showList, [num]: false })
        } else if (showList[num] === false) {
            setShowList({ ...showList, [num]: id })
        }
    }

    function toggleDialog(key, id, element) {
        setShowMenuExercise('')
        const newShowDialog = {}
        let set = new Set()
        for (let el of element) {
            set.add(el.category)
        }
        setThisCategories(Array.from(set))
        if (showDialog[key] === id) {
            setShowDialog({ ...showDialog, [key]: false })
        } else if (showDialog[key] === false) {
            for (let prop in showDialog) {
                newShowDialog[prop] = prop === key.toString() ? id : false
            }
            setShowDialog(newShowDialog)
        }
    }

    const dragStart = (e, currentElementIndex, arrayIndex) => {
        setCurrentTarget(e.currentTarget)
        setThisDragElement(value[arrayIndex][currentElementIndex])
    }

    const drag = (e) => {
        const target = e.currentTarget.style

        target.opacity = '1'
        target.transition = 'all 1s ease'
    }

    const dragEnter = (e) => {
        const target = e.currentTarget.style
        target.paddingTop = '0'
    }

    const dragOver = (e) => {
        e.preventDefault()
        if (currentTarget === e.currentTarget) {
            return
        }
        const target = e.currentTarget.style

        target.transition = 'all 0.5s ease'
        target.paddingTop = '60px'
    }

    const dragLeave = (e) => {
        const target = e.currentTarget.style

        target.paddingTop = '0'
        target.transition = 'all 1s ease'
    }

    const dragDrop = (e, currentElementIndex, arrayIndex) => {
        e.preventDefault()
        const target = e.currentTarget.style

        target.paddingTop = '0'
        target.transition = 'padding-top 0.3s ease, transform 0.3s ease'
        const clonedValue = structuredClone(value)

        clonedValue[arrayIndex] = clonedValue[arrayIndex].filter(
            (el) => el.id !== thisDragElement.id
        )
        clonedValue[arrayIndex].splice(currentElementIndex, 0, thisDragElement)
        dispatch(writeArr(clonedValue))
        let animationFrameId
        let paddingValue = 60

        const animateDrop = () => {
            paddingValue -= 5
            if (paddingValue <= 0) {
                paddingValue = 0
                target.transition = 'all 0.3s ease'
                cancelAnimationFrame(animationFrameId)
            } else {
                animationFrameId = requestAnimationFrame(animateDrop)
            }
            target.paddingTop = `${paddingValue}px`
        }

        animationFrameId = requestAnimationFrame(animateDrop)
    }

    const dragEnd = (e) => {
        e.preventDefault()
        const target = e.currentTarget.style

        target.transform = 'scale(1)'
        target.paddingTop = '0'
        target.transition = 'all 1s ease'
    }

    function openInfoExercise(e) {
        for (let key in showDialog) {
            setShowDialog((prev) => ({ ...prev, [key]: false }))
        }
        console.log(showDialog)
        if (e.currentTarget.id === showMenuExercise) {
            setShowMenuExercise('')
        } else {
            setShowMenuExercise(e.currentTarget.id)
        }
    }

    return (
        <div className={style.container}>
            <h2 className={style.head}>
                Exercises complited:
                <span>{checked}</span>
            </h2>

            {value.map((el, index) => {
                return (
                    <article
                        key={el[0].id}
                        className={`${style.article} ${
                            showList[el[0].id] === el[0].id.toString()
                                ? style.open
                                : null
                        }`}
                    >
                        <div className={style.titleButton}>
                            <button
                                className={`${style.button} ${
                                    value[index].length === 1
                                        ? style.hiddenButton
                                        : null
                                }`}
                                id={el[0].id}
                                onClick={(e) =>
                                    toggleList(
                                        e.currentTarget.id,
                                        e.currentTarget.id
                                    )
                                }
                            >
                                {el[0].title}
                                <LuChevronDown
                                    className={style.buttonCheckAll}
                                />
                            </button>
                            <div className={style.addExerciseBlock}>
                                <button
                                    className={style.addExerciseButton}
                                    onClick={() => {
                                        toggleDialog(el[0].id, el[0].id, el)
                                    }}
                                >
                                    Add Exercise
                                    <SlPlus className={style.addExercise} />
                                </button>
                                {showDialog[el[0].id] === el[0].id ? (
                                    <AddExercise
                                        thisCategories={thisCategories}
                                        currentArrIndex={index}
                                    />
                                ) : null}
                                <button
                                    className={style.startTraining}
                                    onClick={() => showStartTraining(index)}
                                >
                                    Start this training
                                    <FcStart className={style.startExercise} />
                                </button>
                            </div>
                        </div>
                        <ul className={style.list}>
                            {el.map((element, i) => {
                                if (
                                    element.id === 0 ||
                                    element.id === 10 ||
                                    element.id === 20
                                ) {
                                    return
                                }
                                return (
                                    <div
                                        className={style.containerTodo}
                                        draggable={true}
                                        key={element.id}
                                        id={element.id}
                                        onDragStart={(e) =>
                                            dragStart(e, i, index)
                                        }
                                        onDragEnter={(e) => dragEnter(e)}
                                        onDragOver={(e) => dragOver(e)}
                                        onDragLeave={(e) => dragLeave(e)}
                                        onDrop={(e) => dragDrop(e, i, index)}
                                        onDragEnd={(e) => dragEnd(e)}
                                        onDrag={(e) => drag(e)}
                                    >
                                        <li>
                                            <div
                                                style={{
                                                    position: 'relative',
                                                    width: '90%',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                }}
                                                id={element.id}
                                                onClick={(e) =>
                                                    openInfoExercise(e)
                                                }
                                                title={element.title}
                                            >
                                                {`${i}. ${
                                                    element.title.length > 17
                                                        ? `${element.title.slice(
                                                              0,
                                                              17
                                                          )}...`
                                                        : element.title
                                                }  ${
                                                    reps ? `4 x ${reps}` : ''
                                                }`}
                                                <div
                                                    className={
                                                        style.blockStartExercise
                                                    }
                                                >
                                                    <aside
                                                        className={style.aside}
                                                    >
                                                        Start the exercise
                                                    </aside>
                                                    {showMenuExercise ==
                                                    element.id ? (
                                                        <MenuExercise
                                                            showMenuExercise={
                                                                showMenuExercise
                                                            }
                                                            setShowMenuExercise={
                                                                setShowMenuExercise
                                                            }
                                                        />
                                                    ) : null}
                                                </div>
                                            </div>
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    flexWrap: 'nowrap',
                                                }}
                                            >
                                                <SlCheck
                                                    style={
                                                        element.isComplited
                                                            ? {
                                                                  color: '#B5B8B1',
                                                                  cursor: 'pointer',
                                                              }
                                                            : {
                                                                  color: ' #00ff00',
                                                                  cursor: 'pointer',
                                                              }
                                                    }
                                                    className={style.buttonTodo}
                                                    onClick={() =>
                                                        toggleTodo(
                                                            index,
                                                            element.id
                                                        )
                                                    }
                                                />
                                                <SlClose
                                                    onClick={() =>
                                                        deleteExercises(
                                                            index,
                                                            element.id
                                                        )
                                                    }
                                                    style={{
                                                        color: 'red',
                                                        cursor: 'pointer',
                                                        padding: '0 0 0 10px',
                                                    }}
                                                    className={style.buttonTodo}
                                                />
                                            </div>
                                        </li>
                                    </div>
                                )
                            })}
                        </ul>
                    </article>
                )
            })}

            <section className={style.blockButton}>
                <div>
                    <button onClick={onShowTextArea} className={style.button}>
                        {bulTextArea ? 'Hide Text' : 'Show Text'}
                    </button>
                    <button
                        className={`${style.btnBackToForm} ${style.button}`}
                        onClick={() =>
                            dispatch(
                                changeBul(false),
                                dispatch(changeBulTextArea(false)),
                                dispatch(changeStepForm(1))
                            )
                        }
                    >
                        Back to form
                    </button>
                </div>
                {bulTextArea ? <DownloadButton /> : null}
            </section>
        </div>
    )
}

export default FinishedTraining
