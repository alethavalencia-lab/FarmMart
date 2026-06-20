"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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
  MoreVertical,
  MessageCircle,
  MapPin,
  CreditCard,
  Package,
  ChevronRight,
  Clock,
  ArrowRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

const initialTransactionData = [
  { id: "INV-2026-00125", customer: "Budi Santoso", product: "Tomat Ceri", qty: "5kg", price: 25000, total: 125000, status: "Dikemas", date: "20 Juni 2026 14:30", address: "Bandung, Jawa Barat", payment: "Transfer Bank BCA" },
  { id: "INV-2026-00124", customer: "Resto Sedap", product: "Cabai Merah", qty: "12kg", price: 35000, total: 420000, status: "Dikirim", date: "20 Juni 2026 11:20", address: "Jakarta Selatan, DKI Jakarta", payment: "Mandiri Virtual Account" },
  { id: "INV-2026-00123", customer: "Siti Aminah", product: "Kunyit Segar", qty: "2kg", price: 12000, total: 24000, status: "Selesai", date: "19 Juni 2026 16:45", address: "Semarang, Jawa Tengah", payment: "GoPay" },
  { id: "INV-2026-00122", customer: "Hotel Grand", product: "Melon Premium", qty: "10 pcs", price: 45000, total: 450000, status: "Selesai", date: "19 Juni 2026 09:15", address: "Sleman, DI Yogyakarta", payment: "BNI Virtual Account" },
  { id: "INV-2026-00121", customer: "Andi Saputra", product: "Bayam Organik", qty: "8kg", price: 10000, total: 80000, status: "Menunggu Konfirmasi", date: "18 Juni 2026 13:10", address: "Surabaya, Jawa Timur", payment: "OVO" },
];

const statusFlow = ["Menunggu Konfirmasi", "Dikemas", "Dikirim", "Selesai"];

export function FarmerTransactions() {
  const { toast } = useToast();
  const [filter, setFilter] = useState("Semua");
  const [mounted, setMounted] = useState(false);
  const [transactions, setTransactions] = useState(initialTransactionData);
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const formatPrice = (price: number) => {
    if (!mounted) return price.toString();
    return price.toLocaleString('id-ID');
  };

  const handleUpdateStatus = (id: string, currentStatus: string) => {
    const currentIndex = statusFlow.indexOf(currentStatus);
    if (currentIndex < statusFlow.length - 1) {
      const nextStatus = statusFlow[currentIndex + 1];
      const updated = transactions.map(t => t.id === id ? { ...t, status: nextStatus } : t);
      setTransactions(updated);
      toast({
        title: "Status Diperbarui",
        description: `Pesanan ${id} kini berstatus: ${nextStatus}`,
      });
      
      if (selectedOrder && selectedOrder.id === id) {
        setSelectedOrder({ ...selectedOrder, status: nextStatus });
      }
    }
  };

  const handleOpenDetail = (order: any) => {
    setSelectedOrder(order);
    setIsDetailOpen(true);
  };

  const filteredData = filter === "Semua" 
    ? transactions 
    : transactions.filter(t => t.status === filter);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-black font-headline text-primary">Manajemen Pesanan</h1>
          <p className="text-muted-foreground">Proses pesanan masuk and kelola pengiriman hasil tani Anda.</p>
        </div>
        <Button className="rounded-2xl h-12 px-6 bg-primary font-bold shadow-xl shadow-primary/20">
          <Download className="mr-2 h-4 w-4" /> Unduh Laporan
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Pendapatan Hari Ini", value: "Rp 545.000", change: "+12%", icon: ArrowUpRight, color: "text-green-600" },
          { label: "Pesanan Baru", value: transactions.filter(t => t.status === "Menunggu Konfirmasi").length.toString(), change: "+5", icon: ShoppingCart, color: "text-blue-600" },
          { label: "Sedang Dikemas", value: transactions.filter(t => t.status === "Dikemas").length.toString(), change: "Stabil", icon: Package, color: "text-orange-600" },
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
            <CardTitle className="text-xl font-bold font-headline">Daftar Transaksi</CardTitle>
            <div className="flex flex-wrap items-center gap-2">
              {["Semua", "Menunggu Konfirmasi", "Dikemas", "Dikirim", "Selesai"].map((f) => (
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
                    <td className="px-8 py-5">
                      <button 
                        onClick={() => handleOpenDetail(t)}
                        className="text-sm font-black hover:text-primary transition-colors underline decoration-dotted underline-offset-4"
                      >
                        {t.id}
                      </button>
                    </td>
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
                        t.status === "Dikirim" ? "bg-blue-100 text-blue-700" : 
                        t.status === "Dikemas" ? "bg-orange-100 text-orange-700" : "bg-purple-100 text-purple-700"
                      )}>
                        {t.status}
                      </Badge>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-2">
                         {t.status !== "Selesai" && (
                           <Button 
                             size="sm" 
                             onClick={() => handleUpdateStatus(t.id, t.status)}
                             className="h-8 rounded-lg bg-primary text-white text-[10px] font-bold px-3"
                           >
                             Update Ke {statusFlow[statusFlow.indexOf(t.status) + 1]}
                           </Button>
                         )}
                         <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handleOpenDetail(t)}
                            className="rounded-full hover:bg-primary/10"
                          >
                           <MoreVertical className="h-4 w-4 text-muted-foreground" />
                         </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Order Detail Modal */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="rounded-[3rem] border-none glassmorphism sm:max-w-[600px] p-0 overflow-hidden outline-none">
          <DialogTitle className="sr-only">Detail Pesanan {selectedOrder?.id}</DialogTitle>
          {selectedOrder && (
            <div className="flex flex-col h-full max-h-[90vh]">
              <div className="bg-primary p-8 text-white">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-primary-foreground/70 mb-1">Nomor Invoice</p>
                    <h2 className="text-3xl font-black font-headline">{selectedOrder.id}</h2>
                  </div>
                  <Badge className="bg-white/20 text-white border-none font-black px-4 py-1.5">{selectedOrder.status}</Badge>
                </div>
                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-widest text-primary-foreground/70 flex items-center gap-2"><Calendar className="h-3 w-3" /> Tanggal Pesanan</p>
                    <p className="text-sm font-bold">{selectedOrder.date}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-widest text-primary-foreground/70 flex items-center gap-2"><CreditCard className="h-3 w-3" /> Pembayaran</p>
                    <p className="text-sm font-bold">{selectedOrder.payment}</p>
                  </div>
                </div>
              </div>

              <div className="p-8 space-y-8 overflow-y-auto">
                <div className="space-y-4">
                  <h4 className="text-sm font-black uppercase tracking-widest text-primary flex items-center gap-2">
                    <User className="h-4 w-4" /> Informasi Pembeli
                  </h4>
                  <div className="p-6 bg-primary/5 rounded-3xl border border-primary/10">
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <p className="font-bold text-lg">{selectedOrder.customer}</p>
                        <p className="text-xs text-muted-foreground font-medium flex items-center gap-1.5 mt-1">
                          <MapPin className="h-3 w-3 text-primary" /> {selectedOrder.address}
                        </p>
                      </div>
                      <Button variant="outline" size="sm" className="rounded-xl border-primary/20 text-primary h-9 font-bold flex items-center gap-2">
                        <MessageCircle className="h-4 w-4" /> Hubungi
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-sm font-black uppercase tracking-widest text-primary flex items-center gap-2">
                    <Package className="h-4 w-4" /> Rincian Produk
                  </h4>
                  <div className="divide-y divide-primary/5">
                    <div className="py-4 flex justify-between items-center">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-2xl bg-primary/5 flex items-center justify-center text-primary">
                          <Sprout className="h-6 w-6" />
                        </div>
                        <div>
                          <p className="font-bold text-primary">{selectedOrder.product}</p>
                          <p className="text-xs text-muted-foreground font-bold">{selectedOrder.qty} x Rp {formatPrice(selectedOrder.price)}</p>
                        </div>
                      </div>
                      <p className="font-black text-primary">Rp {formatPrice(selectedOrder.total)}</p>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-primary/5 flex justify-between items-end">
                    <p className="text-xs font-black uppercase text-muted-foreground tracking-widest">Total Transaksi</p>
                    <p className="text-2xl font-black text-primary">Rp {formatPrice(selectedOrder.total)}</p>
                  </div>
                </div>
              </div>

              <div className="p-8 pt-0 flex gap-4">
                {selectedOrder.status !== "Selesai" ? (
                  <Button 
                    onClick={() => {
                      handleUpdateStatus(selectedOrder.id, selectedOrder.status);
                    }}
                    className="flex-1 h-14 rounded-2xl bg-primary text-white font-black text-lg shadow-xl shadow-primary/20"
                  >
                    Ubah Status Ke {statusFlow[statusFlow.indexOf(selectedOrder.status) + 1]}
                  </Button>
                ) : (
                  <Button 
                    disabled
                    className="flex-1 h-14 rounded-2xl bg-gray-100 text-gray-400 font-black text-lg border border-gray-200"
                  >
                    Pesanan Selesai
                  </Button>
                )}
                <Button 
                  variant="outline" 
                  onClick={() => setIsDetailOpen(false)}
                  className="h-14 px-8 rounded-2xl border-primary/20 font-bold"
                >
                  Kembali
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
