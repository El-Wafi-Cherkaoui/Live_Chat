import { useEffect, useState } from "react";
import { Edited_data, Rooms_type } from "../../server/Types";
import { useSocket } from "../App";
import MiniLayout from "./MiniLayout";
import { useDispatch } from "react-redux";
import { toggle_shared_space } from "../redux/store_&_userSlice";

const close_btn_class = "bg-darkgrey text-white absolute right-1 top-1 py-1 px-2 rounded-2xl cursor-pointer hover:bg-white hover:text-darkgrey hover:shadow-xl shadow-darkgrey"
export default function Shared_space({current_room} : {current_room : Rooms_type}) {
    const {socket} = useSocket()
    const dispatch = useDispatch()
    const [shared_text, set_shared_text] = useState(current_room.shared_text)
    useEffect(()=>{
        if(!socket) return
        socket.on("shared_text_changed", (modified_room : Rooms_type)=>{
            console.log(modified_room.shared_text)
            set_shared_text(modified_room.shared_text)
        })
    }, [socket])
    async function send_modifications(e: React.ChangeEvent<HTMLTextAreaElement>) {
        console.log(e.target.value);
        try {
            const edited_data : Edited_data= {
                id: current_room.id, 
                edited_text: e.target.value
            }
            socket?.emit("save_shared_text", edited_data)
            console.log("text sent");
            
        } catch (error) {
            console.log(error);
        }
    }
    function hide_shared_text() {
        dispatch(toggle_shared_space())
    }
  return (
    <div className="absolute top-[25vh] w-[70vw] h-[60vh] flex flex-col left-[25%]">
        <button className={close_btn_class} onClick={hide_shared_text}>x</button>
        <MiniLayout title="Shared Text">
            <textarea onChange={send_modifications} rows={10} className="w-full h-full p-1 border border-darkgrey rounded" value={shared_text}>
            </textarea>
        </MiniLayout>
    </div>
  )
}
