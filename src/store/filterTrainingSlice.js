import { createSlice } from '@reduxjs/toolkit'

const trainingSlice = createSlice({
    name: 'trainingSlice',
    initialState: {
        data: ['legs'],
        arrTraining: [],
        activeId: 1,
        isChecked: {
            legs: 'legs',
            cardio: false,
            functional: false,
            press: false,
            back: false,
            biceps: false,
            pectoral: false,
            shoulders: false,
            triceps: false,
        },
        categories: [],
    },

    reducers: {
        writeData(state, action) {
            state.data = action.payload
        },
        writeCategories(state, action) {
            state.categories = action.payload
        },
        changeActiveId(state, action) {
            state.activeId = action.payload
        },
        changeIsChecked(state, action) {
            state.isChecked = action.payload
        },
        writeArrTraining(state, action) {
            state.arrTraining = action.payload
        },
    },
})

export const {
    writeData,
    writeCategories,
    changeActiveId,
    changeIsChecked,
    writeArrTraining,
} = trainingSlice.actions

export default trainingSlice.reducer
