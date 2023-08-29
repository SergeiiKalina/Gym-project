import style from './formGenTrainStep.module.scss'

export default function FormGenTrainStepThird({ register, nextStep }) {
    return (
        <div className={style.wrapper}>
            <section>
                <h2>Third Step</h2>

                <h3>Place Of Training</h3>
                <article>
                    <select {...register('lifestyle')}>
                        <option value="lifestyle">Lifestyle</option>
                        <option value="passive">Passive</option>
                        <option value="moderate">Moderate</option>
                        <option value="high">High</option>
                    </select>
                    <select {...register('problems')} multiple>
                        <option value="">
                            Problems with the musculoskeletal system
                        </option>
                        <option value="back">Back</option>
                        <option value="elbows">Elbows</option>
                        <option value="shoulders">Shoulders</option>
                        <option value="knees">Knees</option>
                        <option value="hip joint">Hip Joint</option>
                    </select>
                </article>
                <button onClick={nextStep}>Fourth Step</button>
            </section>
        </div>
    )
}
