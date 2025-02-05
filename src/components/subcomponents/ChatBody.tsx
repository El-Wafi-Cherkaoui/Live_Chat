import { UserType } from "../../App"
import { ChatMessage } from "../CreateChatBox"

type ChatBody_props = {
    chat: ChatMessage[]
    userInfo : UserType
}
export default function ChatBody({chat, userInfo}: ChatBody_props){
    
    
    return(
        <div className="bg2 flex-1 p-4 overflow-scroll flex flex-col gap-1 items-start">
            {
                chat.map((msg, key)=>{
                    if(msg.sender == userInfo.username){
                        return(
                            <div>
                                <p className="bg-white p-2 rounded-xl" key={key}>
                                    {msg.text}
                                </p>
                            </div>
                        )
                    }
                    else{
                        return(
                            <div className="ml-auto flex flex-col">
                                <span className="text-amber-50 font-bold">
                                    {msg.sender}
                                </span>
                                <span key={key} className="bg-white p-2 rounded-xl">
                                    {msg.text}
                                </span>

                            </div>
                        )
                    }
                })
            }
        </div>
    )
}