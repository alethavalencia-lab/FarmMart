"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { 
  Search, 
  Filter, 
  ShoppingCart, 
  MapPin, 
  Star, 
  Heart, 
  ChevronRight,
  Store,
  ArrowUpDown,
  MessageCircle,
  Tag,
  Package,
  Bell,
  TrendingUp,
  FileText,
  ClipboardList
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { mockProducts } from "./CustomerMarketplace";

const b2bCategories = [
  { id: "Sayuran", name: "Sayuran", count: 124 },
  { id: "Buah-buahan", name: "Buah-buahan", count: 86 },
  { id: "Biji-bijian", name: "Biji-bijian", count: 42 },
  { id: "Rempah-rempah", name: "Rempah-rempah", count: 56 },
  { id: "Umbi-umbian", name: "Umbi-umbian", count: 38 },
  { id: "Tanaman Herbal", name: "Tanaman Herbal", count: 45 },
  { id: "Produk Organik", name: "Produk Organik", count: 65 },
  { id: "Premium Products", name: "Premium Products", count: 32 },
];

interface PartnerMarketplaceProps {
  addToCart: (product: any) => void;
  cartCount: number;
  setView: (v: string) => void;
}

export function PartnerMarketplace({ addToCart, cartCount, setView }: PartnerMarketplaceProps) {
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  
  // B2B Filters State
  const [moqFilter, setMoqFilter] = useState<string>("all");
  const [locationFilter, setLocationFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("popular");

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleOpenDetail = (product: any) => {
    setSelectedProduct(product);
    setIsDetailOpen(true);
  };

  const formatPrice = (price: number) => {
    if (!mounted) return price.toString();
    return price.toLocaleString('id-ID');
  };

  const b2bProducts = useMemo(() => {
    return mockProducts.map(p => ({
      ...p,
      wholesalePrice: p.price * 0.85, // 15% discount for B2B
      moq: p.id % 2 === 0 ? 100 : 50,
      capacity: "500 Kg/week",
      isPremium: p.rating >= 4.9
    }));
  }, []);

  const filteredProducts = useMemo(() => {
    let result = [...b2bProducts];

    if (searchQuery) {
      result = result.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    if (selectedCategory) {
      result = result.filter(p => p.category === selectedCategory);
    }

    if (moqFilter !== "all") {
      result = result.filter(p => p.moq <= parseInt(moqFilter));
    }

    if (locationFilter !== "all") {
      result = result.filter(p => p.location.includes(locationFilter));
    }

    return result;
  }, [searchQuery, selectedCategory, moqFilter, locationFilter, b2bProducts]);

  return (
    <div className="space-y-12 animate-in fade-in duration-700 pb-20">
      {/* Search Section */}
      <section className="relative overflow-hidden rounded-[3rem] bg-primary p-12 text-white shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-48 -mt-48 blur-[100px]"></div>
        <div className="relative z-10 max-w-2xl space-y-8">
          <div className="space-y-4">
            <Badge className="bg-secondary text-white border-none px-4 py-1 font-bold">B2B PROCUREMENT</Badge>
            <h1 className="text-4xl md:text-5xl font-black font-headline leading-tight">
              Suplai Segar Skala Besar <br /> Untuk <span className="text-secondary italic">Bisnis Anda.</span>
            </h1>
            <p className="text-primary-foreground/80 text-lg">
              Solusi pengadaan hasil tani terpercaya untuk Hotel, Restoran, dan Katering.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari komoditas (tomat, cabai, beras...)" 
                className="pl-12 h-14 rounded-2xl border-none bg-white text-foreground text-lg shadow-xl"
              />
            </div>
            <Button 
              onClick={() => setIsFilterOpen(true)}
              className="h-14 px-8 rounded-2xl bg-secondary hover:bg-secondary/90 text-white font-black text-lg shadow-xl"
            >
              <Filter className="mr-2 h-5 w-5" /> Filter Bisnis
            </Button>
          </div>
        </div>
      </section>

      {/* Summary Cards */}
      <section className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { label: "Pesanan Aktif", value: "12", icon: Package, color: "bg-blue-50 text-blue-600", view: "orders" },
          { label: "Spending Bln Ini", value: "Rp 18.5M", icon: TrendingUp, color: "text-primary bg-primary/5", view: "analytics" },
          { label: "Supplier Favorit", value: "5", icon: Store, color: "bg-orange-50 text-orange-600", view: "favorites" },
          { label: "Permintaan Penawaran", value: "3", icon: FileText, color: "bg-purple-50 text-purple-600", view: "rfq" },
          { label: "Kontrak Aktif", value: "2", icon: ClipboardList, color: "bg-accent/10 text-accent", view: "contracts" },
        ].map((item, i) => (
          <Card key={i} onClick={() => setView(item.view)} className="group cursor-pointer rounded-[2rem] border-none shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 bg-white">
            <CardContent className="p-6 flex flex-col items-center text-center space-y-2">
              <div className={cn("p-3 rounded-2xl", item.color)}>
                <item.icon className="h-6 w-6" />
              </div>
              <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">{item.label}</p>
              <p className="text-xl font-black text-primary">{item.value}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* Marketplace Grid */}
      <section className="space-y-8">
        <div className="flex justify-between items-end">
          <div className="space-y-1">
            <h2 className="text-3xl font-black font-headline text-primary">Katalog Grosir</h2>
            <p className="text-muted-foreground">Harga khusus mitra bisnis dengan jaminan ketersediaan stok.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map((p) => (
            <Card key={p.id} className="group cursor-pointer rounded-[2.5rem] border-none shadow-sm hover:shadow-2xl bg-white overflow-hidden transition-all duration-500">
              <div className="relative aspect-square overflow-hidden" onClick={() => handleOpenDetail(p)}>
                <Image src={p.image} alt={p.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  <Badge className="bg-primary/90 text-white border-none font-bold text-[10px] px-3 py-1">GROSIR</Badge>
                  {p.isPremium && <Badge className="bg-accent text-white border-none font-bold text-[10px] px-3 py-1">PREMIUM</Badge>}
                </div>
              </div>
              <CardContent className="p-6 space-y-4">
                <div className="space-y-1" onClick={() => handleOpenDetail(p)}>
                  <p className="text-[10px] font-black text-secondary uppercase tracking-widest">{p.category}</p>
                  <h3 className="text-xl font-bold leading-tight group-hover:text-primary transition-colors">{p.name}</h3>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                    <MapPin className="h-3 w-3 text-primary" /> {p.location}
                  </div>
                </div>
                
                <div className="space-y-2 pt-4 border-t border-primary/5">
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-[10px] text-muted-foreground font-bold uppercase mb-1 leading-none">Harga Grosir</p>
                      <p className="text-xl font-black text-primary">Rp {formatPrice(p.wholesalePrice)} <span className="text-xs font-bold">/Kg</span></p>
                    </div>
                    <div className="text-right">
                       <p className="text-[10px] text-muted-foreground font-bold uppercase mb-1 leading-none">MOQ</p>
                       <p className="text-xs font-black text-secondary">{p.moq} Kg</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-[10px] font-bold text-muted-foreground">
                    <span>Kapasitas: {p.capacity}</span>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" /> {p.rating}
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    onClick={(e) => { e.stopPropagation(); addToCart({ ...p, qty: p.moq }); }}
                    className="flex-1 h-11 rounded-2xl bg-primary hover:bg-secondary text-white font-bold transition-all"
                  >
                    Beli Grosir
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={(e) => { e.stopPropagation(); setView('rfq'); }}
                    className="h-11 px-3 rounded-2xl border-primary/20 text-primary"
                  >
                    Nego
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Product Detail Modal (B2B Version) */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="rounded-[3rem] border-none glassmorphism sm:max-w-[800px] p-0 overflow-hidden outline-none">
          {selectedProduct && (
            <div className="grid md:grid-cols-2 h-full max-h-[90vh] overflow-y-auto">
              <div className="relative h-[300px] md:h-full min-h-[400px]">
                <Image src={selectedProduct.image} alt={selectedProduct.name} fill className="object-cover" />
              </div>
              <div className="p-10 space-y-8">
                <div className="space-y-4">
                  <Badge className="bg-secondary/10 text-secondary border-none uppercase tracking-[0.2em] text-[10px] px-3 font-black">
                    {selectedProduct.category}
                  </Badge>
                  <h2 className="text-3xl font-black font-headline text-primary leading-tight">
                    {selectedProduct.name}
                  </h2>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-baseline gap-2">
                      <span className="text-muted-foreground text-sm font-bold">Harga Eceran:</span>
                      <span className="text-lg line-through text-muted-foreground/60">Rp {formatPrice(selectedProduct.price)}</span>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-muted-foreground text-sm font-bold">Harga Grosir:</span>
                      <span className="text-4xl font-black text-primary">Rp {formatPrice(selectedProduct.wholesalePrice)}</span>
                      <span className="text-muted-foreground font-bold">/ Kg</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10">
                       <p className="text-[10px] font-black text-muted-foreground uppercase mb-1">Minimal Order</p>
                       <p className="text-lg font-black text-primary">{selectedProduct.moq} Kg</p>
                    </div>
                    <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10">
                       <p className="text-[10px] font-black text-muted-foreground uppercase mb-1">Kapasitas Produksi</p>
                       <p className="text-lg font-black text-primary">{selectedProduct.capacity}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <Button 
                    className="w-full h-14 rounded-2xl bg-primary text-white font-black text-lg shadow-xl"
                    onClick={() => {
                      addToCart({ ...selectedProduct, qty: selectedProduct.moq });
                      setIsDetailOpen(false);
                    }}
                  >
                    Tambah ke Keranjang Bisnis
                  </Button>
                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" onClick={() => setView('rfq')} className="rounded-2xl h-12 border-primary/20 font-bold">Ajukan Penawaran</Button>
                    <Button variant="outline" onClick={() => setView('chat')} className="rounded-2xl h-12 border-primary/20 font-bold flex items-center gap-2">
                      <MessageCircle className="h-4 w-4" /> Hubungi Petani
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* RFQ & Contracts Quick Access */}
      <section className="grid md:grid-cols-2 gap-8">
        <Card className="rounded-[3rem] border-none shadow-xl bg-gradient-to-br from-primary to-green-800 text-white p-10 overflow-hidden relative group cursor-pointer" onClick={() => setView('rfq')}>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
          <div className="relative z-10 space-y-6">
            <h2 className="text-3xl font-black font-headline leading-tight">Gagal Temukan <br /> Produk yang Sesuai?</h2>
            <p className="opacity-80">Buat permintaan penawaran (RFQ) and biarkan petani mitra kami memberikan penawaran terbaik untuk Anda.</p>
            <Button className="rounded-full bg-white text-primary font-black px-8 h-12">Buat RFQ Baru <ChevronRight className="ml-2 h-5 w-5" /></Button>
          </div>
          <FileText className="absolute -bottom-10 -right-10 h-64 w-64 opacity-10" />
        </Card>

        <Card className="rounded-[3rem] border-none shadow-xl bg-gradient-to-br from-secondary to-orange-700 text-white p-10 overflow-hidden relative group cursor-pointer" onClick={() => setView('contracts')}>
           <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
           <div className="relative z-10 space-y-6">
            <h2 className="text-3xl font-black font-headline leading-tight">Kelola Kontrak <br /> Pengadaan Rutin</h2>
            <p className="opacity-80">Pantau jadwal pengiriman rutin and jamin stabilitas suplai komoditas untuk operasional bisnis harian.</p>
            <Button className="rounded-full bg-white text-secondary font-black px-8 h-12">Lihat Kontrak Aktif <ChevronRight className="ml-2 h-5 w-5" /></Button>
          </div>
          <ClipboardList className="absolute -bottom-10 -right-10 h-64 w-64 opacity-10" />
        </Card>
      </section>
    </div>
  );
}
