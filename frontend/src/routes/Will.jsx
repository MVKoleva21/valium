import { useState, useEffect } from "react"
import axios from "axios"
import Nav from "../components/Nav"
import Notifications from "../components/Notifications"
import Cookies from "js-cookie"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

export default function Will() {
    let [userEmails, setUserEmails] = useState([])
    let [usersMatchingEmails, setUsersMatchingEmails] = useState([])
    let [showEmailGuide, setShowEmailGuide] = useState(true)


    let [inheritorEmail, setInheritorEmail] = useState("")
    let [effectiveImmediate, setEffectiveImmediate] = useState(false)
    let [dateToTransfer, setDateToTransfer] = useState(new Date().toISOString().split('T')[0])
    let [message, setMessage] = useState("")
    let [title, setTitle] = useState("")
    let [bgnToTransfer, setBgnToTransfer] = useState(0.0)
    let [eurToTransfer, setEurToTransfer] = useState(0.0)
    let [btcToTransfer, setBtcToTransfer] = useState(0.0)
    let [etcToTransfer, setEtcToTransfer] = useState(0.0)

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BASE_URL_BACKEND}/api/v1/users/get`, {withCredentials: true}).then((res) => {
            setUserEmails(res.data)
        })
    }, [])

    useEffect(() => {
        for(let j = 0; j < userEmails.length; j++) {
            if(userEmails[j].includes(inheritorEmail)) {
                if(!usersMatchingEmails.includes(userEmails[j]) && usersMatchingEmails.length <= 5) {
                    setUsersMatchingEmails((prev) => [userEmails[j], ...prev])
                }
            }
        }

        for(let j = 0; j < usersMatchingEmails.length; j++) {
            if(!usersMatchingEmails[j].includes(inheritorEmail)) {
                setUsersMatchingEmails((prev) => prev.splice(j, 1))
            }
        }

        if(inheritorEmail == '') {
            setUsersMatchingEmails([])
        }

    }, [inheritorEmail])

    const handleSumbition = (e) => {
        e.preventDefault()        

        const data = {
            message: message,
            amount: {
                bgn: bgnToTransfer,
                eur: eurToTransfer,
                btc: btcToTransfer,
                etc: etcToTransfer
            },
            transferDate: dateToTransfer,
            transferTo: inheritorEmail,
            effectiveImmediate: effectiveImmediate,
            title: title
        }

        axios.post(`${import.meta.env.VITE_BASE_URL_BACKEND}/api/v1/wills/new/`, data, { 
            withCredentials: true,
            headers: {
                "X-CSRFToken": Cookies.get('csrftoken')
            }
        }).then(() => {
            window.location.reload()
        }).catch(err => {
            toast.error(err.response.data.error)
        })
    }

    return (
        <> 
            <img src="/finalize3.png" className="fixed right-0 bottom-0 select-none" draggable={false} alt="" />
            <img src="/finalize2.png" className="fixed left-[25%] bottom-0 select-none" draggable={false} alt="" />
            <img src="/Eclipse.png" className="fixed left-[25%] top-0 select-none" draggable={false} alt="" />

            <div className="w-full flex text-white">
                <Nav />

                <div className="w-full min-h-screen bg-[#030016] flex flex-col max-lg:mt-[80px]">
                    <h1 className="z-10 text-6xl mt-[60px] ml-[80px] font-bold">Will</h1> 

                    <div className="w-full h-full flex justify-center items-center">
                        <form onSubmit={handleSumbition} className="w-[85%] my-10  bg-[#1C1C1C60] z-10 rounded-[16px] p-12 flex flex-col justify-center items-center gap-10">
                            <div className="flex justify-center items-start gap-10 w-full max-lg:flex-col">
                                <div className="flex justify-center gap-5 items-center w-full flex-col">
                                    <div className="relative w-full">
                                        <input type="email" onChange={(e) => {setShowEmailGuide(true); setInheritorEmail(e.target.value)}} value={inheritorEmail} placeholder="Bequeath: Enter email" className="w-full z-10 bg-[#ffffff10] rounded-[10px] p-4"/>
                                        {
                                            showEmailGuide && <div className="absolute w-full rounded-xl overflow-hidden">
                                            {
                                                usersMatchingEmails.map((el, index) => {
                                                    return <h1 key={index} onClick={() => {setInheritorEmail(el); setShowEmailGuide(false)}} className="p-4 bg-[#ffffff10] duration-75 hover:bg-[#ffffff15] select-none cursor-pointer z-20 relative w-full">{el}</h1>
                                                })
                                            }
                                        </div>
                                        }
                                    </div>

                                    <input onChange={(e) => {setTitle(e.target.value)}} className="w-full z-10 bg-[#ffffff10] rounded-[10px] p-4" placeholder="Enter message title" type="text" /> 
                                    <textarea onChange={(e) => {setMessage(e.target.value)}} cols="45" className="w-full resize-none p-4 z-10 bg-[#ffffff10] rounded-[10px] mb-6" placeholder="Leave message..." rows="15"></textarea>
                                </div>
                                <div className="gap-5 flex flex-col w-full">
                                    <input onChange={(e) => {setBgnToTransfer(e.target.value)}} className="w-full z-10 bg-[#ffffff10] rounded-[10px] p-4" placeholder="BGN to transfer" type="number" />                                    
                                    <input onChange={(e) => {setEurToTransfer(e.target.value)}} className="w-full z-10 bg-[#ffffff10] rounded-[10px] p-4" placeholder="EUR to transfer" type="number" />                                    
                                    <input onChange={(e) => {setBtcToTransfer(e.target.value)}} className="w-full z-10 bg-[#ffffff10] rounded-[10px] p-4" placeholder="BTC to transfer" type="number" />                                    
                                    <input onChange={(e) => {setEtcToTransfer(e.target.value)}} className="w-full z-10 bg-[#ffffff10] rounded-[10px] p-4" placeholder="ETC to transfer" type="number" /> 
                                    
                                    <div className="flex gap-5">
                                        <label htmlFor="effective Immediate">Effective Immediate</label>
                                        <input defaultValue={false} onClick={() => {setEffectiveImmediate((prev) => !prev)}} type="checkbox" name="effective-immediate" />
                                    </div>

                                    {!effectiveImmediate && <div className="flex gap-5 flex-col">
                                        <label htmlFor="date">Enter transfer date</label>
                                        <input onChange={(e) => {setDateToTransfer(e.target.value)}} type="date" className="w-full z-10 bg-[#ffffff10] rounded-[10px] p-4" name="date"/>
                                    </div>}
                                </div>
                            </div> 
                            <button type="submit" className="w-[36%] duration-75 flex justify-center mx-auto px-24 py-2 z-10 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-xl hover:-translate-y-1 hover:shadow-md hover:shadow-[#ffffff7f]">Sumbit Will</button>
                        </form> 
                    </div>
                </div>
            </div>

            <Notifications />

            <ToastContainer />
        </>
    )
}
