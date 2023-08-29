import style from './formGenTrainStep.module.scss'

export default function FormGenTrainStepOne({ register, nextStep }) {
    return (
        <div className={style.wrapper}>
            <section>
                <h2>First Step</h2>
                <input
                    type="text"
                    placeholder="First Name..."
                    name="firstName"
                    {...register('firstName')}
                />

                <input
                    type="text"
                    placeholder="Last Name..."
                    name="lastName"
                    {...register('lastName')}
                />

                <input
                    type="text"
                    placeholder="Email..."
                    name="email"
                    {...register('email')}
                />

                <select {...register('age')}>
                    <option value="Age">Age</option>
                    <option>{`> 18`}</option>
                    <option>18 - 25</option>
                    <option>25 - 35</option>
                    <option>35 - 45</option>
                    <option>45 - 55</option>
                    <option>{`55 <`}</option>
                </select>
                <article className={style.inlineRadio}>
                    <label className={style.radio}>
                        <input
                            type="radio"
                            name="sex"
                            value="male"
                            {...register('sex')}
                        />
                        Male
                    </label>

                    <label className={style.radio}>
                        <input
                            type="radio"
                            name="sex"
                            value="female"
                            {...register('sex')}
                        />
                        Female
                    </label>
                </article>

                <button onClick={(e) => nextStep(e)}>Second Step</button>
            </section>
        </div>
    )
}
