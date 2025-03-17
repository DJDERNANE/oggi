export default function VisasStatus({ type = "status" }: {
    type?: string
}) {
    return (
        <div className="flex w-full justify-between items-center space-x-2 my-2">
            <div className="flex space-x-2">
                <img src="/doc.svg" alt="doc" />
                <div>
                    <p className="font-semibold">visa name</p>
                    <p className="text-[#5A5A5A]">username</p>
                </div>
            </div>
            <div>


                {
                    type === "action" && (
                        <div className="flex flex-col justify-end space-x-2">
                            <p className="font-bold">12/12/2025</p>
                            <p className="text-end"> Depart</p>
                        </div>
                    )
                }
                {
                    type === "status" && (
                        <button className="px-3 cursor-pointer flex justify-between gap-4 border  rounded-full py-2">
                            <img src="/approved.svg" alt="visa status" />
                            Visa  status
                        </button>
                    )
                }
                {
                    type === "file" && (
                        <button className="px-3 cursor-pointer flex justify-between gap-4 border  rounded-full py-2">
                            <img src="/icon.svg" alt="visa status" />
                            update
                        </button>
                    )
                }

            </div>


        </div>
    )
}