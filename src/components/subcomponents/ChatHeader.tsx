import { useDispatch } from "react-redux"
import { toggle_shared_space } from "../../redux/store_&_userSlice"
import Chat_svg from "../svgs/Chat_svg"

export const btn_class = "p-1 bg-red-300 rounded-xl px-2 bg-white font-bold hover:bg-black hover:text-white cursor-pointer transition duration-75"

export default function ChatHeader({title, room_id} : {title: string, room_id: string}){
    const dispatch = useDispatch()
    function show_shared_space() {
        dispatch(toggle_shared_space())
    }
    return(
        <div className="bg-white text-darkgrey md:h-[20%] h-fit flex items-center p-5 gap-6 shadow-mid rounded-l-xl">
            <Chat_svg/>
            <div className="flex-1 font-bold">
                <h1 className="text-3xl text-primary">{title}</h1>
            </div>
            <div>
                <button onClick={show_shared_space} className="bg-darkgrey text-white px-4 py-2 rounded-2xl cursor-pointer hover:bg-white hover:text-darkgrey border-1">
                    Shared Space
                </button>
            </div>
            <div className="flex gap-2 bg-darkgrey py-2 px-4 border rounded-2xl text-white">
                    <span className="font-bold">Room ID : </span>
                    <p className="">
                    {room_id}
                </p>
            </div>
        </div>
    )
}