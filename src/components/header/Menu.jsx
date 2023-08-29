import { NavLink } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import { RxCaretRight, RxCaretLeft } from 'react-icons/rx'
import BurgerMenu from '../BurgerMenu'
import style from './menu.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { arrowLHidden, arrowRHidden, showMenu } from '../../store/menuSlice'

function Menu() {
    const elementRef = useRef(null)
    const blockRef = useRef(null)
    const dispatch = useDispatch()
    const burgerMenu = useSelector((state) => state.showMenu.showMenu)
    const arrowLeftHidden = useSelector(
        (state) => state.showMenu.arrowLeftHidden
    )
    const arrowRightHidden = useSelector(
        (state) => state.showMenu.arrowRightHidden
    )

    function showBurgerMenu() {
        if (!burgerMenu) {
            dispatch(showMenu(true))
        }
        if (burgerMenu) {
            dispatch(showMenu(false))
        }
    }

    window.addEventListener('resize', () => {
        if (window.innerWidth > 767) {
            dispatch(showMenu(false))
        }
        if (window.innerWidth > 1250) {
            dispatch(arrowRHidden(false))
            dispatch(arrowLHidden(false))
        }
    })

    useEffect(() => {
        const checkWidth = () => {
            if (blockRef.current) {
                const width = blockRef.current.offsetWidth
                if (width < 1080) {
                    dispatch(arrowRHidden(true))
                }
                if (width > 1080) {
                    dispatch(arrowRHidden(false))
                }
            }
        }

        checkWidth()

        const handleResize = () => {
            checkWidth()
        }
        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    function scrollRight() {
        blockRef.current.scrollLeft += blockRef.current.clientWidth / 4
        if (blockRef.current.scrollLeft > 100) {
            dispatch(arrowLHidden(true))
        }
    }
    function scrollLeft() {
        blockRef.current.scrollLeft -= blockRef.current.clientWidth / 4
        if (blockRef.current.scrollLeft < 10) {
            dispatch(arrowLHidden(false))
        }
    }

    return (
        <>
            <BurgerMenu showBurgerMenu={showBurgerMenu} />
            {arrowLeftHidden && (
                <RxCaretLeft
                    style={{
                        fontSize: '50px',
                        marginTop: '50px',
                    }}
                    onClick={scrollLeft}
                    className={style.arrow}
                />
            )}
            <div className={style.block} ref={blockRef}>
                <ul className={style.menu} ref={elementRef}>
                    <li style={{ minWidth: '88px' }}>
                        <NavLink
                            to="."
                            style={({ isActive }) =>
                                isActive
                                    ? {
                                          color: 'black',
                                          textDecoration: 'none',
                                      }
                                    : {
                                          color: 'red',
                                          textDecoration: 'underline',
                                      }
                            }
                        >
                            Про мене
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="workout"
                            style={({ isActive }) =>
                                isActive
                                    ? {
                                          color: 'black',
                                          textDecoration: 'none',
                                      }
                                    : {
                                          color: 'red',
                                          textDecoration: 'underline',
                                      }
                            }
                        >
                            Тренування
                        </NavLink>
                    </li>
                    <li style={{ minWidth: '207px' }}>
                        <NavLink
                            to="gentraining"
                            style={({ isActive }) =>
                                isActive
                                    ? {
                                          color: 'black',
                                          textDecoration: 'none',
                                      }
                                    : {
                                          color: 'red',
                                          textDecoration: 'underline',
                                      }
                            }
                        >
                            Генератор Тренування
                        </NavLink>
                    </li>
                    <li style={{ minWidth: '194px' }}>
                        <NavLink
                            to="registrationfortraining"
                            style={({ isActive }) =>
                                isActive
                                    ? {
                                          color: 'black',
                                          textDecoration: 'none',
                                      }
                                    : {
                                          color: 'red',
                                          textDecoration: 'underline',
                                      }
                            }
                        >
                            Запис на тренування
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="contacts"
                            style={({ isActive }) =>
                                isActive
                                    ? {
                                          color: 'black',
                                          textDecoration: 'none',
                                      }
                                    : {
                                          color: 'red',
                                          textDecoration: 'underline',
                                      }
                            }
                        >
                            Контакти
                        </NavLink>
                    </li>
                    <li>
                        {!localStorage.getItem('email') ? (
                            <NavLink
                                to="login"
                                style={({ isActive }) =>
                                    isActive
                                        ? {
                                              color: 'black',
                                              textDecoration: 'none',
                                          }
                                        : {
                                              color: 'red',
                                              textDecoration: 'underline',
                                          }
                                }
                            >
                                Авторизація
                            </NavLink>
                        ) : (
                            <NavLink
                                to="login"
                                style={({ isActive }) =>
                                    isActive
                                        ? {
                                              color: 'black',
                                              textDecoration: 'none',
                                          }
                                        : {
                                              color: 'red',
                                              textDecoration: 'underline',
                                          }
                                }
                            >
                                Вихід
                            </NavLink>
                        )}
                    </li>
                </ul>
            </div>

            {arrowRightHidden && (
                <RxCaretRight
                    style={{
                        fontSize: '50px',
                        marginTop: '50px',
                    }}
                    onClick={scrollRight}
                    className={style.arrow}
                />
            )}
        </>
    )
}
export default Menu
