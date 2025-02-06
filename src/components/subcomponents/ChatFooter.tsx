import { FormEvent, useRef } from "react";
import { Rooms_type } from "../../../server/app";
import { useSelector } from "react-redux";
import { State_type } from "../Layout";
import { useSocket } from "../../App";


export default function ChatFooter({current_room} : { current_room : Rooms_type}){
    const userInfo = useSelector((state : State_type) => state.user.info)
    const msg_inp = useRef<HTMLInputElement | null>(null)

    const {socket} = useSocket()
    
    function handle_msg(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        if(msg_inp.current){
            const new_msg = {
                sender: userInfo?.username,
                text: msg_inp.current.value,
                date: new Date().toISOString(),
            }

            try {
                socket?.emit("send_msg", {content : new_msg, target_room: current_room.id})
            } catch (error) {
                
            }
        }
    }
    return(
        <div className="py-2 px-2 flex gap-5 items-center">
            <form onSubmit={handle_msg} className="w-full flex">
                <input className="flex-1 focus:outline-none bg-white py-4 px-2 rounded-md" type="text" placeholder="write message" ref={msg_inp}/>
            </form>
        </div>
    )
}