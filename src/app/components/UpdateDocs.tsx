import { FormField } from "@/components/ui/form";
import FileUploader from "./Dropzone";
import { PostRequest } from "@/utils/PostRequest";

export default function UpdateDocs({ name, submitted, onUploaded }: { name: string, submitted: boolean, onUploaded: () => void; }) {
    return (
        <div className="flex w-full justify-between items-center space-x-2 my-2">
            <div className="flex space-x-2">
                <img src="/doc.svg" alt="doc" />


                <div>
                    <p className="font-semibold">{name}</p>
                    {
                        submitted ? (
                            <p className="text-[#FAA745]">non soumis</p>
                        ) : (
                            <p className="text-green-500">soumis</p>
                        )
                    }

                </div>
            </div>
            <div>
                
            <FileUploader
    name="update"
    onFileChange={async (file: File) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('name', name);

        const response = await PostRequest("/my-docs", true, formData);
        if (response.status === 'success') {
            alert("Document uploaded successfully!");
            window.location.reload();
        }
    }}
/>

            </div>


        </div>
    )
}