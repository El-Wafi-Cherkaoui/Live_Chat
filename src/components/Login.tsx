import { useRef } from "react"
import { UserType } from "../App"
import { v4 as generate_id} from "uuid"

const style_class = "bg-primary text-amber-50 p-1 rounded-l cursor-pointer hover:bg-amber-50 hover:text-primary transition duration-75 border-2 border-primary"

type Login_props = {
    set_info : (new_info : UserType)=> void
}

export default function Login({set_info}: Login_props) {
    const usernameRef = useRef<HTMLInputElement | null>(null)
    const roomIDRef = useRef<HTMLInputElement | null>(null)

    function connect(){
        if(usernameRef.current && roomIDRef.current){
            set_info({
                username : usernameRef.current.value,
                roomID : roomIDRef.current.value
            })
        }
    }
  return (
    <div className="flex flex-col bg-amber-50 rounded-2xl [&>*]:p-5 overflow-hidden bg-primary">
        <h1 className="text-white text-center font-bold text-2xl">Login:</h1>

        <div className="flex flex-col bg-amber-50 gap-2">
            <input type="text" placeholder="Your name" className="border-2 p-1 rounded border-primary" ref={usernameRef}/>
            <input type="text" className="border-2 p-1 rounded border-primary" value={generate_id()} ref={roomIDRef}/>
            <button onClick={connect} className={style_class}>Join Room</button>
            {/* <button className={style_class}>Create Room</button> */}
        </div>
    </div>
  )
}
