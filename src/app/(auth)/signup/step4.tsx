"use client"
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
import { Input } from "@/components/ui/input"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { fetchData } from "@/utils/fetchData"
import { useState } from "react"
import { Loader } from "lucide-react"

const FormSchema = z.object({
    otp: z.string().min(4, {
        message: "otp must be at least 4 characters.",
    }),
})

export default function Step4({ onNext }: { onNext: any }) {
    const [loading, setLoading] = useState(false);
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            otp: "",
        },
    })

    const onSubmit = async (data: z.infer<typeof FormSchema>, step: number) => {
        setLoading(true);
        const email = localStorage.getItem("email") || "";
        const phone = localStorage.getItem("phone") || "";
        const requestBody = { ...data, email, phone, step };
        console.log("Submitting data:", requestBody);
        try {
            const response = await fetchData({
                endpoint: "register",
                method: "POST",
                body: requestBody, // Use step parameter dynamically
            });

            console.log("Next Step :", response.next_step);
            onNext(response.next_step); // Move to next step only if successful
        } catch (error) {
            console.error("Error submitting form:", error);
        } finally {
            setLoading(false); // Stop loading state
        }
    };
    return (
        <div className="h-[600px] flex flex-col justify-center align-center">
            <img src="/step3.svg" alt="step2 image" className="mx-auto" />
            <h1 className="step-container-title">Confirmer le numéro de téléphone </h1>
            <p className="step-container-description  w-[390px] mx-auto text-[#5A5A5A]">Saisissez le code à 6 chiffres envoyé par SMS pour vérifier votre numéro.</p>
            <div className="flex flex-col w-full max-w-sm items-center space-x-2 mx-auto">

                <Form {...form}>
                    <form onSubmit={form.handleSubmit((data) => onSubmit(data, 4))} className="relative space-y-6">
                        <div>
                            <FormField
                                control={form.control}
                                name="otp"
                                render={({ field }) => (
                                    <FormItem className="my-[70px]">
                                        <FormLabel className="text-[#5A5A5A] text-[16px]  text-center mx-auto">Entrer le code</FormLabel>
                                        <FormControl>
                                            <InputOTP maxLength={4} {...field}>
                                                <InputOTPGroup>
                                                    <InputOTPSlot className="w-[50px] h-[50px] bg-[#E7E5FF]" index={0} />
                                                </InputOTPGroup>
                                                <InputOTPGroup>
                                                    <InputOTPSlot className="w-[50px] h-[50px] bg-[#E7E5FF]" index={1} />
                                                </InputOTPGroup>
                                                <InputOTPGroup>
                                                    <InputOTPSlot className="w-[50px] h-[50px] bg-[#E7E5FF]" index={2} />
                                                </InputOTPGroup>
                                                <InputOTPGroup>
                                                    <InputOTPSlot className="w-[50px] h-[50px] bg-[#E7E5FF]" index={3} />
                                                </InputOTPGroup>
                                            </InputOTP>
                                        </FormControl>
                                        <FormDescription>
                                            Renvoyer le code dans 00:57
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>


                        <Button type="submit" className="absolute  primary-btn w-full rounded-full h-[50px] cursor-pointer w-[390px] left-1/2  transform -translate-x-1/2 " >
                                {loading ? <Loader />  : "Suivant"}
                        </Button>
                    </form>
                </Form>

            </div>
        </div>
    )
}