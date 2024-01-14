
import { useState, useEffect } from "react"
import axios from "axios"


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
                <div className="h-screen z-10 bg-black w-1/5"></div>

                <div className="w-full h-full bg-[#030016] flex flex-col">
                    <h1 className="z-10 text-6xl mt-[60px] ml-[80px] font-bold">Will</h1>

                    <div className="w-full h-full flex flex-col items-center z-10 justify-center">
                        <div className="w-[90%] h-full flex gap-10 justify-center items-center">
                            <div className="w-3/5 py-3 rounded-[16px] bg-[#1C1C1C60] h-[80%]">
                                <h1 className="mt-[30px] ml-[60px] font-bold text-3xl">Transfer Money</h1>
                                
                                <div className="flex justify-center items-start mt-28 h-full">
                                    <div className="z-10 w-[80%] gap-8 flex flex-col">
                                        <input className="w-full z-10 bg-[#ffffff05] rounded-[10px] p-4" placeholder="BGN to transfer" onChange={handleValueChangeBgn} type="number" />                                    
                                        <input className="w-full z-10 bg-[#ffffff05] rounded-[10px] p-4" placeholder="EUR to transfer" onChange={handleValueChangeEur} type="number" />                                    
                                        <input className="w-full z-10 bg-[#ffffff05] rounded-[10px] p-4" placeholder="BTC to transfer" onChange={handleValueChangeBtc} type="number" />                                    
                                        <input className="w-full z-10 bg-[#ffffff05] rounded-[10px] p-4" placeholder="ETC to transfer" onChange={handleValueChangeEtc} type="number" />                                    

                                        <button onClick={handleBequeath} className="p-2 mt-2 font-bold bg-gradient-to-r rounded-xl from-[#18C8FF] to-[#933FFE] z-10">Bequeath</button>
                                    </div>
                                </div>
                                
                            </div> 
                            
                            <div className="w-2/5 h-[80%] z-10 bg-[#1C1C1C60] rounded-[16px]">
                                <h1 className="z-10 text-4xl mt-[60px] ml-[80px] font-bold">Leave A Message</h1>
                                <p className="z-10 ml-[80px] text-[#555] mt-2">Upload message to bequeath to your beloved ones.</p>

                                <div className="flex items-center mt-10 w-full flex-col">
                                    <div className="w-[90%] flex items-center flex-col gap-10">
                                        <input className="w-full z-10 bg-[#ffffff05] rounded-[10px] p-4" placeholder="Bequeath: enter email" onChange={handleGetEmail} type="email" />                                    
                                        <textarea name="" id="" cols="30" onChange={handleGetMessage} className="w-full z-10 bg-[#ffffff05] rounded-[10px] p-4" placeholder="Leave message..." rows="10"></textarea> 
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
