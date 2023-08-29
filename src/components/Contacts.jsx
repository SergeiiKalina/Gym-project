import {
    FaInstagram,
    FaFacebook,
    FaGithub,
    FaTelegram,
    FaTwitter,
    FaWhatsapp,
} from 'react-icons/fa'
import { NavLink } from 'react-router-dom'
import style from './contacts.module.scss'

function Contacts() {
    return (
        <div className={style.block}>
            <NavLink to="https://instagram.com/serjik_92?igshid=MzNlNGNkZWQ4Mg==">
                <FaInstagram />
            </NavLink>
            <NavLink to="https://www.facebook.com/sergii.kalyna.1">
                <FaFacebook />
            </NavLink>
            <NavLink to="https://github.com/SergeiiKalina">
                <FaGithub />
            </NavLink>
            <NavLink to="https://t.me/Set_serg">
                <FaTelegram />
            </NavLink>
            <NavLink to="https://twitter.com/sergeiikalina?t=rIlIWGxlGpXsLRe3XXWihA&s=09">
                <FaTwitter />
            </NavLink>
            <NavLink to="https://wa.me/qr/VGG3H63T3LVJO1">
                <FaWhatsapp />
            </NavLink>
        </div>
    )
}
export default Contacts
