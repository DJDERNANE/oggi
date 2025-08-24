// hooks/useLogout.ts
import { useAuth } from "@/app/_context/auth-context";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function useLogout() {
  const { logout } = useAuth();
  const router = useRouter();

  return async () => {
    try {
      // Call your API logout endpoint if needed
      // await PostRequest('/logout', true, {});
      
      // Clear client-side auth state
      logout();
      
      // Redirect to login page
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
}