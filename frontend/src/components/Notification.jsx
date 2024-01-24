import { useState, useEffect } from "react"
import axios from "axios"

export default function Notification(props) {

    return (
        <>
            <div className="w-[90%] min-h-[90px] bg-gradient-to-r from-[#454757] to-[#3D3F4F] flex justify-start items-start p-4 px-6 rounded-xl">
                <h1 className="text-white">{props.message}</h1>
            </div> 
        </>
    )
}

