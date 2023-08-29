import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { dataFormExercise } from './layouts/Context'
import style from './adminForm.module.scss'

export default function AdminForm() {
    const { register, handleSubmit } = useForm()
    const dataForm = useContext(dataFormExercise)
    const onSubmit = (data) => {
        dataForm.onWriteData(data)
    }

    return (
        <form onChange={handleSubmit(onSubmit)} className={style.form}>
            <label className={style.labelInput}>
                Name <input type="text" name="title" {...register('title')} />
            </label>
            <label className={style.labelInput}>
                Id <input type="text" name="id" {...register('id')} />
            </label>
            <label className={style.labelInput}>
                Video <input type="text" name="title" {...register('video')} />
            </label>
            <label className={style.labelInput}>
                Image <input type="text" name="title" {...register('image')} />
            </label>
            <label className={style.labelSelect}>
                Category
                <select name="category" {...register('category')}>
                    <option>anterior delta</option>
                    <option>middle delta</option>
                    <option>posterior delta</option>
                    <option>bicep </option>
                    <option>triceps</option>
                    <option>forearm muscle</option>
                    <option>back</option>
                    <option>lumbar muscle</option>
                    <option>press</option>
                    <option>biceps femoris </option>
                    <option>quadriceps</option>
                    <option>calf muscle</option>
                    <option>gluteus maximus</option>
                    <option>abductor muscles</option>
                    <option>adductor muscle</option>
                    <option>core</option>
                </select>
            </label>
            <label className={style.labelSelect}>
                Fitness Level
                <select name="fitnessLevel" {...register('fitnessLevel')}>
                    <option>low</option>
                    <option>middle</option>
                    <option>hight</option>
                </select>
            </label>
            <label className={style.labelSelect}>
                LFC
                <select name="LFC" {...register('LFC')}>
                    <option>true</option>
                    <option>false</option>
                </select>
            </label>
            <label className={style.labelSelect}>
                Sex
                <select name="sex" {...register('sex')}>
                    <option>female</option>
                    <option>male</option>
                    <option>unsex</option>
                </select>
            </label>
            <label className={style.labelSelect}>
                Basic
                <select name="basicExercise" {...register('basicExercise')}>
                    <option>true</option>
                    <option>false</option>
                </select>
            </label>
            <button>Write Exercise</button>
        </form>
    )
}
