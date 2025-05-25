"use client"
import { useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

interface AuthGuardProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export default function AuthGuard({ children, fallback }: AuthGuardProps) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkAuth = (): void => {
      try {
        // Check for the oggi_token cookie
        const token = document.cookie
          .split('; ')
          .find((row: string) => row.startsWith('oggi_token='))
          ?.split('=')[1];

        console.log("Token from cookies:", token);

        if (!token) {
          router.replace('/login');
          return;
        }

        setIsAuthenticated(true);
      } catch (error) {
        console.error('Auth check failed:', error);
        router.replace('/login');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  // Show loading state
  if (isLoading) {
    return (
      fallback || (
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-pulse">
            <div className="text-lg text-gray-600">Loading...</div>
          </div>
        </div>
      )
    );
  }

  // If not authenticated, return null (redirect is handled in useEffect)
  if (!isAuthenticated) {
    return null;
  }

  // Return protected content
  return <>{children}</>;
}