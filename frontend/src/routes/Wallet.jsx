import { useState, useEffect } from "react"
import axios from "axios"
import Nav from "../components/Nav"


export default function Wallet() {
    let [user, setUser] = useState({})
    let [amountMoney, setAmountMoney] = useState()
    let [amountCrypto, setAmountCrypto] = useState()

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BASE_URL_BACKEND}/api/v1/users/current`, {withCredentials: true}).then((res) => {
            setUser(res.data)

            setAmountMoney(() => res.data.wallet.bgn)
            setAmountCrypto(() => res.data.wallet.btc)
        })
    }, [])
    
    const handleMoneyChange = (e) => {
        if(e.target.value == 'bgn') {
            setAmountMoney(() => user.wallet.bgn)
        }
        else if(e.target.value == 'eur') {
            setAmountMoney(() => user.wallet.eur)
        }
    }

    const handleCryptoChange = (e) => {
        if(e.target.value == 'btc') {
            setAmountCrypto(() => user.wallet.btc)
        }
        else if(e.target.value == 'etc') {
            setAmountCrypto(() => user.wallet.etc)
        }
    }

    return (
        <> 
            <img src="/finalize3.png" className="absolute right-0 bottom-0 select-none" draggable={false} alt="" />
            <img src="/finalize2.png" className="absolute left-[25%] bottom-0 select-none" draggable={false} alt="" />
            <img src="/Eclipse.png" className="absolute left-[25%] top-0 select-none" draggable={false} alt="" />

            <div className="h-screen w-screen flex text-white">
                <Nav />

                <div className="w-full h-full bg-[#030016] flex flex-col">
                    <h1 className="z-10 text-6xl mt-[60px] ml-[80px] font-bold">Wallet</h1>

                    <div className="w-full h-full flex flex-col items-center justify-center">
                        <div className="w-[90%] h-full flex gap-10 justify-center items-center z-10">
                            <div className="w-3/5 py-3 rounded-[16px] bg-[#1C1C1C60] min-h-[50%] max-md:hidden justify-center items-center flex">
                               <img src="/Cards.png" className="z-10" draggable={false} alt="" /> 
                            </div> 
                            
                            <div className="w-2/5 h-[80%] bg-[#1C1C1C60] rounded-[16px] flex justify-center items-center z-10">
                                <div className="w-[80%] h-[80%]">
                                    <h1 className="text-4xl font-bold z-10">Balance</h1>
                                    
                                    <div className="w-full h-full gap-14 justify-center items-center flex flex-col">
                                        <div className="w-full flex gap-3 flex-col">
                                            <h1 className="text-3xl z-10">Money</h1>
                                            <select className="w-full z-10 bg-[#ffffff05] rounded-[10px] p-4" defaultValue="bgn" onChange={handleMoneyChange} name="cur" id="">
                                                <option value="bgn">BGN</option>
                                                <option value="eur">EUR</option>
                                            </select>

                                            <div>
                                                <p className="text-[#333] z-10 font-bold">Amount</p>
                                                <h1 className="text-2xl z-10">{amountMoney}</h1>
                                            </div>
                                        </div> 

                                        <div className="w-full flex flex-col gap-3">
                                            <h1 className="text-3xl z-10">Crypto</h1>
                                            <select name="crypto" className="w-full z-10 rounded-[10px] bg-[#ffffff05] p-4" onChange={handleCryptoChange} defaultValue="bgn" id="">
                                                <option value="btc">BTC</option>
                                                <option value="etc">ETC</option>
                                            </select>

                                            <div>
                                                <p className="text-[#333] font-bold z-10">Amount</p>
                                                <h1 className="text-2xl z-10">{amountCrypto}</h1>
                                            </div>
                                        </div>
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

