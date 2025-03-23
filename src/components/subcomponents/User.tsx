import { useSelector } from "react-redux";
import { State_type, User_online_type } from "../../../server/Types";
import { toggle_show_info } from "../../redux/store_&_userSlice";
import MiniLayout from "../MiniLayout";
import { list_element_class } from "./Rooms_list";
import { useDispatch } from "react-redux";

export default function User({user} : {user: User_online_type}) {
    const dispatch  = useDispatch()
    const show_info = useSelector((state : State_type)=> state.user.ui.show_info)
    return (
        <div className={list_element_class}>
            <div className="relative group">
                <img src="#" alt="img" width={"50px"} height={"50px"} className="bg-white rounded-full m-2 text-primary flex items-center justify-center border-darkgrey group-hover:border-2 transition duration-300" />
            </div>
            <div className="flex text-left self-center content-between w-full pr-4" >
                <strong className="w-full">
                    {user.username}
                    <span className=" bg-orange bottom-3 !w-2 !h-2 inline-block ml-2 -translate-y-1 rounded-full border-1 border-orange"></span>
                </strong>
                <button className="ml-auto p-2 bg-white text-darkgrey rounded font-bold cursor-pointer hover:bg-darkgrey hover:text-white" onClick={()=>{dispatch(toggle_show_info())}}>Info</button>
            </div>
            <div className="absolute left-[50%] top-[50%] w-[30vw] translate-x-[-50%] translate-y-[-50%]">
                {
                    show_info
                    ?   <MiniLayout title={user.username}>
                        <div className="flex w-full gap-1">
                            <img src="#" alt="s" className="border-1 border-darkgrey rounded w-[50%] flex-1" />
                            <div className="flex flex-col flex-1 gap-1 border-darkgrey">
                                <h1 className="bg-darkgrey text-white py-1 px-4 border-1 rounded">Socket id : </h1>
                                <span className="text-darkgrey py-1 px-4 rounded">{user.socket_id}</span>
                                <span className="absolute bg-darkgrey p-2 rounded right-1 top-1 text-white hover:bg-white hover:text-darkgrey cursor-pointer shadow-[0px_0px_12px] shadow-transparent hover:shadow-darkgrey" onClick={()=>{dispatch(toggle_show_info())}}>X</span>
                            </div>
                        </div>
                        </MiniLayout>
                    : ""
                }
            </div>
            {/* <span className={user_counter_class}>users <br /> {user.room_members.length}</span> */}
        </div>
    )
}
