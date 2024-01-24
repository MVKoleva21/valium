import { useState } from "react"
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import Cookies from "js-cookie"
 
export default function FinilizeAccout() {
    let [fname, setFname] = useState("")
    let [lname, setLname] = useState("")
    let [uname, setUname] = useState("")
    let [pin, setPin] = useState("")
    let [gender, setGender] = useState("Male")
    let [bdate, setBdate] = useState("")
    let navigator = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()

        const data = {
            name: fname + " " + lname,
            username: uname,
            pin: pin,
            dateOfBirth: bdate,
            gender: gender
        }


        axios.post(`${import.meta.env.VITE_BASE_URL_BACKEND}/api/v1/users/new/`, data, { 
            withCredentials: true,
            headers: {
                "X-CSRFToken": Cookies.get('csrftoken')
            }
        }).then(() => {
            navigator("/wills")
        })
    }

    return (
        <>
            <div className="w-screen min-h-screen flex justify-center items-center bg-[#030016] text-white relative"> 
                <img src="/finalize.png" className="fixed right-0 top-0 select-none" draggable={false} alt="" />
                <img src="/finalize3.png" className="fixed right-0 bottom-0 select-none" draggable={false} alt="" />
                <img src="/finalize2.png" className="fixed left-[25%] bottom-0 select-none" draggable={false} alt="" />

                <div className="p-4">
                    <h1 className="font-bold max-lg:text-center text-4xl">Finish profile set up</h1>
                    
                    <form method="post" className="flex z-10 relative flex-col gap-4 bg-[#1C1C1C60] p-8 py-14 my-16 rounded-2xl" onSubmit={handleSubmit}>
                        <div className="flex gap-8 max-lg:flex-col max-lg:gap-4">
                            <div className="flex flex-col gap-1 z-10">
                                <label htmlFor="fname">First Name</label>
                                <input onChange={(e) => setFname(e.target.value)} type="text" required name="fname" className="p-3 rounded-lg bg-[#ffffff05] border-2 border-[#ffffff10]"/>
                            </div>

                            <div className="flex flex-col gap-1 z-10">
                                <label htmlFor="lname">Last Name</label>
                                <input onChange={(e) => setLname(e.target.value)} type="text" required name="lname" className="p-3 rounded-lg bg-[#ffffff05] border-2 border-[#ffffff10]"/>
                            </div>
                        </div>

                        <div className="flex flex-col gap-1 z-10">
                            <label htmlFor="uname">Username</label>
                            <input onChange={(e) => setUname(e.target.value)} type="text" required name="uname" className="p-3 rounded-lg bg-[#ffffff05] border-2 border-[#ffffff10]"/>
                        </div>
                        
                        <div className="flex flex-col gap-1 z-10">
                            <label htmlFor="pin">PIN</label>
                            <input onChange={(e) => setPin(e.target.value)} type="text" required name="pin" className="p-3 rounded-lg bg-[#ffffff05] border-2 border-[#ffffff10]"/>
                        </div>

                        <div className="flex flex-col gap-1 z-10">
                            <label htmlFor="gender">Gender</label>
                            <select onChange={(e) => setGender(() => e.target.value)} required name="gender" defaultValue={"male"} id="" className="p-3 rounded-lg bg-[#ffffff05] border-2 border-[#ffffff10]">
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        <div className="flex gap-1 flex-col z-10">
                            <label htmlFor="date">Select Birth Date</label>
                            <input onChange={(e) => {setBdate(e.target.value)}} type="date" required className="p-3 rounded-lg bg-[#ffffff05] border-2 border-[#ffffff10]" name="date"/>
                        </div>

                        <button type="submit" className="px-5 py-3 z-10 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-xl transition-transform transform-gpu hover:-translate-y-1 hover:shadow-md hover:shadow-[#ffffff7f]0">Save</button>
                    </form>
                </div>
            </div>
        </>
    )
}
