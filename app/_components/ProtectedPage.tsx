"use client";
import { useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/_context/UserContext";

interface ProtectedPageProps {
  children: ReactNode;
}

export default function ProtectedPage({ children }: ProtectedPageProps) {
  const { isLoggedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/");
      console.log("User not logged in, redirecting...");
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn) {
    return <p>Redirecting...</p>;
  }

  return <>{children}</>;
}
