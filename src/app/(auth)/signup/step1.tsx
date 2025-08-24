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
import Loading from "@/utils/loading"
import { Loader } from 'lucide-react';
import React, { useState } from "react"
import { GetRequest } from "@/utils/GetRequest"
import { PostRequest } from "@/utils/PostRequest"
import { useRouter } from 'next/navigation'
import useIsMobile from "@/lib/isMobile"
import GuestRoute from "@/app/components/guest-route"


const FormSchema = z.object({
    name: z.string().min(4, {
        message: "Full name must be at least 2 characters.",
    }),
    email: z.string().email(),
    confirm_email: z.string().email(),
})

export default function Step1({ onNext }: { onNext: any }) {
    const router = useRouter()
    const [error, setError] = React.useState<string | null>('')
    const [loading, setLoading] = useState(false);
    const isMobile = useIsMobile()
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: "",
            email: "",
            confirm_email: "",
        },
    })



    const onSubmit = async (data: z.infer<typeof FormSchema>, step: number) => {
        setLoading(true);
        const { confirm_email, ...filteredData } = data;

        const requestBody = { ...filteredData, step };

        console.log("Submitting data:", requestBody);
        try {
            const response = await PostRequest('/register', false, requestBody);

            localStorage.setItem("email", response.user.email);
            console.log("Response:", response);
            onNext(response.next_step);
        } catch (error) {
            console.error("Error submitting form:", error);
        } finally {
            setLoading(false); // Stop loading state
        }
    };


    function handleChange({ value, email }: { value: string, email: string }) {
        const msg = value == email ? '' : 'Emails do not match'
        form.setValue('confirm_email', value)
        setError(msg)
    }

    const handleLogin = () => {
        router.push("/login")
    }
    return (

        <GuestRoute>
            <div className={`flex flex-col justify-center align-center ${isMobile ? "h-[80vh] overflow-scroll" : "h-[100vh]"}`}>
                <img src="/step1.svg" alt="step1 image" className="mx-auto" />
                <h1 className="step-container-title">Informations générales</h1>
                <p className="step-container-description mb-4  mx-auto text-[#5A5A5A]">Entrez votre nom complet et votre adresse e-mail pour commencer.</p>
                <div className="flex flex-col w-full max-w-sm items-center space-x-2 mx-auto my-4">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit((data) => onSubmit(data, 1))} className="form-signup space-y-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem >
                                        <FormControl>
                                            <Input className="h-[50px] rounded-full" placeholder="Nom complet" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input className="h-[50px] rounded-full" placeholder="Adresse e-mail" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="confirm_email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input className="h-[50px] rounded-full" placeholder="Confirmer l’e-mail" {...field} onChange={(e) => handleChange({ value: e.target.value, email: form.getValues('email') })} />
                                        </FormControl>
                                        <FormMessage />
                                        {error && <span className="text-red-500 text-xs">{error}</span>}
                                    </FormItem>
                                )}
                            />
                            <Button
                                disabled={loading}
                                type="submit"
                                className="primary-btn w-full mb-4 rounded-full h-[50px] cursor-pointer"
                            >
                                {loading ? <Loader /> : "Suivant"}
                            </Button>

                        </form>
                    </Form>
                    <Button className="secondary-btn w-full mb-4 rounded-full h-[50px] border cursor-pointer" onClick={handleLogin}>J'ai dejà un compte </Button>
                </div>
            </div>
        </GuestRoute>
    )
}