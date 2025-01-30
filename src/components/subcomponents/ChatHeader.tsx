import { UserType } from "../../App"

export const btn_class = "p-1 bg-red-300 rounded-xl px-2 bg-white font-bold hover:bg-black hover:text-white cursor-pointer transition duration-75"
type ChatHeader_props = {
    userInfo : UserType
}
export default function ChatHeader({userInfo} : ChatHeader_props){
    return(
        <div className="bg1 h-[20%] flex items-center p-5 gap-6">
            <img src="asd" alt="ads" className="bg2 w-[50px] h-[50px] rounded-xl" />
            <div className="flex-1">
                <h1>Chat Room</h1>
            </div>
            <div className="flex gap-1">
                <button className={btn_class}>{userInfo.roomID}</button>
            </div>
        </div>
    )
}