import React from 'react';
import 'tailwindcss/tailwind.css';

export default function Wills() {
    return (
        <div className="flex w-screen h-screen text-center">    
            <div className="items-center justify-center w-full h-full bg-[#0B0B0F]">

                <div className="text-white mt-20">
                    <h1 className="text-5xl font-black h-16">My digital will</h1>
                    <p className="text-base font-normal h-6">Choose between the three types of will, or more than one </p>
                </div>

                <div className="mt-20 bg-[#0B0B0F] space-x-12">
                    <button className="bg-zinc-900 mx-auto px-6 py-8 rounded-3xl">
                        <div className="text-base">
                            <h1 className="text-white text-3xl font-extrabold leading-10">Death</h1>
                        </div>

                        <div className="text-slate-400 leading-6 mt-4">
                        Bequeath your digital assets to your loved ones <br></br> in case you die
                        </div>

                        <div className="gap-1.5 mt-8 rounded-xl">
                            <button className="text-purple-400 font-semibold leading-4">Get Started</button>
                        </div>
                    </button>

                    <button className="bg-zinc-900 px-4 py-8 rounded-3xl">
                        <div className="text-base">
                            <h1 className="text-white text-3xl font-extrabold leading-10">Severe Illness</h1>
                        </div>

                        <div className="text-slate-400 leading-6 mt-4">
                        Bequeath your digital assets to your loved ones<br></br>  in case you are no longer able to 
                        </div>

                        <div className="gap-1.5 mt-8 rounded-xl">
                            <button className="text-purple-400 font-semibold leading-4">Get Started</button>
                        </div>
                    </button>

                    <button className="bg-zinc-900 px-6 py-8 rounded-3xl">
                        <div className="text-base">
                            <h1 className="text-white text-3xl font-extrabold leading-10">Lost Password</h1>
                        </div>

                        <div className="text-slate-400 leading-6 mt-4">
                        Bequeath your digital assets to your loved ones <br></br> in case you lost you password
                        </div>

                        <div className="gap-1.5 mt-8 rounded-xl">
                            <button className="text-purple-400 font-semibold leading-4">Get Started</button>
                        </div>
                    </button>
                </div>
                
            </div>
        </div>
    )
};