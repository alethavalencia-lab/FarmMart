
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Bell, 
  Package, 
  CreditCard, 
  Tag, 
  Calendar, 
  ChevronRight, 
  CheckCircle2, 
  Truck, 
  Clock,
  Info
} from "lucide-react";
import { cn } from "@/lib/utils";

const notifications = [
  {
    id: 1,
    type: "pesanan",
    title: "Pesanan Tomat Organik sedang dikemas",
    desc: "Petani Ibu Siti sedang menyiapkan pesanan #ORD-9912 untuk Anda.",
    time: "5 menit lalu",
    icon: Package,
    color: "bg-blue-100 text-blue-600",
    status: "proses"
  },
  {
    id: 2,
    type: "pesanan",
    title: "Cabai Merah Premium telah dikirim",
    desc: "Pesanan #ORD-9910 telah diserahkan ke Kurir Tani. Estimasi sampai 2 jam.",
    time: "2 jam lalu",
    icon: Truck,
    color: "bg-orange-100 text-orange-600",
    status: "dikirim"
  },
  {
    id: 3,
    type: "pembayaran",
    title: "Pembayaran berhasil diterima",
    desc: "Pembayaran sebesar Rp 125.000 untuk invoice #INV-9912 telah diverifikasi.",
    time: "Kemarin",
    icon: CreditCard,
    color: "bg-green-100 text-green-600",
    status: "berhasil"
  },
  {
    id: 4,
    type: "info",
    title: "Promo Musim Panen: Diskon hingga 20%",
    desc: "Nikmati potongan harga spesial untuk kategori Buah-buahan hari ini!",
    time: "Kemarin",
    icon: Tag,
    color: "bg-purple-100 text-purple-600",
    status: "promo"
  },
  {
    id: 5,
    type: "pesanan",
    title: "Pesanan Beras Premium Anda telah sampai",
    desc: "Paket #ORD-9899 telah diterima di alamat tujuan. Silakan beri penilaian.",
    time: "2 hari lalu",
    icon: CheckCircle2,
    color: "bg-primary/10 text-primary",
    status: "selesai"
  },
  {
    id: 6,
    type: "info",
    title: "Event FarmMart Expo berlangsung minggu depan",
    desc: "Jangan lewatkan kesempatan bertemu langsung dengan pahlawan pangan kami.",
    time: "3 hari lalu",
    icon: Calendar,
    color: "bg-blue-100 text-blue-600",
    status: "info"
  },
  {
    id: 7,
    type: "info",
    title: "Produk baru dari petani mitra telah tersedia",
    desc: "Kini tersedia Kacang Mete Mentah dari Bali di kategori Kacang-kacangan.",
    time: "4 hari lalu",
    icon: Info,
    color: "bg-accent/10 text-accent",
    status: "baru"
  }
];

export function CustomerNotifications() {
  const sections = [
    { title: "Pesanan", items: notifications.filter(n => n.type === "pesanan") },
    { title: "Pembayaran", items: notifications.filter(n => n.type === "pembayaran") },
    { title: "Informasi FarmMart", items: notifications.filter(n => n.type === "info") },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-4xl mx-auto">
      <div className="space-y-2">
        <h1 className="text-3xl font-black font-headline text-primary">Notifikasi</h1>
        <p className="text-muted-foreground">Informasi terbaru tentang transaksi dan aktivitas Anda.</p>
      </div>

      <div className="space-y-12">
        {sections.map((section, idx) => (
          <div key={idx} className="space-y-6">
            <h2 className="text-sm font-black uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-3">
              <span className="h-px bg-primary/10 flex-1"></span>
              {section.title}
              <span className="h-px bg-primary/10 flex-1"></span>
            </h2>
            <div className="space-y-4">
              {section.items.map((notif) => (
                <Card key={notif.id} className="rounded-[2.5rem] border-none shadow-sm hover:shadow-xl transition-all cursor-pointer bg-white group overflow-hidden">
                  <CardContent className="p-6 flex items-center gap-6">
                    <div className={cn("h-14 w-14 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm", notif.color)}>
                      <notif.icon className="h-7 w-7" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex justify-between items-start">
                        <h3 className="font-bold text-lg group-hover:text-primary transition-colors">{notif.title}</h3>
                        <span className="text-[10px] font-bold text-muted-foreground flex items-center gap-1 uppercase">
                          <Clock className="h-3 w-3" /> {notif.time}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{notif.desc}</p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      <div className="pt-8 text-center">
        <Button variant="ghost" className="rounded-2xl font-bold text-primary hover:bg-primary/5">Tandai Semua Sudah Dibaca</Button>
      </div>
    </div>
  );
}
