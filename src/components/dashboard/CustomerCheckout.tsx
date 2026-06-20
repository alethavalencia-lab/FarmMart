
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { 
  MapPin, 
  CreditCard, 
  Truck, 
  ChevronRight, 
  ShieldCheck, 
  ArrowLeft,
  Clock,
  Info
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface CustomerCheckoutProps {
  items: any[];
  complete: (order: any) => void;
  cancel: () => void;
}

export function CustomerCheckout({ items, complete, cancel }: CustomerCheckoutProps) {
  const { toast } = useToast();
  const [mounted, setMounted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const formatPrice = (price: number) => {
    if (!mounted) return price.toString();
    return price.toLocaleString('id-ID');
  };

  const subtotal = items.reduce((acc, i) => acc + (i.price * i.qty), 0);
  const shippingFee = 15000;
  const total = subtotal + shippingFee;

  const handleCreateOrder = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const newOrder = {
        id: `ORD-${Math.floor(Math.random() * 90000) + 10000}`,
        items: items,
        total: total,
        status: "Dikemas",
        date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
        time: "14:30"
      };
      complete(newOrder);
      toast({
        title: "Pesanan Berhasil Dibuat!",
        description: `Nomor pesanan Anda: ${newOrder.id}. Segera lakukan pembayaran.`,
      });
      setIsProcessing(false);
    }, 1500);
  };

  return (
    <div className="grid lg:grid-cols-3 gap-8 animate-in fade-in duration-500 pb-20 max-w-7xl mx-auto">
      <div className="lg:col-span-2 space-y-8">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={cancel} className="rounded-full h-10 w-10 p-0"><ArrowLeft className="h-6 w-6" /></Button>
          <h1 className="text-3xl font-black font-headline text-primary">Checkout</h1>
        </div>

        {/* Alamat Pengiriman */}
        <Card className="rounded-[3rem] border-none shadow-xl bg-white p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
              <MapPin className="h-5 w-5" />
            </div>
            <h3 className="text-xl font-black font-headline">Alamat Pengiriman</h3>
          </div>
          <div className="p-6 bg-primary/5 rounded-[2rem] border border-primary/10 relative">
            <Badge className="absolute top-4 right-6 bg-primary/20 text-primary border-none font-bold">Utama</Badge>
            <h4 className="font-bold text-lg mb-1">Rumah (Andi Saputra)</h4>
            <p className="text-sm text-muted-foreground mb-1">+62 812-3456-7890</p>
            <p className="text-sm text-muted-foreground">Jl. Raya Lembang No. 123, Desa Mekarwangi, Kec. Lembang, Kab. Bandung Barat, Jawa Barat, 40391</p>
            <Button variant="link" className="text-primary p-0 h-auto font-bold mt-4">Ubah Alamat <ChevronRight className="h-4 w-4" /></Button>
          </div>
        </Card>

        {/* Produk Dipesan */}
        <Card className="rounded-[3rem] border-none shadow-xl bg-white p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary">
              <Info className="h-5 w-5" />
            </div>
            <h3 className="text-xl font-black font-headline">Produk Dipesan</h3>
          </div>
          <div className="space-y-6">
            {items.map((item) => (
              <div key={item.id} className="flex gap-6 items-center">
                <div className="relative h-20 w-20 rounded-2xl overflow-hidden shrink-0 border shadow-sm">
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-primary">{item.name}</h4>
                  <p className="text-xs text-muted-foreground">Petani: {item.farmer}</p>
                  <p className="text-sm font-bold">{item.qty} Kg x Rp {formatPrice(item.price)}</p>
                </div>
                <p className="text-lg font-black text-primary">Rp {formatPrice(item.price * item.qty)}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Pengiriman & Pembayaran */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="rounded-[3rem] border-none shadow-xl bg-white p-8 space-y-4">
             <div className="flex items-center gap-3 mb-2">
                <Truck className="h-5 w-5 text-blue-500" />
                <h3 className="font-bold">Kurir Pengiriman</h3>
             </div>
             <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100">
                <div className="flex justify-between items-center mb-1">
                   <p className="text-sm font-bold">Kurir Tani Express</p>
                   <p className="text-sm font-black">Rp 15.000</p>
                </div>
                <p className="text-xs text-muted-foreground">Estimasi tiba: Besok (24 jam)</p>
             </div>
          </Card>
          <Card className="rounded-[3rem] border-none shadow-xl bg-white p-8 space-y-4">
             <div className="flex items-center gap-3 mb-2">
                <CreditCard className="h-5 w-5 text-orange-500" />
                <h3 className="font-bold">Metode Pembayaran</h3>
             </div>
             <div className="p-4 bg-orange-50 rounded-2xl border border-orange-100 flex items-center justify-between">
                <p className="text-sm font-bold">Farm Mart Wallet</p>
                <ChevronRight className="h-4 w-4 text-orange-500" />
             </div>
          </Card>
        </div>
      </div>

      <div className="lg:col-span-1">
        <Card className="rounded-[3rem] border-none shadow-2xl bg-white sticky top-24 p-8 space-y-8">
          <CardTitle className="text-2xl font-black font-headline text-primary">Ringkasan Bayar</CardTitle>
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal Produk</span>
              <span className="font-bold">Rp {formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Biaya Pengiriman</span>
              <span className="font-bold">Rp {formatPrice(shippingFee)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Asuransi Tani</span>
              <span className="font-bold">Rp 1.000</span>
            </div>
            <Separator className="bg-primary/5" />
            <div className="flex justify-between items-end">
              <div>
                <p className="text-xs font-black uppercase text-muted-foreground tracking-widest">Total Tagihan</p>
                <p className="text-3xl font-black text-primary">Rp {formatPrice(total + 1000)}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-4">
            <div className="flex items-center gap-2 p-3 bg-green-50 rounded-xl text-green-700">
               <ShieldCheck className="h-4 w-4" />
               <p className="text-[10px] font-bold">Pembayaran aman & terjamin oleh Farm Mart</p>
            </div>
            <Button 
              onClick={handleCreateOrder}
              disabled={isProcessing}
              className="w-full h-16 rounded-[2rem] bg-primary hover:bg-primary/90 text-white font-black text-xl shadow-xl shadow-primary/20 transition-all"
            >
              {isProcessing ? "Memproses..." : "Buat Pesanan"}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
