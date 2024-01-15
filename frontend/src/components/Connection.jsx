

export default function Connection(props) {
    return (
        <>
            <div className="flex flex-col items-stretch w-[80%]">
                <div className="border backdrop-blur-[70px] bg-opacity-50 bg-[#1C1C1C] flex grow flex-col p-8 py-14 mt-16 rounded-2xl">
                    <h1 className="break-words">{props.email}</h1>
                </div>
            </div>
        </>
    )
}
