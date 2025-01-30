import ChatBody from "./subcomponents/ChatBody";
import ChatFooter from "./subcomponents/ChatFooter";
import ChatHeader from "./subcomponents/ChatHeader";

export default function ChatBox(){
    return(
        <div className="flex flex-col bg-custom-bg1 w-[50vw] h-[80vh] rounded-xl overflow-hidden">
        <ChatHeader/>
        <ChatBody/>
        <ChatFooter/>
        </div>
    )
}