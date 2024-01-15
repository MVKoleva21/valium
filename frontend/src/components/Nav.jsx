import { useState, useEffect } from "react"
import axios from "axios"
import NavEntry from "./NavEntry"
import NavSubEntry from "./NavSubEntry"
import { useNavigate } from 'react-router-dom'
import Notification from './Notification'
import Modal from "react-modal"
import Message from "./Message"

import walletIcon from '/icons/wallet.svg'
import profileIcon from '/icons/profile.svg'
import willIcon from '/icons/will.svg'
import notificationIcon from '/icons/notifications.svg'

export default function Nav() {
    let [user, setUser] = useState({})
    let [notifications, setNotifications] = useState([])
    let [inbox, setInbox] = useState([])
    let navigator = useNavigate()
    let [showNotificatoins, setShowNotifications] = useState(false)
    let [showInbox, setShowInbox] = useState(false)
    let [showSuspendAccount, setSuspendAccount] = useState(false)
    let [email, setEmail] = useState('')

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BASE_URL_BACKEND}/api/v1/users/current`, {withCredentials: true}).then((res) => {
            setUser(res.data)
        })
    }, [])

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BASE_URL_BACKEND}/api/v1/notifications/get`, {withCredentials: true}).then((res) => {
            setNotifications(res.data)
        })
    }, [])

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BASE_URL_BACKEND}/api/v1/inbox/get`, {withCredentials: true}).then((res) => {
            setInbox(res.data)
        })
    }, [])

   const handleGetEmail = (e) => {
        setEmail(() => e.target.value)
    }

    const customStyles = {
        overlay: {zIndex: 1000}
    };

    const handleSuspendAccount = () => {
        const data = {
           user: email
        } 

        axios.post(`${import.meta.env.VITE_BASE_URL_BACKEND}/api/v1/users/suspend/`, data, {withCredentials: true}).then((res) => {
            window.location.reload()
        })
    }

    return (
        <>
            <div className="h-screen z-10 bg-black w-1/5 relative">
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
                    <NavEntry title="Suspend Account" click={() => {setSuspendAccount(() => true)}} icon={notificationIcon} isSelected={false}/>
                    <NavEntry title="Notification" click={() => {setShowNotifications(() => !showNotificatoins)}} icon={notificationIcon} isSelected={false}/>
                    <NavEntry title="Inbox" click={() => {setShowInbox(() => !showInbox)}} icon={notificationIcon} isSelected={false}/>
                </div>
            </div>

            {showNotificatoins && 
                <div className="h-screen z-10 bg-black w-1/5 relative">
                    {
                        notifications.map((not) => {
                            return <Notification text={not.message}/>
                        })
                    }
                </div>
            } 

            {showInbox && 
                <div className="h-screen z-10 bg-black w-1/5 relative">
                    {
                        inbox.map((msg) => {
                            return <Message text={msg.message}/>
                        })
                    }
                </div>
            } 

            <Modal isOpen={showSuspendAccount} style={customStyles} ariaHideApp={false} className="flex flex-col items-center justify-center h-screen">
                <div className="w-[40%] flex flex-col">
                    <input className="w-full z-10 bg-[#ffffff05] rounded-[10px] p-4" placeholder="Suspend: enter email" onChange={handleGetEmail} type="email" />                                    
                    <button onClick={handleSuspendAccount} className="p-2 mt-2 font-bold bg-gradient-to-r rounded-xl from-[#18C8FF] to-[#933FFE] z-10">Suspend</button>
                    <button onClick={() => setSuspendAccount(false)} className="p-2 mt-2 font-bold bg-gradient-to-r rounded-xl from-[#18C8FF] to-[#933FFE] z-10">Back</button>
                </div>
            </Modal>
        </>
    )
}
