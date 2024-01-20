import { useNavigate } from "react-router-dom"

export default function Wills() {
    let navigation = useNavigate()

    return (
        <>
            <img src="/Eclipse.png" className="absolute left-[30%] top-0 select-none" draggable={false} alt="" />

            <div className="flex flex-col items-center text-center justify-center w-screen min-h-screen py-12 bg-[#0B0B0F] text-white z-10">
                <h1 className="text-5xl font-black mb-4 z-10">My digital will</h1>
                
                    <p className="text-base font-normal mb-24 z-10">Choose between the three types of will, or more than one</p>

                    <div className="flex gap-16 max-lg:flex-col">

                        <div onClick={() => navigation('/will')} className="relative inline-flex group">
                            <div className="absolute max-w-xs cursor-pointer transitiona-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#e2c4ff] via-[#ffffff] to-[#e2c4ff] rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt"></div>
                                <div className="flex-auto max-w-xs bg-zinc-900 p-4 cursor-pointer rounded-lg z-10">
                                    <h1 className="text-white text-3xl font-extrabold leading-10">Death</h1>
                                    <p className="text-slate-400 leading-6 mt-2">
                                        Bequeath your digital assets to your loved ones <br /> in case you die
                                    </p>
                                    <p className="text-purple-400 mt-4 font-semibold leading-4 cursor-pointer">Get Started</p>
                            </div>
                        </div>

                        <div onClick={() => navigation('/will')} className="relative inline-flex group">
                            <div className="absolute max-w-xs cursor-pointer transitiona-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#e2c4ff] via-[#ffffff] to-[#e2c4ff] rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt"></div>
                                <div className="flex-auto max-w-xs bg-zinc-900 p-4 cursor-pointer rounded-lg z-10">
                                    <h1 className="text-white text-3xl font-extrabold leading-10">Severe illness</h1>
                                        <p className="text-slate-400 leading-6 mt-2">
                                            Bequeath your digital assets to your loved ones<br /> in case you are can no longer be accountable
                                        </p>
                                        <p className="text-purple-400 mt-4 font-semibold leading-4 cursor-pointer">Get Started</p>
                                </div>
                        </div>

                        <div onClick={() => navigation('/will')} className="relative inline-flex group">
                            <div className="absolute max-w-xs cursor-pointer transitiona-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#e2c4ff] via-[#ffffff] to-[#e2c4ff] rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt"></div>
                                <div className="flex-auto max-w-xs bg-zinc-900 p-4 cursor-pointer rounded-lg z-10">
                                    <h1 className="text-white text-3xl font-extrabold leading-10">Password loss</h1>
                                    <p className="text-slate-400 leading-6 mt-2">
                                        Bequeath your digital assets to your loved ones <br /> in case you lost your password
                                    </p>
                                    <p className="text-purple-400 mt-4 font-semibold leading-4 cursor-pointer">Get Started</p>
                                </div>
                    </div>
                </div>
            </div>
        </>
    )
}
