import { createSlice } from '@reduxjs/toolkit'

const toolkitSlice = createSlice({
    name: 'menuReducer',
    initialState: {
        showMenu: false,
        arrowLeftHidden: false,
        arrowRightHidden: false,
    },
    reducers: {
        showMenu(state, action) {
            state.showMenu = action.payload
        },
        arrowLHidden(state, action) {
            state.arrowLeftHidden = action.payload
        },
        arrowRHidden(state, action) {
            state.arrowRightHidden = action.payload
        },
    },
})

export const { showMenu, arrowLHidden, arrowRHidden } = toolkitSlice.actions

export default toolkitSlice.reducer
