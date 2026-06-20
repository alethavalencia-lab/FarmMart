"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ClipboardList, Store, Calendar, ArrowRight, MessageCircle, Download } from "lucide-react";
import { cn } from "@/lib/utils";

const initialContracts = [
  { 
    id: "CTR-B2B-99", 
    title: "Supply Tomat Ceri Rutin", 
    supplier: "Kelompok Tani Lembang", 
    duration: "6 Bulan", 
    volume: "300 Kg/Minggu", 
    price: "Rp 22.000/Kg", 
    status: "Aktif",
    progress: 45,
    nextDelivery: "25 Juni 2026"
  },
  { 
    id: "CTR-B2B-85", 
    title: "Pengadaan Beras Premium", 
    supplier: "Arif Hidayat Farm", 
    duration: "12 Bulan", 
    volume: "2 Ton/Bulan", 
    price: "Rp 15.500/Kg", 
    status: "Aktif",
    progress: 20,
    nextDelivery: "01 Juli 2026"
  },
];

export function PartnerContracts() {
  const [contracts] = useState(initialContracts);

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <div>
        <h1 className="text-3xl font-black font-headline text-primary">Kontrak Pengadaan</h1>
        <p className="text-muted-foreground">Kelola perjanjian suplai jangka panjang untuk jaminan stok bisnis.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {contracts.map((contract) => (
          <Card key={contract.id} className="rounded-[3rem] border-none shadow-xl bg-white overflow-hidden p-8 flex flex-col gap-6 hover:shadow-2xl transition-all">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <Badge className="bg-primary/10 text-primary border-none font-black">{contract.id}</Badge>
                <h3 className="text-2xl font-black font-headline text-primary">{contract.title}</h3>
                <div className="flex items-center gap-2 text-sm font-bold text-muted-foreground">
                  <Store className="h-4 w-4 text-primary" /> {contract.supplier}
                </div>
              </div>
              <Badge className="bg-green-600 text-white border-none font-bold uppercase tracking-widest text-[10px] px-3 py-1">
                {contract.status}
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-4 border-y border-primary/5 py-6">
              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Volume Suplai</p>
                <p className="text-lg font-black text-primary">{contract.volume}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Harga Sepakat</p>
                <p className="text-lg font-black text-primary">{contract.price}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Durasi</p>
                <p className="text-sm font-bold">{contract.duration}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Kirim Berikutnya</p>
                <p className="text-sm font-bold text-secondary flex items-center gap-2">
                  <Calendar className="h-4 w-4" /> {contract.nextDelivery}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                <span>Progres Kontrak</span>
                <span>{contract.progress}% Selesai</span>
              </div>
              <Progress value={contract.progress} className="h-2" />
            </div>

            <div className="flex flex-wrap gap-2 pt-4">
              <Button className="flex-1 h-12 rounded-xl bg-primary text-white font-bold text-sm">Lihat Detail Kontrak</Button>
              <Button variant="outline" className="h-12 px-5 rounded-xl border-primary/20"><Download className="h-5 w-5" /></Button>
              <Button variant="outline" className="h-12 px-5 rounded-xl border-primary/20 text-primary"><MessageCircle className="h-5 w-5" /></Button>
            </div>
          </Card>
        ))}

        <button className="flex flex-col items-center justify-center gap-4 rounded-[3rem] border-2 border-dashed border-primary/20 hover:bg-primary/5 transition-all p-12 group h-full min-h-[400px]">
           <div className="p-6 bg-primary/10 rounded-full group-hover:scale-110 transition-transform">
             <ClipboardList className="h-12 w-12 text-primary" />
           </div>
           <p className="text-xl font-black text-primary">Ajukan Kontrak Suplai Baru</p>
           <p className="text-sm text-muted-foreground text-center max-w-xs">Jalin kerjasama jangka panjang dengan petani pilihan untuk stabilitas operasional.</p>
        </button>
      </div>
    </div>
  );
}
