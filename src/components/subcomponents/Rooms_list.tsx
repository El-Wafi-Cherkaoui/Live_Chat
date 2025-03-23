import { Link } from 'react-router-dom'
import { Rooms_type } from '../../../server/Types'


const span_class = "block p-1 w-full gap-2 rounded text-center text-darkgrey font-semibold"
export const search_inp_class = "my-2 md:p-1 p-4 border rounded-sm border-darkgrey"
export const list_element_class = "border-none group bg-darkgrey text-white flex gap-2 rounded-md hover:rounded-2xl transition duration-300 ease-in-out hover:bg-white hover:text-darkgrey border-1 hover:shadow-md shadow-darkgrey hover:border-darkgrey overflow-hidden cursor-pointer"
const user_counter_class = "group-hover:border-transparent ml-auto bg-white text-darkgrey p-1 font-bold my-1 boder-none mr-1 rounded transition"

export default function Rooms_list({rooms} : {rooms: Rooms_type[]}) {
    if (rooms.length == 0) {
        return (
            <span className={span_class}>
                no rooms
            </span>
        )
    }
    return (
        <>
            <ul className="flex flex-col gap-1">
                <input type="search" className={search_inp_class} placeholder="search for room.." />
                {
                    rooms.map((room) => {
                        return (
                            <Link to={"room/" + room.id} className={list_element_class} key={room.id}>
                                <img src="#" alt="img" width={"50px"} height={"50px"} className="bg-secondary rounded m-2 flex justify-center items-center opacity-80" />
                                <div className="flex flex-col text-left self-center">
                                    <strong>
                                        {room.room_name}
                                    </strong>
                                    <span className="opacity-75">
                                        {room.messages[room.messages.length - 1]?.text}
                                    </span>

                                </div>

                                <span className={user_counter_class}>users <br /> {room.room_members.length}</span>
                            </Link>
                        )
                    })
                }
            </ul>
        </>

    )
}
