"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { CalendarIcon } from "lucide-react"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import FileUploader from "./Dropzone.js"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Loader } from 'lucide-react'
import { Separator } from "@/components/ui/separator"
import { useState, useEffect } from "react"
import { Checkbox } from "@/components/ui/checkbox"
const FormSchema = z.object({
    name: z.string().min(1, "Required"),
    family_name: z.string().min(1, "Required"),
    passport_number: z.string().min(1, "Required"),
    departure_date: z.date({
        required_error: "A departure date is required.",
    }),
    files: z.array(z.any()).optional()
});

interface PassengerProps {
    price: number;
    docs: Array<any>;
    number: number;
    isLastPassenger: boolean;
    formData: {
        name: string;
        family_name: string;
        passport_number: string;
        departure_date: Date;
        files: File[];
    };
    onChange: (data: any) => void;
    onSubmit?: () => void;
    submitting?: boolean;
}

export default function Passenger({
    price,
    docs,
    number,
    isLastPassenger,
    formData,
    onChange,
    onSubmit,
    submitting
}: PassengerProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            ...formData,
            files: formData.files || [],
            departure_date: formData.departure_date || new Date(),
        }
    });

    useEffect(() => {
        if (mounted) {
            const subscription = form.watch((value) => {
                if (value !== formData) {
                    onChange(value);
                }
            });
            return () => subscription.unsubscribe();
        }
    }, [form, formData, onChange, mounted]);

    const handleFileChange = (files: File[] | File) => {
        const fileArray = Array.isArray(files) ? files : [files];
        const updatedFiles = [...(formData.files || []), ...fileArray];
        onChange({ ...formData, files: updatedFiles });
    };

    if (!mounted) {
        return null;
    }

    return (
        <Form {...form}>
            <div className="border py-4 px-[20px] rounded-4xl bg-white">
                {number === 0 && (
                    <div className="flex alert">
                        <img src="/alert.svg" alt="" className="mr-2" />
                        <p>La taille totale des fichiers que vous téléchargez doit être inférieure à 20 mégaoctets. Les types de fichiers doivent être ".jpg", " jpeg", ".png", ".gif" et ".pdf"</p>
                    </div>
                )}

                <div className="flex justify-between mb-[30px]">
                    <h3 className="text-2xl font-semibold">Passager {number + 1}</h3>
                    <p className="text-2xl">
                        <span className="font-bold">{price}</span> / dzd
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 my-4 gap-4">
                    <FormField
                        control={form.control}
                        name="name"
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
                        name="family_name"
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
                        name="passport_number"
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
                                <FormLabel>Date</FormLabel>
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
                            key={docIndex}
                            control={form.control}
                            name="files"
                            render={({ field }) => (
                                <FileUploader
                                    name={doc.document_name}
                                    onFileChange={handleFileChange}
                                />
                            )}
                        />
                    ))}
                </div>
                <Separator className="my-4" />
                {isLastPassenger && (
                    <div className="flex justify-between mt-6">
                        <div className="flex items-center space-x-2">
                            <Checkbox id="terms" />
                            <label
                                htmlFor="terms"
                                className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Veuillez cocher la case pour confirmer les conditions de réservation.  <br/>
                                (Vous ne serez pas autorisé à continuer sans que la case ne soit cochée.) (Voir les conditions générales)
                            </label>
                        </div>
                        <Button
                            onClick={onSubmit}
                            disabled={submitting}
                            className="bg-[#DF2C2C] hover:bg-[#DF2C2C] cursor-pointer"
                        >
                            {submitting ? (
                                <>
                                    <Loader className="animate-spin mr-2" />
                                    Soumission en cours...
                                </>
                            ) : (
                                "Soumettre"
                            )}
                        </Button>
                    </div>
                )}
            </div>
        </Form>
    );
}
