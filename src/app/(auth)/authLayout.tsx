import '@/app/globals.css'
import { PostRequest } from '@/utils/PostRequest'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AuthLayout({
  children, type, currentStep
}: {
  children: React.ReactNode,
  type: string,
  currentStep: number
}) {
  const router = useRouter()
  const activeIcon = "/active.svg"
  const pendingIcon = "/pending.svg"
  const lastIcon = "/last.svg"
  const checkedIcon = "/checked.svg"

  const SignupSteps = [
    {
      id: 1,
      title: 'Étape 1 : Informations générales',
      descrption: 'Entrez vos informations',
    },
    {
      id: 2,
      title: 'Confirmer l e-mail',
      descrption: 'vérifier votre adresse',
    },
    {
      id: 3,
      title: 'Confirmer votre Numéro ',
      descrption: 'sécuriser votre compte.',
    },
    {
      id: 4,
      title: 'Créer un mot de pass ',
      descrption: 'Définissez un mot de passe',
    }
  ]

  const loginSteps = [
    {
      id: 1,
      title: "connecter a votre compte",
      descrption: "plus de 100 destination vous attente"
    }
  ]

  const steps = type == 'login' ? loginSteps : SignupSteps
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // First check if there's a token in cookies
        const token = document.cookie
          .split('; ')
          .find(row => row.startsWith('oggi_token='))
          ?.split('=')[1];

        console.log("AuthLayout - Token from cookies:", token);

        // If no token, user is not authenticated - show the auth form
        if (!token) {
          console.log("No token found, showing auth form");
          setUser(null);
          setIsLoading(false);
          return;
        }

        // If token exists, verify it with the API
        const response = await PostRequest('/me', true, {});
        console.log("AuthLayout - /me response:", response);
        
        if (response && response.id) {
          // User is authenticated, redirect to dashboard
          console.log("User authenticated, redirecting to dashboard");
          router.push('/dashboard');
        } else {
          // Token is invalid, show auth form
          console.log("Invalid token, showing auth form");
          setUser(null);
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Auth check failed in AuthLayout:', error);
        // API call failed, show auth form
        setUser(null);
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <html lang="en">
        <body>
          <div className='flex h-[100vh] overflow-hidden w-full items-center justify-center'>
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading...</p>
            </div>
          </div>
        </body>
      </html>
    );
  }

  // Show auth form (login/signup)
  return (
    <html lang="en">
      <body>
        <div className='flex h-[100vh] overflow-hidden w-full'>
          <div className={`process-side h-[100vh]  ${currentStep === 6 ? 'w-0' : 'w-1/3'}`}>
            <div className='container'>
              <div className='logo py-4'>
                <img src="/logo.svg" alt="Logo" />
              </div>

              <div className='steps text-white pl-4 my-4'>
                {
                  steps.map((step, index) => {
                    return (
                      <div key={step.id} className={`flex gap-4 step ${index === step.id - 1 ? 'active' : ''}`}>
                        {
                          currentStep > step.id ? (
                            <img
                              src={checkedIcon}
                              alt="process icon"
                            />) : currentStep < step.id ? (
                            <img
                              src={pendingIcon}
                              alt="process icon"
                            />) : (
                            <img
                              src={activeIcon}
                              alt="process icon"
                            />
                          )
                        }

                        <div>
                          <div className="step-title">{step.title}</div>
                          <div className="step-description">{step.descrption}</div>
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            </div>
          </div>
          <div className="flex flex-col align-center text-center mx-auto container gap-4">
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}