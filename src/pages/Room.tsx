import ChatBody from "../components/subcomponents/ChatBody.tsx";
import ChatFooter from "../components/subcomponents/ChatFooter.tsx";
import ChatHeader from "../components/subcomponents/ChatHeader.tsx";
import {SocketType, UserType, useSocket} from "../App.tsx"
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { State_type } from "../components/Layout.tsx";
import { Rooms_type } from "../../server/app.ts";
import { useDispatch } from "react-redux";
import { update_room } from "../redux/store_&_userSlice.ts";

export type ChatMessage = {
    sender : string
    text : string
    date : string
}
export type ChatBox_props = {
    socket : SocketType| null
    userInfo : UserType
}
export default function Room(){
    const {id} = useParams()
    const dispatch = useDispatch()
    const rooms = useSelector((state: State_type)=>state.user.rooms)
    const current_room :Rooms_type | undefined = rooms.find((room)=>room.id == id)

    const {socket} = useSocket()
    socket?.on("new_message", (updated_room : Rooms_type)=>{
        dispatch(update_room(updated_room))
    })
    if(!current_room) return
    return(
        <div className="flex flex-col gap-2 w-full h-full overflow-hidden">
        <ChatHeader title={current_room.room_name} room_id={current_room.id}/>
        <ChatBody chat={current_room.messages}/>
        <ChatFooter current_room = {current_room}/>
        </div>
    )
}