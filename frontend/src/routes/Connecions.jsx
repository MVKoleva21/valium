export default function Connections(){
    return (
        <div className="w-screen h-screen flex  flex-col justify-center items-center bg-[#030016] text-white relative">

            <img src="/finalize.png" className="fixed right-0 select-none" draggable={false} alt="" />
            <img src="/finalize3.png" className="fixed right-0 bottom-0 select-none" draggable={false} alt="" />
            <img src="/finalize2.png" className="fixed left-[#25] bottom-0 select-none" draggable={false} alt="" />
        
            <h1 className="text-white text-6xl font-bold tracking-wider max-md:max-w-full max-md:text-4xl">Connections</h1>


            <div className="w-[423px] mx-auto mt-6 self-end">
                <form>
                    <div className="gap-5 flex max-md:flex-col">
                        <div className="flex flex-col items-stretch w-[52%]">
                            <div className="border backdrop-blur-[70px] bg-opacity-50 bg-[#1C1C1C] flex grow flex-col p-8 py-14 mt-16 rounded-2xl">
                            <label htmlFor="email">Email</label>
                            </div>
                        </div>

                        <div className="flex flex-col items-stretch w-[52%]">
                            <div className="border backdrop-blur-[70px] bg-opacity-50 bg-[#1C1C1C] flex grow flex-col p-8 py-14 mt-16 rounded-2xl">
                                <label htmlFor="email">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        className="p-3 rounded-lg bg-[#ffffff05] border-2 border-[#ffffff10]"
                                    />
                            </div>
                        </div>
                    </div>
                </form>
             </div>
        </div>
  );
};