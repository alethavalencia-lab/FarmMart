
"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { 
  Sprout, 
  CloudRain, 
  TrendingUp, 
  Package, 
  Plus, 
  Sparkles, 
  Calendar, 
  MapPin, 
  ShoppingBag, 
  CheckCircle2, 
  Clock, 
  MoreVertical,
  Camera,
  Layers,
  BarChart3
} from "lucide-react";
import { predictHarvestWindow, PredictHarvestWindowOutput } from "@/ai/flows/predict-harvest-window";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function FarmerDashboard() {
  const { toast } = useToast();
  const [predicting, setPredicting] = useState(false);
  const [prediction, setPrediction] = useState<PredictHarvestWindowOutput | null>(null);

  // Mock data states
  const [products, setProducts] = useState([
    { id: 1, name: "Tomat Cherry Organik", price: 25000, stock: 45, status: "Aktif", category: "Sayur" },
    { id: 2, name: "Cabai Merah Keriting", price: 35000, stock: 120, status: "Aktif", category: "Rempah" },
  ]);

  const [lands, setLands] = useState([
    { id: 1, name: "Kebun Lembang A", location: "Lembang", size: "1.2 Ha", crop: "Tomat" },
    { id: 2, name: "Lahan Dieng B", location: "Wonosobo", size: "0.8 Ha", crop: "Kentang" },
  ]);

  const [projects, setProjects] = useState([
    { id: 1, name: "Ekspansi Hidroponik 2024", target: "Rp 500M", funded: "75%", investors: 12, status: "Open" },
  ]);

  const handlePredict = async () => {
    setPredicting(true);
    try {
      const result = await predictHarvestWindow({
        cropType: "Tomat Cherry",
        plantingDate: "2024-01-15",
        historicalYieldData: "Tahun lalu rata-rata 1.2 ton per hektar. Panen terjadi di bulan April.",
        currentWeatherTrends: "Musim hujan sedikit lebih lama, suhu rata-rata 24-28 derajat celcius.",
        soilType: "Loamy",
        irrigationMethod: "Drip Irrigation"
      });
      setPrediction(result);
    } catch (error) {
      toast({ title: "Error", description: "Gagal memprediksi panen.", variant: "destructive" });
    } finally {
      setPredicting(false);
    }
  };

  const addProduct = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Produk Berhasil Ditambahkan", description: "Produk Anda sekarang tersedia di marketplace." });
  };

  const addLand = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Lahan Berhasil Didaftarkan", description: "Data lahan telah tersimpan dalam sistem." });
  };

  const addProject = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Proyek Investasi Diajukan", description: "Menunggu verifikasi dari tim kurator Farm Mart." });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-black font-headline text-primary tracking-tight">Halo, Pak Tani Maman! 👋</h1>
          <p className="text-muted-foreground text-lg">Pantau performa tani & kelola ekosistem produksi Anda.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90 rounded-2xl h-12 px-6 font-bold shadow-lg shadow-primary/20"><Plus className="mr-2 h-5 w-5" /> Tambah Produk</Button>
            </DialogTrigger>
            <DialogContent className="rounded-[2.5rem] sm:max-w-[600px] border-none glassmorphism">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold">Upload Produk Baru</DialogTitle>
                <DialogDescription>Isi detail produk hasil panen Anda untuk dipasarkan.</DialogDescription>
              </DialogHeader>
              <form onSubmit={addProduct} className="space-y-6 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Nama Produk</Label>
                    <Input placeholder="Misal: Tomat Cherry Premium" className="rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <Label>Kategori</Label>
                    <Select>
                      <SelectTrigger className="rounded-xl">
                        <SelectValue placeholder="Pilih Kategori" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sayur">Sayuran</SelectItem>
                        <SelectItem value="buah">Buah-buahan</SelectItem>
                        <SelectItem value="rempah">Rempah</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Harga (Rp/Kg)</Label>
                    <Input type="number" placeholder="25000" className="rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <Label>Stok (Kg)</Label>
                    <Input type="number" placeholder="50" className="rounded-xl" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Deskripsi Produk</Label>
                  <Textarea placeholder="Ceritakan kesegaran produk Anda..." className="rounded-xl min-h-[100px]" />
                </div>
                <div className="border-2 border-dashed border-primary/20 rounded-2xl p-8 text-center bg-primary/5 cursor-pointer hover:bg-primary/10 transition-colors">
                  <Camera className="h-10 w-10 text-primary/40 mx-auto mb-2" />
                  <p className="text-sm font-bold">Klik untuk upload foto produk</p>
                  <p className="text-[10px] text-muted-foreground">Format JPG, PNG (Maks 5MB)</p>
                </div>
                <DialogFooter>
                  <Button type="submit" className="w-full h-12 rounded-xl bg-secondary hover:bg-secondary/90 text-white font-bold">Terbitkan Produk</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Total Penjualan", value: "Rp 154.2M", icon: TrendingUp, color: "text-secondary", bg: "bg-secondary/10" },
          { label: "Produk Aktif", value: "12 Jenis", icon: Package, color: "text-primary", bg: "bg-primary/10" },
          { label: "Investor Aktif", value: "8 Mitra", icon: Users, color: "text-accent", bg: "bg-accent/10" },
          { label: "Lahan Kelola", value: "4.5 Ha", icon: MapPin, color: "text-blue-600", bg: "bg-blue-50" },
        ].map((stat, i) => (
          <Card key={i} className="rounded-3xl border-none shadow-xl glassmorphism hover:scale-[1.02] transition-all">
            <CardContent className="p-6 flex items-center gap-5">
              <div className={cn("p-4 rounded-2xl", stat.bg)}>
                <stat.icon className={cn("h-6 w-6", stat.color)} />
              </div>
              <div>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{stat.label}</p>
                <p className="text-2xl font-black">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="overview" className="space-y-8">
        <TabsList className="bg-primary/5 p-1.5 rounded-full h-14 border border-primary/10">
          <TabsTrigger value="overview" className="rounded-full px-6 text-sm font-bold data-[state=active]:bg-primary data-[state=active]:text-white">Ikhtisar</TabsTrigger>
          <TabsTrigger value="products" className="rounded-full px-6 text-sm font-bold data-[state=active]:bg-primary data-[state=active]:text-white">Produk Saya</TabsTrigger>
          <TabsTrigger value="orders" className="rounded-full px-6 text-sm font-bold data-[state=active]:bg-primary data-[state=active]:text-white">Pesanan Masuk</TabsTrigger>
          <TabsTrigger value="lands" className="rounded-full px-6 text-sm font-bold data-[state=active]:bg-primary data-[state=active]:text-white">Data Lahan</TabsTrigger>
          <TabsTrigger value="investments" className="rounded-full px-6 text-sm font-bold data-[state=active]:bg-primary data-[state=active]:text-white">Proyek Investasi</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-8 animate-in fade-in duration-500">
          <div className="grid lg:grid-cols-3 gap-8">
            <Card className="lg:col-span-2 rounded-[2.5rem] border-none shadow-xl overflow-hidden bg-white">
              <CardHeader className="bg-primary p-8 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-[80px]"></div>
                <div className="flex justify-between items-center mb-4 relative z-10">
                  <Badge className="bg-white/20 text-white border-none hover:bg-white/30 px-3 py-1 font-bold">AI ASSISTANT</Badge>
                  <Sparkles className="h-6 w-6 text-accent animate-pulse" />
                </div>
                <CardTitle className="text-3xl font-black font-headline relative z-10">Predict Optimal Harvest</CardTitle>
                <CardDescription className="text-primary-foreground/70 text-base relative z-10">Gunakan AI untuk menganalisis waktu terbaik memanen produk Anda.</CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                {!prediction ? (
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label className="font-bold">Komoditas</Label>
                        <Select defaultValue="tomat">
                          <SelectTrigger className="rounded-xl h-12">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="tomat">Tomat Cherry</SelectItem>
                            <SelectItem value="cabai">Cabai Merah</SelectItem>
                            <SelectItem value="kentang">Kentang Dieng</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label className="font-bold">Tanggal Tanam</Label>
                        <Input type="date" defaultValue="2024-01-15" className="rounded-xl h-12" />
                      </div>
                    </div>
                    <Button 
                      onClick={handlePredict} 
                      disabled={predicting}
                      className="w-full h-14 rounded-2xl bg-secondary hover:bg-secondary/90 text-white font-black text-lg shadow-xl shadow-secondary/20 transition-all active:scale-95"
                    >
                      {predicting ? "Menghitung Probabilitas..." : "Mulai Prediksi Cerdas"}
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-6 animate-in slide-in-from-bottom-4">
                    <div className="bg-secondary/5 border-2 border-secondary/20 rounded-[2rem] p-6 space-y-6">
                      <div className="flex items-center justify-between">
                         <h4 className="font-bold text-xl text-primary">Hasil Analisis AI</h4>
                         <Calendar className="text-secondary h-6 w-6" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white p-4 rounded-2xl border border-secondary/10 shadow-sm text-center">
                          <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest mb-1">Jendela Mulai</p>
                          <p className="text-xl font-black text-primary">{prediction.optimalHarvestWindow.startDate}</p>
                        </div>
                        <div className="bg-white p-4 rounded-2xl border border-secondary/10 shadow-sm text-center">
                          <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest mb-1">Jendela Selesai</p>
                          <p className="text-xl font-black text-primary">{prediction.optimalHarvestWindow.endDate}</p>
                        </div>
                      </div>
                      <p className="text-sm italic leading-relaxed text-muted-foreground border-l-4 border-accent pl-4">"{prediction.optimalHarvestWindow.reasoning}"</p>
                    </div>
                    <div className="p-6 bg-primary/5 rounded-[2rem] border border-primary/10">
                       <h5 className="font-bold flex items-center gap-2 mb-3"><CheckCircle2 className="h-5 w-5 text-primary" /> Yield Optimization Advice</h5>
                       <p className="text-sm leading-relaxed text-muted-foreground">{prediction.yieldOptimizationAdvice}</p>
                       <div className="mt-4 pt-4 border-t border-primary/10 flex justify-between items-center">
                          <span className="text-sm font-bold">Potensi Kenaikan Hasil:</span>
                          <Badge className="bg-accent text-white font-black">{prediction.potentialYieldIncrease}</Badge>
                       </div>
                    </div>
                    <Button variant="ghost" onClick={() => setPrediction(null)} className="text-muted-foreground font-bold hover:bg-primary/5">Ulangi Analisis</Button>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="rounded-[2.5rem] border-none shadow-xl bg-white overflow-hidden">
               <CardHeader className="p-8">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-xl font-bold font-headline text-primary">Pesanan Terbaru</CardTitle>
                    <button className="text-xs font-bold text-secondary hover:underline">Lihat Semua</button>
                  </div>
               </CardHeader>
               <CardContent className="px-8 pb-8 space-y-4">
                  {[
                    { id: "#ORD-9912", items: "5kg Tomat Cherry", total: "Rp 125.000", status: "Proses", buyer: "Resto Sedap" },
                    { id: "#ORD-9910", items: "12kg Cabai Merah", total: "Rp 420.000", status: "Kirim", buyer: "Hotel Grand" },
                    { id: "#ORD-9899", items: "2kg Kunyit Segar", total: "Rp 24.000", status: "Selesai", buyer: "Ibu Siti" },
                  ].map((order, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-primary/5 rounded-2xl border border-primary/10 hover:border-primary/30 transition-colors">
                      <div className="space-y-1">
                        <p className="font-black text-sm">{order.id}</p>
                        <p className="text-xs text-muted-foreground">{order.buyer} • {order.items}</p>
                      </div>
                      <div className="text-right space-y-1">
                        <p className="font-bold text-primary text-sm">{order.total}</p>
                        <Badge className={cn(
                          "scale-75 origin-right font-black border-none",
                          order.status === 'Proses' ? "bg-blue-500" : order.status === 'Kirim' ? "bg-orange-500" : "bg-green-500"
                        )}>{order.status}</Badge>
                      </div>
                    </div>
                  ))}
                  <div className="pt-4 p-6 bg-accent/5 rounded-[2rem] border border-accent/20">
                     <div className="flex items-center gap-3 mb-3">
                        <BarChart3 className="text-accent h-5 w-5" />
                        <span className="font-bold text-sm">Produk Terlaris Minggu Ini</span>
                     </div>
                     <div className="space-y-3">
                        <div className="flex justify-between text-xs"><span>Tomat Cherry</span><span className="font-bold">450 Kg</span></div>
                        <Progress value={85} className="h-2 bg-accent/10" />
                        <div className="flex justify-between text-xs"><span>Cabai Merah</span><span className="font-bold">120 Kg</span></div>
                        <Progress value={45} className="h-2 bg-accent/10" />
                     </div>
                  </div>
               </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="products" className="animate-in fade-in duration-500">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((p) => (
              <Card key={p.id} className="rounded-[2rem] border-none shadow-xl overflow-hidden group">
                <div className="relative aspect-video bg-primary/5">
                  <Image src={`https://picsum.photos/seed/prod${p.id}/400/300`} alt={p.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                  <Badge className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-primary border-none font-bold">{p.status}</Badge>
                </div>
                <CardContent className="p-6 space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-[10px] font-black text-secondary uppercase tracking-widest">{p.category}</p>
                      <h4 className="font-bold text-lg leading-tight">{p.name}</h4>
                    </div>
                    <Button variant="ghost" size="icon" className="rounded-full"><MoreVertical className="h-5 w-5" /></Button>
                  </div>
                  <div className="flex justify-between items-end border-t border-primary/10 pt-4">
                    <div>
                      <p className="text-[10px] text-muted-foreground font-bold uppercase">Harga per Kg</p>
                      <p className="text-xl font-black text-primary">Rp {p.price.toLocaleString()}</p>
                    </div>
                    <div className="text-right">
                       <p className="text-[10px] text-muted-foreground font-bold uppercase">Stok</p>
                       <p className="text-sm font-bold">{p.stock} Kg</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" className="rounded-xl h-10 text-xs font-bold border-primary/20">Edit</Button>
                    <Button variant="outline" className="rounded-xl h-10 text-xs font-bold border-destructive/20 text-destructive hover:bg-destructive/5">Hapus</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
            <button className="flex flex-col items-center justify-center gap-4 rounded-[2rem] border-2 border-dashed border-primary/20 hover:bg-primary/5 transition-all p-8 group">
               <div className="p-4 bg-primary/10 rounded-full group-hover:scale-110 transition-transform"><Plus className="h-8 w-8 text-primary" /></div>
               <p className="font-bold text-primary">Tambah Produk</p>
            </button>
          </div>
        </TabsContent>

        <TabsContent value="lands" className="animate-in fade-in duration-500">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {lands.map((land) => (
              <Card key={land.id} className="rounded-[2.5rem] border-none shadow-xl overflow-hidden bg-white">
                <div className="relative aspect-[2/1]">
                  <Image src={`https://picsum.photos/seed/land${land.id}/600/300`} alt={land.name} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-6 flex items-center gap-2 text-white">
                    <MapPin className="h-4 w-4 text-secondary" />
                    <span className="text-sm font-bold">{land.location}</span>
                  </div>
                </div>
                <CardContent className="p-6 space-y-6">
                  <div className="flex justify-between items-center">
                    <h4 className="text-xl font-bold">{land.name}</h4>
                    <Badge className="bg-primary/10 text-primary border-none font-black">{land.size}</Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10">
                      <p className="text-[10px] text-muted-foreground font-bold uppercase mb-1">Tanaman</p>
                      <p className="font-bold">{land.crop}</p>
                    </div>
                    <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10">
                      <p className="text-[10px] text-muted-foreground font-bold uppercase mb-1">Status Tanah</p>
                      <p className="font-bold text-green-600">Subur (pH 6.5)</p>
                    </div>
                  </div>
                  <Button className="w-full rounded-xl bg-primary/10 text-primary hover:bg-primary/20 font-bold">Detail Lahan</Button>
                </CardContent>
              </Card>
            ))}
            <Dialog>
              <DialogTrigger asChild>
                <button className="flex flex-col items-center justify-center gap-4 rounded-[2.5rem] border-2 border-dashed border-primary/20 hover:bg-primary/5 transition-all p-8 group h-full min-h-[300px]">
                   <div className="p-4 bg-primary/10 rounded-full group-hover:scale-110 transition-transform"><Plus className="h-8 w-8 text-primary" /></div>
                   <p className="font-bold text-primary">Input Data Lahan</p>
                </button>
              </DialogTrigger>
              <DialogContent className="rounded-[2.5rem] sm:max-w-[600px] border-none glassmorphism">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold">Daftarkan Lahan Baru</DialogTitle>
                  <DialogDescription>Masukkan informasi teknis lahan garapan Anda.</DialogDescription>
                </DialogHeader>
                <form onSubmit={addLand} className="space-y-6 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Nama Lahan</Label>
                      <Input placeholder="Misal: Kebun Utara" className="rounded-xl h-12" />
                    </div>
                    <div className="space-y-2">
                      <Label>Lokasi (Kota/Kab)</Label>
                      <Input placeholder="Misal: Lembang" className="rounded-xl h-12" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Luas Lahan (Ha)</Label>
                      <Input type="number" step="0.1" placeholder="1.2" className="rounded-xl h-12" />
                    </div>
                    <div className="space-y-2">
                      <Label>Jenis Tanaman Utama</Label>
                      <Input placeholder="Misal: Padi" className="rounded-xl h-12" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Sistem Irigasi</Label>
                    <Select>
                      <SelectTrigger className="rounded-xl h-12">
                        <SelectValue placeholder="Pilih Sistem" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="drip">Drip Irrigation</SelectItem>
                        <SelectItem value="rainfed">Rainfed (Hujan)</SelectItem>
                        <SelectItem value="sprinkler">Sprinkler</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <DialogFooter>
                    <Button type="submit" className="w-full h-12 rounded-xl bg-secondary hover:bg-secondary/90 text-white font-bold">Simpan Data Lahan</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </TabsContent>

        <TabsContent value="investments" className="animate-in fade-in duration-500">
           <div className="grid lg:grid-cols-2 gap-8">
             {projects.map((proj) => (
               <Card key={proj.id} className="rounded-[2.5rem] border-none shadow-xl bg-white overflow-hidden p-8 flex flex-col sm:flex-row gap-8">
                  <div className="relative w-full sm:w-48 h-48 rounded-3xl overflow-hidden shrink-0">
                    <Image src={`https://picsum.photos/seed/proj${proj.id}/400/400`} alt={proj.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1 space-y-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <Badge className="bg-primary/10 text-primary border-none font-black mb-2">{proj.status}</Badge>
                        <h4 className="text-2xl font-black leading-tight">{proj.name}</h4>
                      </div>
                      <Button variant="ghost" size="icon" className="rounded-full"><MoreVertical className="h-5 w-5" /></Button>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground font-medium">Dana Terkumpul</span>
                        <span className="font-black text-primary">{proj.funded} ({proj.target})</span>
                      </div>
                      <Progress value={75} className="h-3 bg-primary/10" />
                      <div className="flex items-center gap-4 text-xs font-bold text-muted-foreground">
                        <span className="flex items-center gap-1"><Users className="h-3 w-3" /> {proj.investors} Investor</span>
                        <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> 12 Hari Lagi</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                       <Button className="flex-1 rounded-xl bg-primary text-white font-bold">Detail Proyek</Button>
                       <Button variant="outline" className="flex-1 rounded-xl font-bold border-primary/20">Update Progress</Button>
                    </div>
                  </div>
               </Card>
             ))}
             <Dialog>
               <DialogTrigger asChild>
                 <button className="flex flex-col items-center justify-center gap-4 rounded-[2.5rem] border-2 border-dashed border-primary/20 hover:bg-primary/5 transition-all p-12 group">
                    <div className="p-4 bg-primary/10 rounded-full group-hover:scale-110 transition-transform"><Plus className="h-8 w-8 text-primary" /></div>
                    <p className="font-bold text-primary">Ajukan Proyek Investasi Baru</p>
                 </button>
               </DialogTrigger>
               <DialogContent className="rounded-[2.5rem] sm:max-w-[700px] border-none glassmorphism">
                 <DialogHeader>
                   <DialogTitle className="text-2xl font-bold">Ajukan Proyek Investasi</DialogTitle>
                   <DialogDescription>Dapatkan dukungan permodalan dari komunitas investor Farm Mart.</DialogDescription>
                 </DialogHeader>
                 <form onSubmit={addProject} className="space-y-6 py-4">
                   <div className="grid grid-cols-2 gap-4">
                     <div className="space-y-2">
                       <Label>Nama Proyek</Label>
                       <Input placeholder="Misal: Ekspansi Melon Cantaloupe" className="rounded-xl h-12" />
                     </div>
                     <div className="space-y-2">
                       <Label>Target Dana (Rp)</Label>
                       <Input type="number" placeholder="250000000" className="rounded-xl h-12" />
                     </div>
                   </div>
                   <div className="grid grid-cols-2 gap-4">
                     <div className="space-y-2">
                       <Label>Estimasi ROI (%)</Label>
                       <Input type="number" placeholder="15" className="rounded-xl h-12" />
                     </div>
                     <div className="space-y-2">
                       <Label>Durasi Proyek (Bulan)</Label>
                       <Input type="number" placeholder="6" className="rounded-xl h-12" />
                     </div>
                   </div>
                   <div className="space-y-2">
                     <Label>Deskripsi Proyek & Tujuan Penggunaan Dana</Label>
                     <Textarea placeholder="Jelaskan potensi proyek Anda kepada calon investor..." className="rounded-xl min-h-[120px]" />
                   </div>
                   <DialogFooter>
                     <Button type="submit" className="w-full h-14 rounded-xl bg-secondary hover:bg-secondary/90 text-white font-black text-lg">Ajukan Sekarang</Button>
                   </DialogFooter>
                 </form>
               </DialogContent>
             </Dialog>
           </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
