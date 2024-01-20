import { useState, useEffect } from "react"

export default function NavSubEntry(props) {
    return (
        <>
            <div onClick={props.click} className={`flex py-3 px-6 w-[80%] justify-center select-none cursor-pointer items-center gap-4 relative${props.isSelected && 'text-[#7C01DD]'} rounded-[45px]`}>
                <h1>{props.title}</h1>
            </div> 
        </>
    )
}
