import {
    Button,
    createTheme,
    FormControl,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    SelectChangeEvent,
    Theme,
} from "@mui/material"
import { lime, purple } from "@mui/material/colors"
import React, { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import {
    IFormData,
    writeFormData,
} from "../../../store/generatorTrainingReducer"
import "./formGenTrainStep.scss"
import { ITrainingReducer } from "../FinishedTraining/FinishedTraining"

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
}

const theme = createTheme({
    palette: {
        primary: lime,
        secondary: purple,
    },
})

function getStyles(name: string, personName: any, theme: Theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    }
}

const multiSelect = ["back", "elbows", "shoulders", "knees", "hip joint"]

export default function FormGenTrainStepThird(): React.JSX.Element {
    const [personName, setPersonName] = useState<string[]>([])
    const [lifestyle, setLifestyle] = useState("")
    const [goal, setGoal] = useState("")
    const [focus, setFocus] = useState("")
    const formData = useSelector(
        (state: ITrainingReducer) => state.training.formData
    )
    const navigate = useNavigate()
    const { register, handleSubmit } = useForm<IFormData>({ mode: "onBlur" })
    const dispatch = useDispatch()
    const onSubmit: SubmitHandler<IFormData> = (data: IFormData) => {
        dispatch(writeFormData({ ...formData, ...data }))
        navigate("/finished-training")
    }

    const handleLifeStyle = (e: SelectChangeEvent<string>) => {
        setLifestyle(e.target.value)
    }
    const handleGoal = (e: SelectChangeEvent<string>) => {
        setGoal(e.target.value)
    }
    const handleFocus = (e: SelectChangeEvent<string>) => {
        setFocus(e.target.value)
    }

    const handleChange = (event: SelectChangeEvent<string[]>) => {
        const {
            target: { value },
        } = event
        setPersonName(typeof value === "string" ? value.split(",") : value)
    }

    return (
        <form
            className="form_gen_train_step_wrapper"
            onSubmit={handleSubmit(onSubmit)}
        >
            <h2>Third Step</h2>
            <section>
                <div className="form_gen_train_step_selectBlock">
                    <FormControl
                        fullWidth
                        sx={{
                            width: "60%",
                            margin: "30% auto 0 auto",
                            [theme.breakpoints.down("md")]: {
                                width: "100%",
                            },
                        }}
                    >
                        <InputLabel
                            id="lifestyle"
                            sx={{ color: "white", border: "none" }}
                        >
                            Select your lifestyle
                        </InputLabel>
                        <Select
                            labelId="lifestyle"
                            id="lifestyle"
                            label="Lifestyle"
                            variant="outlined"
                            value={lifestyle}
                            {...register("lifestyle")}
                            sx={{
                                boxShadow: "none",
                                color: "white",
                                ".MuiOutlinedInput-notchedOutline": {
                                    border: "none",
                                    borderBottom: "1px solid #fefefe",
                                    borderRadius: "0px",
                                },
                                "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                                    {
                                        borderBottom: "1px solid #42a5f5",
                                    },
                                ".MuiSvgIcon-root": {
                                    color: "white",
                                },
                            }}
                            onChange={handleLifeStyle}
                        >
                            <MenuItem value="passive">Passive</MenuItem>
                            <MenuItem value="moderate">Moderate</MenuItem>
                            <MenuItem value="high">High</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <div className="form_gen_train_step_selectBlock">
                    <FormControl
                        fullWidth
                        sx={{
                            width: "60%",
                            margin: "30px auto 0 auto",
                            [theme.breakpoints.down("md")]: {
                                width: "100%",
                            },
                        }}
                    >
                        <InputLabel
                            id="goal"
                            sx={{ color: "white", border: "none" }}
                        >
                            Select your goal
                        </InputLabel>
                        <Select
                            labelId="goal"
                            id="goal"
                            label="Goal"
                            variant="outlined"
                            value={goal}
                            {...register("goal")}
                            sx={{
                                boxShadow: "none",
                                color: "white",
                                ".MuiOutlinedInput-notchedOutline": {
                                    border: "none",
                                    borderBottom: "1px solid #fefefe",
                                    borderRadius: "0px",
                                },
                                "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                                    {
                                        borderBottom: "1px solid #42a5f5",
                                    },
                                ".MuiSvgIcon-root": {
                                    color: "white",
                                },
                            }}
                            onChange={handleGoal}
                        >
                            <MenuItem value="weightMaintenance">
                                Weight Maintenance
                            </MenuItem>
                            <MenuItem value="weightGain">Weight Gain</MenuItem>
                            <MenuItem value="weightLoss">Weight Loss</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <div className="form_gen_train_step_selectBlock">
                    <FormControl
                        sx={{
                            width: "60%",
                            margin: "30px auto 0 auto",
                            [theme.breakpoints.down("md")]: {
                                width: "100%",
                            },
                        }}
                    >
                        <InputLabel
                            id="demo-multiple-name-label"
                            sx={{ color: "white", border: "none" }}
                        >
                            Select your problems
                        </InputLabel>
                        <Select
                            labelId="demo-multiple-name-label"
                            id="demo-multiple-name"
                            multiple
                            value={personName}
                            input={<OutlinedInput label="Name" />}
                            MenuProps={MenuProps}
                            sx={{
                                boxShadow: "none",
                                color: "white",
                                ".MuiOutlinedInput-notchedOutline": {
                                    border: "none",
                                    borderBottom: "1px solid #fefefe",
                                    borderRadius: "0px",
                                },
                                "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                                    {
                                        borderBottom: "1px solid #42a5f5",
                                    },
                                ".MuiSvgIcon-root": {
                                    color: "white",
                                },
                            }}
                            {...register("problems")}
                            onChange={handleChange}
                        >
                            {multiSelect.map((el) => (
                                <MenuItem
                                    key={el}
                                    value={el}
                                    style={getStyles(el, personName, theme)}
                                >
                                    {el.charAt(0).toUpperCase() + el.slice(1)}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>

                <div className="form_gen_train_step_selectBlock">
                    <FormControl
                        fullWidth
                        sx={{
                            width: "60%",
                            margin: "30px auto 10px auto",
                            [theme.breakpoints.down("md")]: {
                                width: "100%",
                            },
                        }}
                    >
                        <InputLabel
                            id="focus"
                            sx={{ color: "white", border: "none" }}
                        >
                            Training Focus
                        </InputLabel>
                        <Select
                            labelId="focus"
                            id="focus"
                            label="Focus"
                            variant="outlined"
                            value={focus}
                            {...register("focus")}
                            sx={{
                                boxShadow: "none",
                                color: "white",
                                ".MuiOutlinedInput-notchedOutline": {
                                    border: "none",
                                    borderBottom: "1px solid #fefefe",
                                    borderRadius: "0px",
                                },
                                "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                                    {
                                        borderBottom: "1px solid #42a5f5",
                                    },
                                ".MuiSvgIcon-root": {
                                    color: "white",
                                },
                            }}
                            onChange={handleFocus}
                        >
                            <MenuItem value="fullBody">Full Body</MenuItem>
                            <MenuItem value="upperBody">Upper Body</MenuItem>
                            <MenuItem value="lowerBody">Lower Body</MenuItem>
                            <MenuItem value="legs">Legs</MenuItem>
                            <MenuItem value="back">Back</MenuItem>
                            <MenuItem value="chest">Chest</MenuItem>
                            <MenuItem value="shoulders">Shoulders</MenuItem>
                            <MenuItem value="hand">Hand</MenuItem>
                            <MenuItem value="press">Press</MenuItem>
                        </Select>
                    </FormControl>
                </div>
            </section>
            <div
                style={{
                    width: "100%",
                    display: "flex",
                    margin: "auto auto 20% auto",
                }}
            >
                <Button
                    variant="contained"
                    type="submit"
                    sx={{ width: "40%", margin: "0 auto" }}
                >
                    Next Step
                </Button>
            </div>
        </form>
    )
}
