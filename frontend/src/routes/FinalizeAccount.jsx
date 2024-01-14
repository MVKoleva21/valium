import { useState } from "react"
import axios from "axios"
import { useNavigate } from 'react-router-dom'
 
export default function FinilizeAccout() {
    let [fname, setFname] = useState("")
    let [lname, setLname] = useState("")
    let [uname, setUname] = useState("")
    let [pin, setPin] = useState("")
    let [gender, setGender] = useState("")
    let navigator = useNavigate()

    const fnameHandle = (e) => {
        setFname(e.target.value)
    }

    const lnameHandle = (e) => {
        setLname(e.target.value)
    }

    const unameHandle = (e) => {
        setUname(e.target.value)
    }

    const pinHandle = (e) => {
        setPin(e.target.value)
    }

    const genderHandle = (e) => {
        setGender(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const data = {
            name: fname + lname,
            username: uname,
            pin: pin,
            gender: gender
        }


        axios.post(`${import.meta.env.VITE_BASE_URL_BACKEND}/api/v1/users/new/`, data, { withCredentials: true }).then((res) => {
            navigator("/wills")
        })
    }

    return (
        <>
            <div className="w-screen h-screen flex justify-center items-center bg-[#030016] text-white relative"> 
                <img src="/finalize.png" className="fixed right-0 select-none" draggable={false} alt="" />
                <img src="/finalize3.png" className="fixed right-0 bottom-0 select-none" draggable={false} alt="" />
                <img src="/finalize2.png" className="fixed left-[#25] bottom-0 select-none" draggable={false} alt="" />

                <div className="p-4">
                    <h1 className="font-bold text-4xl">Finish profile set up</h1>
                    
                    <form method="post" className="flex flex-col gap-4 bg-[#1C1C1C60] p-8 py-14 mt-16 rounded-2xl" onSubmit={handleSubmit}>
                        <div className="flex gap-8">

                            <div className="flex flex-col gap-1 z-10">
                                <label htmlFor="fname">First Name</label>
                                <input type="text" name="fname" className="p-3 rounded-lg bg-[#ffffff05] border-2 border-[#ffffff10]" onChange={fnameHandle}/>
                            </div>

                            <div className="flex flex-col gap-1 z-10">
                                <label htmlFor="lname">Last Name</label>
                                <input type="text" name="lname" className="p-3 rounded-lg bg-[#ffffff05] border-2 border-[#ffffff10]" onChange={lnameHandle}/>
                            </div>
                        </div>

                        <div className="flex flex-col gap-1 z-10">
                            <label htmlFor="uname">Username</label>
                            <input type="text" name="uname" className="p-3 rounded-lg bg-[#ffffff05] border-2 border-[#ffffff10]" onChange={unameHandle}/>
                        </div>
                        
                        <div className="flex flex-col gap-1 z-10">
                            <label htmlFor="pin">PIN</label>
                            <input type="text" name="pin" className="p-3 rounded-lg bg-[#ffffff05] border-2 border-[#ffffff10]" onChange={pinHandle}/>
                        </div>

                        <div className="flex flex-col gap-1 z-10">
                            <label htmlFor="gender">Gender</label>
                            <select name="gender" defaultValue={"male"} id="" className="p-3 rounded-lg bg-[#ffffff05] border-2 border-[#ffffff10]" onChange={genderHandle}>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        <button type="submit" className="p-2 mt-2 font-bold bg-gradient-to-r rounded-xl from-[#18C8FF] to-[#933FFE] z-10">Save</button>
                    </form>
                </div>
            </div>
        </>
    )
}
