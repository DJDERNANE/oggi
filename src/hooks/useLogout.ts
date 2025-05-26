import { useRouter } from "next/navigation";
import { RemoveToken } from "@/utils/RemoveToken";
import { PostRequest } from "@/utils/PostRequest";

export default function useLogout() {
  const router = useRouter();

  const logout = async () => {
    try {
      // const response = await PostRequest("/logout", true, {});
      RemoveToken();
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return logout; // ✅ Make sure to return the function
}
