"use client"
import "@/app/globals.css"
import React, { useState } from "react";
import AuthLayout from "../authLayout";
import Step1 from "./step1";
import Step2 from "./step2";
import Step3 from "./step3";
import Step4 from "./step4";
import Step5 from "./step5";
import Step6 from "./step6";


export default function Signup() {
    const [step, setStep] = useState(1);
    return (
        <AuthLayout type="signup" currentStep={step}>
            <div>
                {(() => {
                    switch (step) {
                        case 1:
                            return <Step5 onNext={setStep}/>;
                        case 2:
                            return <Step2 onNext={setStep} />;
                        case 3:
                            return <Step3 onNext={setStep} />;
                        case 4:
                            return <Step4 onNext={setStep} />;
                        case 5:
                            return <Step5 onNext={setStep} />;
                        case 6:
                            return <Step6  />;
                        default:
                            return 
                    }
                })()}
            </div>
        </AuthLayout>
    )
}