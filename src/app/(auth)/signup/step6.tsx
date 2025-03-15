"use client"
import { z } from "zod"
import { Button } from "@/components/ui/button"



export default function Step6() {

    const handleClick = () => {
        window.location.href = "/dashboard" 
    }

    return (
        <div className="h-[600px] flex flex-col justify-center align-center">
            <img src="/step6.svg" alt="step2 image" className="mx-auto" />
            <p className=" text-center text-5xl font-semibold my-[40px]">Félicitations ! <br /> 
            Votre compte est prêt. </p>
            <p className="step-container-description  w-[390px] mx-auto text-[#5A5A5A]">Définissez un mot de passe sécurisé pour protéger votre compte.</p>
            <div className="flex flex-col w-full max-w-sm items-center space-x-2 mx-auto">

                <Button type="submit" className="  primary-btn w-full rounded-full h-[50px] cursor-pointer   my-[40px] " onClick={handleClick}>Suivant</Button>

            </div>
        </div>
    )
}