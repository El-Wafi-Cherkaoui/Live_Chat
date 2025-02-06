import React from 'react'
import MiniLayout from '../components/MiniLayout'
import { useSelector } from 'react-redux'
import { State_type } from '../components/Layout'
import { useSocket } from '../App'
import { btn_class, inp_class } from './NewRoom'


export default function JoinRoom() {
    const {socket} = useSocket()
    const user_info = useSelector((state: State_type)=>state.user.info)

    function join_room(e: React.FormEvent<HTMLFormElement>) {
        if(!user_info || !socket) return
        
        e.preventDefault()
        const form = e.target as HTMLFormElement
        const room_id = form.elements.namedItem("room_id") as HTMLInputElement
        const join_request = {
            room_id: room_id.value,
            username : user_info.username
        }
        console.log(join_request);
        try {
            socket.emit("join_room", join_request)
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div>
        <MiniLayout title='Join Room'>
            <form onSubmit={join_room} className='flex flex-col gap-2'>
                <input name="room_id" type="text" placeholder='room id' className={inp_class}/>
                <button className={btn_class}>Join</button>
            </form>
        </MiniLayout>
    </div>
  )
}
