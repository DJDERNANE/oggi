import { MainAPI } from "@/utils/MainAPI";
import VisasStatus from "./VisasStatus";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Form,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import { useState } from "react";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import FileUploader from "./Dropzone";

// Define schema based on required documents
const createFormSchema = (requiredDocuments: any[]) => {
    const schema: Record<string, any> = {};
    
    requiredDocuments.forEach((doc, index) => {
        schema[`document_${index}`] = z.instanceof(File, {
            message: `Please upload ${doc.name || 'required document'}`
        }).array().min(1, {
            message: `Please upload at least one file for ${doc.name || 'required document'}`
        });
    });

    return z.object(schema);
}

export default function VisaAction({ visa }: { visa: any }) {
    const [loading, setLoading] = useState(false);
    
    // Create dynamic form schema based on required documents
    const FormSchema = createFormSchema(visa.required_documents || []);
    
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    });

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        setLoading(true);
        const formData = new FormData();
        const token = localStorage.getItem("token");

        try {
            // Append each document to formData
            Object.entries(data).forEach(([key, files]) => {
                const docIndex = key.replace('document_', '');
                const docInfo = visa.required_documents[parseInt(docIndex)];
                
                files.forEach((file: File, fileIndex: number) => {
                    formData.append(`documents[${docIndex}][name]`, docInfo.name || `Document ${docIndex}`);
                    formData.append(`documents[${docIndex}][files][${fileIndex}]`, file);
                });
            });

            const response = await fetch("http://localhost:8000/api/visa-applications", {
                method: "POST",
                body: formData,
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            const result = await response.json();
            if (result.success) {
                // Handle success (maybe show notification or refresh data)
                console.log("Documents uploaded successfully");
            }
        } catch (error) {
            console.error("Upload error:", error);
        } finally {
            setLoading(false);
        }
    }

    return (
        (visa.status === "approved" || visa.status === "pending" || visa.status === "action_required") && (
            <div className="flex flex-col w-full allvisas_container p-4">
                <p className="font-semibold text-[#0A112F] text-[20px]">
                    Visa Action
                </p>
                <VisasStatus type="action" visa={visa} />
                <hr className="my-2" />
                <div className="flex justify-end my-2">
                    {visa.status === "approved" ? (
                        <button className="py-2 px-4 cursor-pointer bg-[#3981F7] text-white rounded-full ">
                            <a
                                href={`http://localhost:8000/storage/${visa.visa_file}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Download VISA
                            </a>
                        </button>
                    ) : visa.status === "action_required" ? (
                        <Dialog>
                            <DialogTrigger className="py-2 px-4 cursor-pointer bg-[#3981F7] text-white rounded-full">
                                Upload Documents
                            </DialogTrigger>
                            <DialogContent className="max-h-[80vh] overflow-y-auto">
                                <DialogHeader>
                                    <DialogTitle>Upload Missing Documents</DialogTitle>
                                    <DialogDescription>
                                        Please upload the following required documents:
                                    </DialogDescription>
                                </DialogHeader>
                                
                                <Form {...form}>
                                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                        {visa.required_documents?.map((doc: any, index: number) => (
                                            <FormField
                                                key={index}
                                                control={form.control}
                                                name={`document_${index}`}
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <div className="mb-4">
                                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                                {doc.name || `Document ${index + 1}`}
                                                            </label>
                                                            {doc.description && (
                                                                <p className="text-sm text-gray-500 mb-2">{doc.description}</p>
                                                            )}
                                                            <FileUploader
                                                                name={doc.name || `Document ${index + 1}`}
                                                                onFileChange={(files) => {
                                                                    field.onChange(files);
                                                                }}
                                                                // accept={doc.accept} // You can pass accepted file types if specified
                                                            />
                                                        </div>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        ))}
                                        
                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="w-full py-2 px-4 bg-[#3981F7] text-white rounded-full hover:bg-[#2a6fd6] disabled:opacity-50"
                                        >
                                            {loading ? "Uploading..." : "Submit Documents"}
                                        </button>
                                    </form>
                                </Form>
                            </DialogContent>
                        </Dialog>
                    ) : (
                        <div />
                    )}
                </div>
            </div>
        )
    );
}