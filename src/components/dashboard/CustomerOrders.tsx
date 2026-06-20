
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { 
  Package, 
  Truck, 
  Clock, 
  CheckCircle2, 
  ChevronRight, 
  Search,
  Store,
  MessageCircle,
  Star,
  CreditCard
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface CustomerOrdersProps {
  orders: any[];
  activeTab: string;
}

export function CustomerOrders({ orders, activeTab }: CustomerOrdersProps) {
  const [mounted, setMounted] = useState(false);
  const [currentFilter, setCurrentFilter] = useState(activeTab === "orders" ? "Semua" : activeTab);

  useEffect(() => {
    setMounted(true);
    if (activeTab && activeTab !== "orders") {
        setCurrentFilter(activeTab);
    }
  }, [activeTab]);

  const formatPrice = (price: number) => {
    if (!mounted) return price.toString();
    return price.toLocaleString('id-ID');
  };

  const getStatusColor = (status: string) => {
    const s = status.toLowerCase();
    if (s.includes("unpaid") || s.includes("dibayar")) return "bg-orange-100 text-orange-600";
    if (s.includes("dikemas") || s.includes("packed")) return "bg-blue-100 text-blue-600";
    if (s.includes("dikirim") || s.includes("shipped")) return "bg-purple-100 text-purple-600";
    if (s.includes("selesai") || s.includes("finished")) return "bg-primary/10 text-primary";
    return "bg-gray-100 text-gray-600";
  };

  // Status mapping for filter labels
  const tabs = [
    { id: "Semua", label: "Semua" },
    { id: "unpaid", label: "Belum Dibayar" },
    { id: "packed", label: "Dikemas" },
    { id: "shipped", label: "Dikirim" },
    { id: "finished", label: "Selesai" }
  ];

  // Enhanced mock data with specific provided image URLs
  const initialMockOrders = [
    {
      id: "ORD-9912",
      date: "20 Mei 2024",
      status: "Dikemas",
      total: 125000,
      items: [{ id: 1, name: "Cabai Merah Premium", qty: 2, price: 32000, farmer: "Pak Maman", image: "https://res.cloudinary.com/dhp46iviu/image/upload/v1781924019/OIP_4_xwysrb.webp" }]
    },
    {
      id: "ORD-9920",
      date: "21 Mei 2024",
      status: "Belum Dibayar",
      total: 45000,
      items: [{ id: 2, name: "Tomat Organik", qty: 3, price: 18500, farmer: "Ibu Siti", image: "https://res.cloudinary.com/dhp46iviu/image/upload/v1781924354/fresh-tomato-1000x1000_dej5yi.jpg" }]
    },
    {
      id: "ORD-9915",
      date: "19 Mei 2024",
      status: "Dikirim",
      total: 85000,
      items: [{ id: 3, name: "Beras Premium Cianjur", qty: 5, price: 16500, farmer: "Pak Arif", image: "https://res.cloudinary.com/dhp46iviu/image/upload/v1781923565/ir-64-parboiled-rice-5-broken-1000x1000_gibiwb.jpg" }]
    },
    {
      id: "ORD-9899",
      date: "18 Mei 2024",
      status: "Selesai",
      total: 24000,
      items: [{ id: 9, name: "Jahe Merah Super", qty: 1, price: 28000, farmer: "Pak Maman", image: "https://res.cloudinary.com/dhp46iviu/image/upload/v1781927234/OIP_8_giltky.webp" }]
    }
  ];

  const allOrders = [...orders, ...initialMockOrders];

  const filteredOrders = allOrders.filter(order => {
    if (currentFilter === "Semua") return true;
    
    const statusMap: Record<string, string> = {
      unpaid: "Belum Dibayar",
      packed: "Dikemas",
      shipped: "Dikirim",
      finished: "Selesai"
    };

    const targetStatus = statusMap[currentFilter] || currentFilter;
    return order.status === targetStatus || order.status.toLowerCase() === currentFilter.toLowerCase();
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-black font-headline text-primary">Pesanan Saya</h1>
          <p className="text-muted-foreground">Pantau status pengiriman hasil tani pesanan Anda.</p>
        </div>
        <div className="relative w-full md:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Cari nomor pesanan..." className="pl-11 rounded-2xl h-12 bg-white shadow-sm border-primary/10" />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 pb-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setCurrentFilter(tab.id)}
            className={cn(
              "px-6 py-2.5 rounded-full text-xs font-bold transition-all",
              currentFilter === tab.id
                ? "bg-primary text-white shadow-lg shadow-primary/20"
                : "bg-white text-muted-foreground hover:bg-primary/5 hover:text-primary border border-primary/5"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="space-y-6">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <Card key={order.id} className="rounded-[2.5rem] border-none shadow-xl bg-white overflow-hidden group hover:shadow-2xl transition-all">
              <CardHeader className="px-8 py-6 border-b border-primary/5 flex flex-row items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="bg-primary/5 p-2 rounded-xl">
                    <Package className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-black text-primary uppercase">{order.id}</p>
                    <p className="text-[10px] text-muted-foreground font-bold">{order.date}</p>
                  </div>
                </div>
                <Badge className={cn("px-4 py-1.5 rounded-full border-none font-bold text-xs", getStatusColor(order.status))}>
                  {order.status}
                </Badge>
              </CardHeader>
              <CardContent className="p-8 space-y-6">
                {order.items.map((item: any) => (
                  <div key={item.id} className="flex gap-6 items-center">
                    <div className="relative h-20 w-20 rounded-2xl overflow-hidden shrink-0 shadow-sm border">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-1.5 text-[10px] font-black text-secondary uppercase tracking-widest mb-1">
                        <Store className="h-3 w-3" /> {item.farmer}
                      </div>
                      <h4 className="font-bold text-lg text-primary leading-tight">{item.name}</h4>
                      <p className="text-xs text-muted-foreground">{item.qty} Kg x Rp {formatPrice(item.price)}</p>
                    </div>
                    <div className="text-right">
                       <p className="text-xs text-muted-foreground font-bold uppercase mb-1">Total</p>
                       <p className="text-xl font-black text-primary">Rp {formatPrice(item.price * item.qty)}</p>
                    </div>
                  </div>
                ))}
                
                <Separator className="bg-primary/5" />
                
                <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
                  <div className="flex gap-3">
                     <Button variant="outline" className="rounded-xl h-10 px-4 font-bold text-xs border-primary/20 text-primary">Detail Pesanan</Button>
                     <Button variant="ghost" className="rounded-xl h-10 px-4 font-bold text-xs text-muted-foreground flex items-center gap-2">
                       <MessageCircle className="h-4 w-4" /> Chat Petani
                     </Button>
                  </div>
                  {order.status === "Selesai" ? (
                    <Button className="rounded-xl h-12 px-8 bg-primary hover:bg-primary/90 text-white font-black text-sm shadow-lg shadow-primary/20 flex items-center gap-2">
                      <Star className="h-4 w-4 fill-white" /> Beri Penilaian
                    </Button>
                  ) : order.status === "Belum Dibayar" ? (
                    <Button className="rounded-xl h-12 px-8 bg-secondary hover:bg-secondary/90 text-white font-black text-sm shadow-lg shadow-secondary/20 flex items-center gap-2">
                      <CreditCard className="h-4 w-4" /> Bayar Sekarang
                    </Button>
                  ) : (
                    <Button variant="outline" className="rounded-xl h-12 px-8 border-secondary text-secondary font-black text-sm hover:bg-secondary/5">
                      Lacak Pengiriman <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center glassmorphism rounded-[3rem] p-12">
            <Package className="h-16 w-16 text-muted-foreground/30 mb-6" />
            <h3 className="text-2xl font-black text-primary mb-2">Belum ada pesanan</h3>
            <p className="text-muted-foreground">Yuk, mulai belanja hasil tani segar di Marketplace!</p>
          </div>
        )}
      </div>
    </div>
  );
}
