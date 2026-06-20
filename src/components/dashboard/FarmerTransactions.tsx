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
  ArrowRight,
  Printer,
  Truck,
  Phone,
  CheckCircle2,
  FileText
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
import { Separator } from "@/components/ui/separator";

const initialTransactionData = [
  { 
    id: "INV-2026-00125", 
    customer: "Budi Santoso", 
    phone: "0812-4455-6677",
    product: "Tomat Ceri", 
    qty: "5 Kg", 
    price: 25000, 
    total: 125000, 
    status: "Dikemas", 
    date: "20 Juni 2026", 
    time: "14:30",
    address: "Jl. Merdeka No. 45, Bandung, Jawa Barat", 
    payment: "Transfer Bank BCA",
    courier: "JNE Regular",
    shippingEst: "2-3 Hari"
  },
  { 
    id: "INV-2026-00124", 
    customer: "Resto Sedap", 
    phone: "0855-1122-3344",
    product: "Cabai Merah", 
    qty: "12 Kg", 
    price: 35000, 
    total: 420000, 
    status: "Dikirim", 
    date: "20 Juni 2026", 
    time: "11:20",
    address: "Kawasan Bisnis SCBD, Jakarta Selatan, DKI Jakarta", 
    payment: "Mandiri Virtual Account",
    courier: "SiCepat Best",
    shippingEst: "1 Hari"
  },
  { 
    id: "INV-2026-00123", 
    customer: "Siti Aminah", 
    phone: "0877-8899-0011",
    product: "Kunyit Segar", 
    qty: "2 Kg", 
    price: 12000, 
    total: 24000, 
    status: "Selesai", 
    date: "19 Juni 2026", 
    time: "16:45",
    address: "Perumahan Hijau Permai, Semarang, Jawa Tengah", 
    payment: "GoPay",
    courier: "Anteraja",
    shippingEst: "3 Hari"
  },
  { 
    id: "INV-2026-00122", 
    customer: "Hotel Grand", 
    phone: "021-9988-7766",
    product: "Melon Premium", 
    qty: "10 Pcs", 
    price: 45000, 
    total: 450000, 
    status: "Selesai", 
    date: "19 Juni 2026", 
    time: "09:15",
    address: "Jl. Kaliurang KM 5, Sleman, DI Yogyakarta", 
    payment: "BNI Virtual Account",
    courier: "Lalamove",
    shippingEst: "Same Day"
  },
  { 
    id: "INV-2026-00121", 
    customer: "Andi Saputra", 
    phone: "0811-2233-4455",
    product: "Bayam Organik", 
    qty: "8 Kg", 
    price: 10000, 
    total: 80000, 
    status: "Menunggu Konfirmasi", 
    date: "18 Juni 2026", 
    time: "13:10",
    address: "Apartemen Puncak Dharmahusada, Surabaya, Jawa Timur", 
    payment: "OVO",
    courier: "Grab Express",
    shippingEst: "Same Day"
  },
];

const statusFlow = ["Menunggu Konfirmasi", "Diproses", "Dikemas", "Dikirim", "Selesai"];

interface FarmerTransactionsProps {
  setView?: (v: string) => void;
}

export function FarmerTransactions({ setView }: FarmerTransactionsProps) {
  const { toast } = useToast();
  const [filter, setFilter] = useState("Semua");
  const [mounted, setMounted] = useState(false);
  const [transactions, setTransactions] = useState(initialTransactionData);
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isInvoiceView, setIsInvoiceView] = useState(false);

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
    setIsInvoiceView(false);
    setIsDetailOpen(true);
  };

  const handlePrintInvoice = () => {
    setIsInvoiceView(true);
    setTimeout(() => {
      window.print();
    }, 500);
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
              {["Semua", "Menunggu Konfirmasi", "Diproses", "Dikemas", "Dikirim", "Selesai"].map((f) => (
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
                  <th className="px-8 py-4 font-bold text-xs text-primary uppercase tracking-widest">Produk & Qty</th>
                  <th className="px-8 py-4 font-bold text-xs text-primary uppercase tracking-widest">Total Bayar</th>
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
                      <p className="text-[10px] text-muted-foreground font-bold mt-1">{t.date}</p>
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
                        t.status === "Dikemas" ? "bg-orange-100 text-orange-700" : 
                        t.status === "Diproses" ? "bg-yellow-100 text-yellow-700" :
                        "bg-purple-100 text-purple-700"
                      )}>
                        {t.status}
                      </Badge>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-2">
                         <Button 
                           variant="outline"
                           size="sm" 
                           onClick={() => handleOpenDetail(t)}
                           className="h-9 rounded-xl border-primary/20 text-primary text-[10px] font-bold px-4"
                         >
                           Lihat Detail
                         </Button>
                         {t.status !== "Selesai" && (
                           <Button 
                             size="sm" 
                             onClick={() => handleUpdateStatus(t.id, t.status)}
                             className="h-9 rounded-xl bg-primary text-white text-[10px] font-bold px-4"
                           >
                             Ubah Status
                           </Button>
                         )}
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
        <DialogContent className="rounded-[3rem] border-none glassmorphism sm:max-w-[700px] p-0 overflow-hidden outline-none">
          <DialogTitle className="sr-only">
            {isInvoiceView ? `Invoice ${selectedOrder?.id}` : `Detail Pesanan ${selectedOrder?.id}`}
          </DialogTitle>
          
          {selectedOrder && !isInvoiceView && (
            <div className="flex flex-col h-full max-h-[90vh]">
              <div className="bg-primary p-8 text-white relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-[80px]"></div>
                <div className="flex justify-between items-start mb-6 relative z-10">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-primary-foreground/70 mb-1">Informasi Pesanan</p>
                    <h2 className="text-3xl font-black font-headline">{selectedOrder.id}</h2>
                  </div>
                  <Badge className="bg-white/20 text-white border-none font-black px-4 py-1.5">{selectedOrder.status}</Badge>
                </div>
                <div className="grid grid-cols-2 gap-8 relative z-10">
                  <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-widest text-primary-foreground/70 flex items-center gap-2"><Calendar className="h-3 w-3" /> Tanggal Pesanan</p>
                    <p className="text-sm font-bold">{selectedOrder.date} - {selectedOrder.time}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-widest text-primary-foreground/70 flex items-center gap-2"><CreditCard className="h-3 w-3" /> Pembayaran</p>
                    <p className="text-sm font-bold">{selectedOrder.payment}</p>
                  </div>
                </div>
              </div>

              <div className="p-8 space-y-8 overflow-y-auto">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="text-sm font-black uppercase tracking-widest text-primary flex items-center gap-2">
                      <User className="h-4 w-4" /> Informasi Pembeli
                    </h4>
                    <div className="p-6 bg-primary/5 rounded-3xl border border-primary/10">
                      <p className="font-bold text-lg">{selectedOrder.customer}</p>
                      <p className="text-xs text-muted-foreground font-medium flex items-center gap-2 mt-2">
                        <Phone className="h-3 w-3" /> {selectedOrder.phone}
                      </p>
                      <p className="text-xs text-muted-foreground font-medium flex items-start gap-2 mt-2">
                        <MapPin className="h-3 w-3 mt-0.5" /> {selectedOrder.address}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-sm font-black uppercase tracking-widest text-primary flex items-center gap-2">
                      <Truck className="h-4 w-4" /> Pengiriman
                    </h4>
                    <div className="p-6 bg-secondary/5 rounded-3xl border border-secondary/10">
                      <p className="font-bold text-lg">{selectedOrder.courier}</p>
                      <p className="text-xs text-muted-foreground font-medium flex items-center gap-2 mt-2">
                        <Clock className="h-3 w-3" /> Estimasi Tiba: {selectedOrder.shippingEst}
                      </p>
                      <div className="mt-4 flex items-center gap-2 text-[10px] font-black text-secondary uppercase tracking-widest">
                        <CheckCircle2 className="h-4 w-4" /> Pengiriman Prioritas Tani
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-sm font-black uppercase tracking-widest text-primary flex items-center gap-2">
                    <Package className="h-4 w-4" /> Rincian Produk
                  </h4>
                  <Card className="border-none shadow-sm rounded-3xl bg-gray-50 overflow-hidden">
                    <CardContent className="p-0">
                      <table className="w-full text-left">
                        <thead>
                          <tr className="border-b">
                            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Item</th>
                            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Harga</th>
                            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Jumlah</th>
                            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground text-right">Subtotal</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="px-6 py-4 font-bold text-sm">{selectedOrder.product}</td>
                            <td className="px-6 py-4 text-sm">Rp {formatPrice(selectedOrder.price)}</td>
                            <td className="px-6 py-4 text-sm">{selectedOrder.qty}</td>
                            <td className="px-6 py-4 font-black text-sm text-right">Rp {formatPrice(selectedOrder.total)}</td>
                          </tr>
                        </tbody>
                      </table>
                    </CardContent>
                  </Card>
                  <div className="pt-2 flex justify-between items-end">
                    <div>
                      <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Total Transaksi</p>
                      <p className="text-3xl font-black text-primary">Rp {formatPrice(selectedOrder.total)}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8 pt-0 flex flex-wrap gap-3">
                {selectedOrder.status !== "Selesai" ? (
                  <Button 
                    onClick={() => handleUpdateStatus(selectedOrder.id, selectedOrder.status)}
                    className="flex-1 h-14 rounded-2xl bg-primary text-white font-black text-lg shadow-xl shadow-primary/20"
                  >
                    Ubah Ke {statusFlow[statusFlow.indexOf(selectedOrder.status) + 1]}
                  </Button>
                ) : (
                  <Button 
                    disabled
                    className="flex-1 h-14 rounded-2xl bg-gray-100 text-gray-400 font-black text-lg"
                  >
                    Pesanan Selesai
                  </Button>
                )}
                <Button 
                  onClick={() => setView?.('chat')}
                  variant="outline" 
                  className="h-14 px-8 rounded-2xl border-primary/20 text-primary font-bold flex items-center gap-2"
                >
                  <MessageCircle className="h-5 w-5" /> Hubungi Pembeli
                </Button>
                <Button 
                  onClick={handlePrintInvoice}
                  variant="outline" 
                  className="h-14 px-8 rounded-2xl border-secondary text-secondary font-bold flex items-center gap-2"
                >
                  <Printer className="h-5 w-5" /> Cetak Invoice
                </Button>
              </div>
            </div>
          )}

          {/* Invoice Print View */}
          {selectedOrder && isInvoiceView && (
            <div className="p-12 space-y-12 bg-white min-h-[80vh]">
              <div className="flex justify-between items-start">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="relative h-16 w-32">
                      <img
                        src="https://res.cloudinary.com/dhp46iviu/image/upload/v1781936109/ChatGPT_Image_May_25__2026__11_02_33_PM-removebg-preview_ltslqt.png"
                        alt="Farm Mart Logo"
                        className="object-contain object-left h-full w-full"
                      />
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground font-medium">
                    <p>Digital Ecosystem for Modern Farming</p>
                    <p>Lembang, Jawa Barat, Indonesia</p>
                  </div>
                </div>
                <div className="text-right">
                  <h3 className="text-3xl font-black text-primary uppercase">INVOICE</h3>
                  <p className="text-sm font-bold mt-2">{selectedOrder.id}</p>
                </div>
              </div>

              <Separator className="bg-primary/10" />

              <div className="grid grid-cols-2 gap-20">
                <div className="space-y-3">
                  <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Tagihan Untuk</p>
                  <p className="text-lg font-black text-primary">{selectedOrder.customer}</p>
                  <p className="text-xs font-medium text-muted-foreground">{selectedOrder.address}</p>
                  <p className="text-xs font-medium text-muted-foreground">{selectedOrder.phone}</p>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-xs">
                    <span className="font-bold text-muted-foreground">TANGGAL:</span>
                    <span className="font-black">{selectedOrder.date}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="font-bold text-muted-foreground">PEMBAYARAN:</span>
                    <span className="font-black">{selectedOrder.payment}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="font-bold text-muted-foreground">KURIR:</span>
                    <span className="font-black">{selectedOrder.courier}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b-2 border-primary text-[10px] font-black uppercase tracking-widest text-primary">
                      <th className="py-4">Deskripsi Produk</th>
                      <th className="py-4">Jumlah</th>
                      <th className="py-4">Harga Satuan</th>
                      <th className="py-4 text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr>
                      <td className="py-6 font-bold">{selectedOrder.product}</td>
                      <td className="py-6">{selectedOrder.qty}</td>
                      <td className="py-6">Rp {formatPrice(selectedOrder.price)}</td>
                      <td className="py-6 font-black text-right">Rp {formatPrice(selectedOrder.total)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="flex flex-col items-end gap-2 pt-8 border-t-2 border-primary">
                <div className="flex justify-between w-48 text-sm">
                  <span className="font-bold text-muted-foreground">Subtotal:</span>
                  <span className="font-black text-primary">Rp {formatPrice(selectedOrder.total)}</span>
                </div>
                <div className="flex justify-between w-48 text-sm">
                  <span className="font-bold text-muted-foreground">Pajak (0%):</span>
                  <span className="font-black text-primary">Rp 0</span>
                </div>
                <div className="flex justify-between w-64 text-xl mt-4 p-4 bg-primary text-white rounded-2xl">
                  <span className="font-black">TOTAL:</span>
                  <span className="font-black">Rp {formatPrice(selectedOrder.total)}</span>
                </div>
              </div>

              <div className="pt-20 text-center space-y-2">
                <p className="text-xs font-bold text-primary">Terima kasih telah mendukung petani lokal Indonesia!</p>
                <p className="text-[10px] text-muted-foreground">Invoice ini sah diterbitkan secara digital oleh Farm Mart Ecosystem.</p>
              </div>

              <div className="flex justify-center gap-4 no-print">
                 <Button onClick={() => setIsInvoiceView(false)} variant="outline" className="rounded-xl px-8">Kembali ke Detail</Button>
                 <Button onClick={() => window.print()} className="rounded-xl px-8 bg-primary">Cetak Sekarang</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
