import { useState } from "react"
import axios from 'axios'

export default function SignUp() {
    let [userName, setUserName] = useState('')
    let [password, setPassword] = useState('')
    let [confirmPassword, setConfirmPassword] = useState('')

    const userNameHandler = (e) => {
        setUserName(e.target.value)
    }

    const passwordHandler = (e) => {
        setPassword(e.target.value)
    }

    const confirmPasswordHandler = (e) => {
        setConfirmPassword(e.target.value)
    }

    const onSubmit = (e) => {
        e.preventDefault()

        const data = {
            login: userName,
            password: password, 
            confirmPassword: confirmPassword,
            remember: false
        }

        axios.post(`${import.meta.env.VITE_BASE_URL_BACKEND}/api/v1/auth/signup/`, data, { withCredentials: true }).then((res) => {
            console.log(res)
        })
    }

    const onSubmitGoogle = () => {
        window.location.href = `${import.meta.env.VITE_BASE_URL_BACKEND}/api/v1/auth/google/login/` 
    }

    return (
        <> 
            <div className="w-screen h-screen text-white flex relative max-lg:flex-col overflow-x-hidden">
                <img src="green.png" className="fixed left-[25%] select-none" draggable={false} alt="" />
                <img src="purple.png" className="fixed right-0 bottom-0 select-none" draggable={false} alt="" />

                <div className="w-2/5 h-full bg-[#0B0B0F] flex items-center justify-center max-lg:w-full py-8">
                    <div className="z-10">
                        <div>
                            <h1 className="font-bold text-6xl">Sign Up</h1>
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

                                <div className="relative after:content-[''] after:w-full after:absolute after:bg-[#333] after:h-[1px] after:bottom-0 after:left-0">
                                    <input onChange={confirmPasswordHandler} type="password" placeholder="Confirm Password" className="p-2 bg-transparent relative"/>
                                </div>

                                <button className="mt-10 bg-gradient-to-r rounded-xl from-[#1F1FFF] to-[#AD00FF] font-bold p-4 text-xl" type="submit"> Sign Up</button>
                            </form>

                            <div onClick={onSubmitGoogle} className="mt-9 p-2 bg-[#333] cursor-pointer rounded-[10px] w-full h-10 flex items-center justify-center">
                                <img src="/icons/google.png" width={25} alt="" />
                                <p>Or sign in with Google</p>
                            </div>
                        </div>
                    </div> 
                </div> 

                <div className="w-3/5 h-full flex justify-center items-center bg-[#1F0032] max-lg:w-full py-8">
                    <div className="flex items-center justify-center flex-col w-[450px] gap-4">
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
