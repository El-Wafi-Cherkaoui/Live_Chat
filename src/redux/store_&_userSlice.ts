import { configureStore, createSlice } from "@reduxjs/toolkit";
import {UserType} from "../App"


interface InitialState {
    info : UserType | null,
    rooms : string[]
}

const initialState : InitialState = {
    info : null,
    rooms : []
}
const userSlice = createSlice({
    name : "userSlice",
    initialState ,
    reducers : {
        login : (state, action) => {state.info = action.payload},
        logout : (state) => {state.info = null},
    }
})

export const {login, logout} = userSlice.actions

export const store = configureStore({
    reducer : {
        user : userSlice.reducer
    }
})