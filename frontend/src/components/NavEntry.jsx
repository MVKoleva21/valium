import { useState, useEffect } from "react"
import axios from "axios"

export default function NavEntry(props) {
    return (
        <>
            <div onClick={props.click} className={`flex py-3 px-6 w-[80%] justify-start select-none cursor-pointer items-center gap-4 ${props.isSelected && 'bg-[#7C01DD]'} rounded-[45px]`}>
                <img src={props.icon} alt="" width={20}/>
                <h1>{props.title}</h1>
            </div> 
        </>
    )
}
