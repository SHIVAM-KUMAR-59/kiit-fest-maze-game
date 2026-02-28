"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { RegistrationScreen } from "@/components/maze/registration-screen";
import { savePlayer, loadPlayer } from "@/lib/player-store";

export default function RegisterPage() {
  const router = useRouter();
  const [regError, setRegError] = useState("");
  const [regLoading, setRegLoading] = useState(false);

  // If already registered, skip straight to rules
  useEffect(() => {
    if (loadPlayer()) router.replace("/rules");
  }, [router]);

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

      savePlayer({ id: data.data.id, name, email, kfid });
      router.push("/rules");
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
