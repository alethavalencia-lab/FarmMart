"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Filter, 
  Download, 
  ShoppingCart, 
  ArrowUpRight, 
  Calendar,
  User,
  MoreVertical
} from "lucide-react";
import { cn } from "@/lib/utils";

const transactionData = [
  { id: "INV-9912", customer: "Andi Saputra", product: "Tomat Cherry", qty: "5kg", total: 125000, status: "Diproses", date: "2024-03-20 14:30" },
  { id: "INV-9910", customer: "Resto Sedap", product: "Cabai Merah", qty: "12kg", total: 420000, status: "Dikirim", date: "2024-03-20 11:20" },
  { id: "INV-9899", customer: "Siti Aminah", product: "Kunyit Segar", qty: "2kg", total: 24000, status: "Selesai", date: "2024-03-19 16:45" },
  { id: "INV-9888", customer: "Hotel Grand", product: "Melon Premium", qty: "10 pcs", total: 450000, status: "Selesai", date: "2024-03-19 09:15" },
  { id: "INV-9876", customer: "Budi Jaya", product: "Bayam Organik", qty: "8kg", total: 80000, status: "Dikirim", date: "2024-03-18 13:10" },
];

export function FarmerTransactions() {
  const [filter, setFilter] = useState("Semua");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const formatPrice = (price: number) => {
    if (!mounted) return price.toString();
    return price.toLocaleString();
  };

  const filteredData = filter === "Semua" 
    ? transactionData 
    : transactionData.filter(t => t.status === filter);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-black font-headline text-primary">Riwayat Transaksi</h1>
          <p className="text-muted-foreground">Pantau pesanan masuk dan riwayat penjualan produk Anda.</p>
        </div>
        <Button className="rounded-2xl h-12 px-6 bg-primary font-bold shadow-xl shadow-primary/20">
          <Download className="mr-2 h-4 w-4" /> Unduh Laporan
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Pendapatan Hari Ini", value: "Rp 545.000", change: "+12%", icon: ArrowUpRight, color: "text-green-600" },
          { label: "Total Pesanan", value: "48", change: "+5", icon: ShoppingCart, color: "text-blue-600" },
          { label: "Rata-rata Order", value: "Rp 120.000", change: "Stabil", icon: Calendar, color: "text-orange-600" },
        ].map((stat, i) => (
          <Card key={i} className="rounded-3xl border-none shadow-lg glassmorphism">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{stat.label}</p>
                <div className={cn("p-2 rounded-xl bg-white shadow-sm", stat.color)}>
                  <stat.icon className="h-5 w-5" />
                </div>
              </div>
              <h3 className="text-2xl font-black mb-1">{stat.value}</h3>
              <p className="text-xs font-bold text-green-600">{stat.change} dari kemarin</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="rounded-[2.5rem] border-none shadow-xl bg-white overflow-hidden">
        <CardHeader className="p-8 border-b border-primary/5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <CardTitle className="text-xl font-bold font-headline">Daftar Pesanan</CardTitle>
            <div className="flex flex-wrap items-center gap-2">
              {["Semua", "Diproses", "Dikirim", "Selesai"].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={cn(
                    "px-4 py-2 rounded-full text-xs font-bold transition-all",
                    filter === f ? "bg-primary text-white shadow-lg" : "bg-primary/5 text-muted-foreground hover:bg-primary/10"
                  )}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-6 flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Cari invoice, pembeli, atau produk..." className="pl-11 rounded-2xl h-12 border-primary/10" />
            </div>
            <Button variant="outline" className="rounded-2xl h-12 px-5 border-primary/10">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-primary/5 text-left">
                  <th className="px-8 py-4 font-bold text-xs text-primary uppercase tracking-widest">Invoice</th>
                  <th className="px-8 py-4 font-bold text-xs text-primary uppercase tracking-widest">Pembeli</th>
                  <th className="px-8 py-4 font-bold text-xs text-primary uppercase tracking-widest">Produk</th>
                  <th className="px-8 py-4 font-bold text-xs text-primary uppercase tracking-widest">Total</th>
                  <th className="px-8 py-4 font-bold text-xs text-primary uppercase tracking-widest">Status</th>
                  <th className="px-8 py-4 font-bold text-xs text-primary uppercase tracking-widest">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-primary/5">
                {filteredData.map((t) => (
                  <tr key={t.id} className="hover:bg-primary/5 transition-colors group">
                    <td className="px-8 py-5 text-sm font-black">{t.id}</td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                          <User className="h-4 w-4" />
                        </div>
                        <div className="text-sm font-bold">{t.customer}</div>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <div className="text-sm font-medium">{t.product}</div>
                      <div className="text-[10px] text-muted-foreground font-bold">{t.qty}</div>
                    </td>
                    <td className="px-8 py-5 font-black text-sm">Rp {formatPrice(t.total)}</td>
                    <td className="px-8 py-5">
                      <Badge className={cn(
                        "rounded-lg px-3 py-1 font-bold text-[10px] border-none",
                        t.status === "Selesai" ? "bg-green-100 text-green-700" : 
                        t.status === "Dikirim" ? "bg-blue-100 text-blue-700" : "bg-orange-100 text-orange-700"
                      )}>
                        {t.status}
                      </Badge>
                    </td>
                    <td className="px-8 py-5">
                      <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10">
                        <MoreVertical className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
