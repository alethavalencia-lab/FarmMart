"use client";

import { useState } from "react";
import Image from "next/image";
import { 
  Search, 
  Filter, 
  ShoppingCart, 
  MapPin, 
  Star, 
  Leaf, 
  Clock, 
  Heart, 
  ChevronRight,
  User,
  Info,
  Store,
  Navigation
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
import { cn } from "@/lib/utils";

const categories = [
  { id: 1, name: "Sayuran", icon: "🥬", count: 124 },
  { id: 2, name: "Buah-buahan", icon: "🍎", count: 86 },
  { id: 3, name: "Biji-bijian", icon: "🌾", count: 42 },
  { id: 4, name: "Rempah-rempah", icon: "🌶️", count: 56 },
  { id: 5, name: "Umbi-umbian", icon: "🥔", count: 38 },
  { id: 6, name: "Tanaman Herbal", icon: "🌿", count: 24 },
  { id: 7, name: "Kacang-kacangan", icon: "🥜", count: 18 },
  { id: 8, name: "Produk Organik", icon: "🥗", count: 65 },
];

const mockProducts = [
  {
    id: 1,
    name: "Cabai Merah Premium",
    category: "Sayuran",
    price: 32000,
    farmer: "Pak Maman",
    location: "Lembang, Bandung",
    rating: 4.8,
    reviews: 124,
    status: "Tersedia",
    badges: ["Best Seller", "Panen Hari Ini"],
    image: "https://picsum.photos/seed/chili/600/400",
    description: "Cabai merah segar pilihan langsung dari kebun Lembang. Memiliki tingkat kepedasan yang konsisten dan warna merah cerah alami.",
    stock: "85 kg",
    harvestDate: "2024-05-20"
  },
  {
    id: 2,
    name: "Tomat Organik",
    category: "Sayuran",
    price: 18500,
    farmer: "Ibu Siti",
    location: "Cianjur, Jawa Barat",
    rating: 4.9,
    reviews: 86,
    status: "Tersedia",
    badges: ["Organik"],
    image: "https://picsum.photos/seed/tomato/600/400",
    description: "Tomat organik yang ditanam tanpa pestisida kimia. Manis, berair, dan kaya akan vitamin. Sangat cocok untuk salad atau jus.",
    stock: "42 kg",
    harvestDate: "2024-05-18"
  },
  {
    id: 3,
    name: "Beras Premium Cianjur",
    category: "Biji-bijian",
    price: 16500,
    farmer: "Pak Arif",
    location: "Cianjur, Jawa Barat",
    rating: 5.0,
    reviews: 245,
    status: "Tersedia",
    badges: ["Best Seller"],
    image: "https://picsum.photos/seed/rice/600/400",
    description: "Beras Pandan Wangi asli Cianjur. Tekstur pulen, aroma wangi alami, dan bebas pemutih.",
    stock: "500 kg",
    harvestDate: "2024-04-15"
  },
  {
    id: 4,
    name: "Jagung Manis",
    category: "Sayuran",
    price: 12000,
    farmer: "Pak Budi",
    location: "Garut, Jawa Barat",
    rating: 4.7,
    reviews: 52,
    status: "Stok Tipis",
    badges: ["Panen Hari Ini"],
    image: "https://picsum.photos/seed/corn/600/400",
    description: "Jagung manis segar yang dipanen langsung saat pesanan masuk. Manis alami dan tekstur renyah.",
    stock: "15 kg",
    harvestDate: "2024-05-20"
  },
  {
    id: 5,
    name: "Kentang Dieng",
    category: "Umbi-umbian",
    price: 22000,
    farmer: "Pak Hidayat",
    location: "Dieng, Wonosobo",
    rating: 4.8,
    reviews: 112,
    status: "Tersedia",
    badges: ["Kualitas Ekspor"],
    image: "https://picsum.photos/seed/potato/600/400",
    description: "Kentang Granola asli dari dataran tinggi Dieng. Tekstur padat dan sangat baik untuk digoreng atau direbus.",
    stock: "120 kg",
    harvestDate: "2024-05-10"
  },
  {
    id: 6,
    name: "Bawang Merah",
    category: "Sayuran",
    price: 45000,
    farmer: "Ibu Rahma",
    location: "Brebes, Jawa Tengah",
    rating: 4.6,
    reviews: 78,
    status: "Tersedia",
    badges: [],
    image: "https://picsum.photos/seed/onion/600/400",
    description: "Bawang merah Brebes yang terkenal dengan aroma kuat dan ketahanan simpan yang baik.",
    stock: "250 kg",
    harvestDate: "2024-05-05"
  },
  {
    id: 7,
    name: "Pisang Cavendish",
    category: "Buah-buahan",
    price: 25000,
    farmer: "Kelompok Tani Lampung",
    location: "Lampung",
    rating: 4.9,
    reviews: 156,
    status: "Tersedia",
    badges: ["Fresh"],
    image: "https://picsum.photos/seed/banana/600/400",
    description: "Pisang Cavendish kualitas premium. Kulit mulus, daging buah manis lembut, dan kaya nutrisi.",
    stock: "80 sisir",
    harvestDate: "2024-05-19"
  },
  {
    id: 8,
    name: "Alpukat Mentega",
    category: "Buah-buahan",
    price: 35000,
    farmer: "Pak Jaka",
    location: "Probolinggo, Jatim",
    rating: 4.7,
    reviews: 94,
    status: "Tersedia",
    badges: ["Organik"],
    image: "https://picsum.photos/seed/avocado/600/400",
    description: "Alpukat mentega super. Daging buah tebal, tekstur creamy (seperti mentega), dan rasa gurih manis.",
    stock: "55 kg",
    harvestDate: "2024-05-15"
  },
];

export function CustomerMarketplace() {
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const handleOpenDetail = (product: any) => {
    setSelectedProduct(product);
    setIsDetailOpen(true);
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
                placeholder="Cari hasil pertanian segar (tomat, cabai, beras...)" 
                className="pl-12 h-14 rounded-2xl border-none bg-white text-foreground text-lg shadow-xl"
              />
            </div>
            <Button className="h-14 px-8 rounded-2xl bg-secondary hover:bg-secondary/90 text-white font-black text-lg shadow-xl shadow-secondary/20">
              <Filter className="mr-2 h-5 w-5" /> Filter
            </Button>
          </div>
        </div>
      </section>

      {/* Commodity Categories Section */}
      <section className="space-y-6">
        <div className="flex justify-between items-end">
          <div className="space-y-1">
            <h2 className="text-2xl font-black font-headline text-primary">Kategori Komoditas</h2>
            <p className="text-muted-foreground">Pilih jenis hasil tani yang Anda butuhkan.</p>
          </div>
          <Button variant="ghost" className="font-bold text-secondary">Lihat Semua</Button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {categories.map((cat) => (
            <Card key={cat.id} className="group cursor-pointer rounded-3xl border-none bg-white shadow-sm hover:shadow-xl hover:bg-primary transition-all duration-300">
              <CardContent className="p-6 flex flex-col items-center justify-center text-center space-y-3">
                <span className="text-3xl group-hover:scale-125 transition-transform duration-300">{cat.icon}</span>
                <div>
                  <p className="font-bold text-sm group-hover:text-white transition-colors">{cat.name}</p>
                  <p className="text-[10px] text-muted-foreground font-bold group-hover:text-white/70 transition-colors uppercase tracking-widest">{cat.count} Item</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Featured Products Grid */}
      <section className="space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
          <div className="space-y-1">
            <h2 className="text-3xl font-black font-headline text-primary">Produk Unggulan</h2>
            <p className="text-muted-foreground">Pilihan terbaik minggu ini langsung dari mitra tani kami.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="rounded-full font-bold">Terbaru</Button>
            <Button variant="outline" className="rounded-full font-bold bg-primary text-white border-primary">Populer</Button>
            <Button variant="outline" className="rounded-full font-bold">Harga Terendah</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {mockProducts.map((p) => (
            <Card key={p.id} onClick={() => handleOpenDetail(p)} className="group cursor-pointer rounded-[2.5rem] border-none shadow-sm hover:shadow-2xl bg-white overflow-hidden transition-all duration-500">
              <div className="relative aspect-square overflow-hidden">
                <Image 
                  src={p.image} 
                  alt={p.name} 
                  fill 
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <button className="absolute top-4 right-4 h-10 w-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-muted-foreground hover:text-destructive hover:scale-110 transition-all shadow-lg">
                  <Heart className="h-5 w-5" />
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
                <div className="space-y-1">
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
                    <p className="text-xl font-black text-primary">Rp {p.price.toLocaleString()}</p>
                  </div>
                  <div className="flex items-center gap-1 bg-yellow-400/10 px-2 py-1 rounded-lg">
                    <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                    <span className="text-xs font-black">{p.rating}</span>
                  </div>
                </div>
                
                <Button className="w-full h-11 rounded-2xl bg-primary hover:bg-secondary text-white font-bold transition-all group-hover:shadow-lg">
                  <ShoppingCart className="mr-2 h-4 w-4" /> Tambah Keranjang
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Additional Sections */}
      <section className="grid lg:grid-cols-2 gap-8">
        <Card className="rounded-[3rem] border-none shadow-xl bg-white p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full -mr-32 -mt-32 blur-[80px]"></div>
          <div className="relative z-10 space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 bg-secondary/10 rounded-2xl flex items-center justify-center">
                <Leaf className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="text-2xl font-black font-headline text-primary">Petani Terdekat</h3>
            </div>
            <p className="text-muted-foreground">Hasil tani lebih segar dengan jarak tempuh minimal. Temukan pahlawan pangan di sekitar Anda.</p>
            <div className="space-y-4">
              {[1, 2].map((i) => (
                <div key={i} className="flex items-center gap-4 p-4 bg-primary/5 rounded-[2rem] border border-primary/5 hover:bg-primary/10 transition-colors cursor-pointer">
                  <div className="h-14 w-14 rounded-2xl overflow-hidden relative">
                    <Image src={`https://picsum.photos/seed/farm${i}/100/100`} alt="Farm" fill className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-sm">Kebun Berkah {i === 1 ? 'Maman' : 'Siti'}</h4>
                    <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                      <Navigation className="h-3 w-3" /> {i === 1 ? '2.4' : '4.8'} km dari lokasi Anda
                    </p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-primary" />
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card className="rounded-[3rem] border-none shadow-xl bg-primary p-8 relative overflow-hidden text-white">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-[80px]"></div>
          <div className="relative z-10 space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 bg-white/10 rounded-2xl flex items-center justify-center">
                <Store className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-black font-headline">Promo Musim Panen</h3>
            </div>
            <p className="text-white/70">Dapatkan harga spesial untuk komoditas yang sedang melimpah bulan ini. Stok terbatas!</p>
            <div className="grid grid-cols-2 gap-4">
               <div className="bg-white/10 p-4 rounded-[2rem] border border-white/10 text-center space-y-2">
                 <p className="text-xs font-bold uppercase tracking-widest text-secondary">Hingga</p>
                 <p className="text-4xl font-black">40%</p>
                 <p className="text-[10px] opacity-70">Khusus Sayur Hijau</p>
               </div>
               <div className="bg-white/10 p-4 rounded-[2rem] border border-white/10 text-center space-y-2">
                 <p className="text-xs font-bold uppercase tracking-widest text-secondary">Cashback</p>
                 <p className="text-4xl font-black">15k</p>
                 <p className="text-[10px] opacity-70">Min. Belanja 100k</p>
               </div>
            </div>
            <Button className="w-full h-14 rounded-2xl bg-white text-primary hover:bg-white/90 font-black text-lg shadow-xl shadow-black/20">
              Klaim Semua Promo
            </Button>
          </div>
        </Card>
      </section>

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
                  <div>
                    <Badge variant="outline" className="border-secondary text-secondary mb-2 uppercase tracking-[0.2em] text-[10px] px-3 font-black">
                      {selectedProduct.category}
                    </Badge>
                    <DialogTitle className="text-3xl font-black font-headline text-primary mb-2">
                      {selectedProduct.name}
                    </DialogTitle>
                    <div className="flex items-center gap-4 text-sm font-medium text-muted-foreground">
                       <div className="flex items-center gap-1.5"><Star className="h-4 w-4 text-yellow-500 fill-yellow-500" /> {selectedProduct.rating} ({selectedProduct.reviews} Ulasan)</div>
                       <div className="h-1 w-1 rounded-full bg-muted-foreground"></div>
                       <div className="flex items-center gap-1.5"><Clock className="h-4 w-4 text-primary" /> Terakhir Panen: {selectedProduct.harvestDate}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-black text-primary">Rp {selectedProduct.price.toLocaleString()}</span>
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
                    <Button variant="ghost" size="icon" className="rounded-full"><ChevronRight className="h-5 w-5" /></Button>
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
                  <Button className="flex-1 h-14 rounded-2xl bg-primary hover:bg-primary/90 text-white font-black text-lg shadow-xl shadow-primary/20">
                    Beli Sekarang
                  </Button>
                  <Button variant="outline" className="h-14 w-14 rounded-2xl border-primary/20 hover:bg-primary/5 text-primary p-0">
                    <ShoppingCart className="h-6 w-6" />
                  </Button>
                </div>
                
                <div className="flex justify-center gap-6 pt-2">
                  <button className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5">
                    <User className="h-3 w-3" /> Lihat Profil
                  </button>
                  <button className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5">
                    <Store className="h-3 w-3" /> Lihat Kebun
                  </button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
