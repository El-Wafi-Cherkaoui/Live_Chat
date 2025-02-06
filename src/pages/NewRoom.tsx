import React from 'react'
import MiniLayout from '../components/MiniLayout'
import { useSelector } from 'react-redux'
import { State_type } from '../components/Layout'
import { useSocket } from '../App'
import { Rooms_type } from '../../server/app'


export const inp_class = "p-2 border border-darkblue rounded-sm"
export const btn_class = "ml-auto bg-darkblue w-full px-5 py-2 rounded-2xl text-white hover:bg-white hover:text-darkblue transition cursor-pointer font-bold hover:shadow-sm shadow-darkblue"
export default function NewRoom() {
    const {socket} = useSocket()
    const user_info = useSelector((state: State_type)=>state.user.info)

    function create_room(e: React.FormEvent<HTMLFormElement>) {
        if(!user_info || !socket) return
        
        e.preventDefault()
        const form = e.target as HTMLFormElement
        const room_name = form.elements.namedItem("room_name") as HTMLInputElement
        const room_id = form.elements.namedItem("room_id") as HTMLInputElement
        const new_room : Rooms_type = {
            id: room_id.value,
            room_name: room_name.value,
            room_admin: user_info.username,
            room_members: [user_info.username],
            messages: []
        }
        console.log(user_info);
        
        try {
            socket.emit("create_room", new_room)
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div>
        <MiniLayout title='Create Room'>
            <form onSubmit={create_room} className='flex flex-col md:gap-2 gap-5'>
                <input name="room_name" type="text" placeholder='room name' className={inp_class}/>
                <input name="room_id" type="text" placeholder='room id' className={inp_class}/>
                <button className={btn_class}>Create</button>
            </form>
        </MiniLayout>
    </div>
  )
}
