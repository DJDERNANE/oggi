"use client"
import { useEffect, useState } from "react";
import DownloadDocs from "../components/DownloadDocs";
import MainDocs from "../components/MainDocs";
import UpdateDocs from "../components/UpdateDocs";
import DashboardLayout from "../DashboardLayout";
import { GetRequest } from "@/utils/GetRequest";

export default function MyDocs() {
    interface Docs {
        id: number;
        name: string;
        path: string;
    }
    const [mainDocs, setMainDocs] = useState<Array<Docs>>([])
    const [temporaryDocs, setTemporaryDocs] = useState<Array<Docs>>([])
    useEffect(() => {
        const fetchDocs = async () => {
            try {
                const [tempRes, mainRes] = await Promise.all([
                    GetRequest('/my-docs/temporary', true),
                    GetRequest('/my-docs/main', true),
                ]);
                setTemporaryDocs(tempRes.data);
                setMainDocs(mainRes.data);
            } catch (error) {
                console.error("Error fetching documents:", error);
            }
        };
    
        fetchDocs();
    }, []);
    
    const fetchMainDocs = async () => {
        const response = await GetRequest("/my-docs/main", true);
        if (response.status === "success") {
            setMainDocs(response.data);
        }
    };
    const fetchTemporaryDocs = async () => {
        const response = await GetRequest("/my-docs/temporary", true);
        if (response.status === "success") {
            setTemporaryDocs(response.data);
        }
    };
    return (
        <DashboardLayout>
            <div className="main-content">
                <div className="flex flex-col  w-full mb-4" >
                    <h1>Compliance Documents</h1>
                    <p className="w-full  text-[#585860]">
                        These documents will be required by your visa applications and used by the agency. The documents are based on Algerian local laws and your legal structure.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mb-4">
                    <div className="col-span-2">
                        <div className="border border-[1px] rounded-[11px] p-2 mb-4">
                            <h1 className="ml-2">
                                Main Documents
                            </h1>
                            {mainDocs.length > 0
                                ? mainDocs.map((doc) => (
                                    <UpdateDocs
                                        key={doc.id}
                                        name={doc.name}
                                        submitted={doc.path === null}
                                        onUploaded={fetchMainDocs} // <-- correct function reference
                                    />
                                ))
                                : <p>No main documents available.</p>}

                        </div>

                        <div className="border border-[1px] rounded-[11px] p-2">
                            <h1 className="ml-2">
                                Temporary Documents                            </h1>
                            {temporaryDocs.length > 0
                                ? temporaryDocs.map((doc) => (
                                    <UpdateDocs
                                        key={doc.id}
                                        name={doc.name}
                                        submitted={doc.path === null}
                                        onUploaded={fetchTemporaryDocs} // <-- correct function reference
                                    />
                                ))
                                : <p>No main documents available.</p>}
                        </div>
                    </div>
                    <div className="col-span-1">
                        <DownloadDocs />
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}