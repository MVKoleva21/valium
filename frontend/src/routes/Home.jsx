import { useNavigate } from "react-router-dom"

export default function Home() {
    let navigate = useNavigate()   

    return (
        <>
            <img src="/looper-1.png" className="absolute left-0 top-[180vh] select-none" draggable={false} alt="" />
            <img src="/green.png" className="absolute top-0 select-none" draggable={false} alt="" />
            <img src="/Eclipse1.png" className="absolute right-0 select-none" draggable={false} alt="" />
            <img src="/Eclipse2.png" className="absolute left-0 top-[180vh] select-none" draggable={false} alt="" />
            <img src="/Eclipse3.png" className="absolute right-0 top-[260vh] select-none" draggable={false} alt="" />
            <img src="/circles.png" className="absolute right-0 top-0 w-full select-none" draggable={false} alt="" />
            <img src="/looper-2.png" className="absolute right-0 top-[130vh] select-none" draggable={false} alt="" />
            <img src="/star-3.svg" className="absolute left-[60px] top-[60px] select-none" draggable={false} alt="" />
            <img src="/star-3.svg" className="absolute right-[200px] top-[60vh] select-none" draggable={false} alt="" />
            <img src="/star-3.svg" className="absolute right-[180px] top-[160vh] select-none" draggable={false} alt="" />
            <img src="/star-1.svg" className="absolute left-[180px] top-[220vh] select-none" draggable={false} alt="" />
            <img src="/star-3.svg" className="absolute left-[100px] top-[235vh] select-none" draggable={false} alt="" />
            <img src="/star-2.svg" className="absolute right-[300px] top-[340vh] select-none" draggable={false} alt="" />
            <img src="/star-5.svg" className="absolute right-[600px] top-[430vh] select-none" draggable={false} alt="" />
            
            <div className='bg-[#0B0B0F] w-screen min-h-screen flex justify-center items-center text-white flex-col'>
                <div className='flex justify-center h-screen items-center flex-col'>
                    <h1 className='text-8xl z-10'>VALIUM</h1>
                    <p className='mt-8 z-10 text-[#898CA9]'>digital will platform</p>
                    <div className='flex gap-5 mt-12'>
                        <button onClick={() => navigate('/accounts/signin')} className='px-5 z-10 py-3 bg-[#333] font-bold rounded-xl'>Sign In</button>
                        <button onClick={() => navigate('/accounts/signup')} className='px-5 z-10 bg-gradient-to-r from-[#1F1FFF] to-[#AD00FF] py-3 font-bold rounded-xl'>Sign Up</button>
                    </div>
                </div>

                <div className='mt-[30vh] w-[800px] flex flex-col items-center justify-center'>
                    <div className='font-black text-6xl flex items-center justify-center flex-col'>
                        <h1 className='z-10 text-center'>A digital will platform that ensures your legacy</h1>
                    </div>
                    <div className='w-[500px] mt-8 text-center flex flex-col gap-10 text-[#898CA9]'>
                        <p className='z-10'>Welcome to the new modern will - digital will.</p>
                        <p className='z-10'>Unlock a new world with our digital will site and give a try to the latest discovery in the field of wills.</p>
                        <p className='z-10'>Step into the future of testamentary preparation with confidence, convenience, and peace of mind.</p> 
                    </div>
                </div>

                <div className='flex flex-col w-screen items-end mt-[100vh] pr-[90px]'>
                    <div className='w-[900px] flex flex-col gap-10'>
                        <h1 className='text-right z-10 text-4xl'>Connect with your loved ones and start exploring</h1>
                        
                        <div className='flex flex-col text-[#898CA9] items-end'>
                            <p className='z-10'>Connect with your loved ones and start bequeathing </p>
                            <p className='z-10'>your digital assets to them.</p>
                        </div>

                        <p className='text-[#898CA9] z-10 text-right'>Our user-friendly interface makes the transition to a digital will effortless, providing you with a reliable and accessible solution for your estate planning needs.</p>
                    </div> 
                </div>

                <div className='flex flex-col w-screen items-start mt-[100vh] pl-[90px] mb-[350px]'>
                    <div className='w-[900px] flex flex-col gap-10'>
                        <h1 className='text-start z-10 text-4xl'>Connect with your loved ones and start exploring</h1>
                        
                        <div className='flex flex-col text-[#898CA9] items-start'>
                            <p className='z-10'>Connect with your loved ones and start bequeathing </p>
                            <p className='z-10'>your digital assets to them.</p>
                        </div>

                        <p className='text-[#898CA9] z-10 text-left'>Our user-friendly interface makes the transition to a digital will effortless, providing you with a reliable and accessible solution for your estate planning needs.</p>
                    </div> 
                </div>
            </div>
        </>
  )
}
