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


export default function Filter() {
    const FormSchema = z.object({
        email: z
            .string({
                required_error: "Please select an email to display.",
            })
            .email(),
    })

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        console.log({
            title: "You submitted the following values:",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">{JSON.stringify(data, null, 2)}</code>
                </pre>
            ),
        })
    }

    return (
        <div className="p-4 relative w-full">
            <h1 className="text-lg font-bold mb-4">Nouvelle demande de visa</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 h-[300px]">
                    {/* Responsive Grid for Select Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 form-container justify-between items-start">
                        <FormField
                            control={form.control}
                            name={`visa`}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-[12px] text-[#4F4F4F]">
                                        Pays de demande de visa
                                    </FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Choisir" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="france">France</SelectItem>
                                            <SelectItem value="egypt">Egypt</SelectItem>
                                            <SelectItem value="us">United States</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name={`nationality`}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-[12px] text-[#4F4F4F]">
                                        Nationalité
                                    </FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Choisir" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="france">France</SelectItem>
                                            <SelectItem value="egypt">Egypt</SelectItem>
                                            <SelectItem value="us">United States</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />


                        <FormField
                            control={form.control}
                            name={`visa_type`}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-[12px] text-[#4F4F4F]">
                                        Type de visa
                                    </FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Choisir" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="france">France</SelectItem>
                                            <SelectItem value="egypt">Egypt</SelectItem>
                                            <SelectItem value="us">United States</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name={`adults`}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-[12px] text-[#4F4F4F]">
                                        Adult(es)
                                    </FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Choisir" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="france">France</SelectItem>
                                            <SelectItem value="egypt">Egypt</SelectItem>
                                            <SelectItem value="us">United States</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex flex-col gap-4 relative">
                            <FormField
                                control={form.control}
                                name={`childs`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-[12px] text-[#4F4F4F]">
                                            Enfant
                                        </FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Choisir" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="france">France</SelectItem>
                                                <SelectItem value="egypt">Egypt</SelectItem>
                                                <SelectItem value="us">United States</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="absolute top-[120%] right-0">
                            <FormLabel className="text-[12px] text-[#4F4F4F] mb-1">
                            L'age des enfants
                                        </FormLabel>
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    
                                    <FormItem>
                                        <FormControl>
                                            <Input placeholder="shadcn" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            </div>
                           
                        </div>

                       
                    </div>

                    <Button type="submit" className="w-full md:w-auto submit-btn">Suivant</Button>
                </form>
            </Form>
        </div>
    )
}

