"use client"
import { useForm, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { CalendarIcon, Loader } from "lucide-react"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import FileUploader from "./Dropzone.js"
import { Calendar } from "@/components/ui/calendar"
import { useState } from "react"
const FormSchema = z.object({
    passengers: z.array(
        z.object({
            name: z.string().min(1, "Required"),
            family_name: z.string().min(1, "Required"),
            passport_number: z.string().min(1, "Required"),
            departure_date: z.date({
                required_error: "A departure date  is required.",
            }),
            visa_type_id: z.string(),
            price: z.string(),
            files: z.any(z.any()).optional()
        })
    ),
})

export default function Passenger({ price, docs, handleSubmit  }: { price: number, docs: Array<any> , handleSubmit: ()=> any}) {
    const [loading, setLoading] = useState(false);
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            passengers: [
                { name: "", family_name: "", passport_number: "", departure_date: new Date(), visa_type_id: "1", price: price.toString(), files: [] }
            ]
        }
    })

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "passengers"
    })

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        setLoading(true);
        const formData = new FormData()

        data.passengers.forEach((passenger, index) => {
            formData.append(`applications[${index}][name]`, passenger.name)
            formData.append(`applications[${index}][fammily_name]`, passenger.family_name)
            formData.append(`applications[${index}][passport_number]`, passenger.passport_number)
            formData.append(`applications[${index}][departure_date]`, passenger.departure_date.toISOString().split("T")[0])
            formData.append(`applications[${index}][visa_type_id]`, passenger.visa_type_id)
            formData.append(`applications[${index}][price]`, passenger.price)

            passenger.files?.forEach((file) => {
                formData.append(`applications[${index}][files][]`, file)
            })
        })


        console.log("Form Data:");
        for (const pair of formData.entries()) {
            console.log(pair[0], pair[1]);
        }

        const token = localStorage.getItem("token");

        try {
            const response = await fetch("http://localhost:8000/api/visa-applications", {
                method: "POST",
                body: formData,
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            const result = await response.json();
           if (result.applications) {
               setLoading(false);
               handleSubmit();
           }
        } catch (error) {
            console.error("Fetch error:", error);
        }
        // try {
        //     const response = await axios.post("http://localhost:8000/api/visa-applications", formData, {
        //         headers: {
        //             "Authorization": "Bearer YOUR_ACCESS_TOKEN",
        //             "Content-Type": "multipart/form-data"
        //         }
        //     })
        //     console.log(response.data)
        // } catch (error) {
        //     console.error(error)
        // }


    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit, (errors) => console.log("Validation Errors:", errors))} className="space-y-6" encType="multipart/form-data">
                {fields.map((field, index) => (
                    <div key={field.id} className="border py-4 px-[20px] rounded-4xl bg-white ">
                        <div className="flex justify-between mb-[30px]">
                            <h3 className="text-2xl font-semibold ">Passager {index + 1}</h3>
                            <p className="text-2xl">
                                <span className="font-bold ">{field.price} </span> / dzd
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 my-4 gap-4">
                            <FormField
                                control={form.control}
                                name={`passengers.${index}.name`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nom</FormLabel>
                                        <Input {...field} placeholder="Nom" />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name={`passengers.${index}.family_name`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nom de famille</FormLabel>
                                        <Input {...field} placeholder="Nom de famille" />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name={`passengers.${index}.passport_number`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Numéro de passeport</FormLabel>
                                        <Input {...field} placeholder="Numéro de passeport" />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="departure_date"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>Date </FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            "w-[240px] pl-3 text-left font-normal",
                                                            !field.value && "text-muted-foreground"
                                                        )}
                                                    >
                                                        {field.value ? (
                                                            format(field.value, "PPP")
                                                        ) : (
                                                            <span>Pick a date</span>
                                                        )}
                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                   
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                     
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {docs.map((doc: any, docIndex: number) => (
                                <FormField
                                    control={form.control}
                                    name={`passengers.${index}.files`}
                                    render={({ field }) => (
                                        <FileUploader
                                            name={doc.document_name}
                                            onFileChange={(files) => {
                                                field.onChange(Array.isArray(files) ? files : [files]); // Ensure files are an array
                                            }}
                                        />
                                    )}
                                />
                            ))}
                        </div>

                        {/* <Button type="button" onClick={() => remove(index)} variant="destructive">
                            Supprimer
                        </Button> */}
                    </div>
                ))}
                {/* <Button type="button" onClick={() => append({ name: "", family_name: "", passport_number: "", departure_date: new Date(), visa_type_id: "1", price: price.toString(), files: [] })}>
                    Ajouter un passager
                </Button> */}
                <div className="flex justify-end">
                <Button type="submit"  className="w-full md:w-auto bg-[#DF2C2C] hover:bg-[#DF2C2C] cursor-pointer">
                    {
                        loading ?  <Loader className="animate-spin mr-2" /> : " Soumettre"
                    }
                   
                </Button>
                </div>
                
            </form>
        </Form>
    )
}
