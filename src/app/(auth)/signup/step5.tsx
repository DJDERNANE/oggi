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
import { Eye, EyeOff, Loader } from "lucide-react";
import { useState } from "react"
import { PostRequest } from "@/utils/PostRequest"
import { PasswordField } from "@/app/components/PasswordField"

const FormSchema = z.object({
    password: z.string().min(8, {
        message: "Password must be at least 8 characters long",
    }),
    confirm_password: z.string().min(8, {
        message: "Confirm password must be at least 8 characters long",
    })
})

export default function Step5({ onNext }: { onNext: any }) {
    const [loading, setLoading] = useState(false);
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            password: "",
            confirm_password: "",
        },
    })

    const onSubmit = async (data: z.infer<typeof FormSchema>, step: number) => {
            setLoading(true);
            const email = localStorage.getItem("email") || "";
            const phone = localStorage.getItem("phone") || "";
            const { confirm_password, ...filteredData } = data;
            const requestBody = { ...filteredData, email, phone, step };
            console.log("Submitting data:", requestBody);
            try {
                const response = await PostRequest(
                    "/register",
                    false,
                    requestBody, // Use step parameter dynamically
                );
    
                console.log("Next Step :", response);
                localStorage.setItem("user", response.user);
                localStorage.setItem("token", response.token);
                onNext(response.next_step); // Move to next step only if successful
            } catch (error) {
                console.error("Error submitting form:", error);
            } finally {
                setLoading(false); // Stop loading state
            }
    };
   
    return (
        <div className="h-[600px] flex flex-col justify-center align-center">
            <img src="/step5.svg" alt="step2 image" className="mx-auto" />
            <h1 className="step-container-title">Créer un mot de passe</h1>
            <p className="step-container-description  w-[390px] mx-auto text-[#5A5A5A]">Définissez un mot de passe sécurisé pour protéger votre compte.</p>
            <div className="flex flex-col w-full max-w-sm items-center space-x-2 mx-auto my-4">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit((data) => onSubmit(data, 5))} className="form-signup space-y-4">
                        <PasswordField form={form} name="password" placeholder="Saisir un mot de passe" />
                        <PasswordField form={form} name="confirm_password" placeholder="Confirmer le mot de passe" />
                        <Button type="submit" className="primary-btn w-full mb-4 rounded-full h-[50px]" >
                            {loading ? <Loader />  : "Suivant"}
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    )
}