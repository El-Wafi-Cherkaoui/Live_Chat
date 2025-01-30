import { UserType } from "../../App"

export const btn_class = "p-1 bg-red-300 rounded-xl px-2 bg-white font-bold hover:bg-black hover:text-white cursor-pointer transition duration-75"
type ChatHeader_props = {
    userInfo : UserType
}
export default function ChatHeader({userInfo} : ChatHeader_props){
    return(
        <div className="bg1 h-[20%] flex items-center p-5 gap-6">
            <img src="src/assets/chat_logo.svg" alt="ads" className="w-[50px] h-[50px] rounded-xl p-1" />
            <div className="flex-1 text-amber-50 font-bold">
                <h1>Chat Room</h1>
            </div>
            <div className="flex gap-2 bg-amber-50 p-5 rounded-2xl text-primary">
                    <span className="font-bold">Room ID : </span>
                    <p className="">
                    {userInfo.roomID}
                </p>
            </div>
        </div>
    )
}