import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import MobileMenu from './header/MobileMenu'
import style from './burgerMenu.module.css'

function BurgerMenu({ showBurgerMenu }) {
    function pageChange() {
        let currentUrl = window.location.href
        return currentUrl.replace('http://localhost:3000', '')
    }
    const burgerMenu = useSelector((state) => state.showMenu.showMenu)

    return (
        <div className={style.btnBurger}>
            <NavLink
                to={pageChange}
                onClick={showBurgerMenu}
                className={`${burgerMenu ? style.afterClick : ''}`}
            >
                <span />
            </NavLink>
            <MobileMenu showBurgerMenu={showBurgerMenu} />
        </div>
    )
}

export default BurgerMenu
