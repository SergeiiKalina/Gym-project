import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import training from "../../../data/data"
import "./menuExercise.scss"

interface IMenuExercise {
    showMenuExercise: number | string
    setShowMenuExercise: (prop: string) => void
}
interface IDataForm {
    firstApproach: string | number
    secondApproach: string | number
    thirdApproach: string | number
    fourthApproach: string | number
}

export default function MenuExercise({
    showMenuExercise,
    setShowMenuExercise,
}: IMenuExercise): React.JSX.Element {
    const [weight, setWeight] = useState<IDataForm | null>()
    const [img, setImg] = useState<null | string>(null)
    const { register, handleSubmit } = useForm<IDataForm>()
    function onSubmit(data: IDataForm) {
        setWeight(data)
    }

    useEffect(() => {
        let obj = training.filter(
            (el) => Number(el.id) === Number(showMenuExercise)
        )
        setImg(obj[0].img)
    }, [showMenuExercise])

    return (
        <form className="menu_exercise_block" onChange={handleSubmit(onSubmit)}>
            <section>
                <img src={`..${img}`} />
            </section>

            <label>
                First approach
                <input type="text" {...register("firstApproach")} />
            </label>
            <label>
                Second approach
                <input type="text" {...register("secondApproach")} />
            </label>
            <label>
                Third approach
                <input type="text" {...register("thirdApproach")} />
            </label>
            <label>
                Fourth approach
                <input type="text" {...register("fourthApproach")} />
            </label>
            <button
                onClick={() => {
                    setShowMenuExercise("")
                }}
            >
                Close
            </button>
        </form>
    )
}
