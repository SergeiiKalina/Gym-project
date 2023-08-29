import myPhoto from '../image/IMG-39ecee3d968d544e854d0d857e831f16-V-removebg-preview.png'
import style from './aboutMe.module.scss'

function SlideForSlider() {
    return (
        <div className={style.block}>
            <div className={style.blockImg}>
                <img src={myPhoto} className={style.mainPhoto} alt="my photo" />
            </div>
            <div className={style.block_paragraph}>
                <p className={style.paragraphed}>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Expedita repellendus, necessitatibus maxime sed molestias a
                    vero accusamus.
                </p>
            </div>
        </div>
    )
}

export default SlideForSlider
