import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import training from '../data/data'
import style from './menuExercise.module.scss'

export default function MenuExercise({
    showMenuExercise,
    setShowMenuExercise,
}) {
    const [weight, setWeight] = useState(0)
    const [img, setImg] = useState(null)
    const { register, handleSubmit } = useForm()
    function onSubmit(data) {
        setWeight(data)
    }

    useEffect(() => {
        let obj = training.filter(
            (el) => Number(el.id) === Number(showMenuExercise)
        )
        setImg(obj[0].img)
    }, [showMenuExercise])

    return (
        <form className={style.block} onChange={handleSubmit(onSubmit)}>
            <section>
                <img src={`..${img}`} />
            </section>

            <label>
                First approach
                <input type="text" {...register('firstApproach')} />
            </label>
            <label>
                Second approach
                <input type="text" {...register('secondApproach')} />
            </label>
            <label>
                Third approach
                <input type="text" {...register('thirdApproach')} />
            </label>
            <label>
                Fourth approach
                <input type="text" {...register('fourthApproach')} />
            </label>
            <button
                onClick={() => {
                    setShowMenuExercise('')
                }}
            >
                Close
            </button>
        </form>
    )
}
