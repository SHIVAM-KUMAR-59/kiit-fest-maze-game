import Image from "next/image";
import Link from "next/link";

export function Header() {
  return (
    <header className="w-full border-b border-border/40 bg-background/80 backdrop-blur-sm">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-center px-4 py-3 sm:justify-between">
        <Image
          src="/maze-run-logo.png"
          alt="KIIT Fest"
          width={140}
          height={46}
          className="h-9 w-auto object-contain hidden sm:block"
          priority
        />
        <Link href="/" aria-label="KIIT Fest Home">
          <Image
            src="/kiitfest-main-logo.png"
            alt="KIIT Fest"
            width={140}
            height={46}
            className="h-10 w-auto object-contain"
            priority
          />
        </Link>
      </div>
    </header>
  );
}
