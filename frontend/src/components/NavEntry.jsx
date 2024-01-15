import { useState, useEffect } from "react"
import axios from "axios"

export default function NavEntry(props) {
    return (
        <>
            <div onClick={props.click} className={`flex py-3 px-6 w-[80%] justify-start select-none cursor-pointer items-center gap-4 ${props.isSelected && 'bg-[#5200BB20]'} rounded-[45px]`}>
                <img src={props.icon} alt="" />
                <h1>{props.title}</h1>
            </div> 
        </>
    )
}
