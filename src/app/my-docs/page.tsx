import DashboardLayout from "../dashboard/DashboardLayout";

export default function MyDocs() {
    return (
        <DashboardLayout>
            <div className="main-content">
                <div className="flex flex-col  w-full mb-4" >
                    <h1>Compliance Documents</h1>
                    <p className="w-75">
                        These documents will be required by your visa applications and used by the agency. The documents are based on Algerian local laws and your legal structure.
                    </p>
                </div>
                <div className="grid grid-cols-2 gap-4 w-full mb-4">
                    <div>
                        
                    </div>
                    <div>
                        
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}