import { useState, useEffect } from "react"
import axios from "axios"
import Nav from "../components/Nav"
import Cookies from "js-cookie"
import moment from "moment"

export default function Account() {
    let [user, setUser] = useState({})

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BASE_URL_BACKEND}/api/v1/users/current`, {withCredentials: true}).then((res) => {
            setUser(res.data)
        })
    }, [])
    
    const logout = () => {
         axios.post(`${import.meta.env.VITE_BASE_URL_BACKEND}/api/v1/auth/logout/`, {}, 
             {
                withCredentials: true,
                headers: {
                    "X-CSRFToken": Cookies.get('csrftoken')
                }
            }).then(() => {
             window.location.reload()
        })       
    }

    return (
        <> 
            <img src="/finalize3.png" className="fixed right-0 bottom-0 select-none" draggable={false} alt="" />
            <img src="/finalize2.png" className="fixed left-[25%] bottom-0 select-none" draggable={false} alt="" />
            <img src="/Eclipse.png" className="fixed left-[25%] top-0 select-none" draggable={false} alt="" />

            <div className="min-h-screen w-screen flex text-white">
                <Nav />

                <div className="w-full min-h-screen bg-[#030016] flex justify-center items-center flex-col max-lg:mt-[80px]">
                    <div className="z-10 flex items-start w-full">
                        <h1 className="z-10 text-6xl mt-[60px] ml-[80px] font-bold max-lg:text-center max-lg:w-full max-lg:ml-0">Account</h1>
                    </div>

                    <div className="h-full w-[90%] z-10 flex max-lg:flex-col justify-center items-center"> 
                        <div className="h-4/5 my-[80px] break-words justify-center items-center w-4/5 grid grid-cols-3 max-lg:grid-cols-1 gap-20">
                            <div className="flex flex-col gap-2 text-center">
                                <h1 className="font-bold text-[#ffffff50]">Name</h1>
                                <h1 className="text-4xl">{user.name}</h1>
                            </div> 

                            <div className="flex flex-col gap-2 text-center">
                                <h1 className="font-bold text-[#ffffff50]">Date of Birth</h1>
                                <h1 className="text-4xl">{moment(user.dateOfBirth).format('MMMM D, Y')}</h1>
                            </div>

                            <div className="flex flex-col gap-2 text-center">
                                <h1 className="font-bold text-[#ffffff50]">Gender</h1>
                                <h1 className="text-4xl">{user.gender}</h1>
                            </div>

                            <div className="flex flex-col gap-2 text-center">
                                <h1 className="font-bold text-[#ffffff50]">Username</h1>
                                <h1 className="text-4xl">{user.username}</h1>
                            </div>

                            <div className="flex flex-col gap-2 text-center">
                                <h1 className="font-bold text-[#ffffff50]">Email</h1>
                                <h1 className="text-4xl">{user.email}</h1>
                            </div>

                            <div className="flex flex-col gap-2 text-center">
                                <h1 className="font-bold text-[#ffffff50]">PIN</h1>
                                <h1 className="text-4xl">{user.pin}</h1>
                            </div>
                        </div> 

                        <div className="h-full w-1/5 flex justify-center items-center max-lg:w-fit gap-4 flex-col max-lg:mb-[50px]">
                            <img src="/Rectangle.png" alt="" />
                            <button onClick={logout} className="rounded-lg hover:bg-[#913636] hover:scale-105 w-full right-6 text-[#fff] active:scale-100 duration-100 p-4 bg-[#ba3f3f] uppercase">sign out</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
