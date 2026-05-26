
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  PieChart
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
