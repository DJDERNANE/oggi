"use client"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { useState } from "react"
import MyDropzone from "./Dropzone.js"

export default function Passenger() {
    const FormSchema = z.object({
        email: z
            .string({
                required_error: "Please select an email to display.",
            })
            .email(),
        dob: z.date({
            required_error: "A date of birth is required.",
        }),
    })

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        console.log(data)
    }

    const [show, setShow] = useState(false)
    return (

        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 h-[300px] w-full  ">
                <div className="main-content w-full">
                    <div className="flex justify-between w-full mb-4" >
                        <h1>Passenger</h1>
                        <h1>200/dzd</h1>
                    </div>
                    <div className="w-full">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 form-container justify-between items-start">
                            <FormField
                                control={form.control}
                                name={`name`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-[12px] text-[#4F4F4F]">
                                            Nom
                                        </FormLabel>
                                        <Input placeholder="Nom" {...field} />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name={`family_name`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-[12px] text-[#4F4F4F]">
                                            Nom de famille
                                        </FormLabel>
                                        <Input placeholder="Nom de famille" {...field} />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />


                            <FormField
                                control={form.control}
                                name={`passport_number`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-[12px] text-[#4F4F4F]">
                                            Numéro de passeport
                                        </FormLabel>
                                        <Input type="text" placeholder="Numéro de passeport" {...field} />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="dob"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>Date de voyage</FormLabel>
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
                                                            <span>la date de voyage</span>
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
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-4">
                            <MyDropzone /> 
                            <MyDropzone /> 
                            <MyDropzone />  
                            </div>
                    </div >
                </div>


                <div className="main-content w-full">
                    <div className="flex justify-between w-full mb-4" >
                        <h1>Passenger</h1>
                        <h1>200/dzd</h1>
                    </div>
                    <div className="w-full">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 form-container justify-between items-start">
                            <FormField
                                control={form.control}
                                name={`name`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-[12px] text-[#4F4F4F]">
                                            Nom
                                        </FormLabel>
                                        <Input placeholder="Nom" {...field} />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name={`family_name`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-[12px] text-[#4F4F4F]">
                                            Nom de famille
                                        </FormLabel>
                                        <Input placeholder="Nom de famille" {...field} />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />


                            <FormField
                                control={form.control}
                                name={`passport_number`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-[12px] text-[#4F4F4F]">
                                            Numéro de passeport
                                        </FormLabel>
                                        <Input type="text" placeholder="Numéro de passeport" {...field} />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="dob"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>Date de voyage</FormLabel>
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
                                                            <span>la date de voyage</span>
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
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-4">
                            <MyDropzone /> 
                            <MyDropzone /> 
                            <MyDropzone />  
                            </div>
                    </div >
                </div>
            </form>
        </Form>


    )
};