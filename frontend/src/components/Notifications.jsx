import { useState, useEffect } from "react"
import Notification from "./Notification"
import axios from "axios"

export default function Notifications() {
    let [isHovered, setIsHovered] = useState(false)
    let [isExpanded, setIsExpanded] = useState(false)
    let [notifications, setNotifications] = useState([])

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BASE_URL_BACKEND}/api/v1/notifications/get/`, {withCredentials: true}).then((res) => {
            setNotifications(res.data)
        })
    }, [])

    return (
        <>
            <div className={`flex flex-col justify-center items-center ${!isExpanded? 'min-w-[75px] min-h-[75px]': 'w-[600px] h-[530px] max-lg:w-1/2' } right-[100px] bottom-[40px] fixed z-30 flex rounded-2xl bg-gradient-to-r from-[#525466] to-[#414354]`}>
                {isExpanded && 
                <div className="h-full gap-[35px] overflow-scroll w-full flex flex-col items-center mt-[30px]">
                    {
                        notifications.map(not => {
                            return <Notification key={not.id} message={not.message} />
                        })
                    }
                </div>}
                
                <div onClick={() => setIsExpanded(prev => !prev)} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} className={`flex gap-2 ${!isExpanded? 'justify-center hover:scale-105 active:scale-100 duration-75 h-full': 'justify-end'} cursor-pointer items-center p-4 w-full select-none`}>
                     <img draggable={false} src="/icons/bell-icon.png" alt="" />  
                    {(isHovered || isExpanded) && <h1 className="text-white">Notifications</h1>}
                </div>
            </div>
        </>
    )
}
