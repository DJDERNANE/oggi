import { FilesAPI, MainAPI } from "@/utils/MainAPI";

export default function Visa({ destination }: { destination: any }) {
    return (
        <div className="main-content shadow-md w-full h-[200px] flex flex-col justify-between items-center" style={{ padding: "20px" }}>
            <div className="flex justify-between items-center w-full">
                <div className="w-full flex items-end">
                    <span className="bg-[#F5F5F5] p-2 px-auto w-[100px] rounded-xl">
                        {destination.code}
                    </span>
                    <button className=" px-3 cursor-pointer ">

                        <img src="/plus-btn.svg" alt="plus" className="shadow-md rounded-full" />
                    </button>
                </div>
                {
                    destination.flag ? <img src={`${FilesAPI}/${destination.flag}`} alt="plus" className="shadow-md rounded-full" width={80} height={40}/> : <img src="/flag.svg" alt="country flag" />
                }

            </div>
            <div className="flex gap-2 items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="5" height="5" viewBox="0 0 5 5" fill="none">
                    <circle cx="2.5" cy="2.5" r="2.5" fill="#EB5757" />
                </svg>
                <p >

                    description</p>
            </div>

        </div>
    )
}