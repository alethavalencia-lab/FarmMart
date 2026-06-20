"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { 
  Sprout, 
  TrendingUp, 
  Package, 
  Plus, 
  Sparkles, 
  MapPin, 
  ShoppingBag, 
  PlayCircle, 
  X,
  Upload,
  Trash2,
  Edit2,
  Maximize2,
  Droplets,
  Thermometer,
  Calendar
} from "lucide-react";
import { predictHarvestWindow, PredictHarvestWindowOutput } from "@/ai/flows/predict-harvest-window";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function FarmerDashboard() {
  const { toast } = useToast();
  const [predicting, setPredicting] = useState(false);
  const [prediction, setPrediction] = useState<PredictHarvestWindowOutput | null>(null);
  const [mounted, setMounted] = useState(false);
  
  // Dialog visibility states
  const [isProductDialogOpen, setIsProductDialogOpen] = useState(false);
  const [isProjectDialogOpen, setIsProjectDialogOpen] = useState(false);
  const [isLandDialogOpen, setIsLandDialogOpen] = useState(false);

  // Editing states
  const [editingProduct, setEditingProduct] = useState<any | null>(null);
  const [editingProject, setEditingProject] = useState<any | null>(null);
  const [editingLand, setEditingLand] = useState<any | null>(null);

  // Image states for forms
  const [productImage, setProductImage] = useState<string | null>(null);
  const [projectImage, setProjectImage] = useState<string | null>(null);
  const [landImage, setLandImage] = useState<string | null>(null);
  const productImageInputRef = useRef<HTMLInputElement>(null);
  const projectImageInputRef = useRef<HTMLInputElement>(null);
  const landImageInputRef = useRef<HTMLInputElement>(null);

  // Data states
  const [products, setProducts] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [lands, setLands] = useState<any[]>([]);

  const [orders, setOrders] = useState([
    { id: "#ORD-9912", items: "5kg Tomat Cherry", total: "Rp 125.000", status: "Proses", buyer: "Resto Sedap (Andi)", time: "2 jam yang lalu", payment: "Lunas" },
    { id: "#ORD-9910", items: "12kg Cabai Merah", total: "Rp 420.000", status: "Kirim", buyer: "Hotel Grand (Siti)", time: "5 jam yang lalu", payment: "Lunas" },
    { id: "#ORD-9899", items: "2kg Kunyit Segar", total: "Rp 24.000", status: "Selesai", buyer: "Ibu Siti Aminah", time: "1 hari yang lalu", payment: "Lunas" },
  ]);

  const [activities, setActivities] = useState([
    { text: "Produk 'Tomat Cherry' terjual 5kg ke Resto Sedap", time: "10 menit yang lalu", type: "sale" },
    { text: "Investor baru 'Budi' mendanai Proyek Hidroponik", time: "1 jam yang lalu", type: "investment" },
    { text: "Pesanan #ORD-9910 telah dikirim via Kurir Tani", time: "3 jam yang lalu", type: "logistics" },
  ]);

  useEffect(() => {
    setMounted(true);
    // Products
    const savedProducts = localStorage.getItem("farmer_products_v2");
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    } else {
      const defaultProducts = [
        { id: 1, name: "Tomat Cherry Organik", price: 25000, stock: 45, status: "Aktif", category: "Sayur", description: "Tomat cherry manis segar." },
        { id: 2, name: "Cabai Merah Keriting", price: 35000, stock: 120, status: "Aktif", category: "Rempah", description: "Pedas mantap." },
        { id: 3, name: "Melon Cantaloupe Premium", price: 45000, stock: 30, status: "Stok Tipis", category: "Buah", description: "Manis aromatik." },
      ];
      setProducts(defaultProducts);
      localStorage.setItem("farmer_products_v2", JSON.stringify(defaultProducts));
    }

    // Projects
    const savedProjects = localStorage.getItem("farmer_projects_v2");
    if (savedProjects) {
      setProjects(JSON.parse(savedProjects));
    } else {
      const defaultProjects = [
        { id: 1, name: "Ekspansi Hidroponik 2024", target: "Rp 500.000.000", funded: "75%", investors: 12, status: "Open", description: "Peningkatan kapasitas produksi hidroponik." },
        { id: 2, name: "Irigasi Cerdas Lembang", target: "Rp 250.000.000", funded: "40%", investors: 5, status: "Open", description: "Pemasangan sensor irigasi IoT." },
      ];
      setProjects(defaultProjects);
      localStorage.setItem("farmer_projects_v2", JSON.stringify(defaultProjects));
    }

    // Lands
    const savedLands = localStorage.getItem("farmer_lands_v3");
    if (savedLands) {
      setLands(JSON.parse(savedLands));
    } else {
      const defaultLands = [
        { id: 1, name: "Kebun Lembang A", location: "Bandung Barat", size: "1.2", crop: "Tomat Cherry", status: "Masa Tanam", irrigation: "Drip", soil: "Subur", harvest: "2024-06-12" },
        { id: 2, name: "Lahan Dieng B", location: "Wonosobo", size: "0.8", crop: "Kentang Granola", status: "Siap Panen", irrigation: "Rainfed", soil: "Vulkanik", harvest: "2024-05-20" },
      ];
      setLands(defaultLands);
      localStorage.setItem("farmer_lands_v3", JSON.stringify(defaultLands));
    }
  }, []);

  const formatPrice = (price: number) => {
    if (!mounted) return price.toString();
    return price.toLocaleString();
  };

  const saveProductsToStorage = (updated: any[]) => {
    setProducts(updated);
    localStorage.setItem("farmer_products_v2", JSON.stringify(updated));
  };

  const saveProjectsToStorage = (updated: any[]) => {
    setProjects(updated);
    localStorage.setItem("farmer_projects_v2", JSON.stringify(updated));
  };

  const saveLandsToStorage = (updated: any[]) => {
    setLands(updated);
    localStorage.setItem("farmer_lands_v3", JSON.stringify(updated));
  };

  const handlePredict = async () => {
    setPredicting(true);
    try {
      const result = await predictHarvestWindow({
        cropType: "Tomat Cherry",
        plantingDate: "2024-01-15",
        historicalYieldData: "Tahun lalu rata-rata 1.2 ton per hektar.",
        currentWeatherTrends: "Musim hujan sedikit lebih lama.",
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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'product' | 'project' | 'land') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === 'product') setProductImage(reader.result as string);
        else if (type === 'project') setProjectImage(reader.result as string);
        else setLandImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const submitProductForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    if (editingProduct) {
      const updated = products.map(p => p.id === editingProduct.id ? {
        ...p,
        name: formData.get("name") as string,
        category: formData.get("category") as string,
        price: Number(formData.get("price")),
        stock: Number(formData.get("stock")),
        description: formData.get("description") as string,
        image: productImage || p.image
      } : p);
      saveProductsToStorage(updated);
      toast({ title: "Perubahan Disimpan", description: `${editingProduct.name} telah diperbarui.` });
    } else {
      const newProduct = {
        id: Date.now(),
        name: formData.get("name") as string,
        category: formData.get("category") as string,
        price: Number(formData.get("price")),
        stock: Number(formData.get("stock")),
        description: formData.get("description") as string,
        status: "Aktif",
        image: productImage
      };
      saveProductsToStorage([...products, newProduct]);
      toast({ title: "Produk Berhasil Ditambahkan", description: `${newProduct.name} sekarang tersedia.` });
    }

    setIsProductDialogOpen(false);
    setEditingProduct(null);
    setProductImage(null);
  };

  const submitProjectForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    if (editingProject) {
      const updated = projects.map(p => p.id === editingProject.id ? {
        ...p,
        name: formData.get("name") as string,
        target: `Rp ${Number(formData.get("target")).toLocaleString('id-ID')}`,
        description: formData.get("description") as string,
        image: projectImage || p.image
      } : p);
      saveProjectsToStorage(updated);
      toast({ title: "Proyek Diperbarui", description: `${editingProject.name} telah diperbarui.` });
    } else {
      const newProject = {
        id: Date.now(),
        name: formData.get("name") as string,
        target: `Rp ${Number(formData.get("target")).toLocaleString('id-ID')}`,
        funded: "0%",
        investors: 0,
        status: "Open",
        description: formData.get("description") as string,
        image: projectImage
      };
      saveProjectsToStorage([...projects, newProject]);
      toast({ title: "Proyek Investasi Diajukan", description: "Proyek Anda telah terdaftar." });
    }

    setIsProjectDialogOpen(false);
    setEditingProject(null);
    setProjectImage(null);
  };

  const submitLandForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    if (editingLand) {
      const updated = lands.map(l => l.id === editingLand.id ? {
        ...l,
        name: formData.get("name") as string,
        location: formData.get("location") as string,
        size: formData.get("size") as string,
        crop: formData.get("crop") as string,
        status: formData.get("status") as string,
        irrigation: formData.get("irrigation") as string,
        soil: formData.get("soil") as string,
        harvest: formData.get("harvest") as string,
        image: landImage || l.image
      } : l);
      saveLandsToStorage(updated);
      toast({ title: "Data Lahan Diperbarui", description: `${editingLand.name} telah diperbarui.` });
    } else {
      const newLand = {
        id: Date.now(),
        name: formData.get("name") as string,
        location: formData.get("location") as string,
        size: formData.get("size") as string,
        crop: formData.get("crop") as string,
        status: formData.get("status") as string,
        irrigation: formData.get("irrigation") as string,
        soil: formData.get("soil") as string,
        harvest: formData.get("harvest") as string,
        image: landImage
      };
      saveLandsToStorage([...lands, newLand]);
      toast({ title: "Data Lahan Ditambahkan", description: `${newLand.name} berhasil didaftarkan.` });
    }

    setIsLandDialogOpen(false);
    setEditingLand(null);
    setLandImage(null);
  };

  const handleEditProduct = (product: any) => {
    setEditingProduct(product);
    setProductImage(product.image || null);
    setIsProductDialogOpen(true);
  };

  const handleEditProject = (project: any) => {
    setEditingProject(project);
    setProjectImage(project.image || null);
    setIsProjectDialogOpen(true);
  };

  const handleEditLand = (land: any) => {
    setEditingLand(land);
    setLandImage(land.image || null);
    setIsLandDialogOpen(true);
  };

  const deleteProduct = (id: number) => {
    const updated = products.filter(p => p.id !== id);
    saveProductsToStorage(updated);
    toast({ title: "Produk Dihapus", description: "Produk telah ditarik dari marketplace." });
  };

  const deleteProject = (id: number) => {
    const updated = projects.filter(p => p.id !== id);
    saveProjectsToStorage(updated);
    toast({ title: "Proyek Dihapus", description: "Proyek investasi telah dibatalkan." });
  };

  const deleteLand = (id: number) => {
    const updated = lands.filter(l => l.id !== id);
    saveLandsToStorage(updated);
    toast({ title: "Data Lahan Dihapus", description: "Data lahan telah dihapus dari sistem." });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-white/40 p-8 rounded-[3rem] border border-white/20">
        <div className="space-y-1">
          <h1 className="text-4xl font-black font-headline text-primary tracking-tight">Halo, Pak Tani Maman! 👋</h1>
          <p className="text-muted-foreground text-lg">Pantau performa tani & kelola ekosistem produksi Anda.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button variant="outline" className="rounded-2xl h-14 px-8 font-bold border-destructive text-destructive hover:bg-destructive/5 group">
            <PlayCircle className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" /> 
            Mulai Live Tani
          </Button>
          <Button 
            onClick={() => {
              setEditingProduct(null);
              setProductImage(null);
              setIsProductDialogOpen(true);
            }}
            className="bg-primary hover:bg-primary/90 rounded-2xl h-14 px-8 font-bold shadow-xl shadow-primary/20 transition-all active:scale-95"
          >
            <Plus className="mr-2 h-5 w-5" /> Tambah Produk
          </Button>
        </div>
      </div>

      {/* Stats Ribbon */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Total Penjualan", value: "Rp 154.2M", icon: TrendingUp, color: "text-secondary", bg: "bg-secondary/10" },
          { label: "Produk Aktif", value: `${products.length} Jenis`, icon: Package, color: "text-primary", bg: "bg-primary/10" },
          { label: "Investor Aktif", value: "8 Mitra", icon: Package, color: "text-accent", bg: "bg-accent/10" }, // Note: Using Package as Users icon fix
          { label: "Lahan Kelola", value: `${lands.length} Lokasi`, icon: MapPin, color: "text-blue-600", bg: "bg-blue-50" },
        ].map((stat, i) => (
          <Card key={i} className="rounded-3xl border-none shadow-xl glassmorphism">
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
        <TabsList className="bg-primary/5 p-1.5 rounded-full h-14 border border-primary/10 flex-wrap sm:flex-nowrap overflow-x-auto">
          <TabsTrigger value="overview" className="rounded-full px-6 text-sm font-bold data-[state=active]:bg-primary data-[state=active]:text-white">Ikhtisar</TabsTrigger>
          <TabsTrigger value="products" className="rounded-full px-6 text-sm font-bold data-[state=active]:bg-primary data-[state=active]:text-white">Produk Saya</TabsTrigger>
          <TabsTrigger value="orders" className="rounded-full px-6 text-sm font-bold data-[state=active]:bg-primary data-[state=active]:text-white">Pesanan Masuk</TabsTrigger>
          <TabsTrigger value="lands" className="rounded-full px-6 text-sm font-bold data-[state=active]:bg-primary data-[state=active]:text-white">Data Lahan</TabsTrigger>
          <TabsTrigger value="investments" className="rounded-full px-6 text-sm font-bold data-[state=active]:bg-primary data-[state=active]:text-white">Proyek Investasi</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-8 animate-in fade-in duration-500">
          <div className="grid lg:grid-cols-3 gap-8">
            <Card className="lg:col-span-2 rounded-[2.5rem] border-none shadow-xl overflow-hidden bg-white">
              <CardHeader className="bg-primary p-8 text-white relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-[80px]"></div>
                <div className="flex justify-between items-center mb-4 relative z-10">
                  <Badge className="bg-white/20 text-white border-none px-3 py-1 font-bold">AI ASSISTANT</Badge>
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
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label className="font-bold">Tanggal Tanam</Label>
                        <Input type="date" defaultValue="2024-01-15" className="rounded-xl h-12" />
                      </div>
                    </div>
                    <Button onClick={handlePredict} disabled={predicting} className="w-full h-14 rounded-2xl bg-secondary hover:bg-secondary/90 text-white font-black text-lg">
                      {predicting ? "Menghitung Probabilitas..." : "Mulai Prediksi Cerdas"}
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="bg-secondary/5 border-2 border-secondary/20 rounded-[2rem] p-6 space-y-4">
                      <h4 className="font-bold text-xl text-primary">Hasil Analisis AI</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white p-4 rounded-2xl border text-center">
                          <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest mb-1">Mulai</p>
                          <p className="text-xl font-black text-primary">{prediction.optimalHarvestWindow.startDate}</p>
                        </div>
                        <div className="bg-white p-4 rounded-2xl border text-center">
                          <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest mb-1">Selesai</p>
                          <p className="text-xl font-black text-primary">{prediction.optimalHarvestWindow.endDate}</p>
                        </div>
                      </div>
                      <p className="text-sm italic text-muted-foreground border-l-4 border-accent pl-4">"{prediction.optimalHarvestWindow.reasoning}"</p>
                    </div>
                    <Button variant="ghost" onClick={() => setPrediction(null)} className="font-bold">Ulangi Analisis</Button>
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card className="rounded-[2.5rem] border-none shadow-xl bg-white overflow-hidden">
                <CardHeader className="p-8">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-xl font-bold font-headline text-primary">Store Activity</CardTitle>
                    <button className="text-xs font-bold text-secondary hover:underline">See All</button>
                  </div>
                </CardHeader>
                <CardContent className="px-8 pb-8 space-y-5">
                  {activities.map((act, i) => (
                    <div key={i} className="flex gap-4 items-start">
                      <div className={cn("p-2 rounded-full", act.type === 'sale' ? "bg-green-100 text-green-600" : "bg-blue-100 text-blue-600")}>
                        {act.type === 'sale' ? <ShoppingBag className="h-4 w-4" /> : <Package className="h-4 w-4" />}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium leading-tight">{act.text}</p>
                        <p className="text-[10px] text-muted-foreground font-bold uppercase mt-1">{act.time}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="products" className="animate-in fade-in duration-500">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((p) => (
              <Card key={p.id} className="rounded-[2rem] border-none shadow-xl overflow-hidden group">
                <div className="relative aspect-video bg-primary/5">
                  <Image src={p.image || `https://picsum.photos/seed/prod${p.id}/400/300`} alt={p.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                  <Badge className={cn("absolute top-4 right-4 bg-white/90 backdrop-blur-sm border-none font-bold", p.stock < 10 ? "text-orange-500" : "text-primary")}>
                    {p.stock < 10 ? 'Stok Tipis' : 'Aktif'}
                  </Badge>
                </div>
                <CardContent className="p-6 space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-[10px] font-black text-secondary uppercase tracking-widest">{p.category}</p>
                      <h4 className="font-bold text-lg leading-tight">{p.name}</h4>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" onClick={() => handleEditProduct(p)} className="rounded-full h-8 w-8 hover:bg-primary/10">
                        <Edit2 className="h-4 w-4 text-primary" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 hover:bg-destructive/10">
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="rounded-3xl border-none glassmorphism">
                          <AlertDialogHeader>
                            <AlertDialogTitle>Hapus Produk?</AlertDialogTitle>
                            <AlertDialogDescription>Tindakan ini tidak dapat dibatalkan. Produk akan ditarik dari marketplace.</AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel className="rounded-xl">Batal</AlertDialogCancel>
                            <AlertDialogAction onClick={() => deleteProduct(p.id)} className="rounded-xl bg-destructive hover:bg-destructive/90">Ya, Hapus</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                  <div className="flex justify-between items-end border-t border-primary/10 pt-4">
                    <div>
                      <p className="text-[10px] text-muted-foreground font-bold uppercase">Harga per Kg</p>
                      <p className="text-xl font-black text-primary">Rp {formatPrice(p.price)}</p>
                    </div>
                    <p className="text-sm font-bold">{p.stock} Kg</p>
                  </div>
                </CardContent>
              </Card>
            ))}
            <button onClick={() => { setEditingProduct(null); setProductImage(null); setIsProductDialogOpen(true); }} className="flex flex-col items-center justify-center gap-4 rounded-[2rem] border-2 border-dashed border-primary/20 hover:bg-primary/5 transition-all p-8 group h-full min-h-[300px]">
               <div className="p-4 bg-primary/10 rounded-full group-hover:scale-110 transition-transform"><Plus className="h-8 w-8 text-primary" /></div>
               <p className="font-bold text-primary">Tambah Produk</p>
            </button>
          </div>
        </TabsContent>

        <TabsContent value="orders" className="animate-in fade-in duration-500">
          <Card className="rounded-[2.5rem] border-none shadow-xl overflow-hidden bg-white">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-primary/5 border-b">
                    <tr>
                      <th className="px-8 py-5 font-bold text-sm text-primary">ID Pesanan</th>
                      <th className="px-8 py-5 font-bold text-sm text-primary">Pembeli</th>
                      <th className="px-8 py-5 font-bold text-sm text-primary">Produk</th>
                      <th className="px-8 py-5 font-bold text-sm text-primary">Total</th>
                      <th className="px-8 py-5 font-bold text-sm text-primary">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {orders.map((order, i) => (
                      <tr key={i} className="hover:bg-primary/5 transition-colors">
                        <td className="px-8 py-5 font-black text-sm">{order.id}</td>
                        <td className="px-8 py-5 font-medium text-sm">{order.buyer}</td>
                        <td className="px-8 py-5 text-sm text-muted-foreground">{order.items}</td>
                        <td className="px-8 py-5 font-black text-primary text-sm">{order.total}</td>
                        <td className="px-8 py-5">
                          <Badge className={cn(
                            "font-black border-none px-4 py-1 text-white",
                            order.status === 'Proses' ? "bg-blue-500" : order.status === 'Kirim' ? "bg-orange-500" : "bg-green-500"
                          )}>{order.status}</Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="lands" className="animate-in fade-in duration-500">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {lands.map((land) => (
              <Card key={land.id} className="rounded-[2.5rem] border-none shadow-xl overflow-hidden bg-white group hover:translate-y-[-4px] transition-all">
                <div className="relative aspect-video bg-primary/5">
                  <Image src={land.image || `https://picsum.photos/seed/land${land.id}/600/400`} alt={land.name} fill className="object-cover" />
                  <Badge className="absolute top-4 left-4 bg-primary text-white border-none font-bold shadow-lg">
                    {land.status}
                  </Badge>
                  <div className="absolute top-4 right-4 flex gap-1">
                    <Button variant="ghost" size="icon" onClick={() => handleEditLand(land)} className="h-8 w-8 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white text-primary">
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="rounded-[2rem] border-none glassmorphism">
                        <AlertDialogHeader>
                          <AlertDialogTitle>Hapus Data Lahan?</AlertDialogTitle>
                          <AlertDialogDescription>Data ini akan dihapus permanen dari sistem.</AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel className="rounded-xl">Batal</AlertDialogCancel>
                          <AlertDialogAction onClick={() => deleteLand(land.id)} className="rounded-xl bg-destructive hover:bg-destructive/90">Hapus</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
                <CardContent className="p-8 space-y-6">
                  <div className="space-y-1">
                    <h4 className="text-2xl font-black font-headline text-primary">{land.name}</h4>
                    <p className="text-sm font-bold text-muted-foreground flex items-center gap-1.5"><MapPin className="h-3 w-3" /> {land.location}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 border-y border-primary/5 py-4">
                    <div className="space-y-1">
                      <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-1.5"><Sprout className="h-3 w-3" /> Tanaman</p>
                      <p className="text-sm font-bold">{land.crop}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-1.5"><Maximize2 className="h-3 w-3" /> Luas</p>
                      <p className="text-sm font-bold">{land.size} Ha</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <Droplets className="h-4 w-4 text-blue-500" />
                      <div className="text-[10px]">
                        <p className="font-black text-muted-foreground uppercase tracking-widest leading-none mb-1">Irigasi</p>
                        <p className="font-bold leading-none">{land.irrigation}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-orange-500" />
                      <div className="text-[10px]">
                        <p className="font-black text-muted-foreground uppercase tracking-widest leading-none mb-1">Panen</p>
                        <p className="font-bold leading-none">{land.harvest}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            <button 
              onClick={() => {
                setEditingLand(null);
                setLandImage(null);
                setIsLandDialogOpen(true);
              }}
              className="flex flex-col items-center justify-center gap-4 rounded-[2.5rem] border-2 border-dashed border-primary/20 hover:bg-primary/5 transition-all p-12 group h-full min-h-[350px]"
            >
              <div className="p-6 bg-primary/10 rounded-full group-hover:scale-110 transition-transform">
                <Plus className="h-10 w-10 text-primary" />
              </div>
              <p className="text-xl font-black text-primary">Tambah Data Lahan</p>
            </button>
          </div>
        </TabsContent>

        <TabsContent value="investments" className="animate-in fade-in duration-500">
           <div className="grid lg:grid-cols-2 gap-8">
             {projects.map((proj) => (
               <Card key={proj.id} className="rounded-[3rem] border-none shadow-xl bg-white overflow-hidden p-8 flex flex-col sm:flex-row gap-8 hover:translate-y-[-4px] transition-all">
                  <div className="relative w-full sm:w-48 h-48 rounded-[2rem] overflow-hidden shrink-0 shadow-lg">
                    <Image src={proj.image || `https://picsum.photos/seed/proj${proj.id}/400/400`} alt={proj.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1 space-y-6 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex justify-between items-start">
                        <Badge className="bg-primary/10 text-primary border-none font-black">{proj.status}</Badge>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon" onClick={() => handleEditProject(proj)} className="h-8 w-8 rounded-full hover:bg-primary/10"><Edit2 className="h-4 w-4 text-primary" /></Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-destructive/10"><Trash2 className="h-4 w-4 text-destructive" /></Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent className="rounded-3xl border-none glassmorphism">
                              <AlertDialogHeader>
                                <AlertDialogTitle>Hapus Proyek?</AlertDialogTitle>
                                <AlertDialogDescription>Tindakan ini akan membatalkan pengajuan investasi untuk proyek ini.</AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel className="rounded-xl">Batal</AlertDialogCancel>
                                <AlertDialogAction onClick={() => deleteProject(proj.id)} className="rounded-xl bg-destructive hover:bg-destructive/90">Ya, Hapus</AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </div>
                      <h4 className="text-2xl font-black font-headline text-primary">{proj.name}</h4>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-end text-sm font-bold">
                        <p className="text-primary">{proj.funded} Terkumpul</p>
                        <p className="text-muted-foreground">{proj.target}</p>
                      </div>
                      <Progress value={parseInt(proj.funded)} className="h-2 bg-primary/5" />
                    </div>
                    <div className="flex gap-2">
                       <Button className="flex-1 h-10 rounded-xl bg-primary text-white font-bold text-xs">Detail</Button>
                       <Button variant="outline" className="flex-1 h-10 rounded-xl font-bold text-xs">Update</Button>
                    </div>
                  </div>
               </Card>
             ))}
             <button onClick={() => { setEditingProject(null); setProjectImage(null); setIsProjectDialogOpen(true); }} className="flex flex-col items-center justify-center gap-4 rounded-[3rem] border-2 border-dashed border-primary/20 hover:bg-primary/5 transition-all p-12 group h-full min-h-[300px]">
                <div className="p-6 bg-primary/10 rounded-full group-hover:scale-110 transition-transform"><Plus className="h-8 w-8 text-primary" /></div>
                <p className="text-xl font-black text-primary">Ajukan Proyek Baru</p>
             </button>
           </div>
        </TabsContent>
      </Tabs>

      {/* Product Modal */}
      <Dialog open={isProductDialogOpen} onOpenChange={setIsProductDialogOpen}>
        <DialogContent className="rounded-[2.5rem] sm:max-w-[600px] border-none glassmorphism max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">{editingProduct ? 'Edit Produk' : 'Upload Produk Baru'}</DialogTitle>
            <DialogDescription>Isi detail produk hasil panen Anda untuk dipasarkan di Farm Mart.</DialogDescription>
          </DialogHeader>
          <form onSubmit={submitProductForm} className="space-y-6 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Nama Produk</Label>
                <Input name="name" defaultValue={editingProduct?.name} required placeholder="Misal: Tomat Cherry Premium" className="rounded-xl h-12" />
              </div>
              <div className="space-y-2">
                <Label>Kategori</Label>
                <Select name="category" defaultValue={editingProduct?.category || "Sayur"}>
                  <SelectTrigger className="rounded-xl h-12">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Sayur">Sayuran</SelectItem>
                    <SelectItem value="Buah">Buah-buahan</SelectItem>
                    <SelectItem value="Rempah">Rempah</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Harga (Rp/Kg)</Label>
                <Input name="price" type="number" defaultValue={editingProduct?.price} required placeholder="25000" className="rounded-xl h-12" />
              </div>
              <div className="space-y-2">
                <Label>Stok (Kg)</Label>
                <Input name="stock" type="number" defaultValue={editingProduct?.stock} required placeholder="50" className="rounded-xl h-12" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Deskripsi</Label>
              <Textarea name="description" defaultValue={editingProduct?.description} placeholder="Ceritakan kesegaran produk Anda..." className="rounded-xl min-h-[100px]" />
            </div>
            <div className="space-y-2">
              <Label>Foto Produk</Label>
              <div 
                onClick={() => productImageInputRef.current?.click()}
                className={cn(
                  "relative border-2 border-dashed border-primary/20 rounded-2xl p-8 text-center bg-primary/5 cursor-pointer hover:bg-primary/10 transition-colors overflow-hidden h-40 flex flex-col items-center justify-center",
                  productImage && "border-none p-0"
                )}
              >
                {productImage ? (
                  <div className="relative w-full h-full group">
                    <Image src={productImage} alt="Preview" fill className="object-cover" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Button type="button" variant="destructive" size="sm" className="rounded-full" onClick={(e) => { e.stopPropagation(); setProductImage(null); }}>
                        <X className="h-4 w-4 mr-1" /> Hapus
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <Upload className="h-8 w-8 text-primary/40 mb-2" />
                    <p className="text-xs font-bold">Klik untuk upload foto</p>
                  </>
                )}
                <input type="file" ref={productImageInputRef} className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, 'product')} />
              </div>
            </div>
            <DialogFooter className="gap-2">
              <Button type="button" variant="ghost" onClick={() => setIsProductDialogOpen(false)}>Batal</Button>
              <Button type="submit" className="flex-1 h-14 rounded-xl bg-secondary hover:bg-secondary/90 text-white font-black text-lg">
                {editingProduct ? 'Simpan Perubahan' : 'Terbitkan Produk'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Project Modal */}
      <Dialog open={isProjectDialogOpen} onOpenChange={setIsProjectDialogOpen}>
        <DialogContent className="rounded-[2.5rem] sm:max-w-[700px] border-none glassmorphism max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">{editingProject ? 'Edit Proyek' : 'Ajukan Proyek Investasi'}</DialogTitle>
            <DialogDescription>Dapatkan dukungan permodalan dari komunitas investor Farm Mart.</DialogDescription>
          </DialogHeader>
          <form onSubmit={submitProjectForm} className="space-y-6 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Nama Proyek</Label>
                <Input name="name" defaultValue={editingProject?.name} required placeholder="Misal: Ekspansi Melon Cantaloupe" className="rounded-xl h-12" />
              </div>
              <div className="space-y-2">
                <Label>Target Dana (Rp)</Label>
                <Input name="target" type="number" defaultValue={editingProject?.target?.replace(/[^0-9]/g, '')} required placeholder="250000000" className="rounded-xl h-12" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Deskripsi Proyek</Label>
              <Textarea name="description" defaultValue={editingProject?.description} placeholder="Jelaskan potensi proyek Anda..." className="rounded-xl min-h-[120px]" />
            </div>
            <div className="space-y-2">
              <Label>Foto Proyek</Label>
              <div 
                onClick={() => projectImageInputRef.current?.click()}
                className={cn(
                  "relative border-2 border-dashed border-primary/20 rounded-2xl p-8 text-center bg-primary/5 cursor-pointer hover:bg-primary/10 transition-colors overflow-hidden h-40 flex flex-col items-center justify-center",
                  projectImage && "border-none p-0"
                )}
              >
                {projectImage ? (
                  <div className="relative w-full h-full group">
                    <Image src={projectImage} alt="Preview" fill className="object-cover" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Button type="button" variant="destructive" size="sm" className="rounded-full" onClick={(e) => { e.stopPropagation(); setProjectImage(null); }}>
                        <X className="h-4 w-4 mr-1" /> Hapus
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <Upload className="h-8 w-8 text-primary/40 mb-2" />
                    <p className="text-xs font-bold">Klik untuk upload foto</p>
                  </>
                )}
                <input type="file" ref={projectImageInputRef} className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, 'project')} />
              </div>
            </div>
            <DialogFooter className="gap-2">
              <Button type="button" variant="ghost" onClick={() => setIsProjectDialogOpen(false)}>Batal</Button>
              <Button type="submit" className="flex-1 h-14 rounded-xl bg-secondary hover:bg-secondary/90 text-white font-black text-lg">
                {editingProject ? 'Simpan Perubahan' : 'Ajukan Sekarang'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Land Modal */}
      <Dialog open={isLandDialogOpen} onOpenChange={setIsLandDialogOpen}>
        <DialogContent className="rounded-[2.5rem] sm:max-w-[700px] border-none glassmorphism max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">{editingLand ? 'Edit Data Lahan' : 'Tambah Data Lahan Baru'}</DialogTitle>
            <DialogDescription>Daftarkan lahan baru Anda untuk memudahkan pelacakan operasional tani.</DialogDescription>
          </DialogHeader>
          <form onSubmit={submitLandForm} className="space-y-6 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Nama Lahan</Label>
                <Input name="name" defaultValue={editingLand?.name} required placeholder="Misal: Kebun Lembang A" className="rounded-xl h-12" />
              </div>
              <div className="space-y-2">
                <Label>Lokasi</Label>
                <Input name="location" defaultValue={editingLand?.location} required placeholder="Misal: Bandung Barat" className="rounded-xl h-12" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Luas Lahan (Ha)</Label>
                <Input name="size" type="number" step="0.1" defaultValue={editingLand?.size} required placeholder="1.2" className="rounded-xl h-12" />
              </div>
              <div className="space-y-2">
                <Label>Jenis Tanaman</Label>
                <Input name="crop" defaultValue={editingLand?.crop} required placeholder="Misal: Tomat Cherry" className="rounded-xl h-12" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Status</Label>
                <Select name="status" defaultValue={editingLand?.status || "Masa Tanam"}>
                  <SelectTrigger className="rounded-xl h-12">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Masa Tanam">Masa Tanam</SelectItem>
                    <SelectItem value="Siap Panen">Siap Panen</SelectItem>
                    <SelectItem value="Baru Panen">Baru Panen</SelectItem>
                    <SelectItem value="Lahan Kosong">Lahan Kosong</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Estimasi Panen</Label>
                <Input name="harvest" type="date" defaultValue={editingLand?.harvest} className="rounded-xl h-12" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Sistem Irigasi</Label>
                <Select name="irrigation" defaultValue={editingLand?.irrigation || "Drip"}>
                  <SelectTrigger className="rounded-xl h-12">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Drip">Drip Irrigation</SelectItem>
                    <SelectItem value="Rainfed">Rainfed (Tadah Hujan)</SelectItem>
                    <SelectItem value="Sprinkler">Sprinkler</SelectItem>
                    <SelectItem value="Manual">Penyiraman Manual</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Kondisi Tanah</Label>
                <Input name="soil" defaultValue={editingLand?.soil} placeholder="Misal: Vulkanik, Subur" className="rounded-xl h-12" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Foto Lahan</Label>
              <div 
                onClick={() => landImageInputRef.current?.click()}
                className={cn(
                  "relative border-2 border-dashed border-primary/20 rounded-2xl p-8 text-center bg-primary/5 cursor-pointer hover:bg-primary/10 transition-colors overflow-hidden h-40 flex flex-col items-center justify-center",
                  landImage && "border-none p-0"
                )}
              >
                {landImage ? (
                  <div className="relative w-full h-full group">
                    <Image src={landImage} alt="Preview" fill className="object-cover" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Button type="button" variant="destructive" size="sm" className="rounded-full" onClick={(e) => { e.stopPropagation(); setLandImage(null); }}>
                        <X className="h-4 w-4 mr-1" /> Hapus
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <Upload className="h-8 w-8 text-primary/40 mb-2" />
                    <p className="text-xs font-bold">Klik untuk upload foto</p>
                  </>
                )}
                <input type="file" ref={landImageInputRef} className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, 'land')} />
              </div>
            </div>
            <DialogFooter className="gap-2">
              <Button type="button" variant="ghost" onClick={() => setIsLandDialogOpen(false)}>Batal</Button>
              <Button type="submit" className="flex-1 h-14 rounded-xl bg-secondary hover:bg-secondary/90 text-white font-black text-lg">
                {editingLand ? 'Simpan Perubahan' : 'Simpan Data Lahan'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
