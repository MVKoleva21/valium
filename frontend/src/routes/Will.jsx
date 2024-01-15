import { useState, useEffect } from "react"
import axios from "axios"
import Nav from "../components/Nav"


export default function Will() {
    let [user, setUser] = useState({})
    let [amountMoneyBgn, setAmountMoneyBgn] = useState(0)
    let [amountMoneyEur, setAmountMoneyEur] = useState(0)
    let [amountCryptoBtc, setAmountCryptoBtc] = useState(0)
    let [amountCryptoEtc, setAmountCryptoEtc] = useState(0)
    let [email, setEmail] = useState('')
    let [message, setMessage] = useState('')

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BASE_URL_BACKEND}/api/v1/users/current`, {withCredentials: true}).then((res) => {
            setUser(res.data)
        })
    }, [])

    const handleValueChangeBgn = (e) => {
        setAmountMoneyBgn(() => e.target.value)
    }

    const handleValueChangeEur = (e) => {
        setAmountMoneyEur(() => e.target.value)
    }

    const handleValueChangeBtc = (e) => {
        setAmountCryptoBtc(() => e.target.value)
    }

    const handleValueChangeEtc = (e) => {
        setAmountCryptoEtc(() => e.target.value)
    }

    const handleGetEmail = (e) => {
        setEmail(() => e.target.value)
    }

    const handleGetMessage = (e) => {
        setMessage(() => e.target.value)
    }

    const handleBequeath = () => {
        const data = [{
            user: email,
            amount: {
                bgn: amountMoneyBgn,
                eur: amountMoneyEur,
                btc: amountCryptoBtc,
                etc: amountCryptoEtc
            },
            message: message
        }]

        axios.post(`${import.meta.env.VITE_BASE_URL_BACKEND}/api/v1/users/add/recieve/`, data, {withCredentials: true}).then((res) => {
            window.location.reload()
        })
    }

    return (
        <> 
            <img src="/finalize3.png" className="absolute right-0 bottom-0 select-none" draggable={false} alt="" />
            <img src="/finalize2.png" className="absolute left-[25%] bottom-0 select-none" draggable={false} alt="" />
            <img src="/Eclipse.png" className="absolute left-[25%] top-0 select-none" draggable={false} alt="" />

            <div className="h-screen w-screen flex text-white">
                <Nav />

                <div className="w-full h-full bg-[#030016] flex flex-col">
                    <h1 className="z-10 text-6xl mt-[60px] ml-[80px] font-bold">Will</h1>

                    <div className="w-full h-full flex-grow flex-col items-center z-10 justify-center">
                        <div className="w-[90%] h-full flex gap-10 justify-center items-center">
                            <div className="w-[90%] py-3 rounded-[16px] bg-[#1C1C1C60] h-[80%]">
                                <div>
                                    <div className="flex justify-center items-start mt-8 h-full">
                                        <div className="z-10 w-[80%] gap-8 flex flex-col">
                                            <h1 className="ml-[60px] font-bold text-3xl">Transfer Money</h1>
                                            <p className="z-10 ml-[80px] text-[#c3c3c3]">Transfer money to bequeath to your beloved ones.</p>
                                            <input className="w-full z-10 bg-[#ffffff05] rounded-[10px] p-4" placeholder="BGN to transfer" onChange={handleValueChangeBgn} type="number" />                                    
                                            <input className="w-full z-10 bg-[#ffffff05] rounded-[10px] p-4" placeholder="EUR to transfer" onChange={handleValueChangeEur} type="number" />                                    
                                            <input className="w-full z-10 bg-[#ffffff05] rounded-[10px] p-4" placeholder="BTC to transfer" onChange={handleValueChangeBtc} type="number" />                                    
                                            <input className="w-full z-10 bg-[#ffffff05] rounded-[10px] p-4" placeholder="ETC to transfer" onChange={handleValueChangeEtc} type="number" />                                    

                                        </div>

                                        <div className="flex flex-col gap-8 z-10 w-[80%]">
                                            <h1 className="z-10 text-4xl ml-[80px] font-bold">Leave A Message</h1>
                                            <p className="z-10 ml-[80px] text-[#c3c3c3]">Upload message to bequeath to your beloved ones.</p>

                                            <div className="flex items-center w-full flex-col">
                                                <div className="flex flex-col w-[90%] gap-6">
                                                    <input className="w-full z-10 bg-[#ffffff05] rounded-[10px] p-4" placeholder="Bequeath: enter email" onChange={handleGetEmail} type="email" />                                    
                                                    <textarea name="" id="" cols="30" onChange={handleGetMessage} className="w-full resize-none z-10 bg-[#ffffff05] rounded-[10px] mb-6" placeholder="Leave message..." rows="10"></textarea> 
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                        <button onClick={handleBequeath} className="w-[36%] flex justify-center mx-auto px-24 py-2 z-10 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-xl hover:-translate-y-1 hover:shadow-md hover:shadow-[#ffffff7f]">Bequeath</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}