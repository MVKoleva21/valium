import { useState, useEffect } from "react"
import axios from "axios"
import NavEntry from "./NavEntry"
import NavSubEntry from "./NavSubEntry"
import { useNavigate } from 'react-router-dom'

import walletIcon from '/icons/wallet.svg'
import profileIcon from '/icons/profile.svg'
import willIcon from '/icons/will.svg'
import notificationIcon from '/icons/notifications.svg'

export default function Nav() {
    let [user, setUser] = useState({})
    let navigator = useNavigate()

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BASE_URL_BACKEND}/api/v1/users/current`, {withCredentials: true}).then((res) => {
            setUser(res.data)
        })
    }, [])

    return (
        <>
            <div className="h-screen z-10 bg-black w-1/5">

                <div className="flex cursor-pointer justify-center items-center mt-[70px] gap-5">
                    <img src={`https://api.dicebear.com/7.x/personas/svg?seed=${user.email}`} className="rounded-full" alt="" width={60} />
                    <h1>{user.name}</h1>
                </div>

                <div className="mt-[120px] ml-[40px]">
                    <NavEntry title="Wallet" click={() => navigator("/wallet")} icon={walletIcon} isSelected={window.location.pathname === "/wallet"}/>
                    <NavEntry title="Profile" icon={profileIcon} isSelected={false}/>
                    <NavSubEntry title="Connections" click={() => navigator("/account")} isSelected={window.location.pathname === "/connections"} />
                    <NavSubEntry title="Account" click={() => navigator("/account")} isSelected={window.location.pathname === "/account"} />

                    <NavEntry title="Will" click={() => navigator("/will")} icon={willIcon} isSelected={window.location.pathname === "/will"}/>
                    <NavEntry title="Notification" icon={notificationIcon} isSelected={false}/>
                </div>
            </div>
        </>
    )
}
