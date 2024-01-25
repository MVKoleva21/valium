

export default function InboxEntry(props) {

    return(
        <>
            <div onClick={() => props.click(props.id)} className="flex gap-3 hover:scale-105 duration-75 active:scale-100 select-none cursor-pointer">
                <img src={`https://ui-avatars.com/api/?name=${props.user.name}&size=40`} className="rounded-full" alt="" width={40} />
                <div className="self-center flex grow basis-[0%] flex-col items-stretch my-auto">
                    <div className="text-zinc-500 text-xs font-medium">{props.user.name}</div>
                    <div className="text-white text-sm font-medium whitespace-nowrap mt-1.5">{props.user.username}</div>
                </div>
            </div>
        </>
    )
}