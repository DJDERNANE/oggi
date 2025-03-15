import '@/app/globals.css'
import { Icon } from 'lucide-react'
import { title } from 'process'
export default function AuthLayout({
  children, type
}: {
  children: React.ReactNode,
  type: string,
}) {
  const activeIcon = "/active.svg"
  const pendingIcon = "/pending.svg"
  const lastIcon = "/last.svg"
  const checkedIcon = "/checked.svg"
  
  const SignupSteps = [
    {
      id: 0,
      title: 'Étape 1 : Informations générales',
      descrption: 'Entrez vos informations',
    },
    {
      id: 1,
      title: 'Confirmer l’e-mail',
      descrption: 'vérifier votre adresse',
    },
    {
      id: 2,
      title: 'Confirmer votre Numéro ',
      descrption: 'sécuriser votre compte.',
    },
    {
      id: 3,
      title: 'Créer un mot de pass ',
      descrption: 'Définissez un mot de passe',
    }
  ]

  const loginSteps = [
    {
      id : 1,
      title : "connecter a votre compte",
      descrption : "plus de 100 destination vous attente"
    }
  ]

  const steps = type =='login' ? loginSteps : SignupSteps

  const token = localStorage.getItem('token') ? localStorage.getItem('token') : null

  if (!token) {
    return (
      <html lang="en">
      <body>
        <div className='flex h-[100vh] overflow-hidden w-full'>
          <div className="process-side h-[100vh] w-1/3">
            <div className='container'>
              <div className='logo py-4'>
                <img src="/logo.svg" alt="Logo" />
              </div>

              <div className='steps text-white pl-4 my-4'>
                {
                  steps.map((step, index) => {
                  
                    return (
                      <div key={step.id} className={`flex gap-4 step ${index === step.id - 1}? 'active' : ''`}>

                        <img
                          src={

                            checkedIcon

                          }
                          alt="process icon"
                        />
                        <div >
                          <div className="step-title">{step.title}</div>
                          <div className="step-description">{step.descrption}</div>
                        </div>
                      </div>
                    )
                  }
                  )
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
  window.location.href = '/dashboard'
}