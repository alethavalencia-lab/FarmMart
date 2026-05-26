import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Sprout, BarChart3, TrendingUp, Truck, PlayCircle, Users, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { cn } from "@/lib/utils";

export default function LandingPage() {
  const featuredProducts = [
    { name: "Tomat Cherry Organik", price: "Rp 24.000", id: "prod-tomato" },
    { name: "Cabai Rawit Premium", price: "Rp 18.500", id: "prod-chili" },
    { name: "Wortel Segar Lembang", price: "Rp 12.000", id: "prod-carrot" },
    { name: "Bayam Jepang (Horenzo)", price: "Rp 15.000", id: "prod-spinach" },
  ].map(p => ({
    ...p,
    image: PlaceHolderImages.find(img => img.id === p.id)
  }));

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8 animate-in fade-in slide-in-from-left duration-700">
          <div className="space-y-4">
            <Badge className="bg-secondary/10 text-secondary border-none hover:bg-secondary/20 px-4 py-1">
              #1 Digital Agritech Ecosystem
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold font-headline leading-tight text-primary">
              Masa Depan <span className="text-secondary italic">Pertanian</span> di Tangan Anda.
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl font-body leading-relaxed">
              Hubungkan Petani, Konsumen, Investor, dan Mitra Bisnis dalam satu ekosistem digital yang cerdas, transparan, dan berkelanjutan.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-4">
            <Link href="/marketplace">
              <Button size="lg" className="rounded-full bg-primary hover:bg-primary/90 text-white px-8 h-14 shadow-xl shadow-primary/20 text-base font-semibold">
                Belanja Sekarang
              </Button>
            </Link>
            <Link href="/live">
              <Button size="lg" variant="outline" className="rounded-full border-2 border-secondary text-secondary hover:bg-secondary/5 px-8 h-14 text-base font-semibold group">
                <PlayCircle className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                Live Panen
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-8 pt-4">
            <div>
              <p className="text-3xl font-bold text-primary">15k+</p>
              <p className="text-sm text-muted-foreground">Petani Aktif</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-primary">250+</p>
              <p className="text-sm text-muted-foreground">Komoditas</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-primary">4.9/5</p>
              <p className="text-sm text-muted-foreground">Rating Pengguna</p>
            </div>
          </div>
        </div>

        <div className="relative group animate-in fade-in slide-in-from-right duration-700">
          <div className="absolute -inset-4 bg-accent/20 rounded-[3rem] blur-2xl group-hover:bg-accent/30 transition-all duration-500"></div>
          <Card className="relative overflow-hidden border-none shadow-2xl rounded-[3rem] h-[500px] w-full">
            <Image
              src="https://kj1bcdn.b-cdn.net/media/62657/bkj.jpg"
              alt="Farm Mart Agriculture Hero"
              fill
              className="object-cover"
              priority
            />
          </Card>
          
          {/* Floating Stats Card */}
          <div className="absolute -bottom-6 -left-6 glassmorphism p-4 rounded-2xl shadow-xl flex items-center gap-4 animate-bounce-slow">
            <div className="bg-secondary p-3 rounded-xl">
              <TrendingUp className="text-white h-6 w-6" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">ROI Rata-rata</p>
              <p className="text-xl font-bold text-primary">+24.5%</p>
            </div>
          </div>
        </div>
      </section>

      {/* Role Tabs Section */}
      <section className="py-20 bg-primary/5">
        <div className="max-w-7xl mx-auto px-6 text-center mb-16">
          <h2 className="text-4xl font-bold font-headline mb-4 text-primary">Ekosistem untuk Semua</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Kami menghadirkan platform yang adil and efisien untuk setiap pemangku kepentingan dalam rantai pasok agrikultur.</p>
        </div>

        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "Petani", icon: Sprout, desc: "SaaS Dashboard untuk manajemen lahan dan prediksi panen berbasis AI.", color: "bg-primary" },
            { title: "Customer", icon: ShoppingCart, desc: "Dapatkan produk segar langsung dari lahan melalui Live Commerce.", color: "bg-secondary" },
            { title: "Investor", icon: BarChart3, desc: "Pendanaan proyek pertanian dengan transparansi ROI dan dampak sosial.", color: "bg-accent" },
            { title: "Mitra Bisnis", icon: Users, desc: "B2B Hub untuk kebutuhan HORECA dan supply chain skala besar.", color: "bg-primary" },
          ].map((role, idx) => (
            <Card key={idx} className="border-none shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group rounded-3xl overflow-hidden bg-white">
              <CardContent className="p-8 space-y-4">
                <div className={cn("p-4 rounded-2xl w-fit group-hover:scale-110 transition-transform", role.color)}>
                  <role.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold font-headline">{role.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{role.desc}</p>
                <Link href="/auth" className="inline-flex items-center text-secondary font-semibold text-sm hover:gap-2 transition-all">
                  Pelajari Selengkapnya →
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Marketplace Teaser */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
          <div className="space-y-2">
            <h2 className="text-4xl font-bold font-headline text-primary">Produk Unggulan Hari Ini</h2>
            <p className="text-muted-foreground">Dipanen langsung pagi ini, dikirim sore ini.</p>
          </div>
          <Link href="/marketplace">
            <Button variant="link" className="text-secondary font-bold text-lg p-0">Lihat Semua Marketplace →</Button>
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {featuredProducts.map((item, idx) => (
            <div key={idx} className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-3xl mb-4 aspect-square">
                {item.image?.imageUrl && (
                  <Image
                    src={item.image.imageUrl}
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    data-ai-hint={item.image.imageHint}
                  />
                )}
                {!item.image?.imageUrl && (
                  <div className="w-full h-full bg-muted animate-pulse" />
                )}
                <div className="absolute top-4 right-4">
                  <Badge className="bg-white/90 text-primary border-none">Segar</Badge>
                </div>
              </div>
              <h4 className="font-bold text-lg mb-1">{item.name}</h4>
              <p className="text-secondary font-bold">{item.price}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto bg-primary rounded-[3rem] overflow-hidden relative p-12 md:p-24 text-center text-white">
          <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/20 rounded-full -mr-32 -mt-32 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/20 rounded-full -ml-32 -mb-32 blur-3xl"></div>
          
          <div className="relative z-10 space-y-8">
            <h2 className="text-4xl md:text-6xl font-bold font-headline max-w-3xl mx-auto leading-tight">
              Siap Memulai Transformasi Pertanian?
            </h2>
            <p className="text-primary-foreground/80 text-lg max-w-xl mx-auto">
              Gabung sekarang dan nikmati ekosistem digital terbaik untuk masa depan pangan Indonesia.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="rounded-full bg-white text-primary hover:bg-white/90 px-8 h-14 font-bold text-lg">
                Daftar Sekarang
              </Button>
              <Button size="lg" variant="outline" className="rounded-full border-2 border-white/30 bg-white/10 hover:bg-white/20 text-white px-8 h-14 font-bold text-lg">
                Hubungi Kami
              </Button>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-background py-12 px-6 border-t">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative h-10 w-10">
              <Image
                src="https://drive.google.com/uc?export=view&id=1iPX9w3Kum27Z858Vo-CV1mGQQPuvYv8a"
                alt="Farm Mart Logo"
                fill
                className="object-contain"
              />
            </div>
            <span className="text-xl font-bold font-headline tracking-tight text-primary">
              Farm<span className="text-secondary">Mart</span>
            </span>
          </Link>
          <p className="text-sm text-muted-foreground">© 2024 Farm Mart. Built for Premium Agritech Future.</p>
          <div className="flex gap-6">
            <Link href="#" className="text-sm hover:text-secondary transition-colors">Twitter</Link>
            <Link href="#" className="text-sm hover:text-secondary transition-colors">Instagram</Link>
            <Link href="#" className="text-sm hover:text-secondary transition-colors">LinkedIn</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
