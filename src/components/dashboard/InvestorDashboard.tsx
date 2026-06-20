"use client";

import { useState, useEffect, useMemo } from "react";
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
  Camera
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
    name: "Organic Cherry Tomato Expansion", 
    farmer: "Kelompok Tani Lembang", 
    location: "Bandung, West Java", 
    commodity: "Cherry Tomatoes", 
    target: 20000000, 
    collected: 12000000, 
    progress: 60, 
    duration: "4 Months", 
    return: "15%", 
    risk: "Low",
    image: "https://res.cloudinary.com/dhp46iviu/image/upload/v1781930246/cherry-tomato-vegetables-photo_j1fksb.jpg",
    description: "This project aims to expand organic cherry tomato production capacity through greenhouse development, irrigation improvements, and increased seed production.",
    farmerInfo: {
      name: "Pak Tani Maman",
      experience: "8 Years",
      successRate: "95%",
      totalLand: "2.5 Ha",
      completed: 12,
      story: "I started farming tomatoes in 2016 with a small family-owned greenhouse. Through technology and community support, I expanded production and now aim to increase capacity to serve more consumers and business partners."
    },
    updates: [
      { week: "Week 1", text: "Seeds have been purchased and land preparation started." },
      { week: "Week 3", text: "Greenhouse construction has started and irrigation installed." }
    ],
    breakdown: [
      { label: "Seeds", value: 20 },
      { label: "Fertilizer", value: 25 },
      { label: "Irrigation", value: 30 },
      { label: "Labor", value: 15 },
      { label: "Distribution", value: 10 }
    ]
  },
  { 
    id: 2, 
    name: "Modern Rice Cultivation", 
    farmer: "Arif Hidayat Farm", 
    location: "Cianjur, West Java", 
    commodity: "Premium Rice", 
    target: 50000000, 
    collected: 45000000, 
    progress: 90, 
    duration: "6 Months", 
    return: "12%", 
    risk: "Low",
    image: "https://res.cloudinary.com/dhp46iviu/image/upload/v1781923565/ir-64-parboiled-rice-5-broken-1000x1000_gibiwb.jpg",
    description: "Scaling up premium rice production using sustainable methods and modern harvesting equipment to ensure high-quality yield for national distribution.",
    farmerInfo: {
      name: "Pak Arif",
      experience: "15 Years",
      successRate: "98%",
      totalLand: "5 Ha",
      completed: 25,
      story: "Legacy farming passed through generations. We combine traditional wisdom with modern organic technology to provide the best rice for Indonesia."
    },
    updates: [
      { week: "Week 1", text: "Organic fertilizers prepared." },
      { week: "Week 2", text: "Tillage process in progress." }
    ],
    breakdown: [
      { label: "Land Prep", value: 30 },
      { label: "Organic Input", value: 40 },
      { label: "Equipment", value: 20 },
      { label: "Logistics", value: 10 }
    ]
  },
  { 
    id: 3, 
    name: "Greenhouse Melon Premium", 
    farmer: "Ibu Siti Makmur", 
    location: "Bandung Barat, West Java", 
    commodity: "Melon Cantaloupe", 
    target: 30000000, 
    collected: 10000000, 
    progress: 33, 
    duration: "3 Months", 
    return: "18%", 
    risk: "Medium",
    image: "https://res.cloudinary.com/dhp46iviu/image/upload/v1780966187/OIP_lstdbk.jpg",
    description: "Establishing a high-tech greenhouse specifically for premium Melon Cantaloupe cultivation to meet the rising demand from five-star hotels.",
    farmerInfo: {
      name: "Ibu Siti",
      experience: "5 Years",
      successRate: "92%",
      totalLand: "1.2 Ha",
      completed: 8,
      story: "Focusing on high-value fruits has changed my family's economy. I believe precision farming is the future of Indonesian agriculture."
    },
    updates: [
      { week: "Week 1", text: "Project planning finalized." }
    ],
    breakdown: [
      { label: "Greenhouse", value: 50 },
      { label: "Premium Seeds", value: 15 },
      { label: "IoT Sensors", value: 25 },
      { label: "Labor", value: 10 }
    ]
  }
];

const trendingProjects = [
  { name: "Smart Irrigation System", progress: 85, color: "text-blue-600" },
  { name: "Organic Chili Expansion", progress: 78, color: "text-orange-600" },
  { name: "Hydroponic Greenhouse", progress: 72, color: "text-green-600" },
];

const portfolioGrowthData = [
  { name: "Jan", value: 15.2 },
  { name: "Feb", value: 18.5 },
  { name: "Mar", value: 22.1 },
  { name: "Apr", value: 28.4 },
  { name: "Mei", value: 31.8 },
  { name: "Jun", value: 35.5 },
];

const commodityDistribution = [
  { name: "Tomatoes", value: 35, color: "#2E7D32" },
  { name: "Chili", value: 25, color: "#F57C00" },
  { name: "Rice", value: 20, color: "#F4B400" },
  { name: "Hydroponics", value: 20, color: "#2563eb" },
];

interface InvestorDashboardProps {
  view?: string;
  setView?: (v: string) => void;
}

export function InvestorDashboard({ view = "dashboard", setView }: InvestorDashboardProps) {
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("q") || "";
  
  const [mounted, setMounted] = useState(false);
  
  // State
  const [portfolio, setPortfolio] = useState([
    { id: 101, name: "Vanilla Premium NTT", farmer: "Koperasi Tani Flores", investment: 5000000, progress: 45, estReturn: 750000, status: "Active", date: "15 May 2026" },
    { id: 102, name: "Organic Chili Scale-up", farmer: "Pak Budi Jaya", investment: 3000000, progress: 85, estReturn: 450000, status: "Active", date: "02 Apr 2026" },
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
    totalInvested: 35500000,
    totalProfit: 5800000,
    projectsInvested: 8
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
    { id: 1, text: "Can you explain the irrigation plan?", isMe: true, time: "10:30" },
    { id: 2, text: "We will install a drip irrigation system to increase productivity and save water.", isMe: false, time: "10:35" }
  ]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const formatPrice = (val: number) => {
    if (!mounted) return val.toString();
    return val.toLocaleString('id-ID');
  };

  const filteredProjects = useMemo(() => {
    if (!searchQuery) return initialExploreProjects;
    return initialExploreProjects.filter(p => 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.farmer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.commodity.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const handleConfirmInvestment = () => {
    const newInvestment = {
      id: Date.now(),
      name: selectedProject.name,
      farmer: selectedProject.farmer,
      investment: investAmount,
      progress: 0,
      estReturn: investAmount * (parseInt(selectedProject.return) / 100),
      status: "Active",
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
    };

    setPortfolio([newInvestment, ...portfolio]);
    setInvestorProfile(prev => ({
      ...prev,
      totalInvested: prev.totalInvested + investAmount,
      projectsInvested: prev.projectsInvested + 1
    }));
    
    setIsInvestOpen(false);
    toast({
      title: "Investment Successful!",
      description: `You have invested Rp ${formatPrice(investAmount)} in ${selectedProject.name}.`,
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
    
    setTimeout(() => {
      const response = {
        id: Date.now() + 1,
        text: "Thank you for your interest! We will get back to you with more details shortly.",
        isMe: false,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatHistory(prev => [...prev, response]);
    }, 1500);
  };

  if (!mounted) return null;

  const renderDashboard = () => (
    <div className="space-y-12 animate-in fade-in duration-500">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { label: "Portfolio Value", value: `Rp ${formatPrice(investorProfile.totalInvested / 1000000)}M`, icon: Wallet, color: "text-primary", bg: "bg-primary/10" },
          { label: "Active Projects", value: "5 Projects", icon: Clock, color: "text-orange-600", bg: "bg-orange-50" },
          { label: "Estimated Returns", value: `Rp ${formatPrice(investorProfile.totalProfit / 1000000)}M`, icon: TrendingUp, color: "text-secondary", bg: "bg-secondary/10" },
          { label: "Completed", value: "3 Projects", icon: CheckCircle2, color: "text-green-600", bg: "bg-green-50" },
        ].map((stat, idx) => (
          <Card key={idx} className="rounded-3xl border-none shadow-xl glassmorphism">
            <CardContent className="p-6 flex flex-col items-center text-center space-y-2">
              <div className={cn("p-4 rounded-2xl mb-2", stat.bg)}>
                <stat.icon className={cn("h-6 w-6", stat.color)} />
              </div>
              <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">{stat.label}</p>
              <p className="text-xl font-black text-primary">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3 space-y-8">
          <div className="flex justify-between items-end">
            <div className="space-y-1">
              <h2 className="text-3xl font-black font-headline text-primary">Investment Opportunities</h2>
              <p className="text-muted-foreground">High-impact agricultural projects ready for support.</p>
            </div>
            {searchQuery && (
              <Badge className="bg-primary/10 text-primary border-none px-4 py-1">
                Showing results for: "{searchQuery}"
              </Badge>
            )}
          </div>

          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredProjects.map((p) => (
                <Card key={p.id} className="group overflow-hidden rounded-[2.5rem] border-none shadow-xl bg-white hover:shadow-2xl transition-all duration-500">
                  <div className="relative aspect-[16/10]">
                    <Image src={p.image} alt={p.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <Badge className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm text-primary border-none font-black px-4 py-1">
                      {p.return} Return
                    </Badge>
                  </div>
                  <CardContent className="p-8 space-y-6">
                    <div>
                       <p className="text-[10px] font-black uppercase tracking-widest text-secondary mb-1">{p.commodity}</p>
                       <h3 className="text-xl font-bold leading-tight line-clamp-1">{p.name}</h3>
                       <p className="text-xs text-muted-foreground font-bold flex items-center gap-1 mt-1"><Users className="h-3 w-3" /> {p.farmer}</p>
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
                      <Button onClick={() => { setSelectedProject(p); setIsDetailOpen(true); }} variant="outline" className="rounded-2xl h-12 font-bold">Details</Button>
                      <Button onClick={() => { setSelectedProject(p); setIsInvestOpen(true); setInvestStep(1); }} className="rounded-2xl h-12 bg-primary text-white font-black">Invest Now</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center glassmorphism rounded-[3rem]">
               <Search className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
               <h3 className="text-2xl font-black text-primary mb-2">No projects found</h3>
               <p className="text-muted-foreground">Try searching with different keywords.</p>
            </div>
          )}
        </div>

        <div className="space-y-8">
           <Card className="rounded-[2.5rem] border-none shadow-xl bg-white p-8">
             <CardTitle className="text-xl font-black font-headline text-primary mb-6 flex items-center gap-2">
                <Flame className="h-5 w-5 text-orange-500" /> Trending Now
             </CardTitle>
             <div className="space-y-6">
                {trendingProjects.map((tp, i) => (
                  <div key={i} className="space-y-2">
                     <div className="flex justify-between items-center">
                        <h4 className="text-sm font-bold leading-tight">{tp.name}</h4>
                        <Badge className="bg-primary/5 text-primary border-none text-[10px] font-black">{tp.progress}%</Badge>
                     </div>
                     <Progress value={tp.progress} className="h-1.5" />
                  </div>
                ))}
             </div>
             <Button variant="link" className="text-secondary font-black p-0 mt-6 group">
                View All Trends <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
             </Button>
           </Card>

           <Card className="rounded-[2.5rem] border-none bg-primary text-white p-8 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
              <div className="relative z-10 space-y-4">
                 <div className="p-3 bg-white/20 rounded-2xl w-fit"><Sparkles className="h-6 w-6 text-accent" /></div>
                 <h3 className="text-2xl font-black font-headline">Premium Perks</h3>
                 <p className="text-sm opacity-80 leading-relaxed">Get early access to high-yield hydroponic projects with Platinum Investor status.</p>
                 <Button className="w-full rounded-2xl bg-white text-primary font-black h-12 shadow-xl">Upgrade Now</Button>
              </div>
           </Card>
        </div>
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-10 animate-in fade-in duration-500">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Total Invested", value: `Rp ${formatPrice(investorProfile.totalInvested)}`, change: "+12%", up: true },
          { label: "Current Value", value: `Rp ${formatPrice(40800000)}`, change: "+16.5%", up: true },
          { label: "Estimated Profit", value: `Rp ${formatPrice(5800000)}`, change: "Stable", up: true },
          { label: "Overall ROI", value: "16.5%", change: "+2.1%", up: true },
        ].map((stat, i) => (
          <Card key={i} className="rounded-3xl border-none shadow-lg p-6 space-y-2 bg-white">
            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{stat.label}</p>
            <h3 className="text-2xl font-black text-primary">{stat.value}</h3>
            <p className={cn("text-xs font-bold", stat.up ? "text-green-600" : "text-destructive")}>{stat.change} vs last month</p>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 rounded-[3rem] border-none shadow-xl bg-white p-8">
          <CardTitle className="text-xl font-bold font-headline text-primary mb-8">Portfolio Growth (Million Rp)</CardTitle>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={portfolioGrowthData}>
                <defs>
                  <linearGradient id="colorGrowth" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 600 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 600 }} />
                <Tooltip />
                <Area type="monotone" dataKey="value" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorGrowth)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="rounded-[3rem] border-none shadow-xl bg-white p-8">
          <CardTitle className="text-xl font-bold font-headline text-primary mb-8">Commodity Mix</CardTitle>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={commodityDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {commodityDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-3 mt-4">
             {commodityDistribution.map((item, i) => (
               <div key={i} className="flex justify-between items-center text-sm font-bold">
                  <div className="flex items-center gap-2">
                     <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                     <span className="text-muted-foreground">{item.name}</span>
                  </div>
                  <span>{item.value}%</span>
               </div>
             ))}
          </div>
        </Card>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-black font-headline text-primary">Popular Projects</h2>
        <div className="grid md:grid-cols-3 gap-6">
           {[
             { name: "Tomato Expansion", investors: 126, progress: 90, icon: TrendingUp },
             { name: "Hydroponic Development", investors: 98, progress: 82, icon: Zap },
             { name: "Smart Irrigation", investors: 75, progress: 78, icon: Briefcase },
           ].map((item, i) => (
             <Card key={i} className="p-6 rounded-3xl border-none shadow-md bg-white flex flex-col justify-between group hover:shadow-xl transition-all">
                <div className="flex justify-between items-start mb-4">
                   <div className="p-3 bg-primary/5 rounded-2xl group-hover:bg-primary group-hover:text-white transition-colors">
                      <item.icon className="h-6 w-6" />
                   </div>
                   <Badge className="bg-green-100 text-green-700 border-none font-black text-[10px]">{item.progress}% Funded</Badge>
                </div>
                <h4 className="font-bold text-lg mb-1">{item.name}</h4>
                <p className="text-xs text-muted-foreground font-bold mb-4">{item.investors} Active Investors</p>
                <Button variant="outline" className="w-full rounded-xl border-primary/10 font-bold group-hover:bg-primary group-hover:text-white">View Details</Button>
             </Card>
           ))}
        </div>
      </div>
    </div>
  );

  const renderPortfolio = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-1">
          <h2 className="text-3xl font-black font-headline text-primary">My Investments</h2>
          <p className="text-muted-foreground">Managing {portfolio.length} active agricultural projects.</p>
        </div>
      </div>
      <div className="grid gap-6">
        {portfolio.map((p) => (
          <Card key={p.id} className="rounded-[2.5rem] border-none shadow-lg bg-white overflow-hidden p-8 hover:shadow-xl transition-all group">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
              <div className="flex-1 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <Badge className="bg-primary/10 text-primary border-none font-black text-[10px] mb-2 px-3 py-1 uppercase tracking-widest">ID: FM-INV-{p.id}</Badge>
                    <h3 className="text-2xl font-black font-headline text-primary leading-tight group-hover:text-secondary transition-colors">{p.name}</h3>
                    <div className="flex items-center gap-2 text-sm font-bold text-muted-foreground mt-1">
                      <Users className="h-4 w-4 text-primary" /> {p.farmer}
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-700 border-none font-black uppercase tracking-widest text-[10px] px-3 py-1.5">{p.status}</Badge>
                </div>
                
                <div className="grid grid-cols-3 gap-6 border-y border-primary/5 py-4">
                  <div>
                    <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest mb-1">Invested</p>
                    <p className="text-lg font-black text-primary">Rp {formatPrice(p.investment)}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest mb-1">Est. Return</p>
                    <p className="text-lg font-black text-secondary">+Rp {formatPrice(p.estReturn)}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest mb-1">Invested Date</p>
                    <p className="text-sm font-bold mt-1">{p.date}</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                   <div className="flex justify-between text-[10px] font-black text-muted-foreground uppercase">
                      <span>Project Progress</span>
                      <span>{p.progress}% Complete</span>
                   </div>
                   <Progress value={p.progress} className="h-2" />
                </div>
              </div>
              <div className="flex flex-col gap-2 w-full md:w-auto">
                <Button variant="outline" className="h-12 rounded-xl border-primary/10 text-primary font-bold">Timeline</Button>
                <Button onClick={() => setIsChatOpen(true)} variant="outline" className="h-12 rounded-xl border-primary/10 text-primary font-bold flex items-center gap-2">
                   <MessageCircle className="h-4 w-4" /> Chat Farmer
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderHistory = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid md:grid-cols-3 gap-8">
         <Card className="p-8 rounded-[2.5rem] border-none bg-primary text-white space-y-2">
            <p className="text-xs font-bold opacity-80 uppercase tracking-widest">Total Profit Received</p>
            <h3 className="text-4xl font-black">Rp {formatPrice(1200000)}</h3>
         </Card>
         <Card className="p-8 rounded-[2.5rem] border-none bg-secondary text-white space-y-2">
            <p className="text-xs font-bold opacity-80 uppercase tracking-widest">Average ROI</p>
            <h3 className="text-4xl font-black">15.2%</h3>
         </Card>
         <Card className="p-8 rounded-[2.5rem] border-none bg-accent text-primary space-y-2">
            <p className="text-xs font-bold opacity-70 uppercase tracking-widest">Completed Projects</p>
            <h3 className="text-4xl font-black">3</h3>
         </Card>
      </div>

      <div className="space-y-4">
        {history.map((h) => (
          <Card key={h.id} className="rounded-3xl border-none shadow-sm bg-white p-8 hover:shadow-md transition-all">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="flex items-center gap-6">
                 <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                    <CheckCircle2 className="h-8 w-8" />
                 </div>
                 <div>
                    <h4 className="font-bold text-xl text-primary">{h.name}</h4>
                    <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest">{h.date} • ID: {h.id}</p>
                 </div>
              </div>
              <div className="flex gap-12 text-right">
                 <div>
                    <p className="text-[10px] font-black text-muted-foreground uppercase mb-1">Principal</p>
                    <p className="font-bold">Rp {formatPrice(h.investment)}</p>
                 </div>
                 <div>
                    <p className="text-[10px] font-black text-muted-foreground uppercase mb-1">Profit (ROI: {h.roi})</p>
                    <p className="text-2xl font-black text-green-600">+Rp {formatPrice(h.profit)}</p>
                 </div>
              </div>
              <Button variant="ghost" size="icon" className="rounded-full text-muted-foreground"><ChevronRight className="h-6 w-6" /></Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderProfile = () => (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row items-center gap-8 bg-white/50 p-10 rounded-[4rem] border border-white/20 glassmorphism relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full -mr-32 -mt-32 blur-[80px]"></div>
        <div className="relative">
          <div className="h-32 w-32 rounded-full border-4 border-white shadow-2xl overflow-hidden relative">
            <Image src="https://picsum.photos/seed/investor/200/200" alt="Avatar" fill className="object-cover" />
          </div>
        </div>
        <div className="text-center md:text-left space-y-2">
          <h1 className="text-4xl font-black font-headline text-primary">{investorProfile.name}</h1>
          <div className="flex items-center justify-center md:justify-start gap-2">
            <Badge className="bg-primary/10 text-primary border-none font-bold uppercase text-[10px]">Verified Investor</Badge>
            <span className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">ID: {investorProfile.investorId}</span>
          </div>
          <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-2">
             <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground"><MapPin className="h-3 w-3 text-primary" /> Jakarta, Indonesia</div>
             <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground"><Calendar className="h-3 w-3 text-primary" /> Member Since {investorProfile.memberSince}</div>
          </div>
        </div>
      </div>

      <Card className="rounded-[3rem] border-none shadow-xl bg-white p-10 space-y-8">
        <CardTitle className="text-2xl font-black font-headline text-primary">Personal Information</CardTitle>
        <div className="grid md:grid-cols-2 gap-8">
           <div className="space-y-2">
              <Label className="font-bold text-xs uppercase text-muted-foreground">Full Name</Label>
              <Input value={investorProfile.name} onChange={(e) => setInvestorProfile({...investorProfile, name: e.target.value})} className="h-12 rounded-xl bg-gray-50 border-none font-bold" />
           </div>
           <div className="space-y-2">
              <Label className="font-bold text-xs uppercase text-muted-foreground">Email Address</Label>
              <Input value={investorProfile.email} className="h-12 rounded-xl bg-gray-50 border-none font-bold" />
           </div>
           <div className="space-y-2">
              <Label className="font-bold text-xs uppercase text-muted-foreground">Phone Number</Label>
              <Input value={investorProfile.phone} className="h-12 rounded-xl bg-gray-50 border-none font-bold" />
           </div>
           <div className="space-y-2">
              <Label className="font-bold text-xs uppercase text-muted-foreground">Investor ID</Label>
              <Input value={investorProfile.investorId} disabled className="h-12 rounded-xl bg-gray-100 border-none font-bold" />
           </div>
        </div>
        
        <div className="pt-8 border-t border-primary/5 grid grid-cols-3 gap-6">
           <div className="text-center p-6 bg-primary/5 rounded-3xl">
              <p className="text-[10px] font-black uppercase text-muted-foreground mb-1">Total Investment</p>
              <p className="text-lg font-black text-primary">Rp {formatPrice(investorProfile.totalInvested)}</p>
           </div>
           <div className="text-center p-6 bg-primary/5 rounded-3xl">
              <p className="text-[10px] font-black uppercase text-muted-foreground mb-1">Profit Earned</p>
              <p className="text-lg font-black text-secondary">Rp {formatPrice(investorProfile.totalProfit)}</p>
           </div>
           <div className="text-center p-6 bg-primary/5 rounded-3xl">
              <p className="text-[10px] font-black uppercase text-muted-foreground mb-1">Active Projects</p>
              <p className="text-lg font-black text-blue-600">{investorProfile.projectsInvested}</p>
           </div>
        </div>

        <div className="flex gap-4">
           <Button onClick={() => toast({ title: "Profile Saved", description: "Your changes have been successfully updated."})} className="flex-1 h-14 rounded-2xl bg-primary text-white font-black text-lg">Save Changes</Button>
           <Button variant="outline" className="flex-1 h-14 rounded-2xl border-primary/10 font-bold">Cancel</Button>
        </div>
      </Card>
    </div>
  );

  const renderNotifications = () => (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <h2 className="text-3xl font-black font-headline text-primary">Notifications</h2>
      <div className="space-y-4">
        {[
          { title: "Investment Confirmed", desc: "Your investment in Vanilla Premium NTT has been confirmed.", time: "10m ago", icon: CheckCircle2, color: "bg-green-100 text-green-700" },
          { title: "80% Funding Reached", desc: "Organic Tomato Project is almost fully funded. Last chance to join!", time: "2h ago", icon: TrendingUp, color: "bg-orange-100 text-orange-700" },
          { title: "Profit Distribution", desc: "Your payout for Chili Project 2025 is now available in your wallet.", time: "Yesterday", icon: Wallet, color: "bg-blue-100 text-blue-700" },
          { title: "Project Update", desc: "Farmer Pak Arif uploaded a new photo update for Modern Rice Cultivation.", time: "2 days ago", icon: Camera, color: "bg-primary/10 text-primary" },
          { title: "New Opportunity", desc: "A new Hydroponic Lettuce project matches your interest in High-Yield ventures.", time: "3 days ago", icon: Sparkles, color: "bg-accent/10 text-primary" },
        ].map((n, i) => (
          <Card key={i} className="p-6 rounded-[2.5rem] border-none shadow-sm bg-white hover:shadow-xl transition-all cursor-pointer group flex items-center gap-6">
            <div className={cn("h-14 w-14 rounded-2xl flex items-center justify-center shrink-0", n.color)}>
              <n.icon className="h-7 w-7" />
            </div>
            <div className="flex-1 space-y-1">
               <div className="flex justify-between items-start">
                  <h4 className="font-bold text-lg group-hover:text-primary transition-colors">{n.title}</h4>
                  <span className="text-[10px] font-bold text-muted-foreground uppercase">{n.time}</span>
               </div>
               <p className="text-sm text-muted-foreground leading-relaxed">{n.desc}</p>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </Card>
        ))}
      </div>
    </div>
  );

  const renderChat = () => (
    <div className="flex h-[calc(100vh-160px)] bg-white rounded-[3rem] shadow-xl overflow-hidden border border-primary/5 animate-in fade-in duration-500">
      <aside className="w-80 border-r flex flex-col bg-gray-50/50">
        <div className="p-6 space-y-4">
          <h2 className="text-2xl font-black font-headline text-primary">Chat Farmer</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search farmers..." className="pl-10 rounded-xl bg-white h-11" />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {[
            { id: 1, name: "Pak Tani Maman", lastMsg: "We just finished planting!", time: "10:30", avatar: "https://picsum.photos/seed/farmer1/100/100" },
            { id: 2, name: "Arif Hidayat", lastMsg: "The irrigation system is live.", time: "09:15", avatar: "https://picsum.photos/seed/farmer2/100/100" },
          ].map((chat) => (
            <div key={chat.id} className={cn("p-6 flex items-center gap-4 cursor-pointer transition-all hover:bg-primary/5", chat.id === 1 && "bg-white border-r-4 border-primary")}>
              <div className="h-12 w-12 rounded-full overflow-hidden relative border-2 border-white shadow-sm">
                <Image src={chat.avatar} alt="Avatar" fill className="object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-sm truncate">{chat.name}</h4>
                <p className="text-xs text-muted-foreground truncate">{chat.lastMsg}</p>
              </div>
            </div>
          ))}
        </div>
      </aside>
      <main className="flex-1 flex flex-col">
        <header className="p-6 border-b flex items-center justify-between">
           <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-full overflow-hidden relative border shadow-sm">
                 <Image src="https://picsum.photos/seed/farmer1/100/100" alt="Farmer" fill className="object-cover" />
              </div>
              <div>
                 <h3 className="font-bold">Pak Tani Maman</h3>
                 <p className="text-[10px] text-primary font-black uppercase tracking-widest">Active Now</p>
              </div>
           </div>
        </header>
        <div className="flex-1 overflow-y-auto p-8 space-y-6 bg-primary/5">
           {chatHistory.map((msg) => (
             <div key={msg.id} className={cn("flex flex-col", msg.isMe ? "items-end" : "items-start")}>
               <div className={cn("max-w-[70%] p-5 rounded-[2rem] text-sm font-medium shadow-sm", msg.isMe ? "bg-primary text-white rounded-tr-none" : "bg-white text-primary rounded-tl-none")}>
                 {msg.text}
               </div>
               <span className="text-[10px] text-muted-foreground mt-2 px-2 font-bold">{msg.time}</span>
             </div>
           ))}
        </div>
        <footer className="p-6 border-t bg-white">
          <div className="flex gap-4 items-center bg-gray-50 p-2 rounded-2xl border">
             <Input value={chatMessage} onChange={(e) => setChatMessage(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()} placeholder="Type a message..." className="border-none focus-visible:ring-0 bg-transparent flex-1 font-medium" />
             <Button onClick={handleSendMessage} size="icon" className="h-11 w-11 rounded-xl bg-primary text-white shadow-lg"><ArrowRight className="h-5 w-5" /></Button>
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

      {/* 4. Project Detail Modal */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="rounded-[3rem] border-none glassmorphism sm:max-w-[900px] p-0 overflow-hidden outline-none">
          <DialogTitle className="sr-only">{selectedProject?.name || "Project Details"}</DialogTitle>
          {selectedProject && (
            <div className="grid md:grid-cols-5 h-full max-h-[90vh] overflow-y-auto">
              {/* Left Column: Project Info & Updates */}
              <div className="md:col-span-3 p-10 space-y-10 border-r border-primary/5">
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <Badge variant="outline" className="border-secondary text-secondary uppercase tracking-[0.2em] text-[10px] px-3 py-1 font-black">
                      {selectedProject.commodity}
                    </Badge>
                    <div className="flex items-center gap-2 text-sm font-bold text-muted-foreground"><Clock className="h-4 w-4 text-primary" /> {selectedProject.duration}</div>
                  </div>
                  <h2 className="text-4xl font-black font-headline text-primary leading-tight">{selectedProject.name}</h2>
                  <div className="flex items-center gap-2 text-lg font-bold text-muted-foreground"><MapPin className="h-5 w-5 text-primary" /> {selectedProject.location}</div>
                  <p className="text-base leading-relaxed text-foreground/80">{selectedProject.description}</p>
                </div>

                <div className="space-y-6">
                  <h4 className="text-sm font-black uppercase tracking-widest text-primary flex items-center gap-2">
                    <Calendar className="h-5 w-5" /> Project Updates
                  </h4>
                  <div className="space-y-4">
                    {selectedProject.updates.map((upd: any, idx: number) => (
                      <div key={idx} className="flex gap-6 relative">
                        {idx !== selectedProject.updates.length - 1 && <div className="absolute left-3.5 top-8 bottom-[-1rem] w-0.5 bg-primary/10"></div>}
                        <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white shrink-0 shadow-lg relative z-10">
                           <span className="text-[10px] font-black">{idx + 1}</span>
                        </div>
                        <div className="space-y-1 pb-2">
                           <p className="text-xs font-black text-secondary uppercase tracking-widest">{upd.week}</p>
                           <p className="text-sm font-bold text-primary/80">{upd.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  <h4 className="text-sm font-black uppercase tracking-widest text-primary flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" /> Fund Allocation
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {selectedProject.breakdown.map((item: any, i: number) => (
                      <div key={i} className="p-4 bg-primary/5 rounded-2xl border border-primary/10">
                         <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">{item.label}</p>
                         <div className="flex items-end gap-2">
                            <span className="text-xl font-black text-primary">{item.value}%</span>
                         </div>
                         <Progress value={item.value} className="h-1 mt-3" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Farmer Profile & Invest CTA */}
              <div className="md:col-span-2 bg-gray-50/50 p-10 flex flex-col justify-between space-y-10">
                 <div className="space-y-10">
                    <div className="space-y-6">
                       <h4 className="text-sm font-black uppercase tracking-widest text-muted-foreground">Farmer Profile</h4>
                       <div className="flex items-center gap-4 p-4 bg-white rounded-3xl shadow-sm border">
                          <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center relative overflow-hidden">
                             <Image src="https://picsum.photos/seed/farmer/200/200" alt="Farmer" fill className="object-cover" />
                          </div>
                          <div>
                             <h5 className="font-black text-lg text-primary">{selectedProject.farmerInfo.name}</h5>
                             <p className="text-xs font-bold text-muted-foreground flex items-center gap-1"><MapPin className="h-3 w-3 text-primary" /> {selectedProject.location.split(',')[0]}</p>
                          </div>
                       </div>
                       
                       <div className="grid grid-cols-2 gap-4">
                          <div className="bg-white p-4 rounded-2xl border shadow-sm">
                             <p className="text-[10px] font-black text-muted-foreground uppercase mb-1">Experience</p>
                             <p className="font-black">{selectedProject.farmerInfo.experience}</p>
                          </div>
                          <div className="bg-white p-4 rounded-2xl border shadow-sm">
                             <p className="text-[10px] font-black text-muted-foreground uppercase mb-1">Success Rate</p>
                             <p className="font-black text-green-600">{selectedProject.farmerInfo.successRate}</p>
                          </div>
                          <div className="bg-white p-4 rounded-2xl border shadow-sm">
                             <p className="text-[10px] font-black text-muted-foreground uppercase mb-1">Completed</p>
                             <p className="font-black">{selectedProject.farmerInfo.completed} Projects</p>
                          </div>
                          <div className="bg-white p-4 rounded-2xl border shadow-sm">
                             <p className="text-[10px] font-black text-muted-foreground uppercase mb-1">Land Area</p>
                             <p className="font-black">{selectedProject.farmerInfo.totalLand}</p>
                          </div>
                       </div>

                       <div className="bg-primary/5 p-6 rounded-3xl border border-primary/10">
                          <p className="text-xs font-black text-primary uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
                             <Sparkles className="h-4 w-4" /> Farmer Story
                          </p>
                          <p className="text-sm italic leading-relaxed text-muted-foreground">"{selectedProject.farmerInfo.story}"</p>
                       </div>
                    </div>
                 </div>

                 <div className="space-y-6">
                    <div className="space-y-3">
                       <div className="flex justify-between items-end">
                          <p className="text-xs font-black text-muted-foreground uppercase tracking-widest">Progress</p>
                          <p className="text-2xl font-black text-primary">{selectedProject.progress}%</p>
                       </div>
                       <Progress value={selectedProject.progress} className="h-3" />
                       <div className="flex justify-between text-xs font-bold text-muted-foreground">
                          <span>Rp {formatPrice(selectedProject.collected)}</span>
                          <span>Target: Rp {formatPrice(selectedProject.target)}</span>
                       </div>
                    </div>
                    <div className="p-6 bg-primary rounded-3xl text-white shadow-2xl shadow-primary/30 space-y-4">
                       <div className="flex justify-between items-center">
                          <p className="text-xs font-bold opacity-80 uppercase tracking-widest">Expected Return</p>
                          <p className="text-3xl font-black text-accent">{selectedProject.return}</p>
                       </div>
                       <Button onClick={() => { setIsInvestOpen(true); setInvestStep(1); }} className="w-full h-14 rounded-2xl bg-white text-primary hover:bg-white/90 font-black text-lg shadow-xl active:scale-95 transition-all">Invest Now</Button>
                    </div>
                 </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* 5. Investment Flow Dialog */}
      <Dialog open={isInvestOpen} onOpenChange={setIsInvestOpen}>
         <DialogContent className="rounded-[2.5rem] border-none glassmorphism sm:max-w-[450px] p-8 outline-none">
            <DialogTitle className="text-2xl font-black font-headline text-primary mb-2">Invest in Project</DialogTitle>
            <DialogDescription>Fueling agricultural growth through collaborative funding.</DialogDescription>
            
            {investStep === 1 && (
               <div className="py-6 space-y-8 animate-in slide-in-from-right-4 duration-500">
                  <div className="space-y-3">
                     <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Investment Amount</Label>
                     <div className="relative">
                        <span className="absolute left-5 top-1/2 -translate-y-1/2 font-black text-primary text-xl">Rp</span>
                        <Input 
                           type="number" 
                           value={investAmount} 
                           onChange={(e) => setInvestAmount(Number(e.target.value))}
                           className="pl-14 h-16 rounded-2xl border-primary/20 bg-primary/5 text-2xl font-black text-primary" 
                        />
                     </div>
                     <p className="text-[10px] text-muted-foreground font-bold text-center">Minimum investment: Rp 1,000,000</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                     {[1000000, 2000000, 5000000, 10000000].map((amt) => (
                        <button 
                           key={amt} 
                           onClick={() => setInvestAmount(amt)}
                           className={cn(
                              "h-12 rounded-xl text-sm font-bold border-2 transition-all",
                              investAmount === amt ? "border-primary bg-primary text-white" : "border-primary/10 hover:border-primary/40 text-muted-foreground"
                           )}
                        >
                           Rp {formatPrice(amt)}
                        </button>
                     ))}
                  </div>
                  <Button onClick={() => setInvestStep(2)} disabled={investAmount < 1000000} className="w-full h-16 rounded-2xl bg-primary text-white font-black text-xl shadow-xl shadow-primary/20">Review Summary</Button>
               </div>
            )}

            {investStep === 2 && (
               <div className="py-6 space-y-8 animate-in slide-in-from-right-4 duration-500">
                  <Card className="rounded-3xl border-none shadow-inner bg-primary/5 p-6 space-y-4">
                     <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground font-bold">Project Name</span>
                        <span className="font-black text-primary text-right">{selectedProject?.name}</span>
                     </div>
                     <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground font-bold">Principal Amount</span>
                        <span className="font-black text-primary text-right">Rp {formatPrice(investAmount)}</span>
                     </div>
                     <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground font-bold">Duration</span>
                        <span className="font-black text-primary text-right">{selectedProject?.duration}</span>
                     </div>
                     <Separator className="bg-primary/10" />
                     <div className="flex justify-between items-end">
                        <div>
                           <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest mb-1">Estimated Return</p>
                           <p className="text-2xl font-black text-secondary">+Rp {formatPrice(investAmount * (parseInt(selectedProject?.return || "0") / 100))}</p>
                        </div>
                        <Badge className="bg-secondary text-white border-none font-black">{selectedProject?.return}</Badge>
                     </div>
                  </Card>
                  
                  <div className="flex flex-col gap-3">
                     <Button onClick={handleConfirmInvestment} className="w-full h-16 rounded-2xl bg-secondary hover:bg-secondary/90 text-white font-black text-xl shadow-xl shadow-secondary/20">Confirm Investment</Button>
                     <Button variant="ghost" onClick={() => setInvestStep(1)} className="font-bold text-muted-foreground">Go Back</Button>
                  </div>
               </div>
            )}
         </DialogContent>
      </Dialog>

      {/* 6. Chat Dialog (Farmer Context) */}
      <Dialog open={isChatOpen} onOpenChange={setIsChatOpen}>
         <DialogContent className="rounded-[3rem] border-none glassmorphism sm:max-w-[450px] p-0 overflow-hidden outline-none">
            <DialogTitle className="sr-only">Chat with Farmer</DialogTitle>
            <div className="flex flex-col h-[600px]">
               <header className="p-6 border-b border-primary/5 bg-primary text-white relative">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                  <div className="flex items-center gap-4 relative z-10">
                     <div className="h-12 w-12 rounded-2xl bg-white/20 border border-white/30 backdrop-blur-md flex items-center justify-center relative overflow-hidden">
                        <Image src="https://picsum.photos/seed/farmer/100/100" alt="Farmer" fill className="object-cover" />
                     </div>
                     <div>
                        <h3 className="font-black text-lg">Pak Tani Maman</h3>
                        <p className="text-[10px] font-bold opacity-70 uppercase tracking-widest">Active Now</p>
                     </div>
                     <button onClick={() => setIsChatOpen(false)} className="ml-auto h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all">
                        <X className="h-5 w-5" />
                     </button>
                  </div>
               </header>
               
               <div className="flex-1 overflow-y-auto p-8 space-y-6 bg-primary/5 scroll-smooth">
                  {chatHistory.map((msg) => (
                     <div key={msg.id} className={cn("flex flex-col", msg.isMe ? "items-end" : "items-start")}>
                        <div className={cn(
                           "max-w-[85%] p-4 rounded-3xl text-sm font-medium shadow-sm",
                           msg.isMe ? "bg-primary text-white rounded-tr-none" : "bg-white text-primary rounded-tl-none"
                        )}>
                           {msg.text}
                        </div>
                        <span className="text-[10px] text-muted-foreground mt-2 px-2 font-bold">{msg.time}</span>
                     </div>
                  ))}
               </div>

               <footer className="p-6 bg-white border-t border-primary/5">
                  <div className="flex gap-3 items-center bg-gray-50 p-2 rounded-2xl border border-primary/10 shadow-inner">
                     <Input 
                        value={chatMessage} 
                        onChange={(e) => setChatMessage(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                        placeholder="Type a message..." 
                        className="border-none focus-visible:ring-0 bg-transparent flex-1 font-bold text-sm" 
                     />
                     <Button onClick={handleSendMessage} size="icon" className="h-11 w-11 rounded-xl bg-primary text-white shadow-lg transition-all active:scale-95">
                        <ArrowUpRight className="h-5 w-5" />
                     </Button>
                  </div>
               </footer>
            </div>
         </DialogContent>
      </Dialog>
    </div>
  );
}
