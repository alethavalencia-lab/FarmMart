
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Shield, 
  Bell, 
  Camera,
  Save,
  ChevronRight,
  Smartphone
} from "lucide-react";
import { cn } from "@/lib/utils";

export function FarmerProfile() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row items-center gap-8 bg-white/50 p-10 rounded-[4rem] border border-white/20 glassmorphism relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full -mr-32 -mt-32 blur-[80px]"></div>
        <div className="relative group">
          <Avatar className="h-32 w-32 border-4 border-white shadow-2xl">
            <AvatarImage src="https://picsum.photos/seed/farmer_prof/200/200" />
            <AvatarFallback>PM</AvatarFallback>
          </Avatar>
          <button className="absolute bottom-1 right-1 h-10 w-10 bg-secondary text-white rounded-full flex items-center justify-center border-4 border-white shadow-lg hover:scale-110 transition-transform">
            <Camera className="h-4 w-4" />
          </button>
        </div>
        <div className="text-center md:text-left space-y-2">
          <h1 className="text-4xl font-black font-headline text-primary">Pak Tani Maman</h1>
          <p className="text-muted-foreground font-bold flex items-center justify-center md:justify-start gap-2">
            <Badge className="bg-primary/10 text-primary border-none">Verified Farmer</Badge>
            <span className="text-xs uppercase tracking-widest">ID: FM-2024001</span>
          </p>
          <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-2">
             <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground"><MapPin className="h-3 w-3 text-primary" /> Lembang, Jawa Barat</div>
             <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground"><Calendar className="h-3 w-3 text-primary" /> Member sejak 2022</div>
          </div>
        </div>
      </div>

      <Tabs defaultValue="info" className="space-y-8">
        <TabsList className="bg-primary/5 p-1.5 rounded-full h-14 border border-primary/10 w-full md:w-fit">
          <TabsTrigger value="info" className="rounded-full px-8 text-xs font-bold data-[state=active]:bg-primary data-[state=active]:text-white h-full">Informasi Akun</TabsTrigger>
          <TabsTrigger value="security" className="rounded-full px-8 text-xs font-bold data-[state=active]:bg-primary data-[state=active]:text-white h-full">Keamanan</TabsTrigger>
          <TabsTrigger value="notification" className="rounded-full px-8 text-xs font-bold data-[state=active]:bg-primary data-[state=active]:text-white h-full">Notifikasi</TabsTrigger>
        </TabsList>

        <TabsContent value="info" className="space-y-6">
          <Card className="rounded-[3rem] border-none shadow-xl bg-white p-10">
            <CardHeader className="p-0 mb-8">
              <CardTitle className="text-xl font-bold font-headline text-primary">Detail Profil</CardTitle>
              <CardDescription>Perbarui informasi pribadi dan kontak Anda di sini.</CardDescription>
            </CardHeader>
            <CardContent className="p-0 space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Nama Lengkap</Label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-primary" />
                    <Input defaultValue="Pak Tani Maman" className="pl-12 h-14 rounded-2xl border-primary/10 bg-primary/5 focus-visible:ring-primary" />
                  </div>
                </div>
                <div className="space-y-3">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Alamat Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-primary" />
                    <Input defaultValue="maman@farmmart.id" type="email" className="pl-12 h-14 rounded-2xl border-primary/10 bg-primary/5" />
                  </div>
                </div>
                <div className="space-y-3">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Nomor WhatsApp</Label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-primary" />
                    <Input defaultValue="+62 812 3456 7890" className="pl-12 h-14 rounded-2xl border-primary/10 bg-primary/5" />
                  </div>
                </div>
                <div className="space-y-3">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Provinsi / Kota</Label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-primary" />
                    <Input defaultValue="Jawa Barat, Bandung" className="pl-12 h-14 rounded-2xl border-primary/10 bg-primary/5" />
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Alamat Lengkap</Label>
                <textarea className="w-full min-h-[120px] p-4 rounded-3xl border border-primary/10 bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-all text-sm font-medium" defaultValue="Jl. Raya Lembang No. 123, Desa Mekarwangi, Kab. Bandung Barat, 40391"></textarea>
              </div>
              <Button className="w-full md:w-fit h-14 rounded-2xl bg-primary text-white font-bold px-10 shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all">
                <Save className="mr-2 h-5 w-5" /> Simpan Perubahan
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card className="rounded-[3rem] border-none shadow-xl bg-white p-10">
            <CardHeader className="p-0 mb-8">
              <CardTitle className="text-xl font-bold font-headline text-primary">Keamanan Akun</CardTitle>
              <CardDescription>Kelola kata sandi dan pengaturan keamanan lainnya.</CardDescription>
            </CardHeader>
            <CardContent className="p-0 space-y-8">
              <div className="space-y-6">
                <div className="flex items-center justify-between p-6 bg-primary/5 rounded-[2rem] border border-primary/5">
                  <div className="flex items-center gap-4">
                    <div className="bg-white p-3 rounded-2xl shadow-sm"><Shield className="h-6 w-6 text-primary" /></div>
                    <div>
                      <h4 className="font-bold">Ubah Kata Sandi</h4>
                      <p className="text-xs text-muted-foreground">Terakhir diubah 3 bulan lalu.</p>
                    </div>
                  </div>
                  <Button variant="ghost" className="rounded-xl font-bold group">Ganti <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" /></Button>
                </div>
                <div className="flex items-center justify-between p-6 bg-primary/5 rounded-[2rem] border border-primary/5">
                  <div className="flex items-center gap-4">
                    <div className="bg-white p-3 rounded-2xl shadow-sm"><Smartphone className="h-6 w-6 text-primary" /></div>
                    <div>
                      <h4 className="font-bold">Verifikasi 2 Langkah (2FA)</h4>
                      <p className="text-xs text-muted-foreground">Amankan akun dengan kode OTP SMS/WA.</p>
                    </div>
                  </div>
                  <Badge className="bg-green-600 text-white border-none font-bold">Aktif</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notification" className="space-y-6">
          <Card className="rounded-[3rem] border-none shadow-xl bg-white p-10">
            <CardHeader className="p-0 mb-8">
              <CardTitle className="text-xl font-bold font-headline text-primary">Preferensi Notifikasi</CardTitle>
              <CardDescription>Pilih notifikasi apa saja yang ingin Anda terima.</CardDescription>
            </CardHeader>
            <CardContent className="p-0 space-y-6">
              {[
                { title: "Pesanan Baru", desc: "Dapatkan notifikasi saat ada pesanan masuk." },
                { title: "Update Investasi", desc: "Info terbaru dari proyek investasi Anda." },
                { title: "Harga Pasar", desc: "Daily update tren harga komoditas terkini." },
                { title: "Pesan Komunitas", desc: "Notifikasi saat ada pesan di grup komunitas." },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-4 border-b border-primary/5 last:border-0">
                  <div className="space-y-1">
                    <h4 className="font-bold">{item.title}</h4>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                  <div className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked={i < 3} />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
