import "@/app/globals.css";
import { PostRequest } from "@/utils/PostRequest";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import useIsMobile from "@/lib/isMobile";

export default function AuthLayout({
  children,
  type,
  currentStep,
}: {
  children: React.ReactNode;
  type: string;
  currentStep: number;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const isMobile = useIsMobile();

  const activeIcon = "/active.svg";
  const pendingIcon = "/pending.svg";
  const checkedIcon = "/checked.svg";

  const SignupSteps = [
    { id: 1, title: "Étape 1 : Informations générales", descrption: "Entrez vos informations" },
    { id: 2, title: "Confirmer l e-mail", descrption: "Vérifier votre adresse" },
    { id: 3, title: "Confirmer votre Numéro", descrption: "Sécuriser votre compte" },
    { id: 4, title: "Créer un mot de passe", descrption: "Définissez un mot de passe" },
  ];

  const loginSteps = [
    { id: 1, title: "Connectez-vous à votre compte", descrption: "Plus de 100 destinations vous attendent" },
  ];

  const steps = type === "login" ? loginSteps : SignupSteps;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      if (typeof window === "undefined") return;

      try {
        const token = document.cookie
          .split("; ")
          .find((row) => row.startsWith("oggi_token="))
          ?.split("=")[1];

        if (!token) {
          setIsLoading(false);
          return;
        }

        const response = await PostRequest("/me", true, {});
        if (response && response.id) {
          // Only redirect if not already on dashboard
          if (pathname !== "/dashboard") {
            router.push("/dashboard");
          }
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router, pathname]);

  // if (isLoading) {
  //   return (
  //     <div className="flex h-screen w-full items-center justify-center">
  //       <div className="text-center">
  //         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
  //         <p className="text-gray-600">Loading...</p>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className={`flex overflow-hidden w-full ${isMobile ? "h-[90vh]" : "h-[100vh]"}`}>
      <div className={`process-side h-[100vh] ${currentStep === 6 || isMobile ? "w-0" : "w-1/3"}`}>
        <div className="container">
          <div className="logo py-4">
            <img src="/logo.svg" alt="Logo" />
          </div>

          <div className="steps text-white pl-4 my-4">
            {steps.map((step) => (
              <div
                key={step.id}
                className={`flex gap-4 step ${currentStep === step.id ? "active" : ""}`}
              >
                <img
                  src={
                    currentStep > step.id
                      ? checkedIcon
                      : currentStep < step.id
                      ? pendingIcon
                      : activeIcon
                  }
                  alt="process icon"
                />
                <div>
                  <div className="step-title">{step.title}</div>
                  <div className="step-description">{step.descrption}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col align-center text-center mx-auto container gap-4">
        {isMobile && <img src="/white_logo.svg" alt="Logo" width={200} className="mx-auto" />}
        {children}
      </div>
    </div>
  );
}
