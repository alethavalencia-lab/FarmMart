"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { 
  Package, 
  ChevronRight, 
  Search,
  Store,
  MessageCircle,
  Clock,
  Download,
  FileText,
  MapPin,
  Calendar,
  CreditCard,
  ArrowLeft
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface PartnerOrdersProps {
  orders: any[];
}

const initialB2BOrders = [
  { id: "INV-B2B-2026-001", supplier: "Kelompok Tani Lembang", product: "Tomat Ceri Premium", qty: "250 Kg", total: 5500000, status: "Diproses", date: "20 Juni 2026", deliveryDate: "25 Juni 2026", paymentMethod: "Transfer Bank BCA" },
  { id: "RFQ-B2B-2026-005", supplier: "Ibu Siti Makmur", product: "Cabai Merah Keriting", qty: "300 Kg", total: 0, status: "Menunggu Penawaran", date: "21 Juni 2026", deliveryDate: "TBD", paymentMethod: "Pending" },
];

export function PartnerOrders({ orders: customOrders }: PartnerOrdersProps) {
  const [mounted, setMounted] = useState(false);
  const [filter, setFilter] = useState("Semua");
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const formatPrice = (price: number) => {
    if (!mounted) return price.toString();
    return price.toLocaleString('id-ID');
  };

  const tabs = ["Semua", "Menunggu Penawaran", "Diproses", "Dikirim", "Selesai", "Kontrak"];

  const allOrders = [...customOrders.map(o => ({
    id: o.id,
    supplier: o.items[0]?.farmer || "Mitra Tani",
    product: o.items[0]?.name || "Produk Tani",
    qty: `${o.items.reduce((a: any, b: any) => a + b.qty, 0)} Kg`,
    total: o.total,
    status: "Diproses",
    date: o.date,
    deliveryDate: "Besok",
    paymentMethod: "Bank Transfer",
    items: o.items
  })), ...initialB2BOrders];

  const filteredOrders = allOrders.filter(o => filter === "Semua" || o.status === filter);

  const handleOpenDetail = (order: any) => {
    setSelectedOrder(order);
    setIsDetailOpen(true);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-black font-headline text-primary">Pesanan & Pengadaan</h1>
          <p className="text-muted-foreground">Pantau status pengadaan bahan baku bisnis Anda.</p>
        </div>
        <div className="relative w-full md:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Cari invoice atau RFQ..." className="pl-11 rounded-2xl h-12 bg-white shadow-sm border-primary/10" />
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            className={cn(
              "px-6 py-2.5 rounded-full text-xs font-bold transition-all",
              filter === t ? "bg-primary text-white shadow-lg shadow-primary/20" : "bg-white text-muted-foreground border border-primary/5 hover:bg-primary/5 hover:text-primary"
            )}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="grid gap-6">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <Card key={order.id} className="rounded-[2.5rem] border-none shadow-xl bg-white overflow-hidden hover:shadow-2xl transition-all group">
              <CardHeader className="px-8 py-6 border-b border-primary/5 flex flex-row items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="bg-primary/5 p-2 rounded-xl">
                    {order.id.startsWith('RFQ') ? <FileText className="h-5 w-5 text-secondary" /> : <Package className="h-5 w-5 text-primary" />}
                  </div>
                  <div>
                    <p className="text-sm font-black text-primary uppercase">{order.id}</p>
                    <p className="text-[10px] text-muted-foreground font-bold">{order.date}</p>
                  </div>
                </div>
                <Badge className={cn(
                  "px-4 py-1.5 rounded-full border-none font-black text-[10px] uppercase tracking-widest",
                  order.status === "Menunggu Penawaran" ? "bg-orange-100 text-orange-700" : "bg-blue-100 text-blue-700"
                )}>
                  {order.status}
                </Badge>
              </CardHeader>
              <CardContent className="p-8 flex flex-col lg:flex-row justify-between items-center gap-8">
                <div className="flex-1 flex gap-6 items-center">
                  <div className="h-16 w-16 bg-primary/5 rounded-2xl flex items-center justify-center border shrink-0 shadow-inner">
                    <Store className="h-8 w-8 text-primary/30" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xl text-primary leading-tight group-hover:text-secondary transition-colors">{order.product}</h4>
                    <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1 font-medium"><Store className="h-3 w-3 text-primary" /> Supplier: {order.supplier}</p>
                    <p className="text-sm font-bold mt-2 bg-primary/5 w-fit px-3 py-1 rounded-lg">Jumlah: {order.qty}</p>
                  </div>
                </div>
                <div className="text-center sm:text-right">
                  <p className="text-[10px] font-black text-muted-foreground uppercase mb-1 tracking-widest">Total Nilai</p>
                  <p className="text-3xl font-black text-primary">{order.total > 0 ? `Rp ${formatPrice(order.total)}` : "Nego"}</p>
                </div>
                <div className="flex gap-2 w-full lg:w-auto">
                  <Button variant="outline" className="flex-1 lg:flex-none rounded-xl border-primary/10 h-12" onClick={() => handleOpenDetail(order)}><ChevronRight className="h-5 w-5" /></Button>
                  <Button variant="outline" className="flex-1 lg:flex-none rounded-xl border-primary/10 h-12 text-primary font-bold" onClick={() => handleOpenDetail(order)}>Detail</Button>
                  <Button className="flex-[2] lg:flex-none rounded-xl bg-primary text-white h-12 px-8 font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary/20">
                    <MessageCircle className="h-4 w-4" /> Hubungi
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="py-20 text-center glassmorphism rounded-[3rem] p-12">
            <Package className="h-16 w-16 text-muted-foreground/30 mx-auto mb-6" />
            <h3 className="text-2xl font-black text-primary mb-2">Belum ada pesanan</h3>
            <p className="text-muted-foreground">Silakan jelajahi katalog grosir untuk memulai pengadaan.</p>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="rounded-[3rem] border-none glassmorphism sm:max-w-[700px] p-0 overflow-hidden outline-none">
          <DialogTitle className="sr-only">Detail Pesanan {selectedOrder?.id}</DialogTitle>
          {selectedOrder && (
            <div className="flex flex-col h-full max-h-[90vh] overflow-y-auto">
              <div className="bg-primary p-10 text-white relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-[80px]"></div>
                <div className="flex justify-between items-start mb-6 relative z-10">
                  <div>
                    <Badge className="bg-white/20 text-white border-none font-black text-[10px] mb-2 px-3 py-1 uppercase tracking-widest">Detail Pengadaan</Badge>
                    <h2 className="text-4xl font-black font-headline">{selectedOrder.id}</h2>
                  </div>
                  <Badge className="bg-secondary text-white border-none font-black px-4 py-1.5 rounded-full">{selectedOrder.status}</Badge>
                </div>
              </div>

              <div className="p-10 space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary flex items-center gap-2">
                      <Store className="h-4 w-4" /> Informasi Supplier
                    </h4>
                    <div className="p-6 bg-primary/5 rounded-3xl border border-primary/10">
                      <p className="font-bold text-xl text-primary">{selectedOrder.supplier}</p>
                      <p className="text-xs text-muted-foreground font-bold flex items-center gap-2 mt-2">
                        <MapPin className="h-3 w-3 text-secondary" /> Lembang, Jawa Barat
                      </p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary flex items-center gap-2">
                      <Calendar className="h-4 w-4" /> Logistik
                    </h4>
                    <div className="p-6 bg-secondary/5 rounded-3xl border border-secondary/10">
                      <p className="text-xs font-black text-muted-foreground uppercase tracking-widest mb-1">Estimasi Tiba</p>
                      <p className="font-bold text-lg">{selectedOrder.deliveryDate}</p>
                      <p className="text-xs text-muted-foreground font-medium mt-1">Status: Siap Kirim</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                   <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary flex items-center gap-2">
                      <Package className="h-4 w-4" /> Rincian Produk
                   </h4>
                   <div className="p-6 bg-gray-50 rounded-[2rem] border border-gray-100">
                      <div className="flex justify-between items-center">
                         <div className="space-y-1">
                            <p className="font-bold text-lg text-primary">{selectedOrder.product}</p>
                            <p className="text-sm font-medium text-muted-foreground">Volume: {selectedOrder.qty}</p>
                         </div>
                         <div className="text-right">
                            <p className="text-[10px] font-black text-muted-foreground uppercase mb-1">Total</p>
                            <p className="text-2xl font-black text-primary">Rp {formatPrice(selectedOrder.total)}</p>
                         </div>
                      </div>
                   </div>
                </div>

                <div className="space-y-4">
                   <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary flex items-center gap-2">
                      <CreditCard className="h-4 w-4" /> Pembayaran
                   </h4>
                   <p className="text-sm font-bold bg-primary/5 p-4 rounded-xl text-primary flex justify-between">
                      <span>Metode: {selectedOrder.paymentMethod}</span>
                      <Badge className="bg-green-600 text-white border-none font-bold text-[10px]">VERIFIED</Badge>
                   </p>
                </div>

                <div className="flex gap-4 pt-4">
                   <Button className="flex-1 h-14 rounded-2xl bg-primary text-white font-black text-lg shadow-xl shadow-primary/20">Reorder Pesanan</Button>
                   <Button variant="outline" className="flex-1 h-14 rounded-2xl border-primary/20 text-primary font-black flex items-center justify-center gap-2">
                      <MessageCircle className="h-5 w-5" /> Hubungi Supplier
                   </Button>
                </div>
                <Button variant="ghost" onClick={() => setIsDetailOpen(false)} className="w-full text-muted-foreground font-bold">
                   <ArrowLeft className="h-4 w-4 mr-2" /> Kembali
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
