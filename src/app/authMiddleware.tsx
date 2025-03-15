"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
    }

    setLoading(false);
  }, []);

  if (loading) return <p>Loading...</p>;

  return <>{children}</>;
}
