// app/login/page.tsx
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
import { Loader, AlertCircle } from "lucide-react"
import { PostRequest } from "@/utils/PostRequest"
import { useRouter } from 'next/navigation'
import useIsMobile from "@/lib/isMobile"
import { useAuth } from "../../_context/auth-context"
import GuestRoute from "@/app/components/guest-route"

const FormSchema = z.object({
    email: z.string().email(),
    password: z.string(),
})

export default function Login() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const { login } = useAuth()
    const isMobile = useIsMobile()

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const onSubmit = async (data: z.infer<typeof FormSchema>) => {
        setLoading(true);
        setError(""); // Clear any previous errors
        
        try {
            const response = await PostRequest("/login", false, data);
            login(response.token); // Use the context login function
            router.push("/dashboard");
        } catch (error: any) {
            console.error("Error submitting form:", error);
            
            // Handle different types of errors
            if (error?.message?.includes("401") || error?.response?.status === 401 || error?.response?.status === 403) {
                setError("Identifiants invalides. Veuillez vérifier votre email et mot de passe.");
            } else if (error?.message?.includes("422") || error?.response?.status === 422) {
                setError("Données invalides. Veuillez vérifier vos informations.");
            } else if (error?.message?.includes("500") || error?.response?.status >= 500) {
                setError("Erreur du serveur. Veuillez réessayer plus tard.");
            } else if (error?.message?.includes("HTTP error")) {
                // Handle generic HTTP errors
                if (error.message.includes("401")) {
                    setError("Identifiants invalides. Veuillez vérifier votre email et mot de passe.");
                } else if (error.message.includes("404")) {
                    setError("Service non trouvé. Veuillez contacter le support.");
                } else if (error.message.includes("500")) {
                    setError("Erreur du serveur. Veuillez réessayer plus tard.");
                } else {
                    setError("Erreur de connexion. Veuillez vérifier votre connexion internet.");
                }
            } else if (error?.message) {
                // For network errors or other issues
                if (error.message.includes("fetch") || error.message.includes("network")) {
                    setError("Erreur de connexion. Veuillez vérifier votre connexion internet.");
                } else {
                    setError("Une erreur est survenue. Veuillez réessayer.");
                }
            } else {
                setError("Une erreur est survenue. Veuillez réessayer.");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleSignup = () => {
        router.push("/signup")
    }

    return (
        <GuestRoute>
            <AuthLayout type="login" currentStep={1}>
                <div className={`flex flex-col justify-center align-center ${isMobile ? "h-[80vh] overflow-scroll" : "h-[100vh]"}`}>
                    <img src="/step2.svg" alt="step2 image" className="mx-auto" />
                    <h1 className="step-container-title">Quick sign up </h1>
                    <p className="step-container-description mb-4  mx-auto text-[#5A5A5A]">Ensure your enter a valid email  and a strong password</p>
                    <div className="flex flex-col w-full max-w-sm items-center md:space-x-2 mx-auto my-4">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="form-signup space-y-4">
                                {/* Error Message Display */}
                                {error && (
                                    <div className="flex items-center gap-2 p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg">
                                        <AlertCircle className="h-4 w-4 flex-shrink-0" />
                                        <span>{error}</span>
                                    </div>
                                )}
                                
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input 
                                                    className="h-[50px] rounded-full" 
                                                    placeholder="Adresse e-mail" 
                                                    {...field}
                                                    onChange={(e) => {
                                                        field.onChange(e);
                                                        // Clear error when user starts typing
                                                        if (error) setError("");
                                                    }}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <PasswordField 
                                    form={form} 
                                    name={"password"} 
                                    placeholder="Saisir votre mot de passe"
                                />
                                <Button disabled={loading} type="submit" className="primary-btn w-full mb-4 rounded-full h-[50px] cursor-pointer">
                                    {loading ? <Loader className="animate-spin" /> : "Connecté"}
                                </Button>
                            </form>
                        </Form>
                        <Button className="secondary-btn w-full mb-4 rounded-full h-[50px] border">
                            Vous avez pas un compte? <span className="text-[#DF2C2C] cursor-pointer" onClick={handleSignup}>Créer un</span>
                        </Button>
                    </div>
                </div>
            </AuthLayout>
        </GuestRoute>
    )
}