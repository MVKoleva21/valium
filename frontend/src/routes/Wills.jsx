import React from 'react'
import { useNavigate } from "react-router-dom"

export default function Wills() {
    let navigator = useNavigate()

    return (
        <>
            <img src="/Eclipse.png" className="absolute left-[30%] top-0 select-none" draggable={false} alt="" />

            <div className="flex flex-col items-center justify-center w-screen h-screen bg-[#0B0B0F] text-white z-10">
                <div className="text-5xl font-black mb-6 z-10">My digital will</div>
                <p className="text-base font-normal mb-6 z-10">Choose between the three types of will, or more than one</p>

                <div className="flex space-x-7 mb-10">
                    <div className="flex-auto max-w-xs bg-zinc-900 p-4 cursor-pointer rounded-lg z-10" onClick={() => navigator("/will")}>
                        <div className="text-base">
                            <h1 className="text-white text-3xl font-extrabold leading-10">Death</h1>
                        </div>

                        <div className="text-slate-400 leading-6 mt-2">
                            Bequeath your digital assets to your loved ones <br /> in case you die
                        </div>

                        <div className="mt-4">
                            <div className="text-purple-400 font-semibold leading-4 cursor-pointer">Get Started</div>
                        </div>
                    </div>

                    <div className="flex-auto max-w-xs bg-zinc-900 cursor-pointer p-4 rounded-lg z-10" onClick={() => navigator("/will")}>
                        <div className="text-base">
                            <h1 className="text-white text-3xl font-extrabold leading-10">Severe Illness</h1>
                        </div>

                        <div className="text-slate-400 leading-6 mt-2">
                            Bequeath your digital assets to your loved ones<br /> in case you are no longer able to 
                        </div>

                        <div className="mt-4">
                            <div className="text-purple-400 font-semibold leading-4 cursor-pointer">Get Started</div>
                        </div>
                    </div>

                    <div className="flex-auto max-w-xs bg-zinc-900 p-4 cursor-pointer rounded-lg z-10" onClick={() => navigator("/will")}>
                        <div className="text-base">
                            <h1 className="text-white text-3xl font-extrabold leading-10">Lost Password</h1>
                        </div>

                        <div className="text-slate-400 leading-6 mt-2">
                            Bequeath your digital assets to your loved ones <br /> in case you lost your password
                        </div>

                        <div className="mt-4">
                            <div className="text-purple-400 font-semibold leading-4 cursor-pointer">Get Started</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
