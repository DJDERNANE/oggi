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
import { useState, useEffect } from "react"
import { PostRequest } from "@/utils/PostRequest"
import { PasswordField } from "@/app/components/PasswordField"
import GuestRoute from "@/app/components/guest-route"

const FormSchema = z.object({
    password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters long" })
        .regex(/[0-9].*[0-9]/, { message: "Password must contain at least 2 numbers" })
        .regex(/[^a-zA-Z0-9]/, { message: "Password must contain at least one special character" }),
    confirm_password: z.string()
}).refine((data) => data.password === data.confirm_password, {
    message: "Passwords must match",
    path: ["confirm_password"],
})

export default function Step5({ onNext }: { onNext: any }) {
    const [loading, setLoading] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState({
        score: 0,
        hasLength: false,
        hasNumbers: false,
        hasSpecial: false
    });

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            password: "",
            confirm_password: "",
        },
    })

    const checkPasswordStrength = (password: string) => {
        const hasLength = password.length >= 8;
        const hasNumbers = (password.match(/[0-9]/g) || []).length >= 2;
        const hasSpecial = /[^a-zA-Z0-9]/.test(password);
        
        let score = 0;
        if (hasLength) score += 1;
        if (hasNumbers) score += 2;
        if (hasSpecial) score += 1;
        
        setPasswordStrength({
            score: score,
            hasLength,
            hasNumbers,
            hasSpecial
        });
    };

    // Watch password field for changes
    useEffect(() => {
        const subscription = form.watch((value, { name }) => {
            if (name === 'password') {
                checkPasswordStrength(value.password || '');
            }
        });
        return () => subscription.unsubscribe();
    }, [form.watch]);

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
                requestBody,
            );

            console.log("Next Step :", response);
            localStorage.setItem("user", response.user);
            localStorage.setItem("token", response.token);
            onNext(response.next_step);
        } catch (error) {
            console.error("Error submitting form:", error);
        } finally {
            setLoading(false);
        }
    };


    return (
       <GuestRoute>
         <div className="h-[600px] flex flex-col justify-center align-center">
            <img src="/step5.svg" alt="step2 image" className="mx-auto" />
            <h1 className="step-container-title">Créer un mot de passe</h1>
            <p className="step-container-description  w-[390px] mx-auto text-[#5A5A5A]">Définissez un mot de passe sécurisé pour protéger votre compte.</p>
            <div className="flex flex-col w-full max-w-sm items-center space-x-2 mx-auto my-4">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit((data) => onSubmit(data, 5))} className="form-signup space-y-4">
                        <PasswordField form={form} name="password" placeholder="Saisir un mot de passe" />
                        <div className="space-y-4">
                            <p className="text-sm text-gray-600">At least 8 characters, 2 numbers and 1 special character</p>
                            <div className="relative">
                                <div className="w-full h-2 flex gap-1">
                                    <div className={`w-1/4 h-full rounded-full transition-colors duration-300 ${
                                        passwordStrength.score >= 1 ? 'bg-[#FF4D4F]' : 'bg-[#D9D9D9]'
                                    }`}></div>
                                    <div className={`w-1/4 h-full rounded-full transition-colors duration-300 ${
                                        passwordStrength.score >= 2 ? 'bg-[#FFA940]' : 'bg-[#D9D9D9]'
                                    }`}></div>
                                    <div className={`w-1/4 h-full rounded-full transition-colors duration-300 ${
                                        passwordStrength.score >= 3 ? 'bg-[#73D13D]' : 'bg-[#D9D9D9]'
                                    }`}></div>
                                    <div className={`w-1/4 h-full rounded-full transition-colors duration-300 ${
                                        passwordStrength.score >= 4 ? 'bg-[#73D13D]' : 'bg-[#D9D9D9]'
                                    }`}></div>
                                </div>
                            </div>
                        </div>
                        <PasswordField form={form} name="confirm_password" placeholder="Confirmer le mot de passe" />
                        <Button type="submit" className="primary-btn w-full mb-4 rounded-full h-[50px]" >
                            {loading ? <Loader />  : "Suivant"}
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
       </GuestRoute>
    )
}