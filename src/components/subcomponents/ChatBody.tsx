import { ChatMessage } from "../ChatBox"

const current_id = "123"
type ChatBody_props = {
    chat: ChatMessage[]
}
export default function ChatBody({chat}: ChatBody_props){
    
    
    return(
        <div className="bg2 flex-1 p-4 overflow-scroll flex flex-col gap-1 items-start">
            {
                chat.map((msg, key)=>{
                    if(msg.sender == current_id){
                        return(
                            <span className="bg-white p-2 rounded-xl" key={key}>
                                {msg.text}
                            </span>
                        )
                    }
                    else{
                        return(
                            <span className="bg-white p-2 rounded-xl ml-auto" key={key}>
                                {msg.text}
                            </span>
                        )
                    }
                })
            }
        </div>
    )
}