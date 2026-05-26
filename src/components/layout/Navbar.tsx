"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Menu } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 h-20 flex items-center justify-between",
        scrolled ? "glassmorphism shadow-md" : "bg-transparent"
      )}
    >
      <Link href="/" className="flex items-center gap-3 group">
        <div className="relative h-[52px] w-[52px]">
          <Image
            src="https://drive.google.com/uc?export=view&id=1iPX9w3Kum27Z858Vo-CV1mGQQPuvYv8a"
            alt="Farm Mart Logo"
            fill
            className="object-contain"
            priority
          />
        </div>
        <span className="text-2xl font-bold font-headline tracking-tight text-primary hidden sm:inline-block">
          Farm<span className="text-secondary">Mart</span>
        </span>
      </Link>

      <div className="hidden md:flex items-center gap-8">
        <Link href="/marketplace" className="text-sm font-medium hover:text-secondary transition-colors">Marketplace</Link>
        <Link href="/live" className="text-sm font-medium hover:text-secondary transition-colors">Live Panen</Link>
        <Link href="/dashboard" className="text-sm font-medium hover:text-secondary transition-colors">Portofolio</Link>
        <Link href="/b2b" className="text-sm font-medium hover:text-secondary transition-colors">B2B Hub</Link>
      </div>

      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="hidden sm:flex">
          <ShoppingCart className="h-5 w-5" />
        </Button>
        <Link href="/auth">
          <Button className="rounded-full bg-secondary hover:bg-secondary/90 text-white font-semibold px-6 shadow-lg shadow-secondary/20 transition-all active:scale-95">
            Masuk
          </Button>
        </Link>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
        </Button>
      </div>
    </nav>
  );
}
