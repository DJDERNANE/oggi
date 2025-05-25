interface visaInterface {
    id: number,
    name: string,
    fammily_name: string,
    
}
export default function VisasStatus({ type = "status", visa }: {
    type?: string,
    visa?: any
}) {
    return (
        <div className="flex w-full justify-between items-center space-x-2 my-2">
            <div className="flex space-x-2">
                <img src="/doc.svg" alt="doc" />
                {
                    type === "status" ? (
                        <div>
                            <p className="font-semibold">{visa?.visa_type?.destination?.name} {visa?.visa_type.name}</p>
                            <p className="text-[#5A5A5A]">{visa?.name} {visa?.fammily_name}</p>
                        </div>
                    ) : (
                        <div>
                            <p className="font-semibold">Passport</p>
                            <p className="text-[#5A5A5A]"></p>
                        </div>
                    )
                }

            </div>
            <div>


                {
                    type === "action" && (
                        <div className="flex flex-col justify-end space-x-2">
                            <p className="font-bold">{visa?.departure_date}</p>
                            <p className="text-end"> Depart</p>
                        </div>
                    )
                }
                {type === "status" && (
                    <button className="px-2 cursor-pointer flex justify-between gap-4 border rounded-full py-2 w-[130px]">
                        {visa?.status === "approved" ? (
                            <>
                                <img src="/approved.svg" alt="visa status" />
                                Accepté
                            </>
                        ) : visa?.status === "pending" ? (
                            <>
                                <img src="/pending_visa.svg" alt="visa status" />
                                En cours
                            </>
                        ) : visa?.status === "rejected" ?
                            (
                                <>
                                    <img src="/refused.svg" alt="visa status" />
                                    Refusé
                                </>) : null}
                    </button>
                )}

                {
                    type === "file" && (
                        <button className="px-3 cursor-pointer flex justify-between gap-4 border  rounded-full py-2">
                            <img src="/Icon.svg" alt="visa status" />
                            update
                        </button>
                    )
                }

            </div>


        </div>
    )
}