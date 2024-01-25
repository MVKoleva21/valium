import { useState } from "react"
import Modal from "react-modal"
import axios from "axios"
import Cookies from "js-cookie"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

export default function Will(props) {
    let [showInfo, setShowInfo] = useState(false)
    let [showConfirmDeletion, setShowConfirmDelete] = useState(false)
    let [effImmidiate, setEffImmediate] = useState(props.item.effectiveImmediate)

    const customStyles = {
        overlay: {
            zIndex: 1000,
            background: "#ffffff00",
        },
    };

    const customDeletionStyles = {
        overlay: {
            zIndex: 1001,
            background: "#ffffff00",
        },
    };

    const onSumbit = (e) => {
        e.preventDefault()

        props.item.effectiveImmediate = effImmidiate

        axios.put(`${import.meta.env.VITE_BASE_URL_BACKEND}/api/v1/wills/${props.item.id}/update/`, props.item, { 
            withCredentials: true,
            headers: {
                "X-CSRFToken": Cookies.get('csrftoken')
            }
        }).then(() => {
            window.location.reload()
        }).catch(err => {
            toast.error(err.response.data.error)
        })
    }

    const onDelete = (e) => {
        e.preventDefault()

        axios.delete(`${import.meta.env.VITE_BASE_URL_BACKEND}/api/v1/wills/${props.item.id}/delete/`, { 
            withCredentials: true,
            headers: {
                "X-CSRFToken": Cookies.get('csrftoken')
            }
        }).then(() => {
            window.location.reload()
        }).catch(err => {
            toast.error(err.response.data.error)
        })
    }

    return (
        <>
            <div onClick={() => setShowInfo(true)} className="border backdrop-blur cursor-pointer bg-[#1C1C1C60] flex w-full select-none hover:scale-105 active:scale-100 duration-75 flex-col p-8 py-14 mt-16 rounded-2xl text-center relative">
                <h1 className="break-words">Will for:</h1>
                <h1 className="break-words">{props.item.inheritor}</h1>
                <h1 className="break-words absolute bottom-3 text-[#ffffff60] font-bold">{props.item.timestamp}</h1>
            </div>

            <Modal isOpen={showInfo} style={customStyles} ariaHideApp={false} className="flex flex-col items-center justify-center h-screen backdrop-blur-xl text-white">
                <div className="w-[70%] h-[90%] flex flex-col gap-20 items-center justify-center">
                    <h1 className="font-black text-white text-7xl">Will №{props.item.id}</h1> 

                    <form onSubmit={onSumbit} className="min-w-[85%] relative overflow-scroll mb-4 min-h-[85%] backdrop-blur bg-[#1C1C1C60] z-10 rounded-[20px] p-12 flex flex-col justify-start items-center gap-10">
                        <div className="flex flex-col h-full w-[80%] gap-10">
                            <div className="flex gap-10 w-full justify-center items-center max-lg:flex-col">

                                <div className="flex gap-2 items-center">
                                    <label htmlFor="effective Immediate">Effective Immediate</label>
                                    <input readOnly={!props.item.active} defaultValue={props.item.effectiveImmediate} onClick={() => {setEffImmediate((prev) => !prev)}} type="checkbox" name="effective-immediate" />
                                </div>

                                {!effImmidiate && <div className="flex gap-2 flex-col">
                                    <label htmlFor="date">Enter transfer date</label>
                                    <input readOnly={!props.item.active} defaultValue={props.item.transferDate} onChange={(e) => {props.item.transferDate = e.target.value}} type="date" className="w-full z-10 bg-[#ffffff10] rounded-[10px] p-4 px-6" name="date"/>
                                </div>}

                                <div className="flex gap-2 items-center flex-col">
                                    <label htmlFor="email">To user</label>
                                    <input readOnly={!props.item.active} type="email" name="email" onChange={(e) => {props.item.inheritor = e.target.value}} defaultValue={props.item.inheritor} className="w-full z-10 bg-[#ffffff10] rounded-[10px] p-4 px-6"/>
                                </div>
                            </div> 

                            <div className="flex flex-col gap-2">
                                <h1>Will special number</h1>
                                <div className="w-full z-10 text-center text-2xl bg-[#ffffff10] rounded-[10px] p-4 flex flex-col">
                                    <h1>{props.item.willNumber}</h1>
                                </div>
                            </div>

                            <div className="w-full flex flex-col gap-2">
                                <h1>Amount</h1>

                                <div className="w-full flex gap-2 max-lg:flex-col">
                                    <div className="flex flex-col gap-1">
                                        <h1>BTC</h1>
                                        <input readOnly={!props.item.active} onChange={(e) => {props.item.amounts.btc = e.target.value}} defaultValue={props.item.amounts.btc} className="w-full z-10 bg-[#ffffff10] rounded-[10px] p-4" type="number" step="0.01" />                                    
                                    </div>
                                    
                                    <div className="flex flex-col gap-1">
                                        <h1>ETC</h1>
                                        <input readOnly={!props.item.active} onChange={(e) => {props.item.amounts.etc = e.target.value}} defaultValue={props.item.amounts.etc} className="w-full z-10 bg-[#ffffff10] rounded-[10px] p-4" type="number" step="0.01"/>                                    
                                    </div>


                                    <div className="flex flex-col gap-1">
                                        <h1>BGN</h1>
                                        <input readOnly={!props.item.active} onChange={(e) => {props.item.amounts.bgn = e.target.value}} defaultValue={props.item.amounts.bgn} className="w-full z-10 bg-[#ffffff10] rounded-[10px] p-4" type="number" />                                    
                                    </div>

                                    <div className="flex flex-col gap-1">
                                        <h1>EUR</h1>
                                        <input readOnly={!props.item.active} onChange={(e) => {props.item.amounts.eur = e.target.value}} defaultValue={props.item.amounts.eur} className="w-full z-10 bg-[#ffffff10] rounded-[10px] p-4" type="number" />                                    
                                    </div>
                                </div>
                            </div>

                            <div className="w-full flex flex-col justify-center items-center gap-10">
                                <div className="flex flex-col gap-3 w-full">
                                    <label htmlFor="title">Enter Title</label>
                                    <input readOnly={!props.item.active} name="title" onChange={(e) => {props.item.title = e.target.value}} defaultValue={props.item.title} className="w-full z-10 bg-[#ffffff10] rounded-[10px] p-4" type="text" /> 
                                </div>

                                <div className="flex flex-col gap-3 w-full">
                                    <label readOnly={!props.item.active} htmlFor="mesg">Enter Message</label>
                                    <textarea readOnly={!props.item.active} name="mesg" onChange={(e) => {props.item.message = e.target.value}} defaultValue={props.item.message} cols="45" className="w-full resize-none p-4 z-10 bg-[#ffffff10] rounded-[10px] mb-6" rows="15"></textarea>
                                </div>
                            </div>

                            <div className="pb-10 flex flex-col gap-2 justify-center items-center">
                                {props.item.active && <button type="submit" className="w-[36%] duration-75 flex justify-center mx-auto px-24 py-2 z-10 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-xl hover:-translate-y-1 hover:shadow-md hover:shadow-[#ffffff7f]">Save Will</button>}

                                {props.item.active && <button type="button" onClick={() => setShowConfirmDelete(true)} className="rounded-lg w-[36%] hover:bg-[#913636] hover:scale-105 text-[#fff] active:scale-100 duration-100 p-4 bg-[#ba3f3f] uppercase">delete</button>}

                                <button onClick={() => setShowInfo(false)} className="rounded-lg w-[36%] hover:bg-[#913636] hover:scale-105 text-[#fff] active:scale-100 duration-100 p-4 bg-[#ba3f3f] uppercase">cencel</button>
                            </div>

                        </div>
                    </form>
                </div>

            </Modal>

            <Modal isOpen={showConfirmDeletion} style={customDeletionStyles} ariaHideApp={false} className="flex gap-5 flex-col items-center justify-center h-screen backdrop-blur-xl text-white">
                <button onClick={onDelete} className="rounded-lg w-[36%] hover:bg-[#913636] hover:scale-105 text-[#fff] active:scale-100 duration-100 p-4 bg-[#ba3f3f] uppercase">Confirm</button>
                <button onClick={() => setShowConfirmDelete(false)} className="rounded-lg w-[36%] hover:bg-[#913636] hover:scale-105 text-[#fff] active:scale-100 duration-100 p-4 bg-[#ba3f3f] uppercase">cencel</button>
                
            </Modal>

            <ToastContainer />
        </>
    )
}
