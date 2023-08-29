import { useState, createContext } from 'react'

export const dataFormExercise = createContext()

function Context(props) {
    const [data, setData] = useState({})

    const [bul, setBul] = useState('')

    const changeRadio = (e) => {
        setBul(e)
    }

    const onWriteData = (data) => {
        setData(data)
    }

    const value = {
        onWriteData,
        changeRadio,
        bul,
    }

    return (
        <dataFormExercise.Provider value={value}>
            {props.children}
        </dataFormExercise.Provider>
    )
}

export default Context
