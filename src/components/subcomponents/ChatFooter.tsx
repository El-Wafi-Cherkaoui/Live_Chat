import { btn_class } from "./ChatHeader";

export default function ChatFooter(){
    return(
        <div className="py-2 px-4 flex gap-5 items-center">
            <input className="flex-1 bg-white py-1 px-2 rounded-xl" type="text" placeholder="text"/>
            <button className={`${btn_class} px-5`}>Send</button>
        </div>
    )
}