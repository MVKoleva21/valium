import { useState, useEffect } from "react"
import axios from "axios"
import Nav from "../components/Nav"
import InboxEntry from "../components/InboxEntry"

export default function Inbox() {
    let [inbox, setInbox] = useState([{userFrom: "None"}])
    let [inboxIndex, setInboxIndex] = useState(0)

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BASE_URL_BACKEND}/api/v1/inbox/get`, { withCredentials: true }).then((res) => {
            setInbox(res.data.reverse())
        })

    }, [])

    const selectInbox = (index) => {
        setInboxIndex(index)
    }

    return (
        <>
            <img src="/finalize3.png" className="fixed right-0 bottom-0 select-none" draggable={false} alt="" />
            <img src="/finalize2.png" className="fixed left-[25%] bottom-0 select-none" draggable={false} alt="" />
            <img src="/Eclipse.png" className="fixed left-[25%] top-0 select-none" draggable={false} alt="" />

            <div className="w-full flex text-white">
                <Nav />

                <div className="w-full min-h-screen bg-[#030016] flex flex-col max-lg:mt-[80px]">
                    <h1 className="self-stretch flex w-[full] shrink-0 h-[full] flex-col" />

                    <div className="self-center z-10">
                        <h1 className="z-10 text-6xl mt-[60px] font-bold">
                            Dashboard
                        </h1>

                        <div className="bg-[#1C1C1C60] z-10 mt-12 px-6 py-8 rounded-2xl max-md:max-w-full max-md:mt-10 max-md:px-5">
                            <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
                                <div className="flex flex-col items-stretch w-[33%] max-md:w-full max-md:ml-0">
                                    <div className="bg-[#ffffff05] z-10 flex grow flex-col w-full pl-7 pr-6 pt-8 pb-12 rounded-xl max-md:max-w-full max-md:mt-10 max-md:px-5"                                  >
                                        <h2 className="text-white font-bold text-2xl whitespace-nowrap self-start max-md:ml-2.5">Inbox</h2>

                                        <p className="text-white font-semibold text-sm leading-7 whitespace-nowrap ml-6 mt-6 self-start max-md:ml-2.5">Recent </p>

                                        <div className="self-stretch flex flex-col items-stretch justify-between gap-8 mt-5">
                                            {
                                                inbox.map((ib, index) => {
                                                    return <InboxEntry click={selectInbox} id={index} user={ib.userFrom}/>
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>

                                <section className="bg-[#ffffff05] z-10 flex grow flex-col w-full pl-16 pr-20 py-12 rounded-xl items-start max-md:max-w-full max-md:mt-10 max-md:px-5">
                                    <div className="flex w-[117px] max-w-full items-stretch gap-4">
                                        <img src={`https://ui-avatars.com/api/?name=${inbox[inboxIndex]["userFrom"].name}&size=60`} className="rounded-full" alt="" width={60} />

                                        <div className="text-white font-medium text-sm mt-3.5 self-start">
                                            {inbox[inboxIndex]["userFrom"].name}
                                        </div>

                                    </div>

                                    <h2 className="text-white text-2xl font-bold mt-6 max-md:max-w-full">
                                        {inbox[inboxIndex].title}
                                    </h2>

                                    <div className="text-neutral-400 text-sm leading-7 w-[726px] ml-3 mt-3.5 max-md:ml-2.05 font-semibold">
                                        {inbox[inboxIndex].message}
                                    </div>

                                </section>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
