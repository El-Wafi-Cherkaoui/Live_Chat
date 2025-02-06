import img from "../../assets/chat_logo.svg"

export const btn_class = "p-1 bg-red-300 rounded-xl px-2 bg-white font-bold hover:bg-black hover:text-white cursor-pointer transition duration-75"

export default function ChatHeader({title, room_id} : {title: string, room_id: string}){
    
    return(
        <div className="bg-white text-darkblue md:h-[20%] h-fit flex items-center p-5 gap-6 shadow-mid rounded-l-xl">
            <img src={img} alt="ads" className="w-[50px] h-[50px] rounded-xl p-1" />
            <div className="flex-1 font-bold">
                <h1>{title}</h1>
            </div>
            <div className="flex gap-2 bg-darkblue p-5 rounded-2xl text-white">
                    <span className="font-bold">Room ID : </span>
                    <p className="">
                    {room_id}
                </p>
            </div>
        </div>
    )
}