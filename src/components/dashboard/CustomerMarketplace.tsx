
"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { 
  Search, 
  Filter, 
  ShoppingCart, 
  MapPin, 
  Star, 
  Clock, 
  Heart, 
  ChevronRight,
  User,
  Store,
  Navigation,
  ArrowUpDown,
  MessageCircle,
  X,
  Tag,
  Voucher,
  Package,
  CreditCard,
  Bell
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

const categories = [
  { id: "Sayuran", name: "Sayuran", count: 124 },
  { id: "Buah-buahan", name: "Buah-buahan", count: 86 },
  { id: "Biji-bijian", name: "Biji-bijian", count: 42 },
  { id: "Rempah-rempah", name: "Rempah-rempah", count: 56 },
  { id: "Umbi-umbian", name: "Umbi-umbian", count: 38 },
  { id: "Tanaman Herbal", name: "Tanaman Herbal", count: 45 },
  { id: "Kacang-kacangan", name: "Kacang-kacangan", count: 52 },
  { id: "Produk Organik", name: "Produk Organik", count: 65 },
];

export const mockProducts = [
  // Sayuran
  { id: 1, name: "Cabai Merah Premium", category: "Sayuran", price: 32000, farmer: "Pak Maman", location: "Lembang, Jawa Barat", rating: 4.8, reviews: 124, status: "Tersedia", badges: ["Best Seller", "Panen Hari Ini"], image: "https://picsum.photos/seed/chili/600/400", stock: "85 kg", harvestDate: "2024-05-20", description: "Cabai merah segar pilihan langsung dari kebun Lembang." },
  { id: 2, name: "Tomat Organik", category: "Sayuran", price: 18500, farmer: "Ibu Siti", location: "Cianjur, Jawa Barat", rating: 4.9, reviews: 86, status: "Tersedia", badges: ["Organik"], image: "https://picsum.photos/seed/tomato/600/400", stock: "42 kg", harvestDate: "2024-05-18", description: "Tomat organik tanpa pestisida kimia." },
  { id: 4, name: "Jagung Manis", category: "Sayuran", price: 12000, farmer: "Pak Budi", location: "Garut, Jawa Barat", rating: 4.7, reviews: 52, status: "Stok Tipis", badges: ["Panen Hari Ini"], image: "https://picsum.photos/seed/corn/600/400", stock: "15 kg", harvestDate: "2024-05-20", description: "Jagung manis segar panen harian." },
  { id: 10, name: "Bayam Hijau Segar", category: "Sayuran", price: 8000, farmer: "Pak Jaka", location: "Bandung, Jawa Barat", rating: 4.6, reviews: 34, status: "Tersedia", badges: ["Organik"], image: "https://picsum.photos/seed/spinach/600/400", stock: "20 kg", harvestDate: "2024-05-21", description: "Bayam organik kaya zat besi." },
  
  // Buah-buahan
  { id: 7, name: "Pisang Cavendish", category: "Buah-buahan", price: 25000, farmer: "Kelompok Tani Lampung", location: "Lampung, Sumatera", rating: 4.9, reviews: 156, status: "Tersedia", badges: ["Fresh"], image: "https://picsum.photos/seed/banana/600/400", stock: "80 sisir", harvestDate: "2024-05-19", description: "Pisang Cavendish kualitas premium." },
  { id: 8, name: "Alpukat Mentega", category: "Buah-buahan", price: 35000, farmer: "Pak Jaka", location: "Probolinggo, Jawa Timur", rating: 4.7, reviews: 94, status: "Tersedia", badges: ["Organik"], image: "https://picsum.photos/seed/avocado/600/400", stock: "55 kg", harvestDate: "2024-05-15", description: "Alpukat mentega super creamy." },
  { id: 11, name: "Mangga Harum Manis", category: "Buah-buahan", price: 28000, farmer: "Ibu Ratna", location: "Indramayu, Jawa Barat", rating: 4.8, reviews: 72, status: "Tersedia", badges: ["Best Seller"], image: "https://picsum.photos/seed/mango/600/400", stock: "100 kg", harvestDate: "2024-05-10", description: "Mangga manis harum asli Indramayu." },
  { id: 12, name: "Jeruk Medan Super", category: "Buah-buahan", price: 22000, farmer: "Pak Ginting", location: "Berastagi, Sumatera", rating: 4.5, reviews: 45, status: "Tersedia", badges: [], image: "https://picsum.photos/seed/orange/600/400", stock: "60 kg", harvestDate: "2024-05-12", description: "Jeruk manis segar dari tanah Karo." },

  // Biji-bijian
  { id: 3, name: "Beras Premium Cianjur", category: "Biji-bijian", price: 16500, farmer: "Pak Arif", location: "Cianjur, Jawa Barat", rating: 5.0, reviews: 245, status: "Tersedia", badges: ["Best Seller"], image: "https://picsum.photos/seed/rice/600/400", stock: "500 kg", harvestDate: "2024-04-15", description: "Beras Pandan Wangi asli Cianjur." },
  { id: 13, name: "Kedelai Lokal", category: "Biji-bijian", price: 14000, farmer: "Pak Slamet", location: "Grobogan, Jawa Tengah", rating: 4.6, reviews: 28, status: "Tersedia", badges: [], image: "https://picsum.photos/seed/soybean/600/400", stock: "200 kg", harvestDate: "2024-05-01", description: "Kedelai lokal berkualitas untuk tahu tempe." },

  // Rempah-rempah
  { id: 9, name: "Jahe Merah Super", category: "Rempah-rempah", price: 28000, farmer: "Pak Maman", location: "Lembang, Jawa Barat", rating: 4.8, reviews: 42, status: "Tersedia", badges: ["Best Seller"], image: "https://picsum.photos/seed/ginger/600/400", stock: "40 kg", harvestDate: "2024-05-12", description: "Jahe merah segar berkualitas tinggi." },
  { id: 6, name: "Bawang Merah Brebes", category: "Rempah-rempah", price: 45000, farmer: "Ibu Rahma", location: "Brebes, Jawa Tengah", rating: 4.6, reviews: 78, status: "Tersedia", badges: [], image: "https://picsum.photos/seed/onion/600/400", stock: "250 kg", harvestDate: "2024-05-05", description: "Bawang merah Brebes aroma kuat." },

  // Tanaman Herbal
  { id: 14, name: "Temulawak Segar", category: "Tanaman Herbal", price: 15000, farmer: "Pak Hendra", location: "Sukabumi, Jawa Barat", rating: 4.7, reviews: 19, status: "Tersedia", badges: ["Herbal"], image: "https://picsum.photos/seed/herbal1/600/400", stock: "30 kg", harvestDate: "2024-05-14", description: "Temulawak segar untuk jamu kesehatan." },
  { id: 15, name: "Daun Mint Organik", category: "Tanaman Herbal", price: 12000, farmer: "Ibu Lani", location: "Bandung, Jawa Barat", rating: 4.9, reviews: 22, status: "Tersedia", badges: ["Organik"], image: "https://picsum.photos/seed/herbal2/600/400", stock: "5 kg", harvestDate: "2024-05-20", description: "Daun mint segar aromatik." },
  { id: 16, name: "Rosella Kering", category: "Tanaman Herbal", price: 55000, farmer: "Kelompok Wanita Tani", location: "Yogyakarta, DIY", rating: 5.0, reviews: 56, status: "Tersedia", badges: ["Best Seller"], image: "https://picsum.photos/seed/herbal3/600/400", stock: "15 kg", harvestDate: "2024-04-30", description: "Bunga rosella kering kaya antioksidan." },

  // Kacang-kacangan
  { id: 18, name: "Kacang Tanah Kupas", category: "Kacang-kacangan", price: 32000, farmer: "Pak Agus", location: "Tuban, Jawa Timur", rating: 4.7, reviews: 67, status: "Tersedia", badges: ["Best Seller"], image: "https://picsum.photos/seed/nut1/600/400", stock: "100 kg", harvestDate: "2024-05-02", description: "Kacang tanah kupas kering berkualitas." },
  { id: 19, name: "Edamame Segar", category: "Kacang-kacangan", price: 24000, farmer: "Ibu Desi", location: "Jember, Jawa Timur", rating: 4.9, reviews: 89, status: "Tersedia", badges: ["Organik", "Fresh"], image: "https://picsum.photos/seed/nut2/600/400", stock: "40 kg", harvestDate: "2024-05-21", description: "Edamame jepang kualitas ekspor." },

  // Umbi-umbian
  { id: 23, name: "Kentang Dieng Super", category: "Umbi-umbian", price: 15000, farmer: "Pak Budi", location: "Wonosobo, Jawa Tengah", rating: 4.8, reviews: 110, status: "Tersedia", badges: ["Best Seller"], image: "https://picsum.photos/seed/potato-dieng/600/400", stock: "200 kg", harvestDate: "2024-05-15", description: "Kentang Dieng kualitas super." },
  { id: 27, name: "Ubi Cilembu Madu", category: "Umbi-umbian", price: 20000, farmer: "Ibu Ratna", location: "Sumedang, Jawa Barat", rating: 5.0, reviews: 230, status: "Tersedia", badges: ["Best Seller", "Manis"], image: "https://picsum.photos/seed/ubi-cilembu/600/400", stock: "100 kg", harvestDate: "2024-05-10", description: "Ubi Cilembu asli Sumedang, manis seperti madu." },
];

interface MarketplaceProps {
  addToCart: (product: any) => void;
  toggleFavorite: (productId: number) => void;
  favorites: number[];
  startCheckout: (items: any[]) => void;
  cartCount: number;
  setView: (v: string) => void;
}

export function CustomerMarketplace({ addToCart, toggleFavorite, favorites, startCheckout, cartCount, setView }: MarketplaceProps) {
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filters State
  const [priceRange, setPriceRange] = useState<string>("all");
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

  const filteredProducts = useMemo(() => {
    let result = [...mockProducts];

    // Search Filter
    if (searchQuery) {
      result = result.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category Filter
    if (selectedCategory) {
      if (selectedCategory === "Produk Organik") {
        result = result.filter(p => p.badges.includes("Organik"));
      } else {
        result = result.filter(p => p.category === selectedCategory);
      }
    }

    // Price Filter
    if (priceRange !== "all") {
      if (priceRange === "under25") result = result.filter(p => p.price < 25000);
      else if (priceRange === "25to50") result = result.filter(p => p.price >= 25000 && p.price <= 50000);
      else if (priceRange === "above50") result = result.filter(p => p.price > 50000);
    }

    // Location Filter
    if (locationFilter !== "all") {
      result = result.filter(p => p.location.includes(locationFilter));
    }

    // Sorting
    if (sortBy === "price-low") result.sort((a, b) => a.price - b.price);
    else if (sortBy === "price-high") result.sort((a, b) => b.price - a.price);
    else if (sortBy === "latest") result.sort((a, b) => b.id - a.id);
    else if (sortBy === "popular") result.sort((a, b) => b.reviews - a.reviews);

    return result;
  }, [searchQuery, selectedCategory, priceRange, locationFilter, sortBy]);

  const resetFilters = () => {
    setPriceRange("all");
    setLocationFilter("all");
    setSortBy("popular");
    setSelectedCategory(null);
    setSearchQuery("");
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      {/* Hero Search Section */}
      <section className="relative overflow-hidden rounded-[3rem] bg-primary p-12 text-white">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-48 -mt-48 blur-[100px]"></div>
        <div className="relative z-10 max-w-2xl space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-black font-headline leading-tight">
              Temukan Kesegaran <br /> Langsung dari <span className="text-secondary italic">Lahan Tani.</span>
            </h1>
            <p className="text-primary-foreground/80 text-lg">
              Hubungkan dapur Anda dengan hasil panen terbaik para petani lokal Indonesia.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari hasil pertanian segar (tomat, cabai, ubi...)" 
                className="pl-12 h-14 rounded-2xl border-none bg-white text-foreground text-lg shadow-xl"
              />
            </div>
            <Button 
              onClick={() => setIsFilterOpen(true)}
              className="h-14 px-8 rounded-2xl bg-secondary hover:bg-secondary/90 text-white font-black text-lg shadow-xl shadow-secondary/20"
            >
              <Filter className="mr-2 h-5 w-5" /> Filter
            </Button>
          </div>
        </div>
      </section>

      {/* Overview & Promo Section */}
      <section className="grid lg:grid-cols-3 gap-8">
        {/* Promo Carousel/Banner Card */}
        <Card className="lg:col-span-2 rounded-[2.5rem] border-none shadow-xl bg-gradient-to-br from-secondary to-orange-600 text-white p-8 overflow-hidden relative group cursor-pointer h-[320px]">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl transition-transform group-hover:scale-110"></div>
          <div className="relative z-10 flex flex-col justify-between h-full">
            <Badge className="w-fit bg-white/20 text-white border-none px-4 py-1 font-bold">PROMO MUSIM PANEN 🌾</Badge>
            <div>
              <h2 className="text-4xl font-black font-headline mb-4 leading-tight">Diskon Hingga 20% <br />Untuk Produk Pilihan</h2>
              <p className="text-lg opacity-90 max-w-md">Dapatkan kesegaran langsung dari kebun dengan harga spesial minggu ini.</p>
            </div>
            <Button className="w-fit h-12 px-8 rounded-full bg-white text-secondary font-black hover:bg-white/90">Klaim Voucher Sekarang</Button>
          </div>
          <div className="absolute -bottom-10 -right-10 opacity-20 transition-transform group-hover:scale-105 duration-700">
            <Tag className="h-64 w-64" />
          </div>
        </Card>

        {/* Quick Access Grid */}
        <div className="grid grid-cols-2 gap-4 h-[320px]">
          {[
            { id: "orders", label: "Pesanan Saya", icon: Package, color: "bg-blue-50 text-blue-600", desc: "Menunggu: 2" },
            { id: "cart", label: "Keranjang", icon: ShoppingCart, color: "bg-orange-50 text-orange-600", desc: `${cartCount} Produk` },
            { id: "favorites", label: "Favorit", icon: Heart, color: "bg-destructive/5 text-destructive", desc: `${favorites.length} Item` },
            { id: "notifications", label: "Notifikasi", icon: Bell, color: "bg-primary/5 text-primary", desc: "5 Baru" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className="group flex flex-col items-center justify-center p-6 bg-white rounded-[2rem] shadow-sm hover:shadow-xl transition-all border border-primary/5 hover:border-primary/20"
            >
              <div className={cn("p-3 rounded-2xl mb-4 group-hover:scale-110 transition-transform", item.color)}>
                <item.icon className="h-6 w-6" />
              </div>
              <span className="font-bold text-sm text-foreground">{item.label}</span>
              <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mt-1">{item.desc}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Commodity Categories Section */}
      <section className="space-y-6">
        <div className="flex justify-between items-end">
          <div className="space-y-1">
            <h2 className="text-2xl font-black font-headline text-primary">Kategori Komoditas</h2>
            <p className="text-muted-foreground">Pilih jenis hasil tani yang Anda butuhkan.</p>
          </div>
          {(selectedCategory || searchQuery !== "" || priceRange !== "all" || locationFilter !== "all") && (
            <Button variant="ghost" className="font-bold text-secondary" onClick={resetFilters}>Reset Semua Filter</Button>
          )}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {categories.map((cat) => (
            <Card 
              key={cat.id} 
              onClick={() => setSelectedCategory(cat.id === selectedCategory ? null : cat.id)}
              className={cn(
                "group cursor-pointer rounded-3xl border-2 transition-all duration-300",
                selectedCategory === cat.id 
                  ? "bg-primary border-primary shadow-xl scale-[1.05]" 
                  : "bg-white border-transparent shadow-sm hover:shadow-lg hover:border-primary/20"
              )}
            >
              <CardContent className="p-6 flex flex-col items-center justify-center text-center space-y-1">
                <p className={cn(
                  "font-black text-sm transition-colors",
                  selectedCategory === cat.id ? "text-white" : "text-primary"
                )}>{cat.name}</p>
                <p className={cn(
                  "text-[10px] font-black uppercase tracking-widest transition-colors",
                  selectedCategory === cat.id ? "text-white/70" : "text-muted-foreground"
                )}>{cat.count} Item</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Featured Products Grid */}
      <section className="space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
          <div className="space-y-1">
            <h2 className="text-3xl font-black font-headline text-primary">
              {selectedCategory ? `Produk ${selectedCategory}` : searchQuery ? `Hasil Pencarian: ${searchQuery}` : "Produk Unggulan"}
            </h2>
            <p className="text-muted-foreground">Pilihan terbaik minggu ini langsung dari mitra tani kami.</p>
          </div>
          <div className="flex gap-2">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px] rounded-full border-primary/20 h-10 font-bold">
                <ArrowUpDown className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Urutkan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">Terpopuler</SelectItem>
                <SelectItem value="latest">Terbaru</SelectItem>
                <SelectItem value="price-low">Harga Terendah</SelectItem>
                <SelectItem value="price-high">Harga Tertinggi</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map((p) => (
              <Card key={p.id} className="group cursor-pointer rounded-[2.5rem] border-none shadow-sm hover:shadow-2xl bg-white overflow-hidden transition-all duration-500">
                <div className="relative aspect-square overflow-hidden" onClick={() => handleOpenDetail(p)}>
                  <Image 
                    src={p.image} 
                    alt={p.name} 
                    fill 
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <button 
                    onClick={(e) => { e.stopPropagation(); toggleFavorite(p.id); }}
                    className={cn(
                      "absolute top-4 right-4 h-10 w-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center transition-all shadow-lg",
                      favorites.includes(p.id) ? "text-destructive" : "text-muted-foreground hover:text-destructive hover:scale-110"
                    )}
                  >
                    <Heart className={cn("h-5 w-5", favorites.includes(p.id) && "fill-current")} />
                  </button>
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {p.badges.map((badge, i) => (
                      <Badge key={i} className="bg-primary/90 text-white border-none font-bold text-[10px] px-3 py-1">
                        {badge}
                      </Badge>
                    ))}
                  </div>
                </div>
                <CardContent className="p-6 space-y-4">
                  <div className="space-y-1" onClick={() => handleOpenDetail(p)}>
                    <p className="text-[10px] font-black text-secondary uppercase tracking-[0.2em]">{p.category}</p>
                    <h3 className="text-xl font-bold leading-tight group-hover:text-primary transition-colors">{p.name}</h3>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                      <User className="h-3 w-3 text-primary" /> {p.farmer}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                      <MapPin className="h-3 w-3 text-primary" /> {p.location}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-primary/5">
                    <div>
                      <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest leading-none mb-1">Harga / Kg</p>
                      <p className="text-xl font-black text-primary">Rp {formatPrice(p.price)}</p>
                    </div>
                    <div className="flex items-center gap-1 bg-yellow-400/10 px-2 py-1 rounded-lg">
                      <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                      <span className="text-xs font-black">{p.rating}</span>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={(e) => { e.stopPropagation(); addToCart(p); }}
                    className="w-full h-11 rounded-2xl bg-primary hover:bg-secondary text-white font-bold transition-all group-hover:shadow-lg"
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" /> Tambah Keranjang
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="py-32 text-center space-y-6 glassmorphism rounded-[3rem]">
            <div className="mx-auto bg-primary/5 p-8 rounded-full w-fit">
               <Search className="h-12 w-12 text-primary/30" />
            </div>
            <div className="space-y-2">
              <p className="text-2xl font-black font-headline text-primary">Produk yang Anda cari belum tersedia.</p>
              <p className="text-muted-foreground">Maaf, kami tidak dapat menemukan produk yang sesuai dengan kriteria Anda.</p>
            </div>
            <Button onClick={resetFilters} variant="outline" className="rounded-2xl h-12 px-8 font-bold border-primary/20">Hapus Semua Filter</Button>
          </div>
        )}
      </section>

      {/* Filter Dialog */}
      <Dialog open={isFilterOpen} onOpenChange={setIsFilterOpen}>
        <DialogContent className="rounded-[3rem] border-none glassmorphism sm:max-w-[500px] outline-none">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black font-headline text-primary">Filter Marketplace</DialogTitle>
            <DialogDescription>Sesuaikan pencarian produk tani Anda.</DialogDescription>
          </DialogHeader>
          <div className="py-6 space-y-8">
            <div className="space-y-4">
              <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Rentang Harga</label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: "all", label: "Semua Harga" },
                  { id: "under25", label: "Di bawah 25rb" },
                  { id: "25to50", label: "25rb - 50rb" },
                  { id: "above50", label: "Di atas 50rb" }
                ].map((range) => (
                  <button
                    key={range.id}
                    onClick={() => setPriceRange(range.id)}
                    className={cn(
                      "px-4 py-3 rounded-2xl text-xs font-bold border-2 transition-all",
                      priceRange === range.id 
                        ? "bg-primary border-primary text-white shadow-lg" 
                        : "border-primary/10 hover:border-primary/40 text-muted-foreground"
                    )}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Lokasi Petani</label>
              <Select value={locationFilter} onValueChange={setLocationFilter}>
                <SelectTrigger className="rounded-2xl h-14 border-primary/10 focus:ring-primary">
                  <SelectValue placeholder="Pilih Lokasi" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Lokasi</SelectItem>
                  <SelectItem value="Jawa Barat">Jawa Barat</SelectItem>
                  <SelectItem value="Jawa Tengah">Jawa Tengah</SelectItem>
                  <SelectItem value="Jawa Timur">Jawa Timur</SelectItem>
                  <SelectItem value="Sumatera">Sumatera</SelectItem>
                  <SelectItem value="Bali">Bali</SelectItem>
                  <SelectItem value="Sulawesi">Sulawesi</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter className="flex-col sm:flex-row gap-3 pt-4">
            <Button variant="ghost" onClick={resetFilters} className="rounded-2xl h-14 px-8 font-bold">Reset</Button>
            <Button onClick={() => setIsFilterOpen(false)} className="flex-1 rounded-2xl h-14 bg-primary text-white font-black text-lg shadow-xl shadow-primary/20">
              Terapkan Filter
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Product Detail Modal */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="rounded-[3rem] border-none glassmorphism sm:max-w-[800px] p-0 overflow-hidden outline-none">
          {selectedProduct && (
            <div className="grid md:grid-cols-2 h-full max-h-[90vh] overflow-y-auto">
              <div className="relative h-[300px] md:h-full min-h-[400px]">
                <Image 
                  src={selectedProduct.image} 
                  alt={selectedProduct.name} 
                  fill 
                  className="object-cover"
                />
                <div className="absolute top-6 left-6 flex flex-col gap-2">
                   {selectedProduct.badges.map((badge: string, i: number) => (
                     <Badge key={i} className="bg-white/90 backdrop-blur-sm text-primary border-none font-bold shadow-lg">
                       {badge}
                     </Badge>
                   ))}
                </div>
              </div>
              <div className="p-10 space-y-8">
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <Badge variant="outline" className="border-secondary text-secondary mb-2 uppercase tracking-[0.2em] text-[10px] px-3 font-black">
                        {selectedProduct.category}
                      </Badge>
                      <DialogTitle className="text-3xl font-black font-headline text-primary mb-2">
                        {selectedProduct.name}
                      </DialogTitle>
                    </div>
                    <button 
                      onClick={() => toggleFavorite(selectedProduct.id)}
                      className={cn(
                        "h-10 w-10 rounded-full flex items-center justify-center transition-all",
                        favorites.includes(selectedProduct.id) ? "text-destructive" : "text-muted-foreground hover:bg-destructive/10"
                      )}
                    >
                      <Heart className={cn("h-6 w-6", favorites.includes(selectedProduct.id) && "fill-current")} />
                    </button>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm font-medium text-muted-foreground">
                     <div className="flex items-center gap-1.5"><Star className="h-4 w-4 text-yellow-500 fill-yellow-500" /> {selectedProduct.rating} ({selectedProduct.reviews} Ulasan)</div>
                     <div className="h-1 w-1 rounded-full bg-muted-foreground"></div>
                     <div className="flex items-center gap-1.5"><Clock className="h-4 w-4 text-primary" /> Terakhir Panen: {selectedProduct.harvestDate}</div>
                  </div>
                  
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-black text-primary">Rp {formatPrice(selectedProduct.price)}</span>
                    <span className="text-muted-foreground font-bold">/ Kg</span>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm font-black uppercase tracking-widest text-muted-foreground">Deskripsi Produk</p>
                    <DialogDescription className="text-base leading-relaxed text-foreground/80">
                      {selectedProduct.description}
                    </DialogDescription>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-primary/5 rounded-3xl border border-primary/10">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-2xl bg-white shadow-sm flex items-center justify-center">
                        <User className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs font-black uppercase tracking-widest text-muted-foreground">Profil Petani</p>
                        <h4 className="font-bold text-primary">{selectedProduct.farmer}</h4>
                        <p className="text-[10px] text-muted-foreground flex items-center gap-1"><MapPin className="h-3 w-3" /> {selectedProduct.location}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => setView('chat')} className="rounded-full"><MessageCircle className="h-5 w-5" /></Button>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-secondary/5 rounded-2xl border border-secondary/10 flex items-center gap-3">
                      <Store className="h-5 w-5 text-secondary" />
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Stok</p>
                        <p className="text-sm font-bold">{selectedProduct.stock}</p>
                      </div>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100 flex items-center gap-3">
                      <Navigation className="h-5 w-5 text-blue-500" />
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Logistik</p>
                        <p className="text-sm font-bold">Siap Kirim</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button 
                    onClick={() => {
                      startCheckout([{ ...selectedProduct, qty: 1 }]);
                      setIsDetailOpen(false);
                    }}
                    className="flex-1 h-14 rounded-2xl bg-primary hover:bg-primary/90 text-white font-black text-lg shadow-xl shadow-primary/20"
                  >
                    Beli Sekarang
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      addToCart(selectedProduct);
                      setIsDetailOpen(false);
                    }}
                    className="h-14 w-14 rounded-2xl border-primary/20 hover:bg-primary/5 text-primary p-0"
                  >
                    <ShoppingCart className="h-6 w-6" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
