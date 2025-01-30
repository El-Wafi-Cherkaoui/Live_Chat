import { FormEvent, useRef } from "react";
import { ChatMessage } from "../ChatBox";
import { UserType } from "../../App";
type ChatFooter_props = {
    send_message: (new_message : ChatMessage ) => void, 
    userInfo : UserType
}
export default function ChatFooter({send_message, userInfo} : ChatFooter_props){
    const msg_inp = useRef<HTMLInputElement | null>(null)

    function handle_msg(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        if(msg_inp.current){
            send_message({
                sender: userInfo.username,
                text: msg_inp.current.value,
                date: new Date().toISOString(),
                roomID: userInfo.roomID
            })
        }
    }
    return(
        <div className="py-2 px-4 flex gap-5 items-center">
            <form onSubmit={handle_msg} className="w-full flex">
                <input className="flex-1 bg-white py-1 px-2 rounded-xl" type="text" placeholder="write message" ref={msg_inp}/>
            </form>
        </div>
    )
}