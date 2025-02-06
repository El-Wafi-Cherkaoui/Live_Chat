import { User_online_type } from "../../../server/Types";
import { list_element_class, search_inp_class } from "./Rooms_list";
import { Link } from "react-router-dom";

const friends_list_class  = "block p-1 w-full gap-2 rounded text-center text-darkblue font-semibold"
export default function Users_list({users} : {users : User_online_type[]}) {

    if(users.length == 0) <span className={friends_list_class}>no friends</span>
    return (
        <>  
            <input type="search" className={search_inp_class} placeholder="search" />
            {
                users.map((user) => {
                    return (
                        <Link to={"user/" + user.username} className={list_element_class} key={user.username}>
                            <img src="#" alt="img" width={"50px"} height={"50px"} className="bg-midblue rounded m-2" />
                            <div className="flex flex-col text-left self-center">
                                <strong>
                                    {user.username}
                                </strong>
                                {/* <span className="opacity-75">
                                    {user.messages[user.messages.length - 1]?.text}
                                </span> */}

                            </div>

                            {/* <span className={user_counter_class}>users <br /> {user.room_members.length}</span> */}
                        </Link>
                    )
                })
            } 
        </>
    )
}
