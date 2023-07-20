import style from './formGenTrainStep.module.scss'
export default function FormGenTrainStepTwo({ register, nextStep }) {
    return (
        <div className={style.wrapper}>
            <section>
                <h2>Second Step</h2>
                <select {...register('bodyType')}>
                    <option value="body type">Body Type</option>
                    <option value="skinny">Skinny</option>
                    <option value="medium">Medium</option>
                    <option value="overweight">Overweight</option>
                </select>

                <select {...register('goal')}>
                    <option value="goal">Goal</option>
                    <option value="weightMaintenance">
                        Weight Maintenance
                    </option>
                    <option value="weightGain">Weight Gain</option>
                    <option value="weightLoss">Weight Loss</option>
                </select>
                <select {...register('focus')}>
                    <option value="focus">Focus</option>
                    <option value="fullBody">Full Body</option>
                    <option value="upperBody">Weight Gain</option>
                    <option value="legs">Legs</option>
                    <option value="hand">Hand</option>
                    <option value="press">Press</option>
                </select>
                <select {...register('fitnessLevel')}>
                    <option value="fitnessLevel">Fitness Level</option>
                    <option value="low">Low</option>
                    <option value="middle">Average</option>
                    <option value="high">High</option>
                </select>
                <button onClick={(e) => nextStep(e)}>Third Step</button>
            </section>
        </div>
    )
}