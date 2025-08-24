import { FilesAPI, MainAPI } from "@/utils/MainAPI";
import VisasStatus from "./VisasStatus";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  
export default function VisaAction({ visa }: { visa: any }) {
    return (
        (visa.status == "approved" || visa.status == "pending" || visa.status == "action_required" ||  visa.status == "rejected") && (
            <div className="flex flex-col w-full allvisas_container p-4">
                <p className="font-semibold text-[#0A112F] text-[20px]">
                    Visa Action
                </p>
                <VisasStatus type="action" visa={visa} />
                <hr className="my-2" />
                <div className="flex justify-end my-2">
                    {visa.status == "approved" ? (
                        <button className="py-2 px-4 cursor-pointer bg-[#3981F7] text-white rounded-full ">
                            <a
                                href={`${FilesAPI}/${visa.visa_file}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Download VISA
                            </a>
                        </button>
                    ) : visa.status == "action_required" ? (
                        <Dialog>
                            <DialogTrigger className="py-2 px-4 cursor-pointer bg-[#3981F7] text-white rounded-full">
                                Upload Documents
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Action Required</DialogTitle>
                                    <DialogDescription>
                                        Please complete the required actions to continue.
                                    </DialogDescription>
                                </DialogHeader>
                            </DialogContent>
                        </Dialog>
                    ) : visa.status == "rejected" && visa.visa_file ? (
                        <button className="py-2 px-4 cursor-pointer bg-[#3981F7] text-white rounded-full ">
                            <a
                                href={`${FilesAPI}/${visa.visa_file}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Download File
                            </a>
                        </button>
                    ): ('')}
                </div>
            </div>
        )
    );
    
}
