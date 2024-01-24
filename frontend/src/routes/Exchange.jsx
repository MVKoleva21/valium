import Nav from "../components/Nav";
import Notifications from "../components/Notifications";
import { useState } from "react";
import axios from "axios"

export default function Exchange() {
    let [amount, setAmount] = useState(0)
    let [amountFrom, setAmountFrom] = useState("BGN")
    let [amountTo, setAmountTo] = useState("EUR")

    let [exchange, setExchagne] = useState(0)

    const getExchange = () => {
        if(amount == 0){
            return
        }

        axios.get(`https://api.currencybeacon.com/v1/latest?base=${amountFrom}&api_key=${import.meta.env.VITE_CURRENCY_API_KEY}`).then(res => {
            if(amountTo != "BTC") {
                setExchagne(Math.round(amount * res.data.rates[amountTo]))
            } else {
                setExchagne(amount * res.data.rates[amountTo])
            }
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
                    <h1 className="z-10 text-6xl mt-[60px] ml-[80px] font-bold">Exchange</h1>

                    <div className="w-full h-full flex flex-col items-center justify-start">
                        <div className="w-[85%] my-10  bg-[#1C1C1C60] z-10 rounded-[16px] p-12 flex flex-col justify-center items-center gap-10">
                            <div className="flex gap-10 max-md:flex-col">
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="cur-from">Conver From</label>
                                    <select onChange={(e) => {setAmountFrom(e.target.value)}} name="cur-from" defaultValue="BGN" id="" className="p-3 rounded-lg bg-[#ffffff05] border-2 border-[#ffffff10]">
                                        <option value="BGN">BGN</option>
                                        <option value="EUR">EUR</option>
                                        <option value="BTC">BTC</option>
                                    </select>
                                </div>

                                <div className="flex flex-col gap-1">
                                    <label htmlFor="cur-to">Conver To</label>
                                    <select onChange={(e) => {setAmountTo(e.target.value)}} name="cur-to" defaultValue="EUR" id="" className="p-3 rounded-lg bg-[#ffffff05] border-2 border-[#ffffff10]">
                                        <option value="BGN">BGN</option>
                                        <option value="EUR">EUR</option>
                                        <option value="BTC">BTC</option>
                                    </select>
                                </div>
                                
                                <div className="flex flex-col gap-1">                         
                                    <label htmlFor="amount">Amount</label>
                                    <input onChange={(e) => {setAmount(e.target.value)}} className="w-full z-10 bg-[#ffffff10] rounded-[10px] p-4" name="amount" type="number" />                                    
                                </div>
                            </div>

                            <button onClick={getExchange} className="w-[36%] duration-75 flex justify-center mx-auto px-24 py-2 z-10 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-xl hover:-translate-y-1 hover:shadow-md hover:shadow-[#ffffff7f]">Exchange</button>
                            
                            {exchange != 0 && <div className="flex gap-20">
                                <h1 className="text-white text-2xl">{amount + " " + amountFrom}</h1>
                                <h1 className="text-2xl">Equals</h1>
                                <h1 className="text-2xl text-white">{exchange + " " + amountTo}</h1>
                            </div>}

                        </div>                           
                    </div>
                </div>
            </div>

            <Notifications />
        </>
    )
}
