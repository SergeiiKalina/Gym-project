import FormGeneratorTraining from './FormGeneratorTraining'
import FinishedTraining from './FinishedTraining'
import TrainingPlanText from './TrainingPlanText'
import style from './generatorTraining.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { changeBulTextArea, writeArr } from '../store/generatorTrainingReduser'
import React from 'react'

function GeneratorTraining() {
    const dispatch = useDispatch()
    const bul = useSelector((state) => state.training.bul)
    const bulTextArea = useSelector((state) => state.training.bulTextArea)

    const handleDataChange = (newArr) => {
        dispatch(writeArr(newArr))
    }

    const handlerShowTextArea = () => {
        if (bulTextArea) {
            dispatch(changeBulTextArea(false))
        }
        if (!bulTextArea) {
            dispatch(changeBulTextArea(true))
        }
    }

    return (
        <div>
            <h2 className={style.header}>Generator Form</h2>
            <div className={style.block}>
                {!bul && (
                    <FormGeneratorTraining onDataChange={handleDataChange} />
                )}

                <section className={style.section}>
                    {bul ? (
                        <FinishedTraining
                            onDataChange={handleDataChange}
                            onShowTextArea={handlerShowTextArea}
                            bulTextArea={bulTextArea}
                        />
                    ) : (
                        ''
                    )}
                    {bulTextArea ? <TrainingPlanText /> : ''}
                </section>
            </div>
        </div>
    )
}
export default GeneratorTraining
