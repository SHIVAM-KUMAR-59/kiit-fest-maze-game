"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { RegistrationScreen } from "@/components/maze/registration-screen";
import { savePlayer, loadPlayer } from "@/lib/player-store";

export default function RegisterPage() {
  const router = useRouter();

  // If already registered, skip straight to rules
  useEffect(() => {
    if (loadPlayer()) router.replace("/rules");
  }, [router]);

  return (
    <div className="flex flex-1 items-center justify-center bg-background px-4 py-8 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.24, ease: "easeOut" }}
        className="w-full max-w-lg"
      >
        <RegistrationScreen
          onContinue={(name, email, kfid) => {
            savePlayer({ name, email, kfid });
            router.push("/rules");
          }}
        />
      </motion.div>
    </div>
  );
}
