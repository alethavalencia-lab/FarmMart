
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
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
  AlertCircle
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
      name: "Pak Maman",
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

const initialPortfolio = [
  { id: 101, name: "Vanilla Premium NTT", farmer: "Koperasi Tani Flores", investment: 5000000, progress: 45, estReturn: 750000, status: "Active", date: "15 May 2026" },
  { id: 102, name: "Organic Chili Scale-up", farmer: "Pak Budi Jaya", investment: 3000000, progress: 85, estReturn: 450000, status: "Active", date: "02 Apr 2026" },
];

const earningsHistory = [
  { id: 201, name: "Cherry Tomato Project", investment: 5000000, profit: 750000, status: "Completed", date: "20 Jan 2026" },
  { id: 202, name: "Chili Project 2025", investment: 3000000, profit: 450000, status: "Completed", date: "12 Dec 2025" },
];

const b2bNotifications = [
  { id: 1, title: "Investment Accepted", desc: "Your investment in 'Vanilla Premium' has been confirmed.", time: "2 hours ago", type: "success" },
  { id: 2, title: "Funding Milestone", desc: "Cherry Tomato Project has reached 80% funding.", time: "1 day ago", type: "info" },
  { id: 3, title: "Profit Distributed", desc: "Profit for Chili Project is now available in your wallet.", time: "3 days ago", type: "success" },
];

export function InvestorDashboard() {
  const { toast } = useToast();
  const [mounted, setMounted] = useState(false);
  
  // State
  const [portfolio, setPortfolio] = useState(initialPortfolio);
  const [exploreProjects] = useState(initialExploreProjects);
  const [history] = useState(earningsHistory);
  const [activeTab, setActiveTab] = useState("explore");
  
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

  const handleOpenDetail = (project: any) => {
    setSelectedProject(project);
    setIsDetailOpen(true);
  };

  const handleInvestNow = (project: any) => {
    setSelectedProject(project);
    setInvestStep(1);
    setIsInvestOpen(true);
  };

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
    setIsInvestOpen(false);
    toast({
      title: "Investment Successful!",
      description: `You have invested Rp ${formatPrice(investAmount)} in ${selectedProject.name}.`,
    });
    setActiveTab("portfolio");
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
    
    // Auto response
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

  return (
    <div className="space-y-12 animate-in fade-in duration-700 pb-20">
      {/* 1. Dashboard Summary */}
      <section className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-black font-headline text-primary tracking-tight">Investment Dashboard</h1>
          <p className="text-muted-foreground text-lg">Support local farmers and grow your agricultural portfolio.</p>
        </div>
        <div className="flex gap-2 bg-white/50 backdrop-blur-md p-1.5 rounded-2xl border border-white/20 shadow-sm">
           <Button 
            variant={activeTab === 'explore' ? 'default' : 'ghost'} 
            onClick={() => setActiveTab('explore')}
            className={cn("rounded-xl font-bold h-11 px-6", activeTab === 'explore' ? "bg-primary text-white" : "text-muted-foreground")}
           >
             Explore
           </Button>
           <Button 
            variant={activeTab === 'portfolio' ? 'default' : 'ghost'} 
            onClick={() => setActiveTab('portfolio')}
            className={cn("rounded-xl font-bold h-11 px-6", activeTab === 'portfolio' ? "bg-primary text-white" : "text-muted-foreground")}
           >
             My Portfolio
           </Button>
        </div>
 section>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
        {[
          { label: "Portfolio Value", value: "Rp 35.5M", icon: Wallet, color: "text-primary", bg: "bg-primary/10" },
          { label: "Total Projects", value: "8 Projects", icon: BarChart3, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Est. Return", value: "Rp 5.8M", icon: TrendingUp, color: "text-secondary", bg: "bg-secondary/10" },
          { label: "Active", value: "5 Projects", icon: Clock, color: "text-orange-600", bg: "bg-orange-50" },
          { label: "Completed", value: "3 Projects", icon: CheckCircle2, color: "text-green-600", bg: "bg-green-50" },
        ].map((stat, idx) => (
          <Card key={idx} className="rounded-3xl border-none shadow-xl glassmorphism hover:scale-[1.02] transition-transform cursor-default">
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

      <Separator className="bg-primary/5" />

      {activeTab === "explore" && (
        <Tabs defaultValue="all" className="space-y-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
            <div className="space-y-1">
              <h2 className="text-3xl font-black font-headline text-primary">Explore Opportunities</h2>
              <p className="text-muted-foreground">Select high-impact agricultural projects to support.</p>
            </div>
            <TabsList className="bg-primary/5 p-1 rounded-full h-11">
              <TabsTrigger value="all" className="rounded-full px-6 font-bold text-xs h-full">All Categories</TabsTrigger>
              <TabsTrigger value="veg" className="rounded-full px-6 font-bold text-xs h-full">Vegetables</TabsTrigger>
              <TabsTrigger value="fruits" className="rounded-full px-6 font-bold text-xs h-full">Fruits</TabsTrigger>
              <TabsTrigger value="grains" className="rounded-full px-6 font-bold text-xs h-full">Grains</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="all" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-in fade-in duration-500">
            {exploreProjects.map((p) => (
              <Card key={p.id} className="group overflow-hidden rounded-[2.5rem] border-none shadow-xl bg-white hover:shadow-2xl transition-all duration-500">
                <div className="relative aspect-[16/10]">
                  <Image src={p.image} alt={p.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <Badge className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm text-primary border-none font-black px-4 py-1">
                    {p.return} Return
                  </Badge>
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <p className="text-[10px] font-black uppercase tracking-widest text-white/80 mb-1">{p.commodity}</p>
                    <h3 className="text-xl font-bold leading-tight line-clamp-1">{p.name}</h3>
                  </div>
                </div>
                <CardContent className="p-8 space-y-6">
                  <div className="flex items-center justify-between text-sm font-bold text-muted-foreground">
                    <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" /> {p.location}</div>
                    <div className="flex items-center gap-2"><Clock className="h-4 w-4 text-primary" /> {p.duration}</div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-end text-sm font-black">
                      <p className="text-primary">Rp {formatPrice(p.collected)}</p>
                      <p className="text-muted-foreground">Target: {formatPrice(p.target)}</p>
                    </div>
                    <Progress value={p.progress} className="h-3" />
                    <div className="flex justify-between text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                       <span>{p.progress}% Funded</span>
                       <span className={cn(p.risk === 'Low' ? "text-green-600" : "text-orange-600")}>Risk: {p.risk}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <Button onClick={() => handleOpenDetail(p)} variant="outline" className="rounded-2xl h-12 font-bold border-primary/20 hover:bg-primary/5">Details</Button>
                    <Button onClick={() => handleInvestNow(p)} className="rounded-2xl h-12 bg-primary hover:bg-secondary text-white font-black shadow-lg shadow-primary/20">Invest Now</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      )}

      {activeTab === "portfolio" && (
        <div className="space-y-12 animate-in fade-in duration-500">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <h2 className="text-3xl font-black font-headline text-primary">My Portfolio</h2>
              <div className="grid gap-6">
                {portfolio.map((p) => (
                  <Card key={p.id} className="rounded-[2.5rem] border-none shadow-lg bg-white overflow-hidden p-8 hover:shadow-xl transition-all group">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                      <div className="flex-1 space-y-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <Badge className="bg-primary/10 text-primary border-none font-black text-[10px] mb-2 px-3 py-1">PROJECT ID: FM-INV-{p.id}</Badge>
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
                        <Button variant="outline" className="h-12 rounded-xl border-primary/10 text-primary font-bold">Project Timeline</Button>
                        <Button onClick={() => setIsChatOpen(true)} variant="outline" className="h-12 rounded-xl border-primary/10 text-primary font-bold flex items-center gap-2">
                           <MessageCircle className="h-4 w-4" /> Chat Farmer
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            <div className="space-y-8">
              <h2 className="text-3xl font-black font-headline text-primary">Earnings History</h2>
              <div className="grid gap-4">
                {history.map((h) => (
                  <Card key={h.id} className="rounded-3xl border-none shadow-sm bg-white p-6 hover:shadow-md transition-all">
                    <div className="flex justify-between items-center mb-4">
                       <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{h.date}</p>
                       <Badge className="bg-primary/5 text-primary border-none text-[10px] font-black">COMPLETED</Badge>
                    </div>
                    <h4 className="font-bold text-primary mb-4">{h.name}</h4>
                    <div className="flex justify-between items-end">
                       <div>
                          <p className="text-[10px] font-black text-muted-foreground uppercase">Principal</p>
                          <p className="font-bold">Rp {formatPrice(h.investment)}</p>
                       </div>
                       <div className="text-right">
                          <p className="text-[10px] font-black text-muted-foreground uppercase">Profit</p>
                          <p className="text-xl font-black text-green-600">+Rp {formatPrice(h.profit)}</p>
                       </div>
                    </div>
                  </Card>
                ))}
              </div>

              <Card className="rounded-[2.5rem] border-none bg-primary text-white p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                <div className="relative z-10 space-y-4">
                   <div className="flex items-center gap-3">
                      <div className="p-2 bg-white/20 rounded-xl"><Sparkles className="h-5 w-5 text-accent" /></div>
                      <h4 className="font-black text-lg">Next Disbursement</h4>
                   </div>
                   <p className="text-sm opacity-80">You have a profit distribution coming up on 30 June 2026.</p>
                   <Button className="w-full rounded-2xl bg-white text-primary font-black h-12 shadow-xl">View Details</Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      )}

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
                             <p className="text-xs font-bold text-muted-foreground flex items-center gap-1"><MapPin className="h-3 w-3" /> {selectedProject.location.split(',')[0]}</p>
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
                        <span className="font-black text-primary text-right">{selectedProject.name}</span>
                     </div>
                     <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground font-bold">Principal Amount</span>
                        <span className="font-black text-primary text-right">Rp {formatPrice(investAmount)}</span>
                     </div>
                     <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground font-bold">Duration</span>
                        <span className="font-black text-primary text-right">{selectedProject.duration}</span>
                     </div>
                     <Separator className="bg-primary/10" />
                     <div className="flex justify-between items-end">
                        <div>
                           <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest mb-1">Estimated Return</p>
                           <p className="text-2xl font-black text-secondary">+Rp {formatPrice(investAmount * (parseInt(selectedProject.return) / 100))}</p>
                        </div>
                        <Badge className="bg-secondary text-white border-none font-black">{selectedProject.return}</Badge>
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

      {/* 6. Chat Dialog */}
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
