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
    phone: z.string().min(10, {
        message: "phone must 10 characters.",
    }),
})

export default  function Step3({ onNext }: { onNext: any }) {
    const [loading, setLoading] = useState(false);
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            phone: "",
        },
    })

     const onSubmit = async (data: z.infer<typeof FormSchema>, step: number) => {
                setLoading(true);
                const email = localStorage.getItem("email") || "";
                const requestBody = { ...data, email, step };
                console.log("Submitting data:", requestBody);
                try {
                    const response = await fetchData({
                        endpoint: "register",
                        method: "POST",
                        body: requestBody, // Use step parameter dynamically
                    });
        
                    localStorage.setItem("email", response.user.email);
                    localStorage.setItem("phone", response.user.phone);
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
            <h1 className="step-container-title">Numéro de téléphone</h1>
            <p className="step-container-description  w-[390px] mx-auto text-[#5A5A5A]">Ensure your enter a valid email  and a strong password.</p>
            <div className="flex flex-col w-full max-w-sm items-center space-x-2 mx-auto my-4">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit((data) => onSubmit(data, 3))} className="form-signup space-y-4">
                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem >
                                    <FormControl>
                                        <Input className="h-[50px] rounded-full phone-input" placeholder="069948..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="primary-btn w-full mb-4 rounded-full h-[50px]">
                            {loading ? <Loader />  : "Get code"}
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    )
}