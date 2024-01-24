import { useState, useEffect } from "react"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function SignIn() {
    let [userName, setUserName] = useState('')
    let [password, setPassword] = useState('')
    let navigator = useNavigate()

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BASE_URL_BACKEND}/api/v1/users/current/`, {withCredentials: true})
            .then((res) => {
                navigator("/wills")
            })
    }, [])

    const userNameHandler = (e) => {
        setUserName(e.target.value)
    }

    const passwordHandler = (e) => {
        setPassword(e.target.value)
    }

    const onSubmit = (e) => {
        e.preventDefault()

        const data = {
            email: userName,
            password: password, 
        }

        axios.post(`${import.meta.env.VITE_BASE_URL_BACKEND}/api/v1/auth/login/`, data, { withCredentials: true }).then((res) => {
            console.log(res)
        })
    }

    const onSubmitGoogle = () => {
        window.location.href = `${import.meta.env.VITE_BASE_URL_BACKEND}/api/v1/auth/google/login/` 
    }

    return (
        <> 
            <div className="w-screen h-screen text-white flex relative max-lg:flex-col">
                <img src="/green.png" className="fixed left-[25%] select-none" draggable={false} alt="" />
                <img src="/purple.png" className="fixed right-0 bottom-0 select-none" draggable={false} alt="" />

                <div className="w-2/5 h-full bg-[#0B0B0F] flex items-center justify-center max-lg:w-full py-8">
                    <div className="z-10">
                        <div>
                            <h1 className="font-bold text-6xl">Sign In</h1>
                            <p className="mt-[15px]">Welcome back to Valium! Enter you accout details</p>
                        </div>

                        <div className="mt-12">
                            <form onSubmit={onSubmit} method="post" className="flex flex-col gap-5">
                                <div className="relative after:content-[''] after:w-full after:absolute after:bg-[#333] after:h-[1px] after:bottom-0 after:left-0">
                                    <input onChange={userNameHandler} type="email" placeholder="Email" className="p-2 bg-transparent"/>
                                </div>
                                
                                <div className="relative after:content-[''] after:w-full after:absolute after:bg-[#333] after:h-[1px] after:bottom-0 after:left-0">
                                    <input onChange={passwordHandler} type="password" placeholder="Password" className="p-2 bg-transparent relative"/>
                                </div>

                                <button className="px-5 z-10 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-xl transition-transform transform-gpu hover:-translate-y-1 hover:shadow-md hover:shadow-[#ffffff7f]" type="submit"> Sign In</button>
                            </form>

                            <div onClick={onSubmitGoogle} className="mt-9 p-2 bg-[#333] cursor-pointer rounded-[10px] w-full h-10 flex items-center justify-center">
                                <img src="/icons/google.png" width={25} alt="" />
                                <p>Or sign in with Google</p>
                            </div>
                        </div>
                        
                        <div className="flex mt-16 text-[#333] relative items-center">
                            <p>Don't have an account?</p>
                            <button onClick={() => navigator("/accounts/signup")} className="right-0 absolute p-4 bg-[#333] rounded-lg text-white">Sign Up</button>
                        </div>
                    </div> 
                </div> 

                <div className="w-3/5 h-full flex justify-center items-center bg-[#1F0032] max-lg:w-full py-8">
                    <div className="flex items-center justify-center flex-col w-[450px] z-10 gap-4">
                        <div className="flex items-left justify-center flex-col w-full">
                            <h1 className="text-[80px] font-bold whitespace-nowrap">Welcome to</h1>
                            <h1 className="text-[80px] font-bold">Valium</h1>
                        </div>

                        <div className="flex flex-col justify-center items-left w-full gap-8 text-lg">
                            <p>Sign up or Log in to access your account and set up your account.</p>
                            <p>Welcome to the new modern will - digital will. Unlock a new world with our digital will site and give a try to the latest discovery in the world of wills. Connect with your loved ones and start bequeathing your digital assets to them.</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
