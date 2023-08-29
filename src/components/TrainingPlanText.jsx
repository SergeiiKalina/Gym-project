import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { writeTxtPlan } from '../store/generatorTrainingReduser'
import style from './trainingPlanText.module.css'

function TrainingPlanText() {
    const plan = useSelector((state) => state.training.arr)
    let title = '\xA0\xA0 Training plan \n'
    let newPlan = useMemo(() => plan, [plan])
    const dispatch = useDispatch()
    let str = useSelector((state) => state.training.textPlan)
    useEffect(() => {
        str = ''
        newPlan.forEach((element, i) => {
            if (element.length === 1) {
                return
            }
            element.forEach((el, index) => {
                if (el.id === 0 || el.id === 10 || el.id === 20) {
                    str += '\n' + '\xA0\xA0' + el.title + '\n'

                    return
                }
                str +=
                    '\xA0\xA0' +
                    Number(index) +
                    '.' +
                    '\xA0' +
                    el.title +
                    ' ' +
                    '-' +
                    ' ' +
                    '4x15' +
                    '\n'
            })
        })
        dispatch(writeTxtPlan(str))
    }, [newPlan])

    return (
        <div
            style={{
                width: '100%',
                height: 'auto',
                display: 'flex',
                margin: '78px auto 0 auto',
            }}
        >
            <textarea
                value={str ? title + str : '\xA0\xA0 No Training plan'}
                className={style.textarea}
                readOnly
            ></textarea>
        </div>
    )
}

export default TrainingPlanText
