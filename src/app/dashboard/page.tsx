
"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Navbar } from "@/components/layout/Navbar";
import { FarmerDashboard } from "@/components/dashboard/FarmerDashboard";
import { InvestorDashboard } from "@/components/dashboard/InvestorDashboard";
import { FarmerTransactions } from "@/components/dashboard/FarmerTransactions";
import { FarmerAnalytics } from "@/components/dashboard/FarmerAnalytics";
import { FarmerCommunity } from "@/components/dashboard/FarmerCommunity";
import { FarmerProfile } from "@/components/dashboard/FarmerProfile";
import { 
  LayoutDashboard, 
  ShoppingCart, 
  BarChart3, 
  Users, 
  Settings, 
  LogOut, 
  ChevronRight,
  AlertCircle
} from "lucide-react";
import { cn } from "@/lib/utils";
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle 
} from "@/components/ui/alert-dialog";

export default function DashboardPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const role = searchParams.get("role") || "farmer";
  const [activeView, setActiveView] = useState("dashboard");
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);

  // Sync role-based view if needed
  useEffect(() => {
    // If not farmer, we might want to default to dashboard for other roles
    if (role !== "farmer") {
      setActiveView("dashboard");
    }
  }, [role]);

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    router.push("/");
  };

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "transactions", label: "Transaksi", icon: ShoppingCart },
    { id: "analytics", label: "Analitik", icon: BarChart3 },
    { id: "community", label: "Komunitas", icon: Users },
  ];

  const getFarmerContent = () => {
    switch (activeView) {
      case "dashboard": return <FarmerDashboard />;
      case "transactions": return <FarmerTransactions />;
      case "analytics": return <FarmerAnalytics />;
      case "community": return <FarmerCommunity />;
      case "profile": return <FarmerProfile />;
      default: return <FarmerDashboard />;
    }
  };

  const renderContent = () => {
    if (role === "farmer") {
      return getFarmerContent();
    }
    if (role === "investor") {
      return <InvestorDashboard />;
    }
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4">
        <div className="bg-primary/10 p-8 rounded-full">
          <LayoutDashboard className="h-12 w-12 text-primary" />
        </div>
        <h1 className="text-2xl font-bold font-headline">Customer Dashboard Coming Soon</h1>
        <p className="text-muted-foreground">Silakan kunjungi marketplace untuk belanja produk segar.</p>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="flex pt-20">
        <aside className="hidden lg:block w-72 h-[calc(100vh-80px)] fixed left-0 top-20 border-r bg-white/50 backdrop-blur-sm p-6 space-y-8 z-40">
          <div className="flex items-center gap-3 px-4 mb-8">
            <div className="relative h-10 w-10">
              <Image
                src="https://drive.google.com/uc?export=view&id=1iPX9w3Kum27Z858Vo-CV1mGQQPuvYv8a"
                alt="Farm Mart Logo"
                fill
                className="object-contain"
              />
            </div>
            <span className="text-xl font-bold font-headline tracking-tight text-primary">
              Farm <span className="text-secondary">Mart</span>
            </span>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest px-4">Menu Utama</p>
            <nav className="space-y-1">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveView(item.id)}
                  className={cn(
                    "flex items-center gap-3 w-full px-4 py-3 rounded-2xl transition-all duration-300 font-medium group",
                    activeView === item.id 
                      ? "bg-primary text-white shadow-lg shadow-primary/20 scale-[1.02]" 
                      : "text-muted-foreground hover:bg-primary/5 hover:text-primary"
                  )}
                >
                  <item.icon className={cn("h-5 w-5", activeView === item.id ? "text-white" : "group-hover:scale-110 transition-transform")} />
                  {item.label}
                  {activeView === item.id && <ChevronRight className="ml-auto h-4 w-4" />}
                </button>
              ))}
            </nav>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest px-4">Pengaturan</p>
            <nav className="space-y-1">
              <button 
                onClick={() => setActiveView("profile")}
                className={cn(
                  "flex items-center gap-3 w-full px-4 py-3 rounded-2xl transition-all duration-300 font-medium group",
                  activeView === "profile" 
                    ? "bg-primary text-white shadow-lg shadow-primary/20 scale-[1.02]" 
                    : "text-muted-foreground hover:bg-primary/5 hover:text-primary"
                )}
              >
                <Settings className="h-5 w-5" />
                Setting Profil
              </button>
              <button 
                onClick={() => setIsLogoutOpen(true)}
                className="flex items-center gap-3 w-full px-4 py-3 rounded-2xl text-destructive hover:bg-destructive/5 transition-all group font-medium"
              >
                <LogOut className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                Keluar
              </button>
            </nav>
          </div>
        </aside>

        <main className="flex-1 lg:ml-72 p-4 md:p-8 overflow-y-auto min-h-[calc(100vh-80px)]">
          {renderContent()}
        </main>
      </div>

      <AlertDialog open={isLogoutOpen} onOpenChange={setIsLogoutOpen}>
        <AlertDialogContent className="rounded-[2.5rem] border-none glassmorphism">
          <AlertDialogHeader>
            <div className="mx-auto bg-destructive/10 p-4 rounded-full w-fit mb-4">
              <AlertCircle className="h-8 w-8 text-destructive" />
            </div>
            <AlertDialogTitle className="text-center text-2xl font-black">Yakin ingin keluar?</AlertDialogTitle>
            <AlertDialogDescription className="text-center text-base">
              Anda akan keluar dari sesi ini dan kembali ke halaman utama Farm Mart.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-col sm:flex-row gap-3 sm:gap-2 mt-6">
            <AlertDialogCancel className="rounded-2xl h-12 flex-1 border-primary/20 hover:bg-primary/5 font-bold">Batal</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleLogout}
              className="rounded-2xl h-12 flex-1 bg-destructive hover:bg-destructive/90 text-white font-bold shadow-lg shadow-destructive/20"
            >
              Ya, Keluar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
