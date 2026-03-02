"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { RegistrationScreen } from "@/components/maze/registration-screen";

export default function RegisterPage() {
  const router = useRouter();
  const [regError, setRegError] = useState("");
  const [regLoading, setRegLoading] = useState(false);

  const handleRegister = async (name: string, email: string, kfid: string) => {
    setRegError("");
    setRegLoading(true);
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, kfid }),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        setRegError(data.message ?? "Registration failed");
        return;
      }

      const userId = data.data.id as string;
      const params = new URLSearchParams({ userId, name, email });
      // 200 = returning user ("Welcome back!") — skip rules, go straight to game
      // 201 = new user — show rules first
      const destination = res.status === 200 ? "/game" : "/rules";
      router.push(`${destination}?${params.toString()}`);
    } catch {
      setRegError("Network error. Please try again.");
    } finally {
      setRegLoading(false);
    }
  };

  return (
    <div className="flex flex-1 items-center justify-center bg-background px-4 py-8 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.24, ease: "easeOut" }}
        className="w-full max-w-lg"
      >
        <RegistrationScreen
          onContinue={handleRegister}
          error={regError}
          loading={regLoading}
        />
      </motion.div>
    </div>
  );
}
