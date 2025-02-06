import { ChatMessage } from "../../pages/Room"
import { State_type } from "../Layout"
import { useSelector } from "react-redux"

type ChatBody_props = {
    chat: ChatMessage[]
}
export default function ChatBody({chat}: ChatBody_props){
    const userInfo = useSelector((state: State_type)=> state.user.info)

    return(
        <div className="flex-1 p-4 overflow-y-scroll flex flex-col gap-1 items-start">
            {
                chat.map((msg, key)=>{
                    if(msg.sender == userInfo?.username){
                        return(
                            <div key={key}>
                                <p className="bg-white p-2 rounded-xl">
                                    {msg.text}
                                </p>
                            </div>
                        )
                    }
                    else{
                        return(
                            <div className="ml-auto flex flex-col" key={key}>
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