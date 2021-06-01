import { combineReducers } from '@reduxjs/toolkit'
import psychologistsList from './features/psychologists-data'
import visibilityFilter from './features/psychologists-filter'

const rootReducer = combineReducers({
    psychologistsList,
    visibilityFilter
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer

