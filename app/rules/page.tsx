"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  Flag,
  Bomb,
  Timer,
  Star,
  CloudFog,
  MoveUpRight,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const rules = [
  {
    icon: MoveUpRight,
    color: "text-primary",
    bg: "bg-primary/10",
    title: "Navigate the Maze",
    desc: "Use Arrow Keys / WASD on keyboard, or the on-screen D-Pad to move through the maze.",
  },
  {
    icon: Flag,
    color: "text-secondary",
    bg: "bg-secondary/10",
    title: "Reach the Flag",
    desc: "Find and step on the pulsing flag to complete the level and move to the next one.",
  },
  {
    icon: Bomb,
    color: "text-destructive",
    bg: "bg-destructive/10",
    title: "Avoid Bombs",
    desc: "Red cells contain hidden bombs. Stepping on one ends the game instantly — no second chances!",
  },
  {
    icon: CloudFog,
    color: "text-accent",
    bg: "bg-accent/10",
    title: "Fog of War",
    desc: "Only the cells near you are visible. Explore carefully — danger may lurk just outside your sight.",
  },
  {
    icon: Timer,
    color: "text-chart-4",
    bg: "bg-chart-4/10",
    title: "Beat the Clock",
    desc: "Each level has a time limit. The faster you finish, the more stars you earn per level.",
  },
  {
    icon: Star,
    color: "text-chart-4",
    bg: "bg-chart-4/10",
    title: "Earn Stars & Score",
    desc: "Earn up to ★★★ per level based on speed and moves. Stars multiply your score. 3 levels total.",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};
const item = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.22, ease: "easeOut" as const },
  },
};

export default function RulesPage() {
  return (
    <Suspense>
      <RulesContent />
    </Suspense>
  );
}

function RulesContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");
  const name = searchParams.get("name") ?? "";
  const email = searchParams.get("email") ?? "";

  if (!userId) {
    router.replace("/");
    return null;
  }

  const gameParams = new URLSearchParams({ userId, name, email });

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-8 bg-background px-4 py-8 sm:px-6 sm:py-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.28, ease: "easeOut" }}
        className="flex flex-col items-center gap-3 text-center"
      >
        <h1 className="font-bebas mt-1 text-4xl tracking-widest text-foreground sm:text-5xl">
          How to Play
        </h1>
        <p className="font-marker max-w-sm text-sm tracking-widest text-muted-foreground">
          Read the rules before you dive in. Good luck!
        </p>
      </motion.div>

      {/* Rules grid */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid w-full max-w-3xl grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4"
      >
        {rules.map(({ icon: Icon, color, bg, title, desc }) => (
          <motion.div
            key={title}
            variants={item}
            className="flex items-start gap-4 rounded-2xl border border-border bg-card px-5 py-4"
          >
            <span className={`mt-0.5 flex-none rounded-xl p-2.5 ${bg}`}>
              <Icon className={`size-5 ${color}`} strokeWidth={1.8} />
            </span>
            <div>
              <p className="font-bebas text-lg tracking-wider text-foreground">
                {title}
              </p>
              <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">
                {desc}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.24, ease: "easeOut" }}
      >
        <Button
          size="lg"
          className="inline-flex items-center gap-2 px-10 font-bold tracking-widest"
          onClick={() => router.push(`/game?${gameParams.toString()}`)}
        >
          I&apos;m Ready <ChevronRight className="size-5" />
        </Button>
      </motion.div>
    </div>
  );
}
