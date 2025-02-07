import { configureStore, createSlice } from "@reduxjs/toolkit";
import { Rooms_type, UserType } from "../../server/Types";


interface InitialState {
    info : UserType | null,
    rooms : Rooms_type[],
    ui : {
        shared_space : boolean
    }
}

const initialState : InitialState = {
    info : null,
    rooms : [],
    ui : {
        shared_space : false
    }
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
        toggle_shared_space : (state) => {
            state.ui.shared_space = !state.ui.shared_space
        }
    }
})

export const {login, logout, update_rooms, update_room, toggle_shared_space} = userSlice.actions

export const store = configureStore({
    reducer : {
        user : userSlice.reducer
    }
})