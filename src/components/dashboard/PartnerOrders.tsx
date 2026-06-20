"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { 
  Package, 
  ChevronRight, 
  Search,
  Store,
  MessageCircle,
  Clock,
  Download,
  FileText
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface PartnerOrdersProps {
  orders: any[];
}

const b2bOrders = [
  { id: "INV-B2B-001", supplier: "Kelompok Tani Lembang", product: "Tomat Ceri", qty: "250 Kg", total: 5500000, status: "Diproses", date: "20 Mei 2024" },
  { id: "RFQ-B2B-005", supplier: "Ibu Siti Makmur", product: "Cabai Merah", qty: "300 Kg", total: 0, status: "Menunggu Penawaran", date: "21 Mei 2024" },
];

export function PartnerOrders({ orders: customOrders }: PartnerOrdersProps) {
  const [mounted, setMounted] = useState(false);
  const [filter, setFilter] = useState("Semua");

  useEffect(() => {
    setMounted(true);
  }, []);

  const formatPrice = (price: number) => {
    if (!mounted) return price.toString();
    return price.toLocaleString('id-ID');
  };

  const tabs = ["Semua", "Menunggu Penawaran", "Diproses", "Dikirim", "Selesai", "Kontrak"];

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-black font-headline text-primary">Pesanan & Pengadaan</h1>
          <p className="text-muted-foreground">Pantau status pengadaan bahan baku bisnis Anda.</p>
        </div>
        <div className="relative w-full md:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Cari invoice atau RFQ..." className="pl-11 rounded-2xl h-12 bg-white" />
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            className={cn(
              "px-6 py-2.5 rounded-full text-xs font-bold transition-all",
              filter === t ? "bg-primary text-white shadow-lg" : "bg-white text-muted-foreground border border-primary/5 hover:bg-primary/5"
            )}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="grid gap-6">
        {b2bOrders.map((order) => (
          <Card key={order.id} className="rounded-[2.5rem] border-none shadow-xl bg-white overflow-hidden hover:shadow-2xl transition-all">
            <CardHeader className="px-8 py-6 border-b border-primary/5 flex flex-row items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-primary/5 p-2 rounded-xl">
                   {order.id.startsWith('RFQ') ? <FileText className="h-5 w-5 text-secondary" /> : <Package className="h-5 w-5 text-primary" />}
                </div>
                <div>
                  <p className="text-sm font-black text-primary uppercase">{order.id}</p>
                  <p className="text-[10px] text-muted-foreground font-bold">{order.date}</p>
                </div>
              </div>
              <Badge className={cn(
                "px-4 py-1.5 rounded-full border-none font-black text-[10px] uppercase tracking-widest",
                order.status === "Menunggu Penawaran" ? "bg-orange-100 text-orange-700" : "bg-blue-100 text-blue-700"
              )}>
                {order.status}
              </Badge>
            </CardHeader>
            <CardContent className="p-8 flex flex-col sm:flex-row justify-between items-center gap-8">
              <div className="flex-1 flex gap-6 items-center">
                 <div className="h-16 w-16 bg-gray-50 rounded-2xl flex items-center justify-center border shrink-0">
                    <Store className="h-8 w-8 text-muted-foreground/30" />
                 </div>
                 <div>
                    <h4 className="font-bold text-lg text-primary">{order.product}</h4>
                    <p className="text-xs text-muted-foreground flex items-center gap-1"><Store className="h-3 w-3" /> Supplier: {order.supplier}</p>
                    <p className="text-sm font-bold mt-1">Jumlah: {order.qty}</p>
                 </div>
              </div>
              <div className="text-center sm:text-right">
                 <p className="text-[10px] font-black text-muted-foreground uppercase mb-1">Total Nilai</p>
                 <p className="text-2xl font-black text-primary">{order.total > 0 ? `Rp ${formatPrice(order.total)}` : "Nego"}</p>
              </div>
              <div className="flex gap-2">
                 <Button variant="outline" className="rounded-xl border-primary/10 h-12"><Download className="h-5 w-5" /></Button>
                 <Button variant="outline" className="rounded-xl border-primary/10 h-12 text-primary font-bold">Detail</Button>
                 <Button className="rounded-xl bg-primary text-white h-12 px-6 font-bold flex items-center gap-2">
                    <MessageCircle className="h-4 w-4" /> Hubungi
                 </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
