import Nav from "../components/Nav"
import Connection from "../components/Connection"
import { useState, useEffect } from "react"
import axios from "axios"

export default function Connections() {
    let [user, setUser] = useState({})
    let [transferTo, setTransferTo] = useState([])

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BASE_URL_BACKEND}/api/v1/users/current`, {withCredentials: true}).then((res) => {
            setUser(res.data)
            setTransferTo(res.data.transfer_to)
        })
    }, [])
    
    return (
        <div className="w-screen h-screen flex text-white relative">
            <Nav />
            <div className="w-full h-full bg-[#030016] flex flex-col justify-center items-center">
                <img src="/finalize.png" className="fixed right-0 select-none" draggable={false} alt="" />
                <img src="/finalize3.png" className="fixed right-0 bottom-0 select-none" draggable={false} alt="" />
                <img src="/finalize2.png" className="fixed left-[#25] bottom-0 select-none" draggable={false} alt="" />
            
                <h1 className="text-white text-6xl font-bold tracking-wider max-md:max-w-full max-md:text-4xl">Connections</h1>

                <div className="mx-auto mt-6">
                    <div className="gap-5 flex max-md:flex-col">
                        {
                            transferTo.map((e) => { 
                                return <Connection email={e.transfer_to_email}/>
                            })
                        }
                    </div>
                </div>
             </div>
        </div>
  );
};
