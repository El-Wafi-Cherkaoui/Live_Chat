import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Room_type } from "../pages/NewRoom"
import { useSelector } from "react-redux"
import { State_type } from "./Layout"
import { useSocket } from "../App"


const navclass = "bg-amber-50 w-[30%] p-5 flex flex-col text-center items-center gap-2"
const newroom_link_class = "bg-red-800 text-amber-50 px-3 py-2 rounded-2xl hover:bg-amber-50 hover:text-red-800 transition hover:shadow-sm shadow-red-800"
const joinroom_link_class = "text-red-800 px-shadow-red-800 px-3 py-2 rounded-2xl transition hover:underline"
export default function SideNav() {
  const [rooms, setRooms] = useState<Room_type[]>([])
  const {socket} = useSocket()
  const user_rooms = useSelector((state: State_type)=> state.user.rooms)
  useEffect(()=>{
    
    if(!socket) return
    socket.on("room_created", (new_room : Room_type[])=>{
      setRooms(new_room)
    })

    return ()=>{
      socket.off("room_created")
    }
  }, [user_rooms])

  console.log("rooms: ", rooms);
  console.log(socket?.id);
  console.log(rooms);
  
  return (
    <nav className={navclass}>
      <div className="flex w-full justify-between items-center px-1">
        <Link to={"new_room"} className={newroom_link_class}>Create Room</Link>
        <Link to={"join_room"} className={joinroom_link_class}>Join Room</Link>
      </div>

      {!rooms.length 
      ? "no rooms" 
      :<ul className="flex flex-col py-5 bg-amber-500 w-full rounded-2xl gap-2">
        {
          rooms.map((room)=>{
            return(
              <Link to={""} className="bg-red-300 p-1" key={room.id}>
                {room.room_name} ({room?.room_members.length})
              </Link>
            )
          })
        }
      </ul>
      }
    </nav>
  )
}
