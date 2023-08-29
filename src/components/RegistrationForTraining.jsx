import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import style from './registrationForTraining.module.scss'

function RegistrationForTraining() {
    const { register, handleSubmit } = useForm()
    const [data, setData] = useState({})

    const onSubmit = (data) => {
        setData(data)
    }

    return (
        <div className={style.wrapper}>
            <form onChange={handleSubmit(onSubmit)}>
                <h2>Registration Form</h2>
                <input
                    type="text"
                    placeholder="First Name"
                    {...register('firstName')}
                />

                <input
                    type="text"
                    placeholder="Last Name"
                    {...register('lastName')}
                />

                <input
                    type="email"
                    placeholder="Email Address"
                    {...register('emailAddress')}
                />

                <input
                    type="tel"
                    placeholder="Number Phone"
                    {...register('numberPhone')}
                />

                <textarea
                    className={style.textarea}
                    placeholder="About Self"
                    {...register('aboutself')}
                ></textarea>

                <button>Send</button>
            </form>
        </div>
    )
}

export default RegistrationForTraining
