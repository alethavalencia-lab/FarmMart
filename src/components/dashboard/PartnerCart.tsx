"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { 
  Trash2, 
  Minus, 
  Plus, 
  ShoppingCart, 
  ChevronRight, 
  ArrowLeft,
  Store,
  Calendar,
  Clock
} from "lucide-react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface PartnerCartProps {
  items: any[];
  updateQty: (id: number, delta: number) => void;
  remove: (id: number) => void;
  checkout: (items: any[]) => void;
}

export function PartnerCart({ items, updateQty, remove, checkout }: PartnerCartProps) {
  const [mounted, setMounted] = useState(false);
  const [deliveryDate, setDeliveryDate] = useState("2026-06-25");

  useEffect(() => {
    setMounted(true);
  }, []);

  const formatPrice = (price: number) => {
    if (!mounted) return price.toString();
    return price.toLocaleString('id-ID');
  };

  const totalPrice = items.reduce((acc, item) => acc + ((item.wholesalePrice || item.price) * item.qty), 0);
  const totalQty = items.reduce((acc, item) => acc + item.qty, 0);

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6 glassmorphism rounded-[3rem] p-12 animate-in fade-in duration-500">
        <div className="bg-primary/10 p-8 rounded-full">
          <ShoppingCart className="h-16 w-16 text-primary animate-bounce" />
        </div>
        <h1 className="text-3xl font-black font-headline text-primary">Keranjang Bisnis Kosong</h1>
        <p className="text-muted-foreground max-w-md mx-auto text-lg">
          Mulai belanja grosir atau buat permintaan penawaran untuk suplai operasional bisnis Anda.
        </p>
        <Button className="rounded-2xl h-14 px-10 bg-primary hover:bg-primary/90 text-white font-bold text-lg shadow-xl shadow-primary/20">
          Jelajahi Katalog B2B
        </Button>
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-3 gap-8 animate-in fade-in duration-500 pb-20">
      <div className="lg:col-span-2 space-y-8">
        <h1 className="text-3xl font-black font-headline text-primary">Keranjang Bisnis</h1>

        <div className="space-y-6">
          {items.map((item) => (
            <Card key={item.id} className="rounded-[2.5rem] border-none shadow-xl bg-white overflow-hidden group hover:shadow-2xl transition-all">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="relative h-32 w-32 rounded-3xl overflow-hidden shrink-0 shadow-md">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1 space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <Badge className="bg-secondary/10 text-secondary border-none font-black text-[10px] mb-2 uppercase tracking-widest">Grosir / B2B</Badge>
                        <h4 className="text-2xl font-bold text-primary leading-tight">{item.name}</h4>
                        <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground mt-1">
                          <Store className="h-4 w-4 text-primary" /> {item.farmer}
                        </div>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => remove(item.id)} 
                        className="rounded-full text-muted-foreground hover:text-destructive hover:bg-destructive/5"
                      >
                        <Trash2 className="h-5 w-5" />
                      </Button>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-primary/5">
                      <div>
                        <p className="text-[10px] text-muted-foreground font-black uppercase leading-none mb-1 tracking-widest">Harga Grosir</p>
                        <p className="text-2xl font-black text-primary">Rp {formatPrice(item.wholesalePrice || item.price)}</p>
                      </div>
                      <div className="flex items-center gap-6 bg-primary/5 p-1 rounded-2xl border border-primary/10">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => updateQty(item.id, -10)} 
                          className="h-10 w-10 rounded-xl bg-white shadow-sm hover:bg-primary hover:text-white transition-all"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="text-lg font-black w-16 text-center">{item.qty} Kg</span>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => updateQty(item.id, 10)} 
                          className="h-10 w-10 rounded-xl bg-white shadow-sm hover:bg-primary hover:text-white transition-all"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="lg:col-span-1 space-y-6">
        <Card className="rounded-[3rem] border-none shadow-2xl bg-white sticky top-24 p-8 space-y-8 overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
          <CardTitle className="text-2xl font-black font-headline text-primary">Logistik & Pembayaran</CardTitle>
          
          <div className="space-y-4">
             <div className="space-y-2">
                <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground ml-1">Rencana Tiba</Label>
                <div className="relative">
                   <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-primary" />
                   <Input type="date" value={deliveryDate} onChange={(e) => setDeliveryDate(e.target.value)} className="pl-12 h-14 rounded-2xl border-primary/10 bg-primary/5 font-bold" />
                </div>
             </div>
             <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10 flex items-center gap-3">
                <Clock className="h-5 w-5 text-primary" />
                <p className="text-xs font-bold text-primary">Pengiriman sebelum jam 08:00 AM</p>
             </div>
          </div>

          <Separator className="bg-primary/5" />

          <div className="space-y-4">
            <div className="flex justify-between text-sm font-bold">
              <span className="text-muted-foreground">Total Item</span>
              <span className="text-primary">{items.length} Produk</span>
            </div>
            <div className="flex justify-between text-sm font-bold">
              <span className="text-muted-foreground">Volume Pengadaan</span>
              <span className="text-primary">{totalQty} Kg</span>
            </div>
            <div className="flex justify-between items-end pt-2">
              <div>
                <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Estimasi Total</p>
                <p className="text-3xl font-black text-primary">Rp {formatPrice(totalPrice)}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-4">
            <Button 
              onClick={() => checkout(items)} 
              className="w-full h-16 rounded-[2rem] bg-primary hover:bg-primary/90 text-white font-black text-xl shadow-xl shadow-primary/20 transition-all active:scale-95"
            >
              Checkout Bisnis <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="ghost" className="w-full text-sm font-bold text-muted-foreground flex items-center justify-center gap-2">
              <ArrowLeft className="h-4 w-4" /> Lanjut Belanja
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
