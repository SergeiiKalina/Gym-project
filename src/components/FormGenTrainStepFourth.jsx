import style from './formGenTrainStep.module.scss'

export default function FormGenTrainStepFourth({ register }) {
    return (
        <div className={style.wrapper}>
            <section>
                <h2>Fourth Step</h2>

                <h3>Place Of Training</h3>
                <article className={style.inlineRadio}>
                    <label className={style.radio}>
                        <input
                            type="radio"
                            name="placeOfTraining"
                            value="home"
                            {...register('placeOfTraining')}
                        />
                        Home
                    </label>

                    <label className={style.radio}>
                        <input
                            type="radio"
                            name="placeOfTraining"
                            value="gym"
                            {...register('placeOfTraining')}
                        />
                        Gym
                    </label>
                </article>

                <button type="submit">Fourth Step</button>
            </section>
        </div>
    )
}
