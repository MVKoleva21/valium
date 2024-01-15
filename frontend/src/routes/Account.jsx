import { useState, useEffect } from "react"
import axios from "axios"
import Nav from "../components/Nav"


export default function Account() {
    let [user, setUser] = useState({})

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BASE_URL_BACKEND}/api/v1/users/current`, {withCredentials: true}).then((res) => {
            setUser(res.data)
        })
    }, [])
    

    return (
        <> 
            <img src="/finalize3.png" className="absolute right-0 bottom-0 select-none" draggable={false} alt="" />
            <img src="/finalize2.png" className="absolute left-[25%] bottom-0 select-none" draggable={false} alt="" />
            <img src="/Eclipse.png" className="absolute left-[25%] top-0 select-none" draggable={false} alt="" />

            <div className="h-screen w-screen flex text-white">
                <Nav />

                <div className="w-full h-full bg-[#030016] flex flex-col">
                    <h1 className="z-10 text-6xl mt-[60px] ml-[80px] font-bold">Account</h1>

                    <div className="h-full w-[90%] z-10 flex"> 
                        <div className="h-full w-4/5 flex justify-center items-center">
                            <div className="flex flex-col gap-[50px] items-start justify-center">
                                <div className="flex gap-[90px]">
                                    <div>
                                        <p className="font-bold text-sm text-[#888]">Name</p>
                                        <h1 className="text-4xl">{user.name}</h1>
                                    </div>

                                    <div className="ml-44">
                                        <p className="font-bold text-sm text-[#888]">Gender</p>
                                        <h1 className="text-4xl">{user.gender != ""? user.gender: "Male"}</h1>
                                    </div>
                                </div>

                                <div className="flex gap-[90px]">
                                    <div>
                                        <p className="font-bold text-sm text-[#888]">Email</p>
                                        <h1 className="text-4xl">{user.email}</h1>
                                    </div>

                                    <div>
                                        <p className="font-bold text-sm text-[#888]">PIN</p>
                                        <h1 className="text-4xl">{user.pin}</h1>
                                    </div>
                                </div>

                                <div className="flex gap-[90px]">
                                    <div>
                                        <p className="font-bold text-sm text-[#888]">Username</p>
                                        <h1 className="text-4xl">{user.username}</h1>
                                    </div>
                                </div>
                            </div>  
                        </div>

                        <div className="h-full w-1/5 flex justify-center items-center">
                            <img src="/Rectangle.png" alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
