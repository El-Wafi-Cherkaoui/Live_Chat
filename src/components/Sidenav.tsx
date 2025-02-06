import { useEffect } from "react"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { State_type } from "./Layout"
import { useSocket } from "../App"
import { useDispatch } from "react-redux"
import { update_rooms } from "../redux/store_&_userSlice"
import { Rooms_type } from "../../server/app"


const navclass = "bg-white md:w-[30%] py-5 flex flex-col text-center items-center gap-5 shadow-xl shadow-darkblue"
const newroom_link_class = "bg-darkblue text-white px-3 py-2 rounded-2xl hover:bg-white hover:text-darkblue transition font-bold hover:shadow-sm shadow-darkblue"
const joinroom_link_class = "text-darkblue px-shadow-darkblue px-3 py-2 rounded-2xl transition hover:underline font-bold"
export default function SideNav() {
  const rooms = useSelector((state: State_type)=> state.user.rooms)
  
  const {socket} = useSocket()
  const dispatch = useDispatch()
  const user_rooms = useSelector((state: State_type)=> state.user.rooms)
  useEffect(()=>{
    
    if(!socket) return
    socket.on("room_created", (rooms : Rooms_type[])=>{
      dispatch(update_rooms(rooms))
    })
    socket.on("get_rooms", (rooms : Rooms_type[])=>{
      dispatch(update_rooms(rooms))
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
      <div className="flex w-full justify-between items-center px-5">
        <Link to={"new_room"} className={newroom_link_class}>Create Room</Link>
        <Link to={"join_room"} className={joinroom_link_class}>Join Room</Link>
      </div>
      <ul className="flex gap-5 bg-darkblue w-full text-amber-50 px-4 pt-2 font-bold text-left">
        <button className="bg-white text-darkblue px-2 py-1 rounded-t-lg cursor-pointer">
          Rooms 
        </button>
        <button>
          Friends
        </button>
      </ul>
      <div className="w-[95%] h-full overflow-y-scroll rounded py-0 px-1 flex flex-col gap-1">
        {!rooms.length 
        ? <span className="block p-1 w-full gap-2 rounded text-center text-darkblue font-semibold">
          no rooms
          </span>
        :<ul className="flex flex-col gap-1">
          <input type="search" className="my-2 md:p-1 p-4 border rounded-sm border-darkblue" placeholder="search"/>
          {
            rooms.map((room)=>{
              return(
                <Link to={"room/"+room.id} className="group bg-darkblue text-white flex gap-2 rounded-md hover:rounded-2xl transition duration-300 ease-in-out hover:bg-white hover:text-darkblue border-1 hover:shadow-md shadow-darkblue hover:border-darkblue overflow-hidden" key={room.id}>
                  <img src="#" alt="img" width={"50px"} height={"50px"} className="bg-midblue rounded m-2" />
                  <div className="flex flex-col text-left self-center">
                    <strong>
                      {room.room_name}
                    </strong> 
                    <span className="opacity-75">
                      {room.messages[room.messages.length-1]?.text}
                    </span>

                  </div>

                  <span className="group-hover:border-transparent ml-auto bg-white text-darkblue p-1 font-bold border-2 rounded-l-2xl transition">users <br/> {room.room_members.length}</span>
                </Link>
              )
            })
          }
        </ul>
        }
      </div>
    </nav>
  )
}
