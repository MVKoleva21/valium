import Nav from "../components/Nav"
import Notifications from "../components/Notifications"
import { useState, useEffect } from "react"
import axios from "axios"
import Will from "../components/Will"

export default function Wills() {
    let [wills, setWills] = useState([])

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BASE_URL_BACKEND}/api/v1/wills/get/`, {withCredentials: true})
            .then((res) => {
                setWills(res.data)
            })
    }, [])

    return (
        <> 
            <img src="/finalize3.png" className="fixed right-0 bottom-0 select-none" draggable={false} alt="" />
            <img src="/finalize2.png" className="fixed left-[25%] bottom-0 select-none" draggable={false} alt="" />
            <img src="/Eclipse.png" className="fixed left-[25%] top-0 select-none" draggable={false} alt="" />

            <div className="w-full flex text-white">
                <Nav />

                <div className="w-full min-h-screen bg-[#030016] flex flex-col max-lg:mt-[80px]"> 
                    <h1 className="z-10 text-6xl mt-[60px] ml-[80px] font-bold">Wills</h1>

                    <div className="p-24 w-full h-full grid grid-cols-5 items-start justify-center gap-16 max-lg:grid-cols-1">
                        {

                            wills.map((item) => {
                                return <Will key={item.id} item={item} />
                            })
                        }
                    </div>
                </div>
            </div>

            <Notifications />
        </>
    )
}
