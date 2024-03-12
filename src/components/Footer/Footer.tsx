import React, { useEffect, useState } from "react"
import { NavLink, useLocation } from "react-router-dom"
import { BsPersonCircle } from "react-icons/bs"
import { GiCardRandom } from "react-icons/gi"
import { CiSettings } from "react-icons/ci"
import "./footer.scss"

function Footer(): React.JSX.Element {
    const [showFooter, setShowFooter] = useState(false)

    const [email, setEmail] = useState<string | null>()
    const location = useLocation()
    useEffect(() => {
        const email =
            localStorage.getItem("email") || localStorage.getItem("googleEmail")
        setEmail(email)
    }, [])
    useEffect(() => {
        const bodyClass = document.querySelector(".touch")
        if (
            bodyClass &&
            (location.pathname === "/setup" ||
                location.pathname === "/main-page" ||
                location.pathname === "/personal-data")
        ) {
            setShowFooter(true)
        }
        if (
            bodyClass &&
            location.pathname !== "/setup" &&
            location.pathname !== "/main-page" &&
            location.pathname !== "/personal-data"
        ) {
            setShowFooter(false)
        }

        if (!bodyClass) {
            setShowFooter(true)
        }
        if (location.pathname === "/registration") {
            setShowFooter(false)
        }
    }, [location])

    return showFooter ? (
        <footer className="footer_wrapper">
            <menu className="footer_menu">
                <NavLink
                    to={!email ? "/" : "/personal-data"}
                    className={({ isActive }) =>
                        isActive && location.pathname === "/personal-data"
                            ? "active"
                            : ""
                    }
                >
                    <BsPersonCircle />
                </NavLink>
                <NavLink
                    to={!email ? "/" : "/main-page"}
                    className={({ isActive }) =>
                        isActive && location.pathname === "/main-page"
                            ? "active"
                            : ""
                    }
                >
                    <GiCardRandom />
                </NavLink>
                <NavLink
                    to={!email ? "/" : "/setup"}
                    className={({ isActive }) =>
                        isActive && location.pathname === "/setup"
                            ? "active"
                            : ""
                    }
                >
                    <CiSettings />
                </NavLink>
            </menu>
        </footer>
    ) : (
        <></>
    )
}

export default Footer
