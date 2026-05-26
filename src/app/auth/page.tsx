
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sprout, ShoppingCart, BarChart3, Users, Lock } from "lucide-react";

export default function AuthPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogin = (role: string) => {
    setLoading(true);
    // Simulate auth logic
    setTimeout(() => {
      localStorage.setItem("userRole", role);
      router.push(`/dashboard?role=${role}`);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex flex-col">
      <Navbar />
      
      <div className="flex-1 flex items-center justify-center p-6 relative z-10 pt-24">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] -z-10"></div>
        
        <Card className="w-full max-w-xl border-none shadow-2xl rounded-3xl overflow-hidden glassmorphism">
          <CardHeader className="text-center pb-8 pt-12">
            <div className="mx-auto w-16 h-16 bg-primary/10 flex items-center justify-center rounded-2xl mb-4">
              <Lock className="text-primary h-8 w-8" />
            </div>
            <CardTitle className="text-3xl font-bold font-headline text-primary">Selamat Datang</CardTitle>
            <CardDescription className="text-base">Silakan pilih peran Anda untuk melanjutkan ke dashboard.</CardDescription>
          </CardHeader>
          
          <CardContent className="px-8 pb-12">
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8 h-12 rounded-full bg-primary/5 p-1">
                <TabsTrigger value="login" className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-white">Masuk</TabsTrigger>
                <TabsTrigger value="register" className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-white">Daftar</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login" className="space-y-6">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                  {[
                    { id: "farmer", icon: Sprout, label: "Petani" },
                    { id: "customer", icon: ShoppingCart, label: "Customer" },
                    { id: "investor", icon: BarChart3, label: "Investor" },
                    { id: "partner", icon: Users, label: "Mitra" },
                  ].map((role) => (
                    <button
                      key={role.id}
                      onClick={() => handleLogin(role.id)}
                      className="group flex flex-col items-center gap-2 p-4 rounded-2xl hover:bg-primary hover:text-white transition-all duration-300 border border-primary/10 hover:scale-105"
                    >
                      <role.icon className="h-6 w-6 group-hover:scale-110 transition-transform" />
                      <span className="text-xs font-semibold">{role.label}</span>
                    </button>
                  ))}
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="nama@email.com" className="rounded-xl h-12 border-primary/20 focus:ring-primary" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Kata Sandi</Label>
                    <Input id="password" type="password" className="rounded-xl h-12 border-primary/20 focus:ring-primary" />
                  </div>
                  <Button 
                    className="w-full h-12 rounded-xl bg-secondary hover:bg-secondary/90 text-white font-bold text-lg shadow-lg shadow-secondary/20 transition-all active:scale-95"
                    disabled={loading}
                    onClick={() => handleLogin('customer')}
                  >
                    {loading ? "Menghubungkan..." : "Masuk ke Akun"}
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="register">
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">Pilih peran pendaftaran Anda</p>
                  {/* Reuse similar UI or different flow */}
                  <Button variant="outline" className="w-full rounded-xl h-12">Mulai sebagai Petani Mitra</Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
