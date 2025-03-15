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
import { useState } from "react";
import { Eye, EyeOff, Loader } from "lucide-react";
export const PasswordField = ({ name, placeholder, form } : { name: any; placeholder: string ; form: any}) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem className="relative">
                    <FormControl>
                        <div className="relative">
                            <Input
                                type={showPassword ? "text" : "password"}
                                className="h-[50px] rounded-full pr-12" // Add padding for icon
                                placeholder={placeholder}
                                {...field}
                            />
                            <button
                                type="button"
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};