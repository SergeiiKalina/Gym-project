import React, { Suspense, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import {
    changeActiveId,
    changeIsChecked,
    writeArrTraining,
    writeCategories,
    writeData,
} from '../store/filterTrainingSlice'
import FormTraining from './FormTraining'
import training from '../data/data'
import NotTraining from './NotTraining'

import styles from './training.module.scss'

const Pagination = React.lazy(() => import('./Pagination'))

function Training() {
    const dispatch = useDispatch()
    const data = useSelector((state) => state.filterTraining.data)
    const { register, handleSubmit } = useForm({})
    const arrTraining = useSelector((state) => state.filterTraining.arrTraining)
    const [arr, setArr] = useState(arrTraining.slice(0, 18))
    const [count, setCount] = useState(1)

    const onSubmit = (data) => {
        dispatch(writeData(Object.values(data)))
        dispatch(changeIsChecked(data))
    }
    useEffect(() => {
        dispatch(
            writeArrTraining(
                training.filter((item) => data.includes(item.category))
            )
        )
    }, [data])

    useEffect(() => {
        let set = new Set()
        for (let el of training) {
            set.add(el.category)
        }

        dispatch(writeCategories(Array.from(set)))
    }, [])

    const paginationList = (e, countItems) => {
        if (e.currentTarget.name === 'left') {
            if (count === 1) {
                setCount(1)
                dispatch(changeActiveId(count))
            } else {
                setCount((prev) => prev - 1)

                dispatch(changeActiveId(count - 1))
            }
        }
        if (e.currentTarget.name === 'right') {
            if (count === countItems) {
                setCount(countItems)

                dispatch(changeActiveId(count))
            } else {
                setCount((prev) => prev + 1)

                dispatch(changeActiveId(count + 1))
            }
        }
        if (e.currentTarget.value) {
            setCount(Number(e.currentTarget.id))
            if (e.currentTarget.id) {
                dispatch(changeActiveId(Number(e.currentTarget.id)))
            }
        }
    }
    useEffect(() => {
        let notePage = 18
        let start = (count - 1) * notePage
        let end = start + notePage
        setArr(arrTraining.slice(start, end))
    }, [count, arrTraining])

    return (
        <section className={styles.section}>
            <article className={styles.article}>
                <FormTraining
                    handleSubmit={handleSubmit}
                    onSubmit={onSubmit}
                    register={register}
                />
                <div className={styles.blockTrening}>
                    {arr.length ? (
                        arr.map((tr) => {
                            const { id, img, title } = tr
                            return (
                                <div key={id} className={styles.trainingItem}>
                                    <img src={img} alt="img" />
                                    <p>{title}</p>
                                </div>
                            )
                        })
                    ) : (
                        <NotTraining />
                    )}
                </div>
            </article>
            <Suspense fallback={<h1>Loading...</h1>}>
                <Pagination paginationList={paginationList} />
            </Suspense>
        </section>
    )
}
export default Training
