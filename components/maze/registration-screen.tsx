"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Timer } from "lucide-react";
import { useState } from "react";

interface RegistrationScreenProps {
  onContinue: (name: string, email: string, kfid: string) => void;
}

export function RegistrationScreen({
  onContinue,
}: Readonly<RegistrationScreenProps>) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [kfid, setKfid] = useState("");

  const canContinue =
    name.trim().length > 1 && email.trim().length > 3 && kfid.trim().length > 0;

  return (
    <Card className="w-full max-w-lg border-border bg-card/90 shadow-sm animate-screen-fade">
      <CardHeader className="space-y-3 text-center">
        <CardTitle className="font-bebas text-4xl tracking-widest sm:text-5xl">
          Maze Challenge
        </CardTitle>
        <CardDescription className="font-marker text-sm tracking-widest">
          Register to begin the KIIT Fest maze challenge.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <label className="block space-y-1.5">
          <span className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
            Name
          </span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="h-11 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground outline-none transition-colors focus-visible:border-ring"
          />
        </label>

        <label className="block space-y-1.5">
          <span className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
            Email
          </span>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            type="email"
            className="h-11 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground outline-none transition-colors focus-visible:border-ring"
          />
        </label>

        <label className="block space-y-1.5">
          <span className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
            KFID
          </span>
          <input
            value={kfid}
            onChange={(e) => setKfid(e.target.value)}
            placeholder="Enter your KIIT Fest ID"
            className="h-11 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground outline-none transition-colors focus-visible:border-ring"
          />
        </label>

        <Button
          className="mt-2 h-11 w-full font-semibold tracking-wide"
          disabled={!canContinue}
          onClick={() => onContinue(name.trim(), email.trim(), kfid.trim())}
        >
          Start Challenge
        </Button>
      </CardContent>
    </Card>
  );
}
