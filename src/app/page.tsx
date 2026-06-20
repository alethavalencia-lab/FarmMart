
"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Sprout, 
  BarChart3, 
  TrendingUp, 
  PlayCircle, 
  Users, 
  ShoppingCart, 
  Star, 
  Heart, 
  ChevronRight, 
  ArrowRight,
  Globe,
  Leaf,
  ShieldCheck,
  MessageSquare,
  Smartphone,
  CheckCircle2
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { cn } from "@/lib/utils";
import { useEffect, useState, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";

export default function LandingPage() {
  const [mounted, setMounted] = useState(false);
  const [highlight, setHighlight] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleScrollToRegistration = useCallback((e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    
    const element = document.getElementById("registration-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setHighlight(true);
      
      toast({
        title: "Pendaftaran Diperlukan",
        description: "Silakan buat akun Farm Mart terlebih dahulu untuk mengakses fitur ini.",
        duration: 3000,
      });

      setTimeout(() => setHighlight(false), 2000);
    }
  }, [toast]);

  const heroImageUrl = "https://res.cloudinary.com/dxsfqi45d/image/upload/f_auto,q_auto/nature_mo7kej";
  const roiChartImg = PlaceHolderImages.find(img => img.id === 'investasi-roi-chart');
  
  const quickNav = [
    { id: 'quick-nav-farmers', label: "Petani Kami", icon: Users },
    { id: 'quick-nav-live', label: "Live Tani", icon: PlayCircle },
    { id: 'quick-nav-fresh', label: "Produk Segar", icon: Sprout },
    { id: 'quick-nav-invest', label: "Investasi Tani", icon: TrendingUp },
    { id: 'quick-nav-b2b', label: "B2B Partnership", icon: Globe },
    { id: 'quick-nav-market', label: "Marketplace", icon: ShoppingCart },
  ].map(item => ({
    ...item,
    image: PlaceHolderImages.find(img => img.id === item.id)
  }));

  const popularToday = [
    { id: 'prod-sayur', name: "Sayur Organik Lembang", farmer: "Pak Maman", price: "Rp 15.000", rating: 4.9 },
    { id: 'prod-buah', name: "Melon Cantaloupe Premium", farmer: "Ibu Siti", price: "Rp 45.000", rating: 4.8 },
    { id: 'prod-rempah', name: "Kunyit Segar Dieng", farmer: "Pak Budi", price: "Rp 12.000", rating: 4.7 },
    { id: 'prod-organik', name: "Madu Hutan Asli", farmer: "Kelompok Tani", price: "Rp 85.000", rating: 5.0 },
  ].map(p => ({
    ...p,
    image: PlaceHolderImages.find(img => img.id === p.id)
  }));

  const ecosystem = [
    { 
      title: "Belanja Hasil Tani", 
      desc: "Nikmati kesegaran langsung dari kebun dengan harga terbaik.",
      cta: "Belanja Sekarang",
      bg: "bg-primary",
      role: "Konsumen"
    },
    { 
      title: "Jual Produk Anda", 
      desc: "Platform digital untuk petani menjangkau pasar lebih luas.",
      cta: "Mulai Berjualan",
      bg: "bg-secondary",
      role: "Petani"
    },
    { 
      title: "Mulai Investasi", 
      desc: "Dukung kemandirian pangan and raih profit berkelanjutan.",
      cta: "Mulai Invest",
      bg: "bg-accent",
      role: "Investor"
    },
    { 
      title: "Cari Mitra Bisnis", 
      desc: "Hubungi distributor and mitra HORECA skala besar.",
      cta: "Hubungi Mitra",
      bg: "bg-primary/80",
      role: "Bisnis"
    },
  ];

  const stories = [
    { id: 'farmer-story-1', name: "Pak Maman", location: "Lembang", specialty: "Sayur Hidroponik", story: "Membawa teknologi modern ke desa kami untuk hasil panen yang lebih bersih." },
    { id: 'farmer-story-2', name: "Siti Rahma", location: "Toraja", specialty: "Kopi Arabika", story: "Melestarikan tradisi kopi toraja dengan standar kualitas internasional." },
    { id: 'farmer-story-3', name: "Arif Hidayat", location: "Dieng", specialty: "Beras Merah", story: "Bertani organik untuk masa depan tanah and kesehatan keluarga Indonesia." },
  ].map(s => ({
    ...s,
    image: PlaceHolderImages.find(img => img.id === s.id)
  }));

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-background selection:bg-secondary/30">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-[900px] w-full flex items-center overflow-hidden">
        {/* Immersive Background Container */}
        <div className="absolute inset-0 z-0 p-2 sm:p-4">
          <div className="relative w-full h-full rounded-[2.5rem] sm:rounded-[3.5rem] lg:rounded-[4rem] overflow-hidden shadow-2xl">
            <Image
              src={heroImageUrl}
              alt="Farm Mart Hero"
              fill
              className="object-cover brightness-[0.85] scale-100"
              priority
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent"></div>
          </div>
        </div>

        {/* Content Container */}
        <div className="container mx-auto px-6 relative z-10 pt-48 pb-40 sm:pb-56">
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
            <div className="space-y-8 animate-in fade-in slide-in-from-left duration-1000">
              <div className="space-y-4">
                <Badge className="bg-secondary text-white border-none px-4 py-1.5 rounded-full font-bold tracking-wide">
                  #1 AGRITECH ECOSYSTEM
                </Badge>
                <h1 className="text-5xl md:text-7xl font-bold font-headline text-white leading-tight">
                  Dari Lahan Terbaik, <br />
                  <span className="text-secondary italic">Langsung ke Tangan Anda.</span>
                </h1>
                <p className="text-xl text-white/90 max-w-xl font-body leading-relaxed">
                  Hubungkan petani, konsumen, investor, dan mitra bisnis dalam satu ekosistem pertanian digital modern yang transparan, segar, dan berkelanjutan.
                </p>
              </div>
              
              <div className="flex flex-wrap gap-5">
                <Button onClick={handleScrollToRegistration} size="lg" className="rounded-full bg-primary hover:bg-primary/90 text-white px-10 h-16 shadow-2xl shadow-primary/40 text-lg font-bold transition-all active:scale-95">
                  Belanja Sekarang
                </Button>
                <Button onClick={handleScrollToRegistration} size="lg" variant="outline" className="rounded-full border-2 border-white text-white hover:bg-white/10 px-10 h-16 text-lg font-bold backdrop-blur-sm group transition-all active:scale-95">
                  <PlayCircle className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform" />
                  Jelajahi Live Tani
                </Button>
              </div>
            </div>

            <div className="hidden lg:block relative h-[600px]">
              <div className="absolute top-10 right-0 glassmorphism p-6 rounded-[2.5rem] shadow-2xl w-72 animate-bounce-slow border-white/30 z-20">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-secondary p-3 rounded-2xl">
                    <TrendingUp className="text-white h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider">Market Growth</p>
                    <p className="text-2xl font-black text-primary">+24.5%</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-1.5 w-full bg-primary/10 rounded-full overflow-hidden">
                    <div className="h-full w-[80%] bg-primary"></div>
                  </div>
                  <p className="text-[10px] text-muted-foreground font-medium">Demand rising in West Java area</p>
                </div>
              </div>

              <div className="absolute bottom-10 left-0 glassmorphism p-6 rounded-[2.5rem] shadow-2xl w-64 animate-float border-white/30 z-20">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse"></div>
                  <span className="text-[10px] font-black uppercase text-red-500 tracking-widest">Live Now</span>
                </div>
                <div className="relative h-24 rounded-2xl overflow-hidden mb-3">
                  <Image src="https://res.cloudinary.com/dxsfqi45d/image/upload/v1779958695/Screenshot_2026-05-28_155251_rll9xs.png" alt="Live" fill className="object-cover" />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <PlayCircle className="text-white h-8 w-8" />
                  </div>
                </div>
                <p className="text-sm font-bold line-clamp-1">Panen Selada Lembang</p>
                <p className="text-[10px] text-muted-foreground">1.2k Menonton</p>
              </div>
            </div>
          </div>

          {/* Statistics Section */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-8 sm:gap-16 pt-12 border-t border-white/20 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500">
            <div className="text-center lg:text-left">
              <p className="text-4xl font-black text-white">15k+</p>
              <p className="text-[10px] text-white/60 font-black uppercase tracking-[0.2em]">Petani Aktif</p>
            </div>
            <div className="hidden sm:block h-12 w-px bg-white/20"></div>
            <div className="text-center lg:text-left">
              <p className="text-4xl font-black text-white">250+</p>
              <p className="text-[10px] text-white/60 font-black uppercase tracking-[0.2em]">Komoditas</p>
            </div>
            <div className="hidden sm:block h-12 w-px bg-white/20"></div>
            <div className="text-center lg:text-left">
              <p className="text-4xl font-black text-white">4.9/5</p>
              <p className="text-[10px] text-white/60 font-black uppercase tracking-[0.2em]">Rating Kami</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Access Cards */}
      <section className="relative z-30 -mt-20 container mx-auto px-6 pb-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {quickNav.map((item, i) => (
            <Card key={i} onClick={handleScrollToRegistration} className="group glassmorphism border-none shadow-xl rounded-[2rem] overflow-hidden cursor-pointer hover:scale-105 transition-all duration-300">
              <CardContent className="p-4 flex flex-col items-center text-center space-y-3">
                <div className="relative w-full aspect-video rounded-2xl overflow-hidden opacity-80 group-hover:opacity-100 transition-opacity">
                  {item.image?.imageUrl && (
                    <Image src={item.image.imageUrl} alt={item.label} fill className="object-cover" />
                  )}
                </div>
                <div className="bg-primary/10 p-2.5 rounded-xl group-hover:bg-primary group-hover:text-white transition-colors">
                  <item.icon className="h-5 w-5" />
                </div>
                <span className="text-sm font-bold tracking-tight">{item.label}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Popular Today Section */}
      <section className="py-24 container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
          <div className="space-y-3">
            <Badge variant="outline" className="border-primary text-primary px-3 py-1 rounded-full">MARKETPLACE</Badge>
            <h2 className="text-4xl md:text-5xl font-bold font-headline text-primary leading-tight">Populer Hari Ini</h2>
            <p className="text-muted-foreground max-w-lg">Produk segar kurasi terbaik dari mitra tani kami, siap dikirim untuk kebutuhan harian Anda.</p>
          </div>
          <Button onClick={handleScrollToRegistration} variant="ghost" className="font-bold text-lg group text-secondary p-0 h-auto hover:bg-transparent">
            Lihat Semua Produk <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform" />
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {popularToday.map((p, idx) => (
            <div key={idx} onClick={handleScrollToRegistration} className="group cursor-pointer relative bg-white rounded-[2.5rem] p-4 shadow-sm hover:shadow-2xl transition-all duration-500 border border-primary/5">
              <div className="relative aspect-square rounded-[2rem] overflow-hidden mb-6">
                {p.image?.imageUrl && (
                  <Image src={p.image.imageUrl} alt={p.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                )}
                <button onClick={(e) => { e.stopPropagation(); handleScrollToRegistration(); }} className="absolute top-4 right-4 p-2.5 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-secondary hover:text-white transition-all">
                  <Heart className="h-4 w-4" />
                </button>
                <div className="absolute bottom-4 left-4 flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={cn("h-3 w-3", i < 4 ? "text-yellow-400 fill-yellow-400" : "text-white/50 fill-white/50")} />
                  ))}
                </div>
              </div>
              <div className="px-2 space-y-4">
                <div className="space-y-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-lg leading-tight line-clamp-1">{p.name}</h3>
                  </div>
                  <p className="text-xs text-muted-foreground font-semibold flex items-center gap-1.5">
                    <Users className="h-3 w-3" /> {p.farmer}
                  </p>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-primary/5">
                  <p className="text-xl font-black text-primary">{p.price}</p>
                  <Button onClick={(e) => { e.stopPropagation(); handleScrollToRegistration(); }} size="icon" className="rounded-2xl bg-primary hover:bg-secondary shadow-lg shadow-primary/20 group-hover:scale-110 transition-all">
                    <ShoppingCart className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Ecosystem Choice Section */}
      <section className="py-24 bg-primary/5 overflow-hidden">
        <div className="container mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ecosystem.map((card, i) => (
            <Card key={i} onClick={handleScrollToRegistration} className={cn(
              "group relative h-[450px] cursor-pointer border-none rounded-[3rem] overflow-hidden shadow-xl transition-all duration-500 hover:-translate-y-4",
              card.bg
            )}>
              <div className="absolute inset-0 opacity-20 mix-blend-overlay scale-125 group-hover:scale-100 transition-transform duration-1000">
                <Image src={`https://picsum.photos/seed/eco${i}/800/1200`} alt="BG" fill className="object-cover" />
              </div>
              <CardContent className="relative z-10 h-full p-10 flex flex-col justify-end text-white">
                <Badge className="bg-white/20 text-white w-fit mb-4 px-4 py-1 rounded-full text-xs font-bold border-none uppercase tracking-widest">{card.role}</Badge>
                <h3 className="text-3xl font-black font-headline mb-4 leading-tight">{card.title}</h3>
                <p className="text-sm opacity-80 mb-8 leading-relaxed">{card.desc}</p>
                <Button onClick={(e) => { e.stopPropagation(); handleScrollToRegistration(); }} className="w-full h-14 rounded-full bg-white text-primary hover:bg-white/90 font-bold text-base shadow-xl group/btn">
                  {card.cta} <ChevronRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Storytelling Section */}
      <section className="py-24 container mx-auto px-6">
        <div className="text-center mb-20 space-y-4">
          <Badge className="bg-secondary/10 text-secondary border-none px-4 py-1.5 rounded-full font-bold">HUMAN CENTERED</Badge>
          <h2 className="text-4xl md:text-6xl font-black font-headline text-primary">Kisah di Balik Panen</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">Setiap produk membawa cerita tentang dedikasi, tanah yang subur, and harapan bagi masa depan pertanian Indonesia.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          {stories.map((story, i) => (
            <div key={i} onClick={handleScrollToRegistration} className="group cursor-pointer relative h-[600px] rounded-[3rem] overflow-hidden shadow-2xl">
              {story.image?.imageUrl && (
                <Image src={story.image.imageUrl} alt={story.name} fill className="object-cover group-hover:scale-105 transition-transform duration-1000" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
              <div className="absolute bottom-0 p-10 space-y-4 text-white">
                <div className="space-y-1">
                  <Badge className="bg-primary text-white border-none">{story.specialty}</Badge>
                  <h3 className="text-3xl font-bold">{story.name}</h3>
                  <p className="text-sm opacity-70 font-semibold uppercase tracking-widest flex items-center gap-2">
                    <Globe className="h-3 w-3" /> {story.location}
                  </p>
                </div>
                <p className="text-sm italic leading-relaxed opacity-90 border-l-2 border-secondary pl-4">"{story.story}"</p>
                <Button variant="link" onClick={(e) => { e.stopPropagation(); handleScrollToRegistration(); }} className="text-secondary p-0 h-auto font-bold text-base hover:no-underline hover:gap-3 transition-all">
                  Baca Kisah Selengkapnya <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Live Tani Social Commerce Section */}
      <section className="py-24 container mx-auto px-6 overflow-hidden">
        <div className="bg-black rounded-[4rem] p-12 md:p-20 relative flex flex-col lg:flex-row items-center gap-12 border border-white/10 shadow-[0_0_80px_rgba(46,125,50,0.2)]">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-[100px] -mr-48 -mt-48"></div>
          
          <div className="lg:w-1/2 space-y-8 relative z-10 text-center lg:text-left">
            <div className="space-y-4">
              <Badge className="bg-red-500/10 text-red-500 border-red-500/20 px-4 py-1.5 rounded-full font-bold flex items-center gap-2 w-fit mx-auto lg:mx-0">
                <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse"></div> LIVE TANI
              </Badge>
              <h2 className="text-4xl md:text-6xl font-black font-headline text-white leading-tight">Social Commerce: <br /><span className="text-secondary">Belanja dari Lahan.</span></h2>
              <p className="text-white/60 text-lg leading-relaxed max-w-xl">Hadirkan pengalaman belanja yang transparan. Tonton langsung proses panen, berinteraksi dengan petani, and beli produk segar seketika itu juga.</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto lg:mx-0">
              <div className="bg-white/5 backdrop-blur-md p-4 rounded-3xl border border-white/10 flex items-center gap-3">
                <MessageSquare className="text-secondary h-6 w-6" />
                <span className="text-xs text-white/80 font-bold">Interaksi Langsung</span>
              </div>
              <div className="bg-white/5 backdrop-blur-md p-4 rounded-3xl border border-white/10 flex items-center gap-3">
                <ShieldCheck className="text-primary h-6 w-6" />
                <span className="text-xs text-white/80 font-bold">Kualitas Terjamin</span>
              </div>
            </div>

            <Button onClick={handleScrollToRegistration} size="lg" className="rounded-full bg-secondary hover:bg-secondary/90 text-white px-10 h-16 shadow-2xl shadow-secondary/40 text-lg font-bold w-full sm:w-auto transition-all active:scale-95">
              Tonton Sekarang
            </Button>
          </div>

          <div className="lg:w-1/2 relative group cursor-pointer" onClick={handleScrollToRegistration}>
            <div className="absolute -inset-4 bg-primary/20 rounded-[3rem] blur-2xl group-hover:bg-primary/30 transition-all"></div>
            <div className="relative h-[500px] w-full max-w-[400px] mx-auto rounded-[3rem] overflow-hidden border-8 border-white/10 shadow-2xl">
              <Image src="https://res.cloudinary.com/dhp46iviu/image/upload/q_auto/f_auto/v1780968259/ChatGPT_Image_Jun_9_2026_08_23_51_AM_hcarto.png" alt="Live Mockup" fill className="object-cover" />
              <div className="absolute inset-0 bg-black/30"></div>
              
              {/* Overlay UI */}
              <div className="absolute top-6 left-6 flex items-center gap-2">
                 <Badge className="bg-red-500 border-none px-2 rounded-sm text-[10px] font-bold">LIVE</Badge>
                 <Badge className="bg-black/40 backdrop-blur-md text-[10px] border-none font-bold">1.2k Viewers</Badge>
              </div>
              <div className="absolute bottom-6 left-6 right-6 space-y-4">
                 <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md p-2 rounded-2xl border border-white/20">
                    <div className="h-10 w-10 rounded-xl overflow-hidden relative">
                       <Image src="https://picsum.photos/seed/lettuce/100/100" alt="Product" fill className="object-cover" />
                    </div>
                    <div className="flex-1">
                       <p className="text-[10px] text-white/70 font-bold">FEATURED</p>
                       <p className="text-xs text-white font-bold line-clamp-1">Selada Organik Segar</p>
                    </div>
                    <Button onClick={(e) => { e.stopPropagation(); handleScrollToRegistration(); }} size="sm" className="bg-secondary text-white h-8 rounded-lg text-[10px] font-bold">Beli</Button>
                 </div>
                 <div className="flex gap-2">
                    <div className="flex-1 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center px-4 text-white/60 text-xs">Say hi to Pak Tani...</div>
                    <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center"><Heart className="text-white h-5 w-5" /></div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Market Insight Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge variant="outline" className="border-secondary text-secondary">MARKET INSIGHTS</Badge>
              <h2 className="text-4xl md:text-5xl font-black font-headline text-primary leading-tight">Pantau Tren Pasar <br />Secara Real-Time</h2>
              <p className="text-muted-foreground text-lg leading-relaxed">Keputusan cerdas didasarkan pada data. Akses harga komoditas terkini, tren permintaan pasar, and prediksi ROI untuk investasi Anda.</p>
            </div>
            
            <div className="space-y-4">
              {[
                { label: "Harga Cabai Merah", value: "Rp 32.000", change: "+5.2%", status: "up" },
                { label: "Permintaan Sayur Hijau", value: "Tinggi", change: "+12.0%", status: "up" },
                { label: "Estimasi Yield Padi", value: "6.2 Ton/Ha", change: "+2.5%", status: "up" },
              ].map((item, i) => (
                <div key={i} onClick={handleScrollToRegistration} className="flex cursor-pointer items-center justify-between p-6 bg-primary/5 rounded-[2rem] border border-primary/10 hover:bg-primary/10 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="bg-primary/10 p-3 rounded-2xl">
                      <BarChart3 className="text-primary h-6 w-6" />
                    </div>
                    <span className="font-bold text-lg">{item.label}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-black text-primary">{item.value}</p>
                    <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-0.5 rounded-full">{item.change}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative group cursor-pointer" onClick={handleScrollToRegistration}>
            <div className="absolute -inset-10 bg-accent/10 rounded-full blur-[100px] animate-pulse"></div>
            <Card className="relative z-10 rounded-[3rem] border-none shadow-2xl overflow-hidden bg-white p-10 flex items-center justify-center group-hover:scale-[1.02] transition-transform min-h-[480px]">
               <div className="relative w-full h-full min-h-[400px]">
                  {roiChartImg?.imageUrl && (
                    <Image 
                      src={roiChartImg.imageUrl} 
                      alt="Investasi Tani ROI" 
                      fill 
                      className="object-contain" 
                      data-ai-hint={roiChartImg.imageHint}
                    />
                  )}
               </div>
            </Card>
          </div>
        </div>
      </section>

      {/* App Promo Section */}
      <section className="py-24 container mx-auto px-6">
        <div className="bg-primary rounded-[4rem] p-12 md:p-20 relative overflow-hidden flex flex-col lg:flex-row items-center gap-16 text-white">
           <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full -mr-64 -mt-64 blur-[100px]"></div>
           <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/20 rounded-full -ml-64 -mb-64 blur-[100px]"></div>
           
           <div className="lg:w-1/2 space-y-8 relative z-10 text-center lg:text-left">
              <div className="space-y-4">
                <Badge className="bg-white/20 text-white border-none px-4 py-1.5 rounded-full font-bold">COMING SOON</Badge>
                <h2 className="text-4xl md:text-6xl font-black font-headline leading-tight">Farm Mart <br />di Genggaman Anda.</h2>
                <p className="text-primary-foreground/70 text-lg leading-relaxed max-w-lg">Pantau panen, kelola investasi, and belanja produk segar langsung dari smartphone Anda. Dapatkan notifikasi real-time harga pasar.</p>
              </div>
              
              <div className="space-y-4 max-w-md mx-auto lg:mx-0">
                 {[
                   "Track pengiriman real-time",
                   "E-Wallet khusus petani and mitra",
                   "Dashboard investasi interaktif",
                   "Notifikasi live panen favorit"
                 ].map((text, i) => (
                   <div key={i} className="flex items-center gap-3">
                      <CheckCircle2 className="text-secondary h-6 w-6" />
                      <span className="font-semibold text-white/90">{text}</span>
                   </div>
                 ))}
              </div>

              <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-4">
                 <Button onClick={handleScrollToRegistration} className="h-16 px-8 rounded-2xl bg-white text-primary hover:bg-white/90 font-bold flex items-center gap-3">
                    <Smartphone className="h-6 w-6" /> App Store
                 </Button>
                 <Button onClick={handleScrollToRegistration} variant="outline" className="h-16 px-8 rounded-2xl border-white/30 bg-white/10 hover:bg-white/20 text-white font-bold flex items-center gap-3">
                    <Smartphone className="h-6 w-6" /> Play Store
                 </Button>
              </div>
           </div>

           <div className="lg:w-1/2 relative flex justify-center cursor-pointer" onClick={handleScrollToRegistration}>
              <div className="absolute -inset-10 bg-white/10 rounded-full blur-[100px]"></div>
              <div className="relative h-[600px] w-full max-w-[300px] rounded-[3.5rem] overflow-hidden border-8 border-white/20 shadow-[0_0_100px_rgba(255,255,255,0.1)] group">
                 <Image src="https://res.cloudinary.com/dhp46iviu/image/upload/v1780969444/ChatGPT_Image_Jun_9_2026_08_43_16_AM_nythaq.png" alt="App Mockup" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
           </div>
        </div>
      </section>

      {/* CTA Bottom Section */}
      <section id="registration-section" className={cn(
        "py-32 container mx-auto px-6 text-center transition-all duration-1000",
        highlight && "ring-8 ring-secondary/20 rounded-[4rem] bg-secondary/5 scale-[1.02]"
      )}>
         <div className="max-w-4xl mx-auto space-y-12">
            <h2 className="text-5xl md:text-7xl font-black font-headline text-primary leading-[1.1]">Siap Menjadi Bagian dari <span className="text-secondary">Transformasi Pertanian?</span></h2>
            <p className="text-xl text-muted-foreground leading-relaxed">Gabung sekarang and nikmati ekosistem digital terbaik untuk masa depan pangan Indonesia yang mandiri and berkelanjutan.</p>
            <div className="flex flex-wrap justify-center gap-6">
               <Link href="/auth">
                  <Button size="lg" className="rounded-full bg-primary hover:bg-primary/90 text-white px-12 h-20 text-xl font-black shadow-2xl shadow-primary/30 transition-all active:scale-95">
                    Mulai Sekarang
                  </Button>
               </Link>
               <Button onClick={() => {
                 toast({
                   title: "Layanan Dukungan",
                   description: "Tim kami akan segera menghubungi Anda melalui email.",
                 });
               }} size="lg" variant="outline" className="rounded-full border-2 border-secondary text-secondary hover:bg-secondary/5 px-12 h-20 text-xl font-black transition-all active:scale-95">
                  Hubungi Tim Kami
               </Button>
            </div>
         </div>
      </section>

      {/* Premium Footer */}
      <footer className="bg-primary/5 pt-24 pb-12 px-6 border-t border-primary/10">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-20">
            <div className="lg:col-span-2 space-y-8">
              <Link href="/" className="flex items-center gap-3">
                <div className="relative h-12 w-12">
                  <Image
                    src="https://drive.google.com/uc?export=view&id=1iPX9w3Kum27Z858Vo-CV1mGQQPuvYv8a"
                    alt="Farm Mart Logo"
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="text-2xl font-black font-headline tracking-tight text-primary">
                  Farm <span className="text-secondary">Mart</span>
                </span>
              </Link>
              <p className="text-muted-foreground max-w-sm text-lg leading-relaxed font-medium">
                Digital ecosystem for farmers, customers, investors, and business partners. Built for premium agritech future.
              </p>
              <div className="flex gap-4">
                 {['Twitter', 'Instagram', 'LinkedIn', 'YouTube'].map((social, i) => (
                   <button key={i} onClick={handleScrollToRegistration} className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all">
                      <span className="sr-only">{social}</span>
                      <Globe className="h-5 w-5" />
                   </button>
                 ))}
              </div>
            </div>

            <div className="space-y-6">
              <h4 className="text-lg font-black font-headline text-primary uppercase tracking-widest">Layanan</h4>
              <ul className="space-y-4">
                {['Marketplace', 'Live Tani', 'B2B Hub', 'Logistik Tani', 'Analitik Pasar'].map((link, i) => (
                  <li key={i}><button onClick={handleScrollToRegistration} className="text-muted-foreground font-semibold hover:text-secondary transition-colors text-left">{link}</button></li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="text-lg font-black font-headline text-primary uppercase tracking-widest">Ecosystem</h4>
              <ul className="space-y-4">
                {['Gabung Petani', 'Info Investor', 'Karier Kami', 'Sustainability', 'Program Mitra'].map((link, i) => (
                  <li key={i}><button onClick={handleScrollToRegistration} className="text-muted-foreground font-semibold hover:text-secondary transition-colors text-left">{link}</button></li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="text-lg font-black font-headline text-primary uppercase tracking-widest">Dukungan</h4>
              <ul className="space-y-4">
                {['Pusat Bantuan', 'Hubungi Kami', 'Kebijakan Privasi', 'Syarat \u0026 Ketentuan', 'FAQ'].map((link, i) => (
                  <li key={i}><button onClick={handleScrollToRegistration} className="text-muted-foreground font-semibold hover:text-secondary transition-colors text-left">{link}</button></li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="pt-12 border-t border-primary/10 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-sm text-muted-foreground font-bold">© 2024 Farm Mart Ecosystem. All rights reserved.</p>
            <div className="flex items-center gap-6">
               <div className="flex items-center gap-2 text-primary font-bold">
                  <Leaf className="h-5 w-5" /> 100% Sustainable
               </div>
               <div className="flex items-center gap-2 text-primary font-bold">
                  <ShieldCheck className="h-5 w-5" /> Verified Secure
               </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
