import React, { useState, useContext } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Mylayouts from './components/layouts/Mylayouts'
import Training from './components/Training'
import RegistrationForTraining from './components/RegistrationForTraining'
import AboutMe from './components/AboutMe'
import Contacts from './components/Contacts'
import GeneratorTraining from './components/GeneratorTraining'
import { dataFormExercise } from './components/layouts/Context'
import Login from './components/header/Login'
import Logout from './components/header/Logout'
import AdminForm from './components/AdminForm'
import './App.scss'
import StartTraining from './components/StartTraining'

function App() {
    const [user, setUser] = useState(true)
    const dataForm = useContext(dataFormExercise)

    const funkUser = (user) => {
        setUser(user)
    }

    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Mylayouts value={user} />}>
                        <Route index element={<AboutMe />} />
                        <Route path="workout" element={<Training />} />
                        <Route
                            path="gentraining"
                            element={<GeneratorTraining />}
                        />
                        <Route
                            path="registrationfortraining"
                            element={<RegistrationForTraining />}
                        />
                        <Route path="admin" element={<AdminForm />} />
                        <Route path="contacts" element={<Contacts />} />
                        <Route
                            path="start_training"
                            element={<StartTraining />}
                        />
                        <Route
                            path="login"
                            element={
                                user ? <Login onClick={funkUser} /> : <Logout />
                            }
                        />
                    </Route>
                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default App
