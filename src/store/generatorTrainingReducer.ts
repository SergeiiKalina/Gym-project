import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ITraining } from "../data/data"

export interface IAllExerciseSetsInfo {
    name: string
    reps: string[]
    weight: string[]
}

export interface IGeneratorTrainingSliceData {
    arr: ITraining[]
    formData: IFormData
    startTrainingIndex: number
    thisDragElement: ITraining | null
    currentExercise: ITraining
    allExerciseSetsInfo: IAllExerciseSetsInfo[]
}
export interface IFormData {
    mainInfo: {
        age?: number
        benchPress?: string
        deadLift?: string
        focus: string
        goal: string
        lifestyle: string
        placeToWorkout: string
        problems: string[]
        pullUp?: string
        sex: string
        sitUp?: string
        squat?: string
        weight?: string
        bodyType?: string
        pushUpQuantity?: string
        squatQuantity?: string
        fitnessLevel?: number
        bodyMassIndex?: number
        inventory?: string[]
    }
    email: string
    firstName: string
    lastName: string
}

const initialState: IGeneratorTrainingSliceData = {
    arr: [],
    formData: {
        mainInfo: {
            age: 0,
            benchPress: "",
            deadLift: "",
            focus: "",
            goal: "",
            lifestyle: "",
            placeToWorkout: "",
            problems: [""],
            pullUp: "",
            sex: "",
            sitUp: "",
            squat: "",
            weight: "",
            bodyType: "",
            pushUpQuantity: "",
            squatQuantity: "",
            fitnessLevel: 0,
            bodyMassIndex: 0,
            inventory: [""],
        },
        email: "",
        firstName: "",
        lastName: "",
    },
    startTrainingIndex: 9999,
    thisDragElement: null,
    currentExercise: {
        id: 105,
        isComplited: false,
        img: "/images/mini/IMG-61c89f9962f96fccb47cc62b47f8b608-V.jpg",
        category: "legs",
        fitnessLevel: 3,
        sex: "unsex",
        basicExercise: true,
        title: "Dead Lift",
        workingOut: ["gym"],
        inventory: ["barbell"],
        LFC: ["back"],
        subCatigories: "dl",
        youtubeLink: "https://www.youtube.com/watch?v=vfKwjT5-86k",
        describe: [
            "1. Stand with feet shoulder-width apart, toes parallel or slightly turned outwards.",
            "2. Keep the back straight with shoulder blades pulled together.",
            "3. Engage the core muscles.",
            "4. Lift the barbell close to the body.",
            "5. Initiate the descent by bending the knees and pushing the hips back.",
            "6. Keep the barbell close to the body while lowering.",
        ],
    },
    allExerciseSetsInfo: [{ name: "", reps: [""], weight: [""] }],
}

const generatorTrainingSlice = createSlice({
    name: "generatorTrainingSlice",
    initialState,
    reducers: {
        writeCurrentVideoId(state, action: PayloadAction<ITraining>) {
            state.currentExercise = action.payload
        },
        writeCurrentTraining(state, action: PayloadAction<any[]>) {
            state.arr = action.payload
        },
        writeFormData(state, action: PayloadAction<any>) {
            state.formData = action.payload
        },
        changeCompleted(state, action: PayloadAction<ITraining[]>) {
            state.arr = action.payload
        },
        setIndexStartTraining(state, action: PayloadAction<number>) {
            state.startTrainingIndex = action.payload
        },
        writeDragElement(state, action: PayloadAction<ITraining | null>) {
            state.thisDragElement = action.payload
        },
        writeAllExerciseSetsInfo(
            state,
            action: PayloadAction<IAllExerciseSetsInfo[]>
        ) {
            state.allExerciseSetsInfo = action.payload
        },
    },
})

export const {
    writeCurrentTraining,
    writeFormData,
    changeCompleted,
    setIndexStartTraining,
    writeDragElement,
    writeCurrentVideoId,
    writeAllExerciseSetsInfo,
} = generatorTrainingSlice.actions

export default generatorTrainingSlice.reducer
