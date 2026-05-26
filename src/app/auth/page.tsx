
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sprout, ShoppingCart, BarChart3, Users, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AuthPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!selectedRole) {
      alert("Silakan pilih peran Anda terlebih dahulu.");
      return;
    }
    
    setLoading(true);
    // Simulate auth logic
    setTimeout(() => {
      localStorage.setItem("userRole", selectedRole);
      router.push(`/dashboard?role=${selectedRole}`);
    }, 1000);
  };

  const roles = [
    { id: "farmer", icon: Sprout, label: "Petani", description: "Kelola lahan & jual hasil panen" },
    { id: "customer", icon: ShoppingCart, label: "Konsumen", description: "Belanja produk segar dari kebun" },
    { id: "investor", icon: BarChart3, label: "Investor", description: "Dukung proyek tani & raih profit" },
    { id: "partner", icon: Users, label: "Mitra Bisnis", description: "Solusi pasokan HORECA & ritel" },
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex flex-col">
      <Navbar />
      
      <div className="flex-1 flex items-center justify-center p-6 relative z-10 pt-24">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] -z-10"></div>
        
        <Card className="w-full max-w-2xl border-none shadow-2xl rounded-[3rem] overflow-hidden glassmorphism">
          <CardHeader className="text-center pb-8 pt-12">
            <div className="mx-auto relative h-20 w-20 mb-4">
              <Image
                src="https://drive.google.com/uc?export=view&id=1iPX9w3Kum27Z858Vo-CV1mGQQPuvYv8a"
                alt="Farm Mart Logo"
                fill
                className="object-contain"
              />
            </div>
            <CardTitle className="text-3xl font-bold font-headline text-primary">Selamat Datang di Farm Mart</CardTitle>
            <CardDescription className="text-base">Ekosistem digital pertanian modern terpercaya.</CardDescription>
          </CardHeader>
          
          <CardContent className="px-8 pb-12">
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-10 h-14 rounded-full bg-primary/5 p-1.5">
                <TabsTrigger value="login" className="rounded-full text-base font-bold data-[state=active]:bg-primary data-[state=active]:text-white">Masuk</TabsTrigger>
                <TabsTrigger value="register" className="rounded-full text-base font-bold data-[state=active]:bg-primary data-[state=active]:text-white">Daftar Akun</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login" className="space-y-8 animate-in fade-in duration-500">
                <div className="space-y-4">
                  <Label className="text-sm font-black uppercase tracking-widest text-muted-foreground ml-1">Pilih Peran Anda</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {roles.map((role) => (
                      <button
                        key={role.id}
                        onClick={() => setSelectedRole(role.id)}
                        className={cn(
                          "group flex items-center gap-4 p-5 rounded-[2rem] border-2 transition-all duration-300 text-left",
                          selectedRole === role.id 
                            ? "border-primary bg-primary/5 shadow-lg shadow-primary/10" 
                            : "border-primary/10 hover:border-primary/40 bg-white/50"
                        )}
                      >
                        <div className={cn(
                          "p-3 rounded-2xl transition-colors",
                          selectedRole === role.id ? "bg-primary text-white" : "bg-primary/10 text-primary"
                        )}>
                          <role.icon className="h-6 w-6" />
                        </div>
                        <div>
                          <p className="font-bold text-sm">{role.label}</p>
                          <p className="text-[10px] text-muted-foreground leading-tight">{role.description}</p>
                        </div>
                        {selectedRole === role.id && <ChevronRight className="ml-auto h-4 w-4 text-primary animate-in slide-in-from-left-2" />}
                      </button>
                    ))}
                  </div>
                </div>

                <form onSubmit={handleLogin} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="nama@email.com" className="rounded-2xl h-14 border-primary/20 focus:ring-primary bg-white/50" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label htmlFor="password">Kata Sandi</Label>
                      <button type="button" className="text-xs font-bold text-primary hover:underline">Lupa sandi?</button>
                    </div>
                    <Input id="password" type="password" className="rounded-2xl h-14 border-primary/20 focus:ring-primary bg-white/50" />
                  </div>
                  <Button 
                    type="submit"
                    className="w-full h-14 rounded-2xl bg-secondary hover:bg-secondary/90 text-white font-black text-lg shadow-xl shadow-secondary/20 transition-all active:scale-95 mt-4"
                    disabled={loading || !selectedRole}
                  >
                    {loading ? "Menghubungkan..." : "Masuk Sekarang"}
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="register" className="text-center py-10 space-y-6 animate-in fade-in duration-500">
                <div className="bg-primary/5 p-8 rounded-[3rem] border border-primary/10">
                  <Sprout className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">Belum punya akun?</h3>
                  <p className="text-muted-foreground text-sm mb-6">Bergabunglah dengan ribuan mitra tani and raih kesuksesan bersama di platform agritech nomor 1.</p>
                  <Button className="w-full h-14 rounded-2xl bg-primary text-white font-bold text-lg">Mulai Pendaftaran</Button>
                </div>
                <p className="text-xs text-muted-foreground">Dengan mendaftar, Anda menyetujui Syarat & Ketentuan serta Kebijakan Privasi Farm Mart.</p>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
