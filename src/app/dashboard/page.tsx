
"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Navbar } from "@/components/layout/Navbar";
import { FarmerDashboard } from "@/components/dashboard/FarmerDashboard";
import { InvestorDashboard } from "@/components/dashboard/InvestorDashboard";
import { CustomerMarketplace } from "@/components/dashboard/CustomerMarketplace";
import { CustomerNotifications } from "@/components/dashboard/CustomerNotifications";
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
  AlertCircle,
  Heart,
  Package,
  Bell,
  MapPin,
  CreditCard,
  Star
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

function DashboardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const role = searchParams.get("role") || "farmer";
  const [activeView, setActiveView] = useState("dashboard");
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);

  // Sync role-based view if needed
  useEffect(() => {
    if (role === "customer") {
      setActiveView("marketplace");
    } else {
      setActiveView("dashboard");
    }
  }, [role]);

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    router.push("/");
  };

  const farmerMenu = [
    { group: "Menu Utama", items: [
      { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
      { id: "transactions", label: "Transaksi", icon: ShoppingCart },
      { id: "analytics", label: "Analitik", icon: BarChart3 },
      { id: "community", label: "Komunitas", icon: Users },
    ]},
    { group: "Pengaturan", items: [
      { id: "profile", label: "Setting Profil", icon: Settings },
    ]}
  ];

  const customerMenu = [
    { group: "Menu Utama", items: [
      { id: "marketplace", label: "Marketplace", icon: LayoutDashboard },
      { id: "orders", label: "Pesanan Saya", icon: Package },
      { id: "favorites", label: "Produk Favorit", icon: Heart },
      { id: "cart", label: "Keranjang", icon: ShoppingCart },
      { id: "notifications", label: "Notifikasi", icon: Bell },
    ]},
    { group: "Aktivitas Pesanan", items: [
      { id: "unpaid", label: "Belum Dibayar", icon: CreditCard },
      { id: "packed", label: "Dikemas", icon: Package },
      { id: "shipped", label: "Dikirim", icon: Package },
      { id: "finished", label: "Selesai", icon: Star },
    ]},
    { group: "Pengaturan", items: [
      { id: "profile", label: "Profil Saya", icon: Settings },
      { id: "address", label: "Alamat Pengiriman", icon: MapPin },
      { id: "payment", label: "Metode Pembayaran", icon: CreditCard },
    ]}
  ];

  const currentMenu = role === "customer" ? customerMenu : farmerMenu;

  const renderContent = () => {
    if (role === "farmer") {
      switch (activeView) {
        case "dashboard": return <FarmerDashboard />;
        case "transactions": return <FarmerTransactions />;
        case "analytics": return <FarmerAnalytics />;
        case "community": return <FarmerCommunity />;
        case "profile": return <FarmerProfile />;
        default: return <FarmerDashboard />;
      }
    }
    
    if (role === "investor") {
      return <InvestorDashboard />;
    }
    
    if (role === "customer") {
      switch (activeView) {
        case "marketplace": return <CustomerMarketplace />;
        case "notifications": return <CustomerNotifications />;
        case "profile": return <FarmerProfile />; // Reusing profile for now
        case "orders": 
        case "unpaid":
        case "packed":
        case "shipped":
        case "finished":
          return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4 glassmorphism rounded-[3rem] p-12 animate-in fade-in duration-500">
              <Package className="h-16 w-16 text-primary animate-bounce" />
              <h1 className="text-3xl font-black font-headline text-primary">Riwayat Pesanan</h1>
              <p className="text-muted-foreground max-w-md">Data pesanan Anda sedang dimuat. Halaman ini akan menampilkan status transaksi {activeView} Anda.</p>
            </div>
          );
        case "favorites":
          return (
             <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4 glassmorphism rounded-[3rem] p-12 animate-in fade-in duration-500">
              <Heart className="h-16 w-16 text-destructive animate-pulse" />
              <h1 className="text-3xl font-black font-headline text-primary">Produk Favorit</h1>
              <p className="text-muted-foreground max-w-md">Belum ada produk favorit. Mulai jelajahi marketplace dan simpan produk yang Anda sukai.</p>
            </div>
          );
        case "cart":
          return (
             <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4 glassmorphism rounded-[3rem] p-12 animate-in fade-in duration-500">
              <ShoppingCart className="h-16 w-16 text-secondary" />
              <h1 className="text-3xl font-black font-headline text-primary">Keranjang Belanja</h1>
              <p className="text-muted-foreground max-w-md">Keranjang Anda masih kosong. Yuk, masukkan produk segar dari petani ke keranjang!</p>
            </div>
          );
        default: return <CustomerMarketplace />;
      }
    }

    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4">
        <div className="bg-primary/10 p-8 rounded-full">
          <LayoutDashboard className="h-12 w-12 text-primary" />
        </div>
        <h1 className="text-2xl font-bold font-headline">Dashboard Coming Soon</h1>
        <p className="text-muted-foreground">Fitur untuk peran {role} sedang dalam pengembangan.</p>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="flex pt-20">
        <aside className="hidden lg:block w-72 h-[calc(100vh-80px)] fixed left-0 top-20 border-r bg-white/50 backdrop-blur-sm p-6 space-y-8 z-40 overflow-y-auto">
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

          <div className="space-y-6">
            {currentMenu.map((group, idx) => (
              <div key={idx} className="space-y-2">
                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest px-4">{group.group}</p>
                <nav className="space-y-1">
                  {group.items.map((item) => (
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
                      <item.icon className={cn("h-4 w-4", activeView === item.id ? "text-white" : "group-hover:scale-110 transition-transform")} />
                      <span className="text-sm font-bold">{item.label}</span>
                      {activeView === item.id && <ChevronRight className="ml-auto h-4 w-4" />}
                    </button>
                  ))}
                </nav>
              </div>
            ))}
            
            <div className="pt-4 border-t border-primary/5">
              <button 
                onClick={() => setIsLogoutOpen(true)}
                className="flex items-center gap-3 w-full px-4 py-3 rounded-2xl text-destructive hover:bg-destructive/5 transition-all group font-bold text-sm"
              >
                <LogOut className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                Keluar Akun
              </button>
            </div>
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

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center">Loading...</div>}>
      <DashboardContent />
    </Suspense>
  );
}
