import { useRef } from "react";
import { ChatMessage } from "../ChatBox";
import { btn_class } from "./ChatHeader";
import { UserType } from "../../App";
type ChatFooter_props = {
    send_message: (new_message : ChatMessage ) => void, 
    userInfo : UserType
}
export default function ChatFooter({send_message, userInfo} : ChatFooter_props){
    const msg_inp = useRef<HTMLInputElement | null>(null)

    function handle_msg() {
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
            <input className="flex-1 bg-white py-1 px-2 rounded-xl" type="text" placeholder="text" ref={msg_inp}/>
            <button onClick={handle_msg} className={`${btn_class} px-5`}>Send</button>
        </div>
    )
}