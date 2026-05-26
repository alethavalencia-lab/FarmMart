
"use client";

import { useSearchParams } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { FarmerDashboard } from "@/components/dashboard/FarmerDashboard";
import { InvestorDashboard } from "@/components/dashboard/InvestorDashboard";
import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { Sprout, ShoppingCart, BarChart3, Users, Settings, LogOut, LayoutDashboard } from "lucide-react";
import { cn } from "@/lib/utils";

export default function DashboardPage() {
  const searchParams = useSearchParams();
  const role = searchParams.get("role") || "customer";

  const getDashboardView = () => {
    switch (role) {
      case "farmer": return <FarmerDashboard />;
      case "investor": return <InvestorDashboard />;
      default: return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4">
          <div className="bg-primary/10 p-8 rounded-full">
            <LayoutDashboard className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-2xl font-bold font-headline">Customer Dashboard Coming Soon</h1>
          <p className="text-muted-foreground">Silakan kunjungi marketplace untuk belanja produk segar.</p>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="flex pt-20">
        <aside className="hidden lg:block w-72 h-[calc(100vh-80px)] fixed left-0 top-20 border-r bg-white/50 backdrop-blur-sm p-6 space-y-8">
          <div className="space-y-2">
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest px-4">Menu Utama</p>
            <nav className="space-y-1">
              {[
                { label: "Dashboard", icon: LayoutDashboard, active: true },
                { label: "Transaksi", icon: ShoppingCart },
                { label: "Analitik", icon: BarChart3 },
                { label: "Komunitas", icon: Users },
              ].map((item, i) => (
                <button
                  key={i}
                  className={cn(
                    "flex items-center gap-3 w-full px-4 py-3 rounded-2xl transition-all duration-300 font-medium",
                    item.active ? "bg-primary text-white shadow-lg shadow-primary/20 scale-[1.02]" : "text-muted-foreground hover:bg-primary/5 hover:text-primary"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest px-4">Pengaturan</p>
            <nav className="space-y-1">
              <button className="flex items-center gap-3 w-full px-4 py-3 rounded-2xl text-muted-foreground hover:bg-primary/5 hover:text-primary transition-all">
                <Settings className="h-5 w-5" />
                Setting Profil
              </button>
              <button className="flex items-center gap-3 w-full px-4 py-3 rounded-2xl text-destructive hover:bg-destructive/5 transition-all">
                <LogOut className="h-5 w-5" />
                Keluar
              </button>
            </nav>
          </div>
        </aside>

        <main className="flex-1 lg:ml-72 p-8 overflow-y-auto">
          {getDashboardView()}
        </main>
      </div>
    </div>
  );
}
