import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { useSocket } from "../App"
import { useDispatch } from "react-redux"
import { update_rooms } from "../redux/store_&_userSlice"
import Rooms_list from "./subcomponents/Rooms_list"
import Users_list from "./subcomponents/Users_list"
import { Rooms_type, State_type, User_online_type } from "../../server/Types"


const navclass = "bg-white md:w-[30%] py-5 flex flex-col text-center items-center gap-5 shadow-xl shadow-darkblue"
const newroom_link_class = "bg-darkblue text-white px-3 py-2 rounded-2xl hover:bg-white hover:text-darkblue transition font-bold hover:shadow-sm shadow-darkblue"
const joinroom_link_class = "text-darkblue px-shadow-darkblue px-3 py-2 rounded-2xl transition hover:underline font-bold"
const active_btn_class = "bg-white text-darkblue px-2 py-1 rounded-t-lg cursor-pointer"
const btn_class = "px-2 py-1 rounded-t-lg cursor-pointer hover:bg-white hover:text-darkblue"

export default function SideNav() {
  const rooms = useSelector((state: State_type) => state.user.rooms)

  const { socket } = useSocket()
  const dispatch = useDispatch()
  const user_rooms = useSelector((state: State_type) => state.user.rooms)

  const [current_comp, set_current_comp] = useState("rooms")
  const [users, setUsers] = useState<User_online_type[]>([])


  useEffect(() => {

    if (!socket) return
    socket.on("room_created", (rooms: Rooms_type[]) => {
      dispatch(update_rooms(rooms))
    })
    socket.on("get_rooms", (rooms: Rooms_type[]) => {
      dispatch(update_rooms(rooms))
    })

    return () => {
      socket.off("room_created")
    }
  }, [user_rooms])
  useEffect(()=>{
      console.log("S", socket);
      
      if(!socket) return
      socket.on("online_users", (online_users : any)=>{
          console.log("Trigger : online user");

          console.log("online users : ", online_users);    
          setUsers([...online_users.filter((user:User_online_type)=>user.socket_id != socket.id)])        
      })
  }, [socket])
  return (
    <nav className={navclass}>
      <div className="flex w-full justify-between items-center px-5">
        <Link to={"new_room"} className={newroom_link_class}>Create Room</Link>
        <Link to={"join_room"} className={joinroom_link_class}>Join Room</Link>
      </div>
      <ul className="flex gap-5 bg-darkblue w-full text-amber-50 px-4 pt-2 font-bold text-left">
        <button onClick={()=>set_current_comp("rooms")} className={current_comp == "rooms" ? active_btn_class : btn_class}>
          Rooms
        </button>
        <button onClick={()=>set_current_comp("friends")} className={current_comp == "friends" ? active_btn_class : btn_class}>
          Friends
        </button>
      </ul>
      <div className="w-[95%] h-full overflow-y-scroll rounded py-0 px-1 flex flex-col gap-1">
        <div className="w-[95%] h-full overflow-y-scroll rounded py-0 px-1 flex flex-col gap-1">
          {
            current_comp == "rooms"
              ? <Rooms_list rooms={rooms}/>
              : <Users_list users={users}/>
          }
        </div>
      </div>
    </nav>
  )
}
