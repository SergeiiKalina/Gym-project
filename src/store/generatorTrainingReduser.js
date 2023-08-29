import { createSlice } from '@reduxjs/toolkit'

const generatorTrainingSlice = createSlice({
    name: 'generatorTrainingSlice',
    initialState: {
        arr: [],
        bul: false,
        bulTextArea: false,
        formData: {},
        step: 1,
        textPlan: '',
        startTrainingIndex: 9999,
    },
    reducers: {
        writeArr(state, action) {
            state.arr = action.payload
        },
        writeTxtPlan(state, action) {
            state.textPlan = action.payload
        },
        writeFormData(state, action) {
            state.formData = action.payload
        },
        changeCompleted(state, action) {
            state.arr = action.payload
        },
        changeStepForm(state, action) {
            state.step = action.payload
        },
        changeBul(state, action) {
            state.bul = action.payload
        },
        changeBulTextArea(state, action) {
            state.bulTextArea = action.payload
        },
        setIndexStartTraining(state, action) {
            state.startTrainingIndex = action.payload
        },
    },
})

export const {
    writeArr,
    writeTxtPlan,
    writeFormData,
    changeCompleted,
    changeStepForm,
    changeBul,
    changeBulTextArea,
    setIndexStartTraining,
} = generatorTrainingSlice.actions

export default generatorTrainingSlice.reducer
