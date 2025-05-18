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
import AuthLayout from "../authLayout"
import { PasswordField } from "@/app/components/PasswordField"
import { useState } from "react"
import { Loader } from "lucide-react"
import { PostRequest } from "@/utils/PostRequest"
import { saveToken } from "@/utils/SaveToken"

const FormSchema = z.object({
    email: z.string().email(),
    password: z.string(),
})

export default function Login() {
    const [loading, setLoading] = useState(false)
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const onSubmit = async (data: z.infer<typeof FormSchema>) => {
        setLoading(true);
        console.log("Submitting data:", data);
        try {
            const response = await PostRequest("/login", false, data);
            console.log("Response :", response);
            saveToken(response.token);
            window.location.href = "/dashboard"
        } catch (error) {
            console.error("Error submitting form:", error);
        } finally {
            setLoading(false); // Stop loading state
        }
    };

    const handleSignup = () => {
        window.location.href = "/signup"
    }
    return (
        <AuthLayout type="login">
            <div className="h-[100vh] flex flex-col justify-center align-center">
                <img src="/step2.svg" alt="step2 image" className="mx-auto" />
                <h1 className="step-container-title">Quick sign up </h1>
                <p className="step-container-description mb-4 w-[390px] mx-auto text-[#5A5A5A]">Ensure your enter a valid email  and a strong password</p>
                <div className="flex flex-col w-full max-w-sm items-center space-x-2 mx-auto my-4">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="form-signup space-y-4">
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
                            <PasswordField form={form} name={"password"} placeholder="Saisir votre mot de passe" />
                            <Button disabled={loading} type="submit" className="primary-btn w-full mb-4 rounded-full h-[50px] cursor-pointer">
                                {loading ? <Loader />  : "Connecté"}
                                </Button>
                        </form>
                    </Form>
                    <Button className="secondary-btn w-full mb-4 rounded-full h-[50px] border">Vous avez pas un compte? <span className="text-[#DF2C2C] " onClick={handleSignup}>Créer un</span> </Button>
                </div>
            </div>
        </AuthLayout>

    )
}