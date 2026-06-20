"use client";

import { useState, useEffect, useMemo, Suspense } from "react";
import Image from "next/image";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { 
  TrendingUp, 
  Wallet, 
  ShieldCheck, 
  Leaf, 
  Sparkles, 
  ArrowUpRight, 
  Users, 
  MapPin, 
  Clock, 
  BarChart3, 
  MessageCircle, 
  ChevronRight, 
  X,
  History,
  Info,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Briefcase,
  User,
  ArrowRight,
  Search,
  Zap,
  Flame,
  Camera,
  LayoutDashboard,
  DollarSign,
  PieChart as PieChartIcon
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  PieChart, 
  Pie, 
  Cell,
  BarChart,
  Bar
} from "recharts";
import { useSearchParams } from "next/navigation";

// --- Mock Data ---

const initialExploreProjects = [
  { 
    id: 1, 
    name: "Greenhouse Melon Lembang Expansion", 
    farmer: "Ahmad Surya", 
    location: "Lembang, Bandung", 
    commodity: "Premium Melon", 
    target: 50000000, 
    collected: 36500000, 
    progress: 73, 
    duration: "6 Months", 
    return: "18%", 
    risk: "Low",
    minInvestment: 100000,
    investorsCount: 132,
    scheme: "Profit Sharing",
    image: "https://res.cloudinary.com/dhp46iviu/image/upload/v1780966187/OIP_lstdbk.jpg",
    description: "Proyek ini bertujuan untuk membangun greenhouse modern seluas kurang lebih 1.500 m² untuk meningkatkan kapasitas produksi melon premium guna memenuhi permintaan hotel bintang lima.",
    farmerInfo: {
      name: "Ahmad Surya",
      experience: "9 Years",
      successRate: "96%",
      totalLand: "2.8 Ha",
      completed: 14,
      commodities: "Melon and Tomatoes",
      story: "Saya memulai bertani pada tahun 2017 bersama keluarga dengan lahan kecil di Lembang. Permintaan melon premium terus meningkat setiap tahunnya, namun keterbatasan modal membuat kapasitas produksi kami belum optimal. Melalui FarmMart, saya ingin membangun greenhouse modern agar dapat meningkatkan produktivitas, menjaga kualitas hasil panen, dan membuka lapangan pekerjaan bagi masyarakat sekitar."
    },
    updates: [
      { week: "Minggu 1", text: "Persiapan lahan selesai." },
      { week: "Minggu 3", text: "Pembangunan greenhouse dimulai." },
      { week: "Minggu 6", text: "Instalasi sistem irigasi selesai." },
      { week: "Minggu 10", text: "Penanaman bibit pertama selesai." },
      { week: "Minggu 16", text: "Persiapan panen berlangsung." }
    ],
    breakdown: [
      { label: "Pembangunan Greenhouse", value: 45 },
      { label: "Sistem Irigasi", value: 20 },
      { label: "Bibit & Nutrisi", value: 20 },
      { label: "Tenaga Kerja", value: 10 },
      { label: "Distribusi", value: 5 }
    ]
  },
  { 
    id: 2, 
    name: "Organic Tomato Hydroponics", 
    farmer: "Pak Tani Maman", 
    location: "Bandung, Jawa Barat", 
    commodity: "Cherry Tomatoes", 
    target: 20000000, 
    collected: 17000000, 
    progress: 85, 
    duration: "4 Months", 
    return: "15%", 
    risk: "Low",
    minInvestment: 50000,
    investorsCount: 84,
    scheme: "Profit Sharing",
    image: "https://res.cloudinary.com/dhp46iviu/image/upload/v1781930246/cherry-tomato-vegetables-photo_j1fksb.jpg",
    description: "Ekspansi kapasitas produksi tomat ceri organik melalui pengembangan greenhouse dan peningkatan produksi bibit.",
    farmerInfo: {
      name: "Pak Tani Maman",
      experience: "8 Years",
      successRate: "95%",
      totalLand: "2.5 Ha",
      completed: 12,
      commodities: "Tomatoes",
      story: "Fokus pada sayuran organik adalah passion saya. Dengan hidroponik, kita bisa menghasilkan produk lebih bersih dan sehat."
    },
    updates: [
      { week: "Minggu 1", text: "Pembelian bibit unggul." },
      { week: "Minggu 4", text: "Instalasi modul hidroponik baru." }
    ],
    breakdown: [
      { label: "Modul Hidroponik", value: 40 },
      { label: "Bibit Unggul", value: 20 },
      { label: "Nutrisi AB Mix", value: 25 },
      { label: "Lainnya", value: 15 }
    ]
  },
  { 
    id: 3, 
    name: "Smart Chili Irrigation System", 
    farmer: "Kelompok Tani Makmur", 
    location: "Garut, Jawa Barat", 
    commodity: "Cabai Merah", 
    target: 30000000, 
    collected: 24000000, 
    progress: 80, 
    duration: "5 Months", 
    return: "16%", 
    risk: "Medium",
    minInvestment: 100000,
    investorsCount: 56,
    scheme: "Profit Sharing",
    image: "https://res.cloudinary.com/dhp46iviu/image/upload/v1781924019/OIP_4_xwysrb.webp",
    description: "Implementasi teknologi irigasi cerdas berbasis IoT untuk meningkatkan efisiensi penggunaan air dan hasil panen cabai merah.",
    farmerInfo: {
      name: "Budi Jaya",
      experience: "6 Years",
      successRate: "90%",
      totalLand: "1.5 Ha",
      completed: 7,
      commodities: "Chili",
      story: "Teknologi adalah kunci kedaulatan pangan. Saya ingin Garut menjadi pelopor pertanian berbasis data."
    },
    updates: [
      { week: "Minggu 1", text: "Pemasangan sensor kelembaban tanah." }
    ],
    breakdown: [
      { label: "Sensor IoT", value: 50 },
      { label: "Pompa Air", value: 30 },
      { label: "Instalasi", value: 20 }
    ]
  },
  { 
    id: 4, 
    name: "Avocado Expansion Project", 
    farmer: "Arif Hidayat", 
    location: "Cianjur, Jawa Barat", 
    commodity: "Alpukat Mentega", 
    target: 40000000, 
    collected: 30400000, 
    progress: 76, 
    duration: "12 Months", 
    return: "20%", 
    risk: "Medium",
    minInvestment: 500000,
    investorsCount: 42,
    scheme: "Profit Sharing",
    image: "https://res.cloudinary.com/dhp46iviu/image/upload/v1781924191/istockphoto-1824689302-612x612_oyxubg.jpg",
    description: "Perluasan lahan tanam alpukat mentega premium untuk pasar ekspor dan supermarket lokal.",
    farmerInfo: {
      name: "Arif Hidayat",
      experience: "12 Years",
      successRate: "94%",
      totalLand: "4 Ha",
      completed: 18,
      commodities: "Fruits",
      story: "Alpukat adalah emas hijau. Dengan perawatan yang tepat, potensi return-nya sangat luar biasa bagi investor."
    },
    updates: [
      { week: "Minggu 2", text: "Pembukaan lahan baru." }
    ],
    breakdown: [
      { label: "Pembukaan Lahan", value: 35 },
      { label: "Bibit Alpukat", value: 40 },
      { label: "Pupuk Organik", value: 25 }
    ]
  }
];

const portfolioGrowthData = [
  { name: "Jan", value: 5.0 },
  { name: "Feb", value: 8.0 },
  { name: "Mar", value: 12.0 },
  { name: "Apr", value: 18.0 },
  { name: "Mei", value: 22.0 },
  { name: "Jun", value: 25.0 },
];

const monthlyReturnData = [
  { name: "Jan", value: 200000 },
  { name: "Feb", value: 350000 },
  { name: "Mar", value: 450000 },
  { name: "Apr", value: 600000 },
];

const commodityDistribution = [
  { name: "Tomatoes", value: 35, color: "#2E7D32" },
  { name: "Chili", value: 20, color: "#F57C00" },
  { name: "Melon", value: 25, color: "#F4B400" },
  { name: "Hydroponics", value: 20, color: "#2563eb" },
];

const trendingProjects = [
  { name: "Greenhouse Melon Lembang", progress: 92, color: "text-orange-600" },
  { name: "Organic Tomato Hydroponics", progress: 85, color: "text-red-600" },
  { name: "Smart Chili Irrigation", progress: 80, color: "text-blue-600" },
  { name: "Avocado Expansion Project", progress: 76, color: "text-green-600" },
];

interface InvestorDashboardProps {
  view?: string;
  setView?: (v: string) => void;
}

 function InvestorDashboardContent({ view = "dashboard", setView }: InvestorDashboardProps) {

  const { toast } = useToast();
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("q") || "";
  
  const [mounted, setMounted] = useState(false);
  
  // --- State ---
  const [portfolio, setPortfolio] = useState([
    { id: 101, name: "Greenhouse Melon Lembang", farmer: "Pak Ahmad Surya", investment: 5000000, roi: "18%", estReturn: 900000, progress: 70, status: "Active", date: "15 May 2026" },
    { id: 102, name: "Vanilla Premium NTT", farmer: "Koperasi Tani Flores", investment: 2000000, roi: "22%", estReturn: 440000, progress: 45, status: "Active", date: "10 June 2026" },
  ]);

  const [history] = useState([
    { id: 201, name: "Cherry Tomato Project", investment: 5000000, profit: 750000, status: "Completed", date: "20 Jan 2026", roi: "15%" },
    { id: 202, name: "Chili Project 2025", investment: 3000000, profit: 450000, status: "Completed", date: "12 Dec 2025", roi: "15%" },
  ]);
  
  const [investorProfile, setInvestorProfile] = useState({
    name: "Andi Saputra",
    email: "andi.invest@email.com",
    phone: "+62 812 3456 7890",
    investorId: "INV-99210-AS",
    memberSince: "Jan 2026",
    totalInvested: 25000000,
    runningReturn: 3250000,
    realizedProfit: 1850000,
    activeProjects: 6,
    avgRoi: "16,5%"
  });

  // Dialogs
  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isInvestOpen, setIsInvestOpen] = useState(false);
  const [investStep, setInvestStep] = useState(1);
  const [investAmount, setInvestAmount] = useState(1000000);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([
    { id: 1, text: "Pak, apakah greenhouse ini sudah mulai dibangun?", isMe: true, time: "10:30" },
    { id: 2, text: "Sudah Pak Andi, saat ini pembangunan telah mencapai sekitar 70%.", isMe: false, time: "10:35" },
    { id: 3, text: "Estimasi panen pertamanya kapan?", isMe: true, time: "10:40" },
    { id: 4, text: "Diperkirakan sekitar empat bulan setelah proses penanaman selesai.", isMe: false, time: "10:45" }
  ]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const formatPrice = (val: number | undefined | null) => {
    if (val === undefined || val === null) return '0';
    if (!mounted) return val.toString();
    return val.toLocaleString('id-ID');
  };

  const filteredProjects = useMemo(() => {
    if (!searchQuery) return initialExploreProjects;
    const lower = searchQuery.toLowerCase();
    return initialExploreProjects.filter(p => 
      p.name.toLowerCase().includes(lower) ||
      p.farmer.toLowerCase().includes(lower) ||
      p.commodity.toLowerCase().includes(lower) ||
      p.location.toLowerCase().includes(lower)
    );
  }, [searchQuery]);

  const handleConfirmInvestment = () => {
    const newInvestment = {
      id: Date.now(),
      name: selectedProject.name,
      farmer: selectedProject.farmer,
      investment: investAmount,
      roi: selectedProject.return,
      estReturn: investAmount * (parseInt(selectedProject.return) / 100),
      progress: 0,
      status: "Active",
      date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
    };

    setPortfolio([newInvestment, ...portfolio]);
    setInvestorProfile(prev => ({
      ...prev,
      totalInvested: prev.totalInvested + investAmount,
      activeProjects: prev.activeProjects + 1
    }));
    
    setIsInvestOpen(false);
    toast({
      title: "Investasi Berhasil!",
      description: "Investasi berhasil dilakukan. Project telah ditambahkan ke portofolio Anda.",
    });
    if (setView) setView("portfolio");
  };

  const handleSendMessage = () => {
    if (!chatMessage.trim()) return;
    const newMsg = {
      id: Date.now(),
      text: chatMessage,
      isMe: true,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setChatHistory([...chatHistory, newMsg]);
    setChatMessage("");
  };

  if (!mounted) return null;

  // --- Sub-renders ---

  const renderDashboard = () => (
    <div className="space-y-12 animate-in fade-in duration-700">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
        {[
          { label: "Total Investment", value: `Rp ${formatPrice(investorProfile.totalInvested)}`, icon: Wallet, color: "text-primary", bg: "bg-primary/10" },
          { label: "Running Return", value: `Rp ${formatPrice(investorProfile.runningReturn)}`, icon: TrendingUp, color: "text-secondary", bg: "bg-secondary/10" },
          { label: "Active Projects", value: `${investorProfile.activeProjects} Projects`, icon: Briefcase, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Average ROI", value: investorProfile.avgRoi, icon: BarChart3, color: "text-accent", bg: "bg-accent/10" },
          { label: "Realized Profit", value: `Rp ${formatPrice(investorProfile.realizedProfit)}`, icon: DollarSign, color: "text-green-600", bg: "bg-green-50" },
        ].map((stat, idx) => (
          <Card key={idx} className="rounded-3xl border-none shadow-xl glassmorphism group hover:scale-105 transition-all duration-300 overflow-hidden relative">
            <div className={cn("absolute bottom-0 left-0 w-full h-1 opacity-20", stat.bg)}></div>
            <CardContent className="p-6 flex flex-col items-center text-center space-y-2">
              <div className={cn("p-4 rounded-2xl mb-2 group-hover:scale-110 transition-transform", stat.bg)}>
                <stat.icon className={cn("h-6 w-6", stat.color)} />
              </div>
              <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">{stat.label}</p>
              <p className="text-lg font-black text-primary">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3 space-y-8">
          <div className="flex justify-between items-end">
            <div className="space-y-1">
              <h2 className="text-3xl font-black font-headline text-primary">Explore Opportunities</h2>
              <p className="text-muted-foreground">High-impact agricultural projects ready for support.</p>
            </div>
            {searchQuery && (
              <Badge className="bg-primary/10 text-primary border-none px-4 py-1">
                Results for: "{searchQuery}"
              </Badge>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredProjects.map((p) => (
              <Card key={p.id} className="group overflow-hidden rounded-[2.5rem] border-none shadow-xl bg-white hover:shadow-2xl transition-all duration-500">
                <div className="relative aspect-[16/10]">
                  <Image src={p.image} alt={p.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <Badge className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm text-primary border-none font-black px-4 py-1">
                    {p.return} ROI
                  </Badge>
                </div>
                <CardContent className="p-8 space-y-6">
                  <div>
                     <p className="text-[10px] font-black uppercase tracking-widest text-secondary mb-1">{p.commodity}</p>
                     <h3 className="text-xl font-bold leading-tight line-clamp-1">{p.name}</h3>
                     <p className="text-xs text-muted-foreground font-bold flex items-center gap-1 mt-1"><User className="h-3 w-3 text-primary" /> {p.farmer}</p>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-end text-sm font-black">
                      <p className="text-primary">Rp {formatPrice(p.collected)}</p>
                      <p className="text-muted-foreground">Target: {formatPrice(p.target)}</p>
                    </div>
                    <Progress value={p.progress} className="h-3" />
                    <div className="flex justify-between text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                       <span>{p.progress}% Funded</span>
                       <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {p.duration}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <Button onClick={() => { setSelectedProject(p); setIsDetailOpen(true); }} variant="outline" className="rounded-2xl h-12 font-bold border-primary/10 hover:bg-primary/5">View Details</Button>
                    <Button onClick={() => { setSelectedProject(p); setIsInvestOpen(true); setInvestStep(1); }} className="rounded-2xl h-12 bg-primary text-white font-black shadow-lg shadow-primary/20">Invest Now</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="space-y-8">
           <Card className="rounded-[2.5rem] border-none shadow-xl bg-white p-8">
             <CardTitle className="text-xl font-black font-headline text-primary mb-6 flex items-center gap-2">
                <Flame className="h-5 w-5 text-orange-500" /> Trending Now
             </CardTitle>
             <div className="space-y-8">
                {trendingProjects.map((tp, i) => (
                  <div key={i} className="space-y-3">
                     <div className="flex justify-between items-center">
                        <h4 className="text-sm font-bold leading-tight flex-1">{tp.name}</h4>
                        <Badge className="bg-primary/5 text-primary border-none text-[10px] font-black">{tp.progress}%</Badge>
                     </div>
                     <Progress value={tp.progress} className="h-1.5" />
                  </div>
                ))}
             </div>
             <Button variant="link" className="text-secondary font-black p-0 mt-8 group w-full justify-center">
                Explore All Trends <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
             </Button>
           </Card>

           <Card className="rounded-[2.5rem] border-none bg-primary text-white p-8 overflow-hidden relative group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl group-hover:scale-110 transition-transform"></div>
              <div className="relative z-10 space-y-4">
                 <div className="p-3 bg-white/20 rounded-2xl w-fit"><Sparkles className="h-6 w-6 text-accent" /></div>
                 <h3 className="text-2xl font-black font-headline">Premium Perks</h3>
                 <p className="text-sm opacity-80 leading-relaxed">Upgrade to Platinum for early access to high-yield hydroponic projects.</p>
                 <Button className="w-full rounded-2xl bg-white text-primary font-black h-12 shadow-xl active:scale-95 transition-all">Upgrade Now</Button>
              </div>
           </Card>
        </div>
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-12 animate-in fade-in duration-700">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Total Invested", value: `Rp ${formatPrice(investorProfile.totalInvested)}`, change: "+12%", up: true },
          { label: "Portfolio Value", value: `Rp ${formatPrice(investorProfile.totalInvested + investorProfile.runningReturn)}`, change: "+16.5%", up: true },
          { label: "Running Profit", value: `Rp ${formatPrice(investorProfile.runningReturn)}`, change: "Stable", up: true },
          { label: "Avg. ROI", value: investorProfile.avgRoi, change: "+2.1%", up: true },
        ].map((stat, i) => (
          <Card key={i} className="rounded-3xl border-none shadow-lg p-8 space-y-3 bg-white hover:-translate-y-1 transition-all">
            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{stat.label}</p>
            <h3 className="text-3xl font-black text-primary">{stat.value}</h3>
            <div className={cn("flex items-center gap-1 text-xs font-bold", stat.up ? "text-green-600" : "text-destructive")}>
              {stat.up ? <ArrowUpRight className="h-3 w-3" /> : <TrendingUp className="h-3 w-3 rotate-180" />}
              {stat.change} <span className="text-muted-foreground font-normal">vs last period</span>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 rounded-[3rem] border-none shadow-xl bg-white p-8">
          <CardTitle className="text-xl font-bold font-headline text-primary mb-8 flex items-center gap-2">
             <BarChart3 className="h-5 w-5" /> Portfolio Growth
          </CardTitle>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={portfolioGrowthData}>
                <defs>
                  <linearGradient id="colorGrowth" x1="0" x2="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 600 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 600 }} />
                <Tooltip contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                <Area type="monotone" dataKey="value" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorGrowth)" strokeWidth={4} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="rounded-[3rem] border-none shadow-xl bg-white p-8">
          <CardTitle className="text-xl font-bold font-headline text-primary mb-8 flex items-center gap-2">
             <PieChartIcon className="h-5 w-5" /> Distribution
          </CardTitle>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={commodityDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={8}
                  dataKey="value"
                >
                  {commodityDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-4 mt-6">
             {commodityDistribution.map((item, i) => (
               <div key={i} className="flex justify-between items-center text-sm font-bold">
                  <div className="flex items-center gap-3">
                     <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                     <span className="text-muted-foreground">{item.name}</span>
                  </div>
                  <span className="text-primary">{item.value}%</span>
               </div>
             ))}
          </div>
        </Card>
      </div>

      <Card className="rounded-[3rem] border-none shadow-xl bg-white p-8">
        <CardTitle className="text-xl font-bold font-headline text-primary mb-8">Monthly Return (IDR)</CardTitle>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyReturnData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 600 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 600 }} />
              <Tooltip cursor={{ fill: 'rgba(46, 125, 50, 0.05)' }} contentStyle={{ borderRadius: '1rem', border: 'none' }} />
              <Bar dataKey="value" fill="hsl(var(--secondary))" radius={[8, 8, 0, 0]} barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );

  const renderPortfolio = () => (
    <div className="space-y-12 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-1">
          <h2 className="text-4xl font-black font-headline text-primary">My Portfolio</h2>
          <p className="text-muted-foreground">Managing {portfolio.length} active high-growth projects.</p>
        </div>
      </div>
      <div className="grid gap-8">
        {portfolio.map((p) => (
          <Card key={p.id} className="rounded-[3rem] border-none shadow-2xl bg-white overflow-hidden p-10 hover:shadow-xl transition-all group">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10">
              <div className="flex-1 space-y-6">
                <div className="flex flex-wrap justify-between items-start gap-4">
                  <div>
                    <Badge className="bg-primary/10 text-primary border-none font-black text-[10px] mb-2 px-4 py-1 uppercase tracking-widest">PROJECT ID: FM-INV-{p.id}</Badge>
                    <h3 className="text-3xl font-black font-headline text-primary leading-tight group-hover:text-secondary transition-colors">{p.name}</h3>
                    <div className="flex items-center gap-2 text-sm font-bold text-muted-foreground mt-2">
                      <Users className="h-4 w-4 text-primary" /> {p.farmer}
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-700 border-none font-black uppercase tracking-widest text-[10px] px-4 py-2 rounded-xl">{p.status}</Badge>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-y border-primary/5 py-6">
                  <div>
                    <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest mb-1">Principal Invested</p>
                    <p className="text-xl font-black text-primary">Rp {formatPrice(p.investment)}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest mb-1">Estimated ROI</p>
                    <p className="text-xl font-black text-accent">{p.roi}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest mb-1">Expected Profit</p>
                    <p className="text-xl font-black text-secondary">+Rp {formatPrice(p.estReturn)}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest mb-1">Next Payout</p>
                    <p className="text-sm font-bold mt-1">Expected Aug 2026</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                   <div className="flex justify-between text-[10px] font-black text-muted-foreground uppercase">
                      <span>Project Milestone Progress</span>
                      <span className="text-primary">{p.progress}% Complete</span>
                   </div>
                   <Progress value={p.progress} className="h-2.5" />
                </div>
              </div>
              <div className="flex flex-col gap-3 w-full lg:w-auto">
                <Button onClick={() => { setSelectedProject(initialExploreProjects.find(ip => ip.name === p.name) || initialExploreProjects[0]); setIsDetailOpen(true); }} className="h-14 px-8 rounded-2xl bg-primary text-white font-black shadow-xl shadow-primary/20">Project Details</Button>
                <Button onClick={() => setIsChatOpen(true)} variant="outline" className="h-14 px-8 rounded-2xl border-primary/10 text-primary font-bold flex items-center gap-2 hover:bg-primary/5">
                   <MessageCircle className="h-5 w-5" /> Chat Farmer
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderHistory = () => (
    <div className="space-y-12 animate-in fade-in duration-700">
      <div className="grid md:grid-cols-3 gap-8">
         <Card className="p-10 rounded-[3rem] border-none bg-primary text-white space-y-2 shadow-2xl shadow-primary/20">
            <p className="text-xs font-bold opacity-80 uppercase tracking-widest">Total Profit Received</p>
            <h3 className="text-4xl font-black">Rp {formatPrice(1200000)}</h3>
         </Card>
         <Card className="p-10 rounded-[3rem] border-none bg-secondary text-white space-y-2 shadow-2xl shadow-secondary/20">
            <p className="text-xs font-bold opacity-80 uppercase tracking-widest">Average ROI</p>
            <h3 className="text-4xl font-black">15.2%</h3>
         </Card>
         <Card className="p-10 rounded-[3rem] border-none bg-accent text-primary space-y-2 shadow-2xl shadow-accent/20">
            <p className="text-xs font-bold opacity-70 uppercase tracking-widest">Completed Investments</p>
            <h3 className="text-4xl font-black">3</h3>
         </Card>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-black font-headline text-primary">Earnings Log</h2>
        <div className="grid gap-4">
          {history.map((h) => (
            <Card key={h.id} className="rounded-[2rem] border-none shadow-md bg-white p-8 hover:shadow-xl transition-all group">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                <div className="flex items-center gap-6">
                   <div className="h-16 w-16 rounded-3xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                      <CheckCircle2 className="h-8 w-8" />
                   </div>
                   <div>
                      <h4 className="font-bold text-xl text-primary">{h.name}</h4>
                      <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest mt-1">{h.date} • ID: {h.id}</p>
                   </div>
                </div>
                <div className="flex gap-16 text-right">
                   <div>
                      <p className="text-[10px] font-black text-muted-foreground uppercase mb-1 tracking-widest">Principal</p>
                      <p className="font-bold text-lg">Rp {formatPrice(h.investment)}</p>
                   </div>
                   <div>
                      <p className="text-[10px] font-black text-muted-foreground uppercase mb-1 tracking-widest">Profit (ROI: {h.roi})</p>
                      <p className="text-2xl font-black text-green-600">+Rp {formatPrice(h.profit)}</p>
                   </div>
                </div>
                <Button variant="ghost" size="icon" className="rounded-full text-muted-foreground hover:bg-primary/5 hover:text-primary"><ChevronRight className="h-6 w-6" /></Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );

  const renderProfile = () => (
    <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in duration-700 pb-20">
      <div className="flex flex-col md:flex-row items-center gap-10 bg-white/50 p-12 rounded-[4rem] border border-white/20 glassmorphism relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 rounded-full -mr-40 -mt-40 blur-[100px]"></div>
        <div className="relative group">
          <div className="h-40 w-40 rounded-full border-8 border-white shadow-2xl overflow-hidden relative">
            <Image src="https://picsum.photos/seed/investor/200/200" alt="Avatar" fill className="object-cover" />
          </div>
          <button className="absolute bottom-2 right-2 bg-secondary text-white p-3 rounded-full border-4 border-white shadow-lg hover:scale-110 transition-all">
             <Camera className="h-5 w-5" />
          </button>
        </div>
        <div className="text-center md:text-left space-y-3">
          <h1 className="text-5xl font-black font-headline text-primary">{investorProfile.name}</h1>
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
            <Badge className="bg-primary text-white border-none font-black uppercase text-[10px] px-4 py-1.5">Platinum Investor</Badge>
            <span className="text-xs text-muted-foreground uppercase font-black tracking-widest">ID: {investorProfile.investorId}</span>
          </div>
          <div className="flex flex-wrap justify-center md:justify-start gap-6 pt-4">
             <div className="flex items-center gap-2 text-sm font-bold text-muted-foreground"><MapPin className="h-4 w-4 text-primary" /> Jakarta, Indonesia</div>
             <div className="flex items-center gap-2 text-sm font-bold text-muted-foreground"><Calendar className="h-4 w-4 text-primary" /> Member Since {investorProfile.memberSince}</div>
          </div>
        </div>
      </div>

      <Card className="rounded-[3rem] border-none shadow-2xl bg-white p-12 space-y-10">
        <CardTitle className="text-3xl font-black font-headline text-primary">Personal Details</CardTitle>
        <div className="grid md:grid-cols-2 gap-10">
           <div className="space-y-3">
              <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground ml-1">Full Legal Name</Label>
              <Input value={investorProfile.name} onChange={(e) => setInvestorProfile({...investorProfile, name: e.target.value})} className="h-14 rounded-2xl bg-primary/5 border-none font-bold px-6 text-lg focus-visible:ring-primary" />
           </div>
           <div className="space-y-3">
              <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground ml-1">Email Address</Label>
              <Input value={investorProfile.email} onChange={(e) => setInvestorProfile({...investorProfile, email: e.target.value})} className="h-14 rounded-2xl bg-primary/5 border-none font-bold px-6 text-lg focus-visible:ring-primary" />
           </div>
           <div className="space-y-3">
              <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground ml-1">WhatsApp Number</Label>
              <Input value={investorProfile.phone} onChange={(e) => setInvestorProfile({...investorProfile, phone: e.target.value})} className="h-14 rounded-2xl bg-primary/5 border-none font-bold px-6 text-lg focus-visible:ring-primary" />
           </div>
           <div className="space-y-3">
              <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground ml-1">Verified Investor ID</Label>
              <Input value={investorProfile.investorId} readOnly disabled className="h-14 rounded-2xl bg-gray-100 border-none font-black px-6 text-lg" />
           </div>
        </div>
        
        <div className="pt-10 border-t border-primary/5 grid grid-cols-3 gap-8">
           <div className="text-center p-8 bg-primary/5 rounded-[2rem] border border-primary/10">
              <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest mb-2">Total Capital</p>
              <p className="text-xl font-black text-primary">Rp {formatPrice(investorProfile.totalInvested)}</p>
           </div>
           <div className="text-center p-8 bg-secondary/5 rounded-[2rem] border border-secondary/10">
              <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest mb-2">Total Payouts</p>
              <p className="text-xl font-black text-secondary">Rp {formatPrice(investorProfile.realizedProfit)}</p>
           </div>
           <div className="text-center p-8 bg-blue-50 rounded-[2rem] border border-blue-100">
              <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest mb-2">Active Ventures</p>
              <p className="text-xl font-black text-blue-600">{investorProfile.activeProjects}</p>
           </div>
        </div>

        <div className="flex gap-4 pt-4">
           <Button onClick={() => toast({ title: "Profile Secured", description: "Your investor profile has been updated successfully."})} className="flex-1 h-16 rounded-2xl bg-primary text-white font-black text-xl shadow-xl shadow-primary/30 active:scale-95 transition-all">Save Profile Changes</Button>
           <Button variant="outline" className="flex-1 h-16 rounded-2xl border-primary/10 font-bold text-lg hover:bg-primary/5">Security Settings</Button>
        </div>
      </Card>
    </div>
  );

  const renderNotifications = () => (
    <div className="max-w-4xl mx-auto space-y-10 animate-in fade-in duration-700 pb-20">
      <div className="flex justify-between items-end">
         <div className="space-y-1">
            <h2 className="text-4xl font-black font-headline text-primary">Notifications</h2>
            <p className="text-muted-foreground">Stay updated with your agricultural ventures.</p>
         </div>
         <Button variant="ghost" className="font-bold text-primary">Mark all as read</Button>
      </div>

      <div className="space-y-4">
        {[
          { title: "Investasi Berhasil Dilakukan", desc: "Investasi Anda di Greenhouse Melon Lembang telah dikonfirmasi.", time: "10m ago", icon: CheckCircle2, color: "bg-green-100 text-green-700" },
          { title: "80% Funding Reached", desc: "Organic Tomato Project is almost fully funded. Last chance to join!", time: "2h ago", icon: TrendingUp, color: "bg-orange-100 text-orange-700" },
          { title: "Profit Distribution", desc: "Your payout for Chili Project 2025 is now available in your wallet.", time: "Yesterday", icon: Wallet, color: "bg-blue-100 text-blue-700" },
          { title: "Project Update", desc: "Farmer Pak Arif uploaded a new photo update for Modern Rice Cultivation.", time: "2 days ago", icon: Camera, color: "bg-primary/10 text-primary" },
          { title: "New Opportunity", desc: "A new Hydroponic Lettuce project matches your interest in High-Yield ventures.", time: "3 days ago", icon: Sparkles, color: "bg-accent/10 text-primary" },
        ].map((n, i) => (
          <Card key={i} className="p-8 rounded-[3rem] border-none shadow-sm bg-white hover:shadow-xl transition-all cursor-pointer group flex items-center gap-8">
            <div className={cn("h-16 w-16 rounded-3xl flex items-center justify-center shrink-0", n.color)}>
              <n.icon className="h-8 w-8" />
            </div>
            <div className="flex-1 space-y-2">
               <div className="flex justify-between items-start">
                  <h4 className="font-bold text-xl group-hover:text-primary transition-colors">{n.title}</h4>
                  <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{n.time}</span>
               </div>
               <p className="text-base text-muted-foreground leading-relaxed">{n.desc}</p>
            </div>
            <ChevronRight className="h-6 w-6 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
          </Card>
        ))}
      </div>
    </div>
  );

  const renderChat = () => (
    <div className="flex h-[calc(100vh-160px)] bg-white rounded-[3.5rem] shadow-2xl overflow-hidden border border-primary/5 animate-in fade-in duration-700">
      <aside className="w-96 border-r border-primary/5 flex flex-col bg-gray-50/30">
        <div className="p-8 space-y-6">
          <h2 className="text-3xl font-black font-headline text-primary">Messages</h2>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search farmers..." className="pl-12 rounded-2xl bg-white h-14 border-none shadow-sm font-bold" />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {[
            { id: 1, name: "Ahmad Surya", lastMsg: "Pembangunan mencapai 70%...", time: "10:30", avatar: "https://picsum.photos/seed/farmer1/100/100", active: true },
            { id: 2, name: "Pak Tani Maman", lastMsg: "Tomat ceri siap tanam...", time: "09:15", avatar: "https://picsum.photos/seed/farmer2/100/100", active: false },
          ].map((chat) => (
            <div key={chat.id} className={cn("p-8 flex items-center gap-5 cursor-pointer transition-all hover:bg-primary/5 border-l-4", chat.active ? "bg-white border-primary shadow-sm" : "border-transparent")}>
              <div className="h-16 w-16 rounded-full overflow-hidden relative border-4 border-white shadow-md">
                <Image src={chat.avatar} alt="Avatar" fill className="object-cover" />
                <span className="absolute bottom-0 right-0 h-4 w-4 bg-green-500 border-2 border-white rounded-full"></span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-1">
                   <h4 className="font-black text-sm truncate">{chat.name}</h4>
                   <span className="text-[10px] font-bold text-muted-foreground">{chat.time}</span>
                </div>
                <p className="text-xs text-muted-foreground truncate font-medium">{chat.lastMsg}</p>
              </div>
            </div>
          ))}
        </div>
      </aside>
      <main className="flex-1 flex flex-col">
        <header className="p-8 border-b border-primary/5 flex items-center justify-between bg-white relative z-10">
           <div className="flex items-center gap-5">
              <div className="h-14 w-14 rounded-full overflow-hidden relative border-2 border-primary/10 shadow-sm">
                 <Image src="https://picsum.photos/seed/farmer1/100/100" alt="Farmer" fill className="object-cover" />
              </div>
              <div>
                 <h3 className="font-black text-xl text-primary">Ahmad Surya</h3>
                 <p className="text-[10px] text-green-600 font-black uppercase tracking-[0.2em] flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-600 animate-pulse"></span> Active Now
                 </p>
              </div>
           </div>
           <div className="flex gap-3">
              <Button variant="outline" size="icon" className="rounded-full h-12 w-12"><Info className="h-5 w-5" /></Button>
              <Button variant="outline" size="icon" className="rounded-full h-12 w-12"><ChevronRight className="h-5 w-5" /></Button>
           </div>
        </header>
        <div className="flex-1 overflow-y-auto p-10 space-y-8 bg-primary/5 scroll-smooth">
           {chatHistory.map((msg) => (
             <div key={msg.id} className={cn("flex flex-col", msg.isMe ? "items-end" : "items-start")}>
               <div className={cn(
                 "max-w-[70%] p-6 rounded-[2.5rem] text-sm font-bold shadow-sm leading-relaxed",
                 msg.isMe ? "bg-primary text-white rounded-tr-none shadow-primary/20" : "bg-white text-primary rounded-tl-none border border-primary/5"
               )}>
                 {msg.text}
               </div>
               <span className="text-[10px] text-muted-foreground mt-3 px-4 font-black uppercase tracking-widest">{msg.time}</span>
             </div>
           ))}
        </div>
        <footer className="p-8 border-t border-primary/5 bg-white">
          <div className="flex gap-4 items-center bg-gray-50 p-3 rounded-3xl border border-primary/10 shadow-inner">
             <Input value={chatMessage} onChange={(e) => setChatMessage(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()} placeholder="Tulis pesan ke petani..." className="border-none focus-visible:ring-0 bg-transparent flex-1 font-bold text-primary px-4" />
             <Button onClick={handleSendMessage} size="icon" className="h-14 w-14 rounded-2xl bg-primary text-white shadow-xl shadow-primary/30 hover:scale-105 transition-all"><ArrowUpRight className="h-6 w-6" /></Button>
          </div>
        </footer>
      </main>
    </div>
  );

  return (
    <div className="space-y-0">
      {view === "dashboard" && renderDashboard()}
      {view === "analytics" && renderAnalytics()}
      {view === "portfolio" && renderPortfolio()}
      {view === "history" && renderHistory()}
      {view === "profile" && renderProfile()}
      {view === "notifications" && renderNotifications()}
      {view === "chat" && renderChat()}

      {/* Project Detail Modal */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="rounded-[3.5rem] border-none glassmorphism sm:max-w-[1000px] p-0 overflow-hidden outline-none shadow-[0_0_100px_rgba(0,0,0,0.1)]">
          <DialogTitle className="sr-only">{selectedProject?.name || "Project Details"}</DialogTitle>
          {selectedProject && (
            <div className="grid md:grid-cols-5 h-full max-h-[92vh] overflow-y-auto">
              <div className="md:col-span-3 p-12 space-y-12 border-r border-primary/5 bg-white">
                <div className="space-y-6">
                  <div className="flex justify-between items-start">
                    <Badge variant="outline" className="border-secondary text-secondary uppercase tracking-[0.2em] text-[10px] px-4 py-1.5 font-black">
                      {selectedProject.commodity}
                    </Badge>
                    <div className="flex items-center gap-2 text-sm font-black text-primary"><Clock className="h-5 w-5 text-accent" /> {selectedProject.duration} TENOR</div>
                  </div>
                  <h2 className="text-5xl font-black font-headline text-primary leading-[1.1] tracking-tight">{selectedProject.name}</h2>
                  <div className="flex items-center gap-2 text-lg font-bold text-muted-foreground"><MapPin className="h-5 w-5 text-primary" /> {selectedProject.location}</div>
                  
                  <div className="space-y-3">
                     <p className="text-sm font-black text-muted-foreground uppercase tracking-widest">Tentang Proyek</p>
                     <p className="text-lg leading-relaxed text-foreground/80 font-medium">{selectedProject.description}</p>
                  </div>
                </div>

                <div className="space-y-8">
                  <h4 className="text-sm font-black uppercase tracking-[0.2em] text-primary flex items-center gap-3">
                    <Calendar className="h-6 w-6 text-accent" /> Project Timeline Updates
                  </h4>
                  <div className="space-y-6 pl-2">
                    {selectedProject.updates.map((upd: any, idx: number) => (
                      <div key={idx} className="flex gap-8 relative">
                        {idx !== selectedProject.updates.length - 1 && <div className="absolute left-4 top-10 bottom-[-1.5rem] w-1 bg-primary/5 rounded-full"></div>}
                        <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white shrink-0 shadow-lg shadow-primary/20 relative z-10">
                           <span className="text-[10px] font-black">{idx + 1}</span>
                        </div>
                        <div className="space-y-2 pb-4">
                           <p className="text-xs font-black text-secondary uppercase tracking-widest">{upd.week}</p>
                           <p className="text-lg font-black text-primary/80">{upd.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-8">
                  <h4 className="text-sm font-black uppercase tracking-[0.2em] text-primary flex items-center gap-3">
                    <BarChart3 className="h-6 w-6 text-accent" /> Fund Allocation
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {selectedProject.breakdown.map((item: any, i: number) => (
                      <div key={i} className="p-6 bg-primary/5 rounded-3xl border border-primary/10">
                         <div className="flex justify-between items-end mb-3">
                            <p className="text-xs font-black text-muted-foreground uppercase tracking-widest">{item.label}</p>
                            <span className="text-xl font-black text-primary">{item.value}%</span>
                         </div>
                         <Progress value={item.value} className="h-2" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="md:col-span-2 bg-gray-50/50 p-12 flex flex-col justify-between space-y-12">
                 <div className="space-y-12">
                    <div className="space-y-8">
                       <h4 className="text-sm font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Farmer Profile</h4>
                       <div className="flex items-center gap-5 p-6 bg-white rounded-[2.5rem] shadow-xl border border-primary/5">
                          <div className="h-20 w-20 rounded-3xl bg-primary/10 flex items-center justify-center relative overflow-hidden border-4 border-white shadow-md">
                             <Image src="https://picsum.photos/seed/farmer/200/200" alt="Farmer" fill className="object-cover" />
                          </div>
                          <div>
                             <h5 className="font-black text-2xl text-primary">{selectedProject.farmerInfo.name}</h5>
                             <p className="text-sm font-bold text-muted-foreground flex items-center gap-1.5 mt-1"><MapPin className="h-4 w-4 text-primary" /> {selectedProject.location.split(',')[0]}</p>
                          </div>
                       </div>
                       
                       <div className="grid grid-cols-2 gap-4">
                          {[
                            { label: "Experience", val: selectedProject.farmerInfo.experience },
                            { label: "Success Rate", val: selectedProject.farmerInfo.successRate, color: "text-green-600" },
                            { label: "Projects", val: selectedProject.farmerInfo.completed },
                            { label: "Land Area", val: selectedProject.farmerInfo.totalLand },
                          ].map((stat, i) => (
                            <div key={i} className="bg-white p-5 rounded-3xl border shadow-sm text-center">
                               <p className="text-[10px] font-black text-muted-foreground uppercase mb-1 tracking-widest">{stat.label}</p>
                               <p className={cn("text-lg font-black", stat.color)}>{stat.val}</p>
                            </div>
                          ))}
                       </div>

                       <div className="bg-primary/5 p-8 rounded-[2.5rem] border border-primary/10 relative overflow-hidden group">
                          <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full -mr-12 -mt-12 blur-2xl group-hover:scale-125 transition-transform"></div>
                          <p className="text-xs font-black text-primary uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                             <Sparkles className="h-5 w-5 text-accent" /> Cerita Petani
                          </p>
                          <p className="text-base italic leading-relaxed text-muted-foreground font-medium">"{selectedProject.farmerInfo.story}"</p>
                       </div>
                    </div>
                 </div>

                 <div className="space-y-8 bg-white p-10 rounded-[3rem] shadow-2xl border border-primary/5 relative">
                    <div className="absolute top-0 right-10 transform -translate-y-1/2">
                       <Badge className="bg-accent text-primary border-none font-black px-6 py-2 rounded-xl text-lg shadow-xl shadow-accent/20">
                          {selectedProject.return} ROI
                       </Badge>
                    </div>
                    <div className="space-y-4">
                       <div className="flex justify-between items-end">
                          <p className="text-xs font-black text-muted-foreground uppercase tracking-widest">Funding Progress</p>
                          <p className="text-3xl font-black text-primary">{selectedProject.progress}%</p>
                       </div>
                       <Progress value={selectedProject.progress} className="h-4 bg-primary/10" />
                       <div className="flex justify-between text-sm font-black text-muted-foreground">
                          <span className="text-primary">Rp {formatPrice(selectedProject.collected)}</span>
                          <span>Target: Rp {formatPrice(selectedProject.target)}</span>
                       </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                       <div className="space-y-1">
                          <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Min. Invest</p>
                          <p className="text-lg font-black">Rp {formatPrice(selectedProject.minInvestment)}</p>
                       </div>
                       <div className="space-y-1 text-right">
                          <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Total Investors</p>
                          <p className="text-lg font-black">{selectedProject.investorsCount}</p>
                       </div>
                    </div>

                    <Button onClick={() => { setIsInvestOpen(true); setInvestStep(1); }} className="w-full h-16 rounded-2xl bg-secondary hover:bg-secondary/90 text-white font-black text-xl shadow-2xl shadow-secondary/30 active:scale-95 transition-all">Invest Now</Button>
                 </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isInvestOpen} onOpenChange={setIsInvestOpen}>
         <DialogContent className="rounded-[3rem] border-none glassmorphism sm:max-w-[480px] p-10 outline-none shadow-2xl">
            <DialogHeader>
              <DialogTitle className="text-3xl font-black font-headline text-primary mb-2">Mulai Investasi</DialogTitle>
              <DialogDescription className="text-lg">Dukung kedaulatan pangan dan raih profit berkelanjutan.</DialogDescription>
            </DialogHeader>
            
            {investStep === 1 && (
               <div className="py-8 space-y-10 animate-in slide-in-from-right-8 duration-500">
                  <div className="space-y-4">
                     <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-2">Jumlah Investasi (IDR)</Label>
                     <div className="relative">
                        <span className="absolute left-6 top-1/2 -translate-y-1/2 font-black text-primary text-2xl">Rp</span>
                        <Input 
                           type="number" 
                           value={investAmount} 
                           onChange={(e) => setInvestAmount(Number(e.target.value))}
                           className="pl-16 h-20 rounded-[2rem] border-primary/20 bg-primary/5 text-3xl font-black text-primary focus-visible:ring-primary shadow-inner" 
                        />
                     </div>
                     <p className="text-xs text-muted-foreground font-bold text-center">Minimal investasi: Rp {formatPrice(selectedProject?.minInvestment || 100000)}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                     {[100000, 500000, 1000000, 5000000].map((amt) => (
                        <button 
                           key={amt} 
                           onClick={() => setInvestAmount(amt)}
                           className={cn(
                              "h-14 rounded-2xl text-base font-black border-2 transition-all",
                              investAmount === amt ? "border-primary bg-primary text-white shadow-xl shadow-primary/20" : "border-primary/10 hover:border-primary/40 text-muted-foreground"
                           )}
                        >
                           Rp {formatPrice(amt)}
                        </button>
                     ))}
                  </div>
                  <Button onClick={() => setInvestStep(2)} disabled={investAmount < (selectedProject?.minInvestment || 100000)} className="w-full h-16 rounded-[2rem] bg-primary text-white font-black text-xl shadow-2xl shadow-primary/30 active:scale-95 transition-all">Review Ringkasan</Button>
               </div>
            )}

            {investStep === 2 && (
               <div className="py-8 space-y-10 animate-in slide-in-from-right-8 duration-500">
                  <Card className="rounded-[2.5rem] border-none shadow-inner bg-primary/5 p-8 space-y-6">
                     <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground font-bold">Proyek Utama</span>
                        <span className="font-black text-primary text-right max-w-[200px] leading-tight">{selectedProject?.name}</span>
                     </div>
                     <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground font-bold">Modal Investasi</span>
                        <span className="font-black text-primary text-right">Rp {formatPrice(investAmount)}</span>
                     </div>
                     <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground font-bold">Tenor / Durasi</span>
                        <span className="font-black text-primary text-right">{selectedProject?.duration}</span>
                     </div>
                     <Separator className="bg-primary/10" />
                     <div className="flex justify-between items-end">
                        <div>
                           <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest mb-1">Estimasi Bagi Hasil</p>
                           <p className="text-3xl font-black text-secondary">+Rp {formatPrice(investAmount * (parseInt(selectedProject?.return || "0") / 100))}</p>
                        </div>
                        <Badge className="bg-secondary text-white border-none font-black px-4 py-2 rounded-xl text-lg">{selectedProject?.return}</Badge>
                     </div>
                  </Card>
                  
                  <div className="flex flex-col gap-4">
                     <Button onClick={handleConfirmInvestment} className="w-full h-16 rounded-[2rem] bg-secondary hover:bg-secondary/90 text-white font-black text-xl shadow-2xl shadow-secondary/30 active:scale-95 transition-all">Konfirmasi Investasi</Button>
                     <Button variant="ghost" onClick={() => setInvestStep(1)} className="font-black text-muted-foreground h-12">Kembali</Button>
                  </div>
               </div>
            )}
         </DialogContent>
      </Dialog>

      <Dialog open={isChatOpen} onOpenChange={setIsChatOpen}>
         <DialogContent className="rounded-[3.5rem] border-none glassmorphism sm:max-w-[500px] p-0 overflow-hidden outline-none shadow-2xl">
            <DialogTitle className="sr-only">Chat with Farmer</DialogTitle>
            <div className="flex flex-col h-[650px]">
               <header className="p-8 border-b border-primary/5 bg-primary text-white relative">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                  <div className="flex items-center gap-5 relative z-10">
                     <div className="h-16 w-16 rounded-2xl bg-white/20 border-2 border-white/30 backdrop-blur-md flex items-center justify-center relative overflow-hidden shadow-xl">
                        <Image src="https://picsum.photos/seed/farmer/100/100" alt="Farmer" fill className="object-cover" />
                     </div>
                     <div>
                        <h3 className="font-black text-2xl">Ahmad Surya</h3>
                        <p className="text-xs font-bold opacity-70 uppercase tracking-[0.2em] flex items-center gap-2">
                           <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse"></span> Active Now
                        </p>
                     </div>
                     <button onClick={() => setIsChatOpen(false)} className="ml-auto h-12 w-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all">
                        <X className="h-6 w-6" />
                     </button>
                  </div>
               </header>
               
               <div className="flex-1 overflow-y-auto p-10 space-y-8 bg-primary/5 scroll-smooth">
                  {chatHistory.map((msg) => (
                     <div key={msg.id} className={cn("flex flex-col", msg.isMe ? "items-end" : "items-start")}>
                        <div className={cn(
                           "max-w-[85%] p-6 rounded-[2.5rem] text-sm font-bold shadow-sm leading-relaxed",
                           msg.isMe ? "bg-primary text-white rounded-tr-none shadow-primary/20" : "bg-white text-primary rounded-tl-none"
                        )}>
                           {msg.text}
                        </div>
                        <span className="text-[10px] text-muted-foreground mt-3 px-4 font-black uppercase tracking-widest">{msg.time}</span>
                     </div>
                  ))}
               </div>

               <footer className="p-8 bg-white border-t border-primary/5">
                  <div className="flex gap-4 items-center bg-gray-50 p-3 rounded-3xl border border-primary/10 shadow-inner">
                     <Input 
                        value={chatMessage} 
                        onChange={(e) => setChatMessage(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                        placeholder="Tulis balasan..." 
                        className="border-none focus-visible:ring-0 bg-transparent flex-1 font-black text-primary px-4" 
                     />
                     <Button onClick={handleSendMessage} size="icon" className="h-14 w-14 rounded-2xl bg-primary text-white shadow-xl active:scale-95 transition-all">
                        <ArrowRight className="h-6 w-6" />
                     </Button>
                  </div>
               </footer>
            </div>
         </DialogContent>
      </Dialog>
    </div>
  );
}

export function InvestorDashboard(props: InvestorDashboardProps) {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <InvestorDashboardContent {...props} />
      </Suspense>
    );
  }