
"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Menu, Search } from "lucide-react";
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
        "fixed top-0 left-0 right-0 z-[100] transition-all duration-500 px-6 h-20 flex items-center justify-between",
        scrolled ? "glassmorphism shadow-2xl border-b border-white/20 h-16" : "bg-transparent"
      )}
    >
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative h-10 w-10 sm:h-12 sm:w-12 transition-transform group-hover:scale-110 duration-500">
            <Image
              src="https://drive.google.com/uc?export=view&id=1iPX9w3Kum27Z858Vo-CV1mGQQPuvYv8a"
              alt="Farm Mart Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <span className={cn(
            "text-2xl font-black font-headline tracking-tighter hidden sm:inline-block transition-colors",
            scrolled ? "text-primary" : "text-white"
          )}>
            Farm<span className="text-secondary">Mart</span>
          </span>
        </Link>

        <div className={cn(
          "hidden md:flex items-center gap-8 px-8 py-2 rounded-full transition-all duration-500",
          scrolled ? "bg-primary/5" : "bg-white/10 backdrop-blur-sm border border-white/10"
        )}>
          {[
            { label: "Marketplace", href: "/marketplace" },
            { label: "Live Panen", href: "/live" },
            { label: "Portofolio", href: "/dashboard" },
            { label: "B2B Hub", href: "/b2b" },
          ].map((item) => (
            <Link 
              key={item.href}
              href={item.href} 
              className={cn(
                "text-sm font-black uppercase tracking-widest transition-all hover:text-secondary",
                scrolled ? "text-primary/70" : "text-white/80"
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3 sm:gap-5">
          <Button variant="ghost" size="icon" className={cn(
            "rounded-full transition-colors",
            scrolled ? "text-primary hover:bg-primary/10" : "text-white hover:bg-white/10"
          )}>
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className={cn(
            "rounded-full transition-colors relative",
            scrolled ? "text-primary hover:bg-primary/10" : "text-white hover:bg-white/10"
          )}>
            <ShoppingCart className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 bg-secondary text-white text-[10px] font-black h-4 w-4 rounded-full flex items-center justify-center shadow-lg">2</span>
          </Button>
          <Link href="/auth">
            <Button className="rounded-full bg-secondary hover:bg-secondary/90 text-white font-black px-6 sm:px-8 h-10 sm:h-12 shadow-xl shadow-secondary/20 transition-all active:scale-95 text-xs sm:text-sm uppercase tracking-widest">
              Masuk
            </Button>
          </Link>
          <Button variant="ghost" size="icon" className={cn(
            "md:hidden rounded-full",
            scrolled ? "text-primary" : "text-white"
          )}>
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </nav>
  );
}
