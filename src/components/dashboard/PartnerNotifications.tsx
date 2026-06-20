"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell, FileText, TrendingUp, ClipboardList, Package, Clock, Store } from "lucide-react";
import { cn } from "@/lib/utils";

const b2bNotifications = [
  { id: 1, title: "Penawaran Baru Diterima", desc: "Supplier 'Kelompok Tani Lembang' telah mengirimkan penawaran untuk RFQ-2026-001.", type: "rfq", time: "10 menit lalu", color: "bg-blue-100 text-blue-700", icon: FileText },
  { id: 2, title: "Update Harga Grosir", desc: "Harga Tomat Ceri turun 15% untuk pembelian minimal 500Kg.", type: "price", time: "2 jam lalu", color: "bg-green-100 text-green-700", icon: TrendingUp },
  { id: 3, title: "Kontrak Segera Berakhir", desc: "Kontrak suplai Beras Premium Anda akan berakhir dalam 7 hari.", type: "contract", time: "Kemarin", color: "bg-orange-100 text-orange-700", icon: ClipboardList },
  { id: 4, title: "Order Sedang Dikirim", desc: "Pengiriman 500 Kg Cabai Merah telah berangkat dari gudang supplier.", type: "shipping", time: "Kemarin", color: "bg-purple-100 text-purple-700", icon: Package },
];

export function PartnerNotifications() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-4xl mx-auto pb-20">
      <h1 className="text-3xl font-black font-headline text-primary">Notifikasi Bisnis</h1>
      <div className="space-y-4">
        {b2bNotifications.map((n) => (
          <Card key={n.id} className="rounded-[2.5rem] border-none shadow-sm hover:shadow-xl transition-all cursor-pointer bg-white group overflow-hidden">
            <CardContent className="p-8 flex items-center gap-8">
              <div className={cn("h-16 w-16 rounded-2xl flex items-center justify-center shrink-0", n.color)}>
                <n.icon className="h-8 w-8" />
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex justify-between items-start">
                   <h3 className="font-bold text-xl text-primary group-hover:text-secondary transition-colors">{n.title}</h3>
                   <span className="text-[10px] font-black text-muted-foreground uppercase flex items-center gap-1"><Clock className="h-3 w-3" /> {n.time}</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed font-medium">{n.desc}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
