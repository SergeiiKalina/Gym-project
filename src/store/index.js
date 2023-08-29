import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import trainingSlice from './filterTrainingSlice'
import generatorTrainingSlice from './generatorTrainingReduser'
import toolkitSlice from './menuSlice'

const rootReduser = combineReducers({
    showMenu: toolkitSlice,
    training: generatorTrainingSlice,
    filterTraining: trainingSlice,
})

export const store = configureStore({
    reducer: rootReduser,
})
