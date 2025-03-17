import VisasStatus from "./VisasStatus";

export default function MainDocs() {
    return (
        <div className="allvisas_container p-4">
            <div className="mb-4">
               <p className="font-semibold text-[20px]">Main Documents</p>
            </div>

            <div className="allvisas_container py-1 px-2 my-2">
             <VisasStatus type="file"/>
            </div>
            <div className="allvisas_container py-1 px-2 my-2">
             <VisasStatus type="file"/>
            </div>
            <div className="allvisas_container py-1 px-2 my-2">
             <VisasStatus type="file"/>
            </div>
            
            
        </div>
    )
}