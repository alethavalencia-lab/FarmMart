"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from "recharts";
import { 
  TrendingUp, 
  ShoppingBag, 
  Users, 
  ArrowUpRight, 
  ArrowDownRight,
  Target,
  PieChart,
  Sparkles,
  Zap,
  DollarSign
} from "lucide-react";
import { cn } from "@/lib/utils";

const salesData = [
  { name: "Jan", sales: 4200, revenue: 12.5 },
  { name: "Feb", sales: 3800, revenue: 10.8 },
  { name: "Mar", sales: 5200, revenue: 15.2 },
  { name: "Apr", sales: 6100, revenue: 18.4 },
  { name: "Mei", sales: 5800, revenue: 16.9 },
  { name: "Jun", sales: 7400, revenue: 22.1 },
];

const topProducts = [
  { name: "Tomat Cherry", value: 85, color: "hsl(var(--primary))" },
  { name: "Cabai Merah", value: 65, color: "hsl(var(--secondary))" },
  { name: "Bayam Organik", value: 45, color: "hsl(var(--accent))" },
  { name: "Melon Premium", value: 35, color: "#2563eb" },
];

export function FarmerAnalytics() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-black font-headline text-primary">Analitik & Performa</h1>
          <p className="text-muted-foreground">Analisis mendalam tentang pertumbuhan bisnis tani Anda.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Total Revenue", value: "Rp 154.2M", trend: "+12.4%", up: true, icon: TrendingUp },
          { label: "Produk Terjual", value: "1,245 Kg", trend: "+8.2%", up: true, icon: ShoppingBag },
          { label: "Customer Baru", value: "128", trend: "-2.4%", up: false, icon: Users },
          { label: "Conversion Rate", value: "4.8%", trend: "+1.2%", up: true, icon: Target },
        ].map((stat, i) => (
          <Card key={i} className="rounded-3xl border-none shadow-lg glassmorphism">
            <CardContent className="p-6">
              <div className="bg-primary/10 p-2.5 rounded-xl w-fit mb-4">
                <stat.icon className="h-5 w-5 text-primary" />
              </div>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">{stat.label}</p>
              <h3 className="text-2xl font-black mb-2">{stat.value}</h3>
              <div className={cn("flex items-center gap-1 text-[10px] font-bold", stat.up ? "text-green-600" : "text-destructive")}>
                {stat.up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                {stat.trend} <span className="text-muted-foreground">vs bln lalu</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* New Prediction Section */}
      <div className="grid lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 rounded-[2.5rem] border-none shadow-xl bg-white p-8 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32 blur-[80px]"></div>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 relative z-10">
            <div className="space-y-1">
              <CardTitle className="text-2xl font-black font-headline text-primary flex items-center gap-3">
                <TrendingUp className="h-6 w-6 text-secondary" /> Prediksi Permintaan Produk
              </CardTitle>
              <CardDescription>Estimasi kebutuhan pasar and tren harga minggu depan.</CardDescription>
            </div>
            <Badge className="bg-secondary text-white border-none px-4 py-1 font-bold">SMART FORECAST</Badge>
          </div>

          <div className="grid md:grid-cols-2 gap-8 relative z-10">
            <div className="space-y-6">
              <div className="p-6 bg-primary/5 rounded-3xl border border-primary/10">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">Komoditas Utama</p>
                    <h4 className="text-xl font-bold text-primary">Tomat Cherry</h4>
                  </div>
                  <Badge className="bg-green-500 text-white border-none font-black">DEMAND TINGGI</Badge>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-muted-foreground uppercase">Harga Saat Ini</p>
                    <p className="text-lg font-black">Rp 23.000 <span className="text-xs font-medium">/Kg</span></p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-muted-foreground uppercase">Prediksi Harga</p>
                    <p className="text-lg font-black text-green-600">Rp 24.500 <span className="text-xs font-medium">/Kg</span></p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between text-sm font-bold">
                  <span className="text-muted-foreground">Akurasi Prediksi</span>
                  <span className="text-primary">94%</span>
                </div>
                <div className="h-2 w-full bg-primary/10 rounded-full overflow-hidden">
                  <div className="h-full w-[94%] bg-primary"></div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
               {[
                 { label: "Est. Demand", value: "12.500 Kg", icon: ShoppingBag, color: "text-blue-500", bg: "bg-blue-50" },
                 { label: "Trend Naik", value: "+8%", icon: ArrowUpRight, color: "text-green-500", bg: "bg-green-50" },
                 { label: "Rev. Potensial", value: "Rp 12.5M", icon: DollarSign, color: "text-secondary", bg: "bg-secondary/10" },
                 { label: "Pasar Fokus", value: "Jabodetabek", icon: Target, color: "text-orange-500", bg: "bg-orange-50" },
               ].map((item, i) => (
                 <div key={i} className="p-4 rounded-2xl border border-primary/5 bg-white shadow-sm flex flex-col justify-between">
                    <div className={cn("p-2 rounded-xl w-fit mb-2", item.bg)}>
                      <item.icon className={cn("h-4 w-4", item.color)} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-muted-foreground uppercase">{item.label}</p>
                      <p className="text-sm font-bold">{item.value}</p>
                    </div>
                 </div>
               ))}
            </div>
          </div>
        </Card>

        {/* AI Assistant Card */}
        <Card className="rounded-[2.5rem] border-none shadow-xl bg-primary text-white p-8 overflow-hidden relative group">
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -mr-24 -mt-24 blur-3xl transition-transform group-hover:scale-110"></div>
          <div className="relative z-10 flex flex-col justify-between h-full">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-xl">
                  <Sparkles className="h-6 w-6 text-accent animate-pulse" />
                </div>
                <CardTitle className="text-xl font-black font-headline">AI Insight</CardTitle>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 bg-white/10 rounded-2xl border border-white/10 backdrop-blur-sm">
                   <p className="text-xs italic leading-relaxed">
                     "Permintaan tomat ceri diperkirakan meningkat menjelang akhir pekan. Pertimbangkan untuk meningkatkan distribusi panen Anda hari ini."
                   </p>
                </div>
                <div className="p-4 bg-secondary rounded-2xl shadow-lg border border-secondary/20">
                   <div className="flex items-center gap-2 mb-2">
                     <Zap className="h-4 w-4 text-white" />
                     <p className="text-[10px] font-black uppercase tracking-widest">Rekomendasi</p>
                   </div>
                   <p className="text-xs font-bold leading-relaxed">
                     Harga cabai sedang naik. Menunda penjualan selama 2 hari berpotensi meningkatkan pendapatan 12%.
                   </p>
                </div>
              </div>
            </div>

            <Button className="mt-8 w-full rounded-2xl bg-white text-primary hover:bg-white/90 font-black h-12 shadow-xl shadow-black/20">
               Lihat Analisis Detail
            </Button>
          </div>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 rounded-[2.5rem] border-none shadow-xl bg-white p-8">
          <div className="flex justify-between items-center mb-8">
            <CardTitle className="text-xl font-bold font-headline text-primary">Pertumbuhan Pendapatan</CardTitle>
            <div className="flex gap-2">
              <button className="px-4 py-1.5 rounded-full bg-primary text-white text-[10px] font-bold">Monthly</button>
              <button className="px-4 py-1.5 rounded-full bg-primary/5 text-muted-foreground text-[10px] font-bold">Yearly</button>
            </div>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 600 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 600 }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '1.5rem', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ fontWeight: 700 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={4} 
                  dot={{ r: 6, fill: "hsl(var(--primary))", strokeWidth: 2, stroke: "#fff" }}
                  activeDot={{ r: 8, strokeWidth: 0 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="rounded-[2.5rem] border-none shadow-xl bg-white p-8">
          <CardHeader className="p-0 mb-8">
            <CardTitle className="text-xl font-bold font-headline text-primary flex items-center gap-2">
              <PieChart className="h-5 w-5" /> Produk Terlaris
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 space-y-8">
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topProducts} layout="vertical">
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700 }} width={80} />
                  <Tooltip cursor={{ fill: 'transparent' }} />
                  <Bar dataKey="value" radius={[0, 10, 10, 0]} barSize={20}>
                    {topProducts.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-4 pt-4 border-t border-primary/5">
              {topProducts.map((p, i) => (
                <div key={i} className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full" style={{ backgroundColor: p.color }}></div>
                    <span className="text-xs font-bold">{p.name}</span>
                  </div>
                  <span className="text-xs font-black text-primary">{p.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
