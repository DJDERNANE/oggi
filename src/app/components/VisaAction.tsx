import VisasStatus from "./VisasStatus";

export default function VisaAction() {
    return (
        <div className="flex flex-col w-full  allvisas_container p-4">
            <p className="font-semibold text-[#0A112F] text-[20px]">
                Visa Action
            </p>
            <VisasStatus type="action"/>
            <hr className="my-2"/>
            <div className="flex justify-end my-2">
            <button className="py-2 px-4 cursor-pointer bg-[#3981F7] text-white w-min rounded-full">
                Action   
            </button>
            </div>
           

        </div>
    )
}