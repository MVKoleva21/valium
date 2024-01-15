
export default function Message(props) {
    return (
        <>
            <div className={`flex py-3 px-6 w-full border-gray-500 border bg-[#333] justify-start select-none items-center gap-4 flex-col`}>
                <h1>{props.text}</h1>
            </div> 
        </>
    )
}
