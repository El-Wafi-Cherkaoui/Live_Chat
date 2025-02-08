import { User_online_type } from "../../../server/Types";
import { search_inp_class } from "./Rooms_list";
import { Link } from "react-router-dom";
import User from "./User";

const friends_list_class  = "block p-1 w-full gap-2 rounded text-center text-darkblue font-semibold"
export default function Users_list({users} : {users : User_online_type[]}) {

    if(users.length == 0) <span className={friends_list_class}>no friends</span>
    return (
        <>  
            <input type="search" className={search_inp_class} placeholder="search" />
            {
                users.map((user) => <User user={user} key={user.username} />)
            } 
        </>
    )
}
