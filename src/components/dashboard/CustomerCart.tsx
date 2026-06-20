
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
  CheckCircle2
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";

interface CustomerCartProps {
  items: any[];
  updateQty: (id: number, delta: number) => void;
  remove: (id: number) => void;
  checkout: (items: any[]) => void;
}

export function CustomerCart({ items, updateQty, remove, checkout }: CustomerCartProps) {
  const [selectedIds, setSelectedIds] = useState<number[]>(items.map(i => i.id));
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const formatPrice = (price: number) => {
    if (!mounted) return price.toString();
    return price.toLocaleString('id-ID');
  };

  const selectedItems = items.filter(i => selectedIds.includes(i.id));
  const totalPrice = selectedItems.reduce((acc, item) => acc + (item.price * item.qty), 0);

  const toggleSelect = (id: number) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === items.length) setSelectedIds([]);
    else setSelectedIds(items.map(i => i.id));
  };

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6 glassmorphism rounded-[3rem] p-12 animate-in fade-in duration-500">
        <div className="bg-primary/10 p-8 rounded-full">
          <ShoppingCart className="h-16 w-16 text-primary animate-bounce" />
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-black font-headline text-primary">Keranjang Kosong</h1>
          <p className="text-muted-foreground max-w-md mx-auto text-lg">
            Belum ada produk segar di keranjang Anda. Yuk, mulai jelajahi marketplace Farm Mart!
          </p>
        </div>
        <Button className="rounded-2xl h-14 px-10 bg-primary hover:bg-primary/90 text-white font-bold text-lg shadow-xl shadow-primary/20">
          Mulai Belanja Sekarang
        </Button>
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-3 gap-8 animate-in fade-in duration-500 pb-20">
      <div className="lg:col-span-2 space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-black font-headline text-primary">Keranjang Belanja</h1>
          <Button variant="ghost" onClick={toggleSelectAll} className="text-sm font-bold text-secondary">
            {selectedIds.length === items.length ? "Batal Pilih Semua" : "Pilih Semua"}
          </Button>
        </div>

        <div className="space-y-6">
          {items.map((item) => (
            <Card key={item.id} className="rounded-[2.5rem] border-none shadow-xl bg-white overflow-hidden group hover:shadow-2xl transition-all">
              <CardContent className="p-6">
                <div className="flex items-start gap-6">
                  <div className="pt-8">
                    <Checkbox 
                      checked={selectedIds.includes(item.id)} 
                      onCheckedChange={() => toggleSelect(item.id)}
                      className="h-6 w-6 rounded-lg"
                    />
                  </div>
                  <div className="relative h-28 w-28 rounded-3xl overflow-hidden shrink-0 shadow-md">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1 space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2 text-[10px] font-black text-secondary uppercase tracking-widest mb-1">
                          <Store className="h-3 w-3" /> {item.farmer}
                        </div>
                        <h4 className="text-xl font-bold text-primary leading-tight">{item.name}</h4>
                        <p className="text-xs text-muted-foreground font-medium">Stok: {item.stock}</p>
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

                    <div className="flex items-center justify-between pt-2">
                      <p className="text-xl font-black text-primary">Rp {formatPrice(item.price)} <span className="text-xs text-muted-foreground font-bold">/Kg</span></p>
                      <div className="flex items-center gap-4 bg-primary/5 p-1 rounded-2xl border border-primary/10">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => updateQty(item.id, -1)}
                          className="h-10 w-10 rounded-xl bg-white shadow-sm hover:bg-primary hover:text-white transition-all"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="text-base font-black w-8 text-center">{item.qty}</span>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => updateQty(item.id, 1)}
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

      <div className="lg:col-span-1">
        <Card className="rounded-[3rem] border-none shadow-2xl bg-white sticky top-24 p-8 space-y-8 overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
          <CardTitle className="text-2xl font-black font-headline text-primary">Ringkasan Pesanan</CardTitle>
          
          <div className="space-y-4">
            <div className="flex justify-between text-sm font-medium">
              <span className="text-muted-foreground">Subtotal ({selectedItems.length} Produk)</span>
              <span>Rp {formatPrice(totalPrice)}</span>
            </div>
            <div className="flex justify-between text-sm font-medium">
              <span className="text-muted-foreground">Diskon Musim Panen</span>
              <span className="text-green-600">-Rp 0</span>
            </div>
            <Separator className="bg-primary/5" />
            <div className="flex justify-between items-end">
              <div>
                <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Total Bayar</p>
                <p className="text-3xl font-black text-primary">Rp {formatPrice(totalPrice)}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3 p-4 bg-primary/5 rounded-2xl border border-primary/10">
              <CheckCircle2 className="h-5 w-5 text-primary" />
              <p className="text-xs font-bold text-primary">Voucher gratis ongkir tersedia!</p>
            </div>
            <Button 
              disabled={selectedItems.length === 0}
              onClick={() => checkout(selectedItems)}
              className="w-full h-16 rounded-[2rem] bg-secondary hover:bg-secondary/90 text-white font-black text-xl shadow-xl shadow-secondary/20 transition-all active:scale-95"
            >
              Checkout Sekarang <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="ghost" className="w-full text-sm font-bold text-muted-foreground flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" /> Lanjut Belanja
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
