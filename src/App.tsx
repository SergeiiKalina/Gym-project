import React, { useEffect } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import MyLayouts from "./components/layouts/MyLayouts"
import Training from "./components/Main/Training/Training"
import RegistrationForTraining from "./components/Main/RegistrationForTraining/RegistrationForTraining"
import AdminForm from "./components/Other/AdminForm/AdminForm"
import StartTraining from "./components/Main/StartTraining/StartTraining"
import HomeTestForm from "./components/Main/FormGenerationTraining/HomeSelectSplitTraining"
import AvailabilityOfInventory from "./components/Main/FormGenerationTraining/AvailabilityOfInventory"
import GymSelectSpritTraining from "./components/Main/FormGenerationTraining/GymSelectSplitTraining"
import Login from "./components/header/Login/Login"
import Registration from "./components/header/Registration/Registration"
import FormGenTrainStepOne from "./components/Main/FormGenerationTraining/FormGenTrainStepOne"
import PersonalData from "./components/header/MenuUser/PersonalData/PersonalData"
import { useDispatch } from "react-redux"
import { checkAuth } from "./store/authorizationSlice"
import MenuUser from "./components/header/MenuUser/MenuUser"
import Exercise from "./components/Main/Exercise/Exercise"
import TrainingPlan from "./components/Main/TrainingPlan/TrainingPlan"
import "./App.scss"

function App(): React.JSX.Element {
    const dispatch = useDispatch<any>()

    useEffect(() => {
        dispatch(checkAuth())
    }, [dispatch])
    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    <Route path="/" element={<MyLayouts />}>
                        <Route path="workout" element={<Training />} />
                        <Route index element={<Login />} />
                        <Route path="/exercise" element={<Exercise />} />
                        <Route
                            path="gentraining"
                            element={<FormGenTrainStepOne />}
                        />
                        <Route
                            path="plan-training"
                            element={<TrainingPlan />}
                        />
                        <Route
                            path="personal-data"
                            element={<PersonalData />}
                        />
                        <Route
                            path="/gentraining/step-2/gym"
                            element={<GymSelectSpritTraining />}
                        />

                        <Route
                            path="/gentraining/step-2/home"
                            element={<HomeTestForm />}
                        />
                        <Route
                            path="/gentraining/step-4/home"
                            element={<AvailabilityOfInventory />}
                        />
                        <Route
                            path="registrationfortraining"
                            element={<RegistrationForTraining />}
                        />
                        <Route path="admin" element={<AdminForm />} />

                        <Route
                            path="start_training"
                            element={<StartTraining />}
                        />
                        <Route path="setup" element={<MenuUser />} />
                        <Route path="registration" element={<Registration />} />
                    </Route>
                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default App
