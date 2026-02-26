import Image from "next/image";

export function Footer() {
  return (
    <footer className="w-full border-t border-border/40 bg-background/80 backdrop-blur-sm">
      <div className="mx-auto flex w-full max-w-5xl flex-wrap items-center justify-between gap-4 px-4 py-5 sm:gap-3">
        {/* KIIT Fest main logo */}
        <Image
          src="/kiitfest-main-logo.png"
          alt="KIIT Fest"
          width={120}
          height={40}
          className="h-9 w-auto object-contain"
        />

        {/* Konnexions logo */}
        <div className="flex items-center gap-2 opacity-70">
          <span className="text-xs tracking-widest text-muted-foreground uppercase">
            Made with ❤️ by
          </span>
          <Image
            src="/konnexions.png"
            alt="Konnexions"
            width={100}
            height={28}
            className="h-9 w-auto object-contain"
          />
        </div>
      </div>
    </footer>
  );
}
