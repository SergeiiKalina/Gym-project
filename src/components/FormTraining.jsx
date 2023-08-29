import { useState } from 'react'
import { useSelector } from 'react-redux'
import { GrFormDown } from 'react-icons/gr'
import styles from './formTraining.module.scss'

export default function FormTraining({ handleSubmit, onSubmit, register }) {
    const isChecked = useSelector((state) => state.filterTraining.isChecked)
    const categories = useSelector((state) => state.filterTraining.categories)
    const [rev, setRev] = useState(false)
    const [close, setClose] = useState(false)
    console.log(rev)
    const reverseArrow = () => {
        setRev((prev) => !prev)
    }
    const closeCategories = () => {
        setRev(false)
        setClose(true)
    }
    return (
        <article
            className={`${styles.aside} ${rev ? styles.mobile : ''}`}
            open={rev}
        >
            <button onClick={reverseArrow} className={styles.buttonList}>
                Categories
                <GrFormDown
                    className={`${styles.arrow}  ${
                        rev ? `${styles.rotate}` : ''
                    }`}
                />
            </button>
            <form
                className={`${styles.nav} ${rev ? '' : styles.toggleNav}`}
                onChange={handleSubmit(onSubmit)}
            >
                {categories.length > 0 &&
                    categories.map((el) => {
                        let str = ''
                        for (let i = 0; i < el.length; i++) {
                            if (i === 0) {
                                str += el[i].toUpperCase()
                            } else {
                                str += el[i]
                            }
                        }

                        return (
                            <label
                                key={el}
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}
                            >
                                {str}
                                <input
                                    type="checkbox"
                                    className={styles.button}
                                    value={el}
                                    checked={isChecked[el] || false}
                                    {...register(el)}
                                />
                            </label>
                        )
                    })}
            </form>
            <button className={styles.closeButton} onClick={closeCategories}>
                Close
            </button>
        </article>
    )
}
