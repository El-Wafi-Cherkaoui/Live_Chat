import { configureStore, createSlice } from "@reduxjs/toolkit";
import {UserType} from "../App"
import { Rooms_type } from "../../server/app";


interface InitialState {
    info : UserType | null,
    rooms : Rooms_type[]
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
        update_rooms : (state, action) => {state.rooms = action.payload},
        update_room : (state, action) => {
            console.log("new", action.payload.id);
            
            state.rooms = state.rooms.map((room)=>{
                    console.log(room.id , action.payload.id);
                    if(room.id != action.payload.id) return room
                    else return action.payload
                }
            )
            

        },
    }
})

export const {login, logout, update_rooms, update_room} = userSlice.actions

export const store = configureStore({
    reducer : {
        user : userSlice.reducer
    }
})