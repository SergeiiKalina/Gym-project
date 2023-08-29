import style from './login.module.css'
import { auth, provider } from '../layouts/config'
import { signInWithPopup } from 'firebase/auth'
import { useEffect, useState } from 'react'
import Logout from './Logout'

function Login({ onClick }) {
    const [value, setValue] = useState('')
    const hendlerClick = () => {
        signInWithPopup(auth, provider).then((data) => {
            setValue(data.user.email)
            localStorage.setItem('email', data.user.email)
            onClick(false)
        })
    }
    useEffect(() => {
        setValue(localStorage.getItem('email'))
    })

    return (
        <div className={style.block}>
            {value ? (
                <Logout />
            ) : (
                <button className={style.button} onClick={hendlerClick}>
                    Війти за допомогою Google
                </button>
            )}
        </div>
    )
}

export default Login
