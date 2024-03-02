import { configStore } from '@reduxjs/toolkit'
import userReducer from './user/userSlice'

export const store = configStore({
    reducer: {

        user: userReducer,
    },
})