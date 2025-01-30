import { useEffect, useState } from "react";
import ChatBody from "./subcomponents/ChatBody";
import ChatFooter from "./subcomponents/ChatFooter";
import ChatHeader from "./subcomponents/ChatHeader";
import {SocketType, UserType} from "../App.tsx"

export type ChatMessage = {
    sender : string
    text : string
    date : string
    roomID : string
}
export type ChatBox_props = {
    socket : SocketType| null
    userInfo : UserType
}
export default function ChatBox({socket, userInfo} : ChatBox_props){
    const [chat_messages , set_chat_messages] = useState<ChatMessage[]>([])
    const [new_message, set_new_message] = useState<ChatMessage | null>(null)
    useEffect(()=>{
        if(!socket) return
        socket.on("connect", ()=>{
            console.log("connected to server");
        })

        socket.on("send_data", (data : ChatMessage[])=>{
            set_chat_messages(data)
        })
        return ()=>{
            socket?.off("connect")
        }
    }, [socket])

    useEffect(()=>{
        if(new_message){
            socket?.emit("send_msg", new_message)
        }
    }, [new_message])
    return(
        <div className="flex flex-col bg1 w-[50vw] h-[80vh] rounded-xl overflow-hidden">
        <ChatHeader userInfo = {userInfo}/>
        <ChatBody userInfo = {userInfo} chat={chat_messages}/>
        <ChatFooter userInfo = {userInfo} send_message = {set_new_message}/>
        </div>
    )
}