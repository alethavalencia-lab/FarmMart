"use client";

import { useState, useEffect, Suspense, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Navbar } from "@/components/layout/Navbar";
import { FarmerDashboard } from "@/components/dashboard/FarmerDashboard";
import { InvestorDashboard } from "@/components/dashboard/InvestorDashboard";
import { CustomerMarketplace } from "@/components/dashboard/CustomerMarketplace";
import { CustomerNotifications } from "@/components/dashboard/CustomerNotifications";
import { CustomerChat } from "@/components/dashboard/CustomerChat";
import { CustomerCart } from "@/components/dashboard/CustomerCart";
import { CustomerOrders } from "@/components/dashboard/CustomerOrders";
import { CustomerFavorites } from "@/components/dashboard/CustomerFavorites";
import { CustomerCheckout } from "@/components/dashboard/CustomerCheckout";
import { CustomerProfile } from "@/components/dashboard/CustomerProfile";
import { CustomerPayment } from "@/components/dashboard/CustomerPayment";
import { FarmerTransactions } from "@/components/dashboard/FarmerTransactions";
import { FarmerAnalytics } from "@/components/dashboard/FarmerAnalytics";
import { FarmerCommunity } from "@/components/dashboard/FarmerCommunity";
import { FarmerProfile } from "@/components/dashboard/FarmerProfile";
import { FarmerNotifications } from "@/components/dashboard/FarmerNotifications";
import { FarmerChat } from "@/components/dashboard/FarmerChat";

// Mitra Bisnis (Partner) Components
import { PartnerMarketplace } from "@/components/dashboard/PartnerMarketplace";
import { PartnerCart } from "@/components/dashboard/PartnerCart";
import { PartnerOrders } from "@/components/dashboard/PartnerOrders";
import { PartnerRFQ } from "@/components/dashboard/PartnerRFQ";
import { PartnerContracts } from "@/components/dashboard/PartnerContracts";
import { PartnerProfile } from "@/components/dashboard/PartnerProfile";
import { PartnerChat } from "@/components/dashboard/PartnerChat";
import { PartnerNotifications } from "@/components/dashboard/PartnerNotifications";

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
  Star,
  MessageCircle,
  FileText,
  ClipboardList
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
  const viewParam = searchParams.get("view");
  
  const [activeView, setActiveView] = useState(viewParam || (role === "customer" || role === "partner" ? "marketplace" : "dashboard"));
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);

  // --- Consumer/Partner Local State ---
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [favoriteItems, setFavoriteItems] = useState<number[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [checkoutData, setCheckoutData] = useState<any>(null);

  // Sync state with search params
  useEffect(() => {
    if (viewParam) {
      setActiveView(viewParam);
    }
  }, [viewParam]);

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
      { id: "notifications", label: "Notifikasi", icon: Bell },
      { id: "chat", label: "Pesan", icon: MessageCircle },
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
      { id: "chat", label: "Chat", icon: MessageCircle },
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

  const partnerMenu = [
    { group: "B2B Procurement", items: [
      { id: "marketplace", label: "Pasar B2B", icon: LayoutDashboard },
      { id: "rfq", label: "Permintaan Penawaran", icon: FileText },
      { id: "contracts", label: "Kontrak Pengadaan", icon: ClipboardList },
      { id: "orders", label: "Pesanan B2B", icon: Package },
      { id: "cart", label: "Keranjang Bisnis", icon: ShoppingCart },
    ]},
    { group: "Communication", items: [
      { id: "chat", label: "Chat Petani", icon: MessageCircle },
      { id: "notifications", label: "Notifikasi", icon: Bell },
    ]},
    { group: "Business Settings", items: [
      { id: "profile", label: "Profil Bisnis", icon: Settings },
      { id: "address", label: "Titik Pengiriman", icon: MapPin },
      { id: "payment", label: "Metode Pembayaran", icon: CreditCard },
    ]}
  ];

  const currentMenu = role === "partner" ? partnerMenu : (role === "customer" ? customerMenu : farmerMenu);

  // --- Actions ---
  const addToCart = (product: any) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, qty: item.qty + (product.qty || 1) } : item);
      }
      return [...prev, { ...product, qty: product.qty || 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const updateCartQty = (productId: number, delta: number) => {
    setCartItems(prev => prev.map(item => 
      item.id === productId ? { ...item, qty: Math.max(1, item.qty + delta) } : item
    ));
  };

  const toggleFavorite = (productId: number) => {
    setFavoriteItems(prev => 
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  };

  const startCheckout = (items: any[]) => {
    setCheckoutData(items);
    setActiveView("checkout");
  };

  const completeCheckout = (newOrder: any) => {
    setOrders(prev => [newOrder, ...prev]);
    setCartItems(prev => prev.filter(item => !newOrder.items.find((oi: any) => oi.id === item.id)));
    setActiveView("orders");
  };

  const setView = (v: string) => {
    setActiveView(v);
    router.push(`/dashboard?role=${role}&view=${v}`, { scroll: false });
  }

  const renderContent = () => {
    if (role === "farmer") {
      switch (activeView) {
        case "dashboard": return <FarmerDashboard />;
        case "transactions": return <FarmerTransactions setView={setView} />;
        case "analytics": return <FarmerAnalytics />;
        case "community": return <FarmerCommunity />;
        case "profile": return <FarmerProfile />;
        case "notifications": return <FarmerNotifications />;
        case "chat": return <FarmerChat />;
        default: return <FarmerDashboard />;
      }
    }
    
    if (role === "investor") {
      return <InvestorDashboard />;
    }
    
    if (role === "customer") {
      switch (activeView) {
        case "marketplace": 
          return <CustomerMarketplace 
            addToCart={addToCart} 
            toggleFavorite={toggleFavorite} 
            favorites={favoriteItems}
            startCheckout={startCheckout}
            cartCount={cartItems.length}
            setView={setView}
          />;
        case "cart": 
          return <CustomerCart 
            items={cartItems} 
            updateQty={updateCartQty} 
            remove={removeFromCart} 
            checkout={startCheckout}
          />;
        case "checkout":
          return <CustomerCheckout 
            items={checkoutData} 
            complete={completeCheckout} 
            cancel={() => setActiveView("cart")}
          />;
        case "orders": 
        case "unpaid":
        case "packed":
        case "shipped":
        case "finished":
          return <CustomerOrders 
            orders={orders} 
            activeTab={activeView}
          />;
        case "favorites":
          return <CustomerFavorites 
            favorites={favoriteItems} 
            toggleFavorite={toggleFavorite}
            addToCart={addToCart}
          />;
        case "chat": return <CustomerChat />;
        case "notifications": return <CustomerNotifications />;
        case "profile": 
        case "address":
          return <CustomerProfile />;
        case "payment":
          return <CustomerPayment />;
        default: return <CustomerMarketplace 
            addToCart={addToCart} 
            toggleFavorite={toggleFavorite} 
            favorites={favoriteItems}
            startCheckout={startCheckout}
            cartCount={cartItems.length}
            setView={setView}
          />;
      }
    }

    if (role === "partner") {
      switch (activeView) {
        case "marketplace": 
          return <PartnerMarketplace 
            addToCart={addToCart} 
            cartCount={cartItems.length}
            setView={setView}
          />;
        case "cart": 
          return <PartnerCart 
            items={cartItems} 
            updateQty={updateCartQty} 
            remove={removeFromCart} 
            checkout={startCheckout}
          />;
        case "rfq": return <PartnerRFQ />;
        case "contracts": return <PartnerContracts />;
        case "orders": return <PartnerOrders orders={orders} />;
        case "profile": return <PartnerProfile />;
        case "chat": return <PartnerChat />;
        case "notifications": return <PartnerNotifications />;
        case "payment": return <CustomerPayment />;
        case "address": return <PartnerProfile />; // Same profile view with address edit
        default: return <PartnerMarketplace 
            addToCart={addToCart} 
            cartCount={cartItems.length}
            setView={setView}
          />;
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
      <Navbar cartCount={cartItems.length} />
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
                      onClick={() => setView(item.id)}
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
