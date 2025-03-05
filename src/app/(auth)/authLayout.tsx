import '@/app/globals.css'
export default function AuthLayout({
    children,
  }: {
    children: React.ReactNode
  }) {

    const steps = [
        {
            id: 1,
            title: 'Your details',
            descrption: 'Please provide your name and email',
        },
        {
            id: 2,
            title: 'Choose a password',
            descrption: 'Choose a secure password',
        },
        {
            id: 3,
            title: 'Verify email',
            descrption: 'Please check your email to verify your account',
        },
    ]
    return (
      <html lang="en">
        <body>
          <div className="container process-side">
                <div className='logo'>
                    <img src="/logo.svg" alt="Logo" />
                </div>
          </div>
          <main>
            {children}
          </main>
        </body>
      </html>
    )
  }