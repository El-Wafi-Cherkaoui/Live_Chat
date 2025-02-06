import { useRef } from "react"
import { useSocket } from "../App"
import { useDispatch } from "react-redux"
import { login } from "../redux/store_&_userSlice"
import { useNavigate } from "react-router-dom"
import io from "socket.io-client"

const style_class = "bg-darkblue text-white p-1 rounded-l cursor-pointer hover:bg-white hover:text-darkblue transition duration-75 border-2 border-darkblue font-bold"


export default function Login() {
    const {set_socket} = useSocket()
    const usernameRef = useRef<HTMLInputElement | null>(null)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    function connect(){
        if(usernameRef.current?.value != "" && usernameRef.current != null){
            const username = usernameRef.current.value
            if(!set_socket) return
            dispatch(login({username}))
            set_socket(create_socket(username))
            navigate("dashboard")
        }
        else{
            alert("cant leave nickname empty")
        }
    }
    

  function create_socket(username: string) {
    try {
        const socket_inst = io(import.meta.env.VITE_BACKEND_SERVER, {

            transports: ["websocket"],
        });
        console.log("socket_inst:", socket_inst);

        socket_inst.on("connect", () => {
            console.log('connected to websocket');
            socket_inst.emit("user_info", username)
        })
        return socket_inst
    } catch (error) {
        console.log(error)
        return null
    }
}
  return (
    <div className="sm:w-fit w-[95%] flex flex-col rounded-2xl [&>*]:p-5 overflow-hidden bg-darkblue">
        <h1 className="text-white text-center font-bold text-2xl">Login:</h1>

        <div className="flex flex-col bg-white gap-2">
            <input type="text" placeholder="Nick name" className="border-2 p-1 rounded border-darkblue" ref={usernameRef}/>
            {/* <input type="text" className="border-2 p-1 rounded border-primary" defaultValue={generate_id()} ref={roomIDRef}/> */}
            <button onClick={connect} className={style_class}>Login</button>
        </div>
    </div>
  )
}
