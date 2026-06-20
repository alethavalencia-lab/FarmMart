"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Building2, 
  Mail, 
  Phone, 
  MapPin, 
  Save,
  Camera,
  Calendar,
  Briefcase,
  FileText
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function PartnerProfile() {
  const { toast } = useToast();
  const [profile, setProfile] = useState({
    businessName: "Hotel Nusantara Jakarta",
    businessType: "Hotel / HORECA",
    pic: "Andi Saputra",
    email: "procurement@hotelnusantara.com",
    phone: "+62 812 3456 7890",
    address: "Jl. Jendral Sudirman No. 1, Jakarta Pusat, DKI Jakarta",
    taxId: "01.234.567.8-901.000",
    volume: "1.200 Kg / Bulan"
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    toast({
      title: "Profil Bisnis Diperbarui",
      description: "Informasi profil bisnis Anda telah berhasil disimpan.",
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-4xl mx-auto pb-20">
      <div className="flex flex-col md:flex-row items-center gap-8 bg-white/50 p-10 rounded-[4rem] border border-white/20 glassmorphism relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full -mr-32 -mt-32 blur-[80px]"></div>
        <div className="relative group">
          <Avatar className="h-32 w-32 border-4 border-white shadow-2xl">
            <AvatarImage src="https://picsum.photos/seed/b2b/200/200" />
            <AvatarFallback>HN</AvatarFallback>
          </Avatar>
          <button className="absolute bottom-1 right-1 h-10 w-10 bg-secondary text-white rounded-full flex items-center justify-center border-4 border-white shadow-lg hover:scale-110 transition-transform">
            <Camera className="h-4 w-4" />
          </button>
        </div>
        <div className="text-center md:text-left space-y-2">
          <h1 className="text-4xl font-black font-headline text-primary">{profile.businessName}</h1>
          <div className="flex items-center justify-center md:justify-start gap-2">
            <Badge className="bg-primary/10 text-primary border-none font-bold">Verified Partner</Badge>
            <span className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">ID: FM-PART-B2B-12</span>
          </div>
          <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-2">
             <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground"><MapPin className="h-3 w-3 text-primary" /> {profile.address.split(',')[1]}</div>
             <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground"><Briefcase className="h-3 w-3 text-primary" /> {profile.businessType}</div>
          </div>
        </div>
      </div>

      <Tabs defaultValue="business" className="space-y-8">
        <TabsList className="bg-primary/5 p-1.5 rounded-full h-14 border border-primary/10 w-full md:w-fit">
          <TabsTrigger value="business" className="rounded-full px-8 text-xs font-bold data-[state=active]:bg-primary data-[state=active]:text-white h-full">Informasi Bisnis</TabsTrigger>
          <TabsTrigger value="procurement" className="rounded-full px-8 text-xs font-bold data-[state=active]:bg-primary data-[state=active]:text-white h-full">Pengadaan</TabsTrigger>
        </TabsList>

        <TabsContent value="business" className="space-y-6">
          <Card className="rounded-[3rem] border-none shadow-xl bg-white p-10">
            <CardHeader className="p-0 mb-8">
              <CardTitle className="text-xl font-bold font-headline text-primary">Detail Perusahaan</CardTitle>
            </CardHeader>
            <CardContent className="p-0 space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Nama Bisnis</Label>
                  <div className="relative">
                    <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-primary" />
                    <Input name="businessName" value={profile.businessName} onChange={handleInputChange} className="pl-12 h-14 rounded-2xl border-primary/10 bg-primary/5 font-bold" />
                  </div>
                </div>
                <div className="space-y-3">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Jenis Bisnis</Label>
                  <Input name="businessType" value={profile.businessType} onChange={handleInputChange} className="h-14 rounded-2xl border-primary/10 bg-primary/5 font-bold" />
                </div>
                <div className="space-y-3">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">PIC (Penanggung Jawab)</Label>
                  <Input name="pic" value={profile.pic} onChange={handleInputChange} className="h-14 rounded-2xl border-primary/10 bg-primary/5 font-bold" />
                </div>
                <div className="space-y-3">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">NPWP (Optional)</Label>
                  <Input name="taxId" value={profile.taxId} onChange={handleInputChange} className="h-14 rounded-2xl border-primary/10 bg-primary/5 font-bold" />
                </div>
                <div className="space-y-3">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Email Bisnis</Label>
                  <Input name="email" value={profile.email} onChange={handleInputChange} className="h-14 rounded-2xl border-primary/10 bg-primary/5 font-bold" />
                </div>
                <div className="space-y-3">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">No. Telepon / WhatsApp</Label>
                  <Input name="phone" value={profile.phone} onChange={handleInputChange} className="h-14 rounded-2xl border-primary/10 bg-primary/5 font-bold" />
                </div>
              </div>
              <div className="space-y-3">
                <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Alamat Kantor / Pengiriman Utama</Label>
                <textarea name="address" value={profile.address} onChange={handleInputChange} className="w-full min-h-[120px] p-6 rounded-3xl border border-primary/10 bg-primary/5 font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"></textarea>
              </div>
              <Button onClick={handleSave} className="w-full md:w-fit h-14 rounded-2xl bg-primary text-white font-black px-12 shadow-xl">
                <Save className="mr-2 h-5 w-5" /> Simpan Perubahan
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="procurement" className="space-y-6">
           <Card className="rounded-[3rem] border-none shadow-xl bg-white p-10">
            <CardHeader className="p-0 mb-8">
              <CardTitle className="text-xl font-bold font-headline text-primary">Volume & Preferensi Pengadaan</CardTitle>
            </CardHeader>
            <CardContent className="p-0 space-y-6">
               <div className="space-y-3">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Volume Pembelian Bulanan</Label>
                  <Input name="volume" value={profile.volume} onChange={handleInputChange} className="h-14 rounded-2xl border-primary/10 bg-primary/5 font-bold" />
               </div>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { label: "Total Pesanan", value: "124" },
                    { label: "RFQ Aktif", value: "3" },
                    { label: "Kontrak Berjalan", value: "2" },
                  ].map((stat, i) => (
                    <div key={i} className="p-6 bg-primary/5 rounded-3xl border border-primary/10 text-center">
                       <p className="text-[10px] font-black uppercase text-muted-foreground mb-1">{stat.label}</p>
                       <p className="text-2xl font-black text-primary">{stat.value}</p>
                    </div>
                  ))}
               </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
