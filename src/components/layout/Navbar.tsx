
"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Menu, Search, Bell, MessageCircle, PlayCircle, ShoppingCart } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface NavbarProps {
  cartCount?: number;
}

export function Navbar({ cartCount = 0 }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const isDashboard = pathname?.includes("/dashboard");
  const role = searchParams.get("role") || "customer";
  const { toast } = useToast();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleActionClick = useCallback((e: React.MouseEvent) => {
    if (pathname === "/") {
      e.preventDefault();
      const element = document.getElementById("registration-section");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        
        toast({
          title: "Pendaftaran Diperlukan",
          description: "Silakan buat akun Farm Mart terlebih dahulu untuk mengakses fitur ini.",
          duration: 3000,
        });
      }
    }
  }, [pathname, toast]);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-[100] transition-all duration-500 px-6 h-20 flex items-center justify-between",
        scrolled || isDashboard ? "glassmorphism shadow-2xl border-b border-white/20 h-16" : "bg-transparent"
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
            scrolled || isDashboard ? "text-primary" : "text-white"
          )}>
            Farm <span className="text-secondary">Mart</span>
          </span>
        </Link>

        {!isDashboard && (
          <div className={cn(
            "hidden md:flex items-center gap-8 px-8 py-2 rounded-full transition-all duration-500",
            scrolled ? "bg-primary/5" : "bg-white/10 backdrop-blur-sm border border-white/10"
          )}>
            {[
              { label: "Marketplace", href: "/marketplace" },
              { label: "Live Tani", href: "/live" },
              { label: "Investasi Tani", href: "/dashboard" },
              { label: "B2B Hub", href: "/b2b" },
            ].map((item) => (
              <button
                key={item.href}
                onClick={handleActionClick}
                className={cn(
                  "text-sm font-black uppercase tracking-widest transition-all hover:text-secondary",
                  scrolled ? "text-primary/70" : "text-white/80"
                )}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}

        <div className="flex items-center gap-3 sm:gap-5">
          <Button onClick={handleActionClick} variant="ghost" size="icon" className={cn(
            "rounded-full transition-colors",
            scrolled || isDashboard ? "text-primary hover:bg-primary/10" : "text-white hover:bg-white/10"
          )}>
            <Search className="h-5 w-5" />
          </Button>
          
          {isDashboard ? (
            <div className="flex items-center gap-2 sm:gap-4">
              <Link href={`/dashboard?role=${role}&view=notifications`}>
                <Button variant="ghost" size="icon" className="text-primary rounded-full relative hover:bg-primary/10">
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full border-2 border-white"></span>
                </Button>
              </Link>
              <Link href={`/dashboard?role=${role}&view=chat`}>
                <Button variant="ghost" size="icon" className="text-primary rounded-full hover:bg-primary/10">
                  <MessageCircle className="h-5 w-5" />
                </Button>
              </Link>
              {role === "customer" && (
                <Link href={`/dashboard?role=${role}&view=cart`}>
                  <Button variant="ghost" size="icon" className="text-primary rounded-full relative hover:bg-primary/10">
                    <ShoppingCart className="h-5 w-5" />
                    {cartCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-secondary text-white text-[8px] font-black h-4 w-4 rounded-full flex items-center justify-center border-2 border-white">
                        {cartCount}
                      </span>
                    )}
                  </Button>
                </Link>
              )}
              <Link href="/live">
                <Button size="sm" className="bg-destructive hover:bg-destructive/90 text-white rounded-full px-4 h-9 font-bold flex items-center gap-2 shadow-lg shadow-destructive/20 animate-pulse">
                  <PlayCircle className="h-4 w-4" />
                  <span className="hidden sm:inline">LIVE TANI</span>
                </Button>
              </Link>
            </div>
          ) : (
            <>
              <button
                onClick={handleActionClick}
                className={cn(
                  "rounded-full font-black px-6 sm:px-8 h-10 sm:h-12 shadow-xl transition-all active:scale-95 text-xs sm:text-sm uppercase tracking-widest flex items-center justify-center",
                  scrolled ? "bg-secondary text-white shadow-secondary/20" : "bg-white text-primary shadow-white/20"
                )}
              >
                Masuk
              </button>
            </>
          )}

          <Button variant="ghost" size="icon" className={cn(
            "md:hidden rounded-full",
            scrolled || isDashboard ? "text-primary" : "text-white"
          )}>
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </nav>
  );
}
