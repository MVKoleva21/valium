import { useState, useEffect } from "react"
import axios from "axios"
import Modal from "react-modal"

export default function Notification(props) {
    let [showConfirm, setShowConfirm] = useState(false)
    let [showDecline, setShowDecline] = useState(false)
    let [email, setEmail] = useState('')

   const handleGetEmail = (e) => {
        setEmail(() => e.target.value)
    }

    const customStyles = {
        overlay: {zIndex: 1000}
    };

    const handleConfirmAccout = () => {
        const data = {
           user: email
        } 

        axios.post(`${import.meta.env.VITE_BASE_URL_BACKEND}/api/v1/users/confirm/`, data, {withCredentials: true}).then((res) => {
            window.location.reload()
        })
    }

    const handleDeclineAccout = () => {

    }

    return (
        <>
            <div className={`flex py-3 px-6 w-full border-gray-500 border bg-[#333] justify-start select-none items-center gap-4 flex-col`}>
                <h1>{props.text}</h1>
                <button onClick={() => setShowConfirm(true)} className="w-full h-full">YES</button>
                <button onClick={() => setShowDecline(true)} className="w-full h-full">NO</button>
            </div> 

            <Modal isOpen={showConfirm} style={customStyles} ariaHideApp={false} className="flex flex-col items-center justify-center h-screen">
                <div className="w-[40%] flex flex-col">
                    <h1>Are you sure you want to confirm death?</h1>
                    <input className="w-full z-10 bg-[#ffffff05] rounded-[10px] p-4" placeholder="Confirm email" onChange={handleGetEmail} type="email" />                                    
                    <button onClick={handleConfirmAccout} className="p-2 mt-2 font-bold bg-gradient-to-r rounded-xl from-[#18C8FF] to-[#933FFE] z-10">Confirm</button>
                    <button onClick={() => setShowConfirm(false)} className="p-2 mt-2 font-bold bg-gradient-to-r rounded-xl from-[#18C8FF] to-[#933FFE] z-10">Cancel</button>
                </div>
            </Modal>

            <Modal isOpen={showDecline} style={customStyles} ariaHideApp={false} className="flex flex-col items-center justify-center h-screen">
                <div className="w-[40%] flex flex-col">
                    <h1>Are you sure you want to decline death?</h1>
                    <input className="w-full z-10 bg-[#ffffff05] rounded-[10px] p-4" placeholder="Confirm email" onChange={handleGetEmail} type="email" />                                    
                    <button onClick={handleDeclineAccout} className="p-2 mt-2 font-bold bg-gradient-to-r rounded-xl from-[#18C8FF] to-[#933FFE] z-10">Confirm</button>
                    <button onClick={() => setShowDecline(false)} className="p-2 mt-2 font-bold bg-gradient-to-r rounded-xl from-[#18C8FF] to-[#933FFE] z-10">Cancel</button>
                </div>
            </Modal>
        </>
    )
}
