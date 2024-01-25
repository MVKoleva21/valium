import { useState, useEffect, useRef } from "react"
import axios from "axios"
import NavEntry from "./NavEntry"
import NavSubEntry from "./NavSubEntry"
import { useNavigate } from 'react-router-dom'

import walletIcon from '/icons/wallet.svg'
import profileIcon from '/icons/profile.svg'
import willIcon from '/icons/will.svg'
import inboxIcon from '/icons/inbox.png'
import transferIcon from '/icons/exchange.png'

export default function Nav() {
    let [user, setUser] = useState({})
    let navigator = useNavigate()
    let [isNavShown, setIsNavShowen] = useState(false)

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BASE_URL_BACKEND}/api/v1/users/current`, {withCredentials: true}).then((res) => {
            setUser(res.data)
        })
    }, [])

    return (
        <>
            <div className="min-h-screen z-20 bg-black w-1/5 relative gap-4 flex flex-col max-lg:w-full max-lg:flex-row max-lg:items-center max-lg:justify-center max-lg:h-[80px] max-lg:min-h-0 max-lg:fixed">
                <div onClick={() => navigator("/account")} className="flex cursor-pointer max-lg:mt-0 justify-center items-center mt-[70px] gap-5">
                    <img src={`https://ui-avatars.com/api/?name=${user.name}&size=60`} className="rounded-full" alt="" width={60} />
                    <h1>{user.name}</h1>
                </div>

                <div className="mt-[120px] ml-[40px] flex flex-col max-lg:flex-row max-lg:mt-0 max-lg:ml-0">
                    <NavEntry title="Profile" icon={profileIcon} isSelected={false} click={() => setIsNavShowen(prev => !prev)}/>
                    <div className={`flex flex-col max-lg:absolute max-lg:top-[80px] max-lg:left-0 ${!isNavShown? 'max-lg:hidden': ''} max-lg:bg-black max-lg:w-full max-lg:justify-center max-lg:items-center`}>
                        <NavSubEntry title="Wills" click={() => navigator("/wills")} isSelected={window.location.pathname === "/wills"} />
                        <NavSubEntry title="Account" click={() => navigator("/account")} isSelected={window.location.pathname === "/account"} />
                    </div>


                    <NavEntry title="Wallet" click={() => navigator("/wallet")} icon={walletIcon} isSelected={window.location.pathname === "/wallet"}/>
                    <NavEntry title="Will" click={() => navigator("/will")} icon={willIcon} isSelected={window.location.pathname === "/will"}/>
                    <NavEntry title="Inbox" click={() => navigator("/inbox")} icon={inboxIcon} isSelected={window.location.pathname === "/inbox"}/>
                    <NavEntry title="Exchange" click={() => navigator("/exchange")} icon={transferIcon} isSelected={window.location.pathname === "/exchange"}/>
                </div>
            </div>
        </>
    )
}
