"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Bell, 
  TrendingUp, 
  Users, 
  Calendar, 
  ChevronRight, 
  Clock,
  Sparkles,
  Info
} from "lucide-react";
import { cn } from "@/lib/utils";

const notifications = [
  {
    id: 1,
    type: "event",
    title: "Pelatihan Digital Marketing Petani",
    desc: "Tingkatkan penjualan online Anda! Pelatihan dimulai minggu depan secara gratis.",
    time: "5 menit lalu",
    icon: Calendar,
    color: "bg-blue-100 text-blue-600"
  },
  {
    id: 2,
    type: "investment",
    title: "2 Investor Baru Mendukung Proyek Anda",
    desc: "Proyek 'Tomat Cherry Organik' Anda baru saja mendapatkan dukungan pendanaan baru.",
    time: "1 jam lalu",
    icon: Sparkles,
    color: "bg-secondary/10 text-secondary"
  },
  {
    id: 3,
    type: "analytics",
    title: "Update Harga Pasar: Tomat Naik 8%",
    desc: "Harga tomat di pasar induk mengalami kenaikan. Waktu yang tepat untuk distribusi.",
    time: "3 jam lalu",
    icon: TrendingUp,
    color: "bg-green-100 text-green-600"
  },
  {
    id: 4,
    type: "system",
    title: "Laporan Analitik Bulanan Tersedia",
    desc: "Laporan performa toko and analitik panen bulan Maret telah diterbitkan.",
    time: "Kemarin",
    icon: Info,
    color: "bg-orange-100 text-orange-600"
  },
  {
    id: 5,
    type: "event",
    title: "Webinar Pertanian Berkelanjutan",
    desc: "Sabtu ini jam 10:00 WIB. Klik untuk mendaftar and dapatkan e-sertifikat.",
    time: "2 hari lalu",
    icon: Users,
    color: "bg-primary/10 text-primary"
  }
];

export function FarmerNotifications() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-4xl mx-auto">
      <div className="space-y-2">
        <h1 className="text-3xl font-black font-headline text-primary">Notifikasi Petani</h1>
        <p className="text-muted-foreground">Informasi terbaru tentang proyek, pasar, and event Farm Mart.</p>
      </div>

      <div className="space-y-4">
        {notifications.map((notif) => (
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
      
      <div className="pt-8 text-center">
        <Button variant="ghost" className="rounded-2xl font-bold text-primary hover:bg-primary/5">Tandai Semua Sudah Dibaca</Button>
      </div>
    </div>
  );
}
