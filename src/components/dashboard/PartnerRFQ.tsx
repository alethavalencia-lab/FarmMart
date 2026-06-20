"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { FileText, Plus, Calendar, MapPin, Package, Clock, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const initialRFQs = [
  { id: "RFQ-2026-001", product: "Cabai Merah Keriting", qty: "300 Kg", location: "Jakarta", date: "30 Juni 2026", status: "Aktif", bids: 5 },
  { id: "RFQ-2026-002", product: "Tomat Ceri Premium", qty: "500 Kg", location: "Bandung", date: "15 Juli 2026", status: "Menunggu", bids: 0 },
];

export function PartnerRFQ() {
  const { toast } = useToast();
  const [rfqs, setRfqs] = useState(initialRFQs);
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newRFQ = {
      id: `RFQ-2026-00${rfqs.length + 1}`,
      product: formData.get("product") as string,
      qty: `${formData.get("qty")} Kg`,
      location: formData.get("location") as string,
      date: formData.get("date") as string,
      status: "Aktif",
      bids: 0
    };
    setRfqs([newRFQ, ...rfqs]);
    setShowForm(false);
    toast({
      title: "RFQ Berhasil Dikirim",
      description: "Permintaan penawaran Anda telah diterbitkan ke mitra tani.",
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-black font-headline text-primary">Permintaan Penawaran (RFQ)</h1>
          <p className="text-muted-foreground">Buat permintaan pengadaan untuk mendapatkan harga grosir terbaik.</p>
        </div>
        <Button 
          onClick={() => setShowForm(!showForm)}
          className="rounded-2xl h-14 px-8 bg-primary hover:bg-primary/90 text-white font-bold shadow-xl"
        >
          <Plus className="mr-2 h-5 w-5" /> Buat RFQ Baru
        </Button>
      </div>

      {showForm && (
        <Card className="rounded-[3rem] border-none shadow-2xl bg-white p-10 animate-in slide-in-from-top-4 duration-500">
          <CardHeader className="p-0 mb-8">
            <CardTitle className="text-2xl font-black font-headline text-primary">Formulir Pengadaan</CardTitle>
            <CardDescription>Isi detail kebutuhan komoditas Anda dengan lengkap.</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <Label className="font-bold">Produk yang Dibutuhkan</Label>
                <Input name="product" placeholder="Misal: Cabai Merah Besar" required className="h-12 rounded-xl" />
              </div>
              <div className="space-y-3">
                <Label className="font-bold">Jumlah Kebutuhan (Kg)</Label>
                <Input name="qty" type="number" placeholder="Misal: 500" required className="h-12 rounded-xl" />
              </div>
              <div className="space-y-3">
                <Label className="font-bold">Lokasi Pengiriman</Label>
                <Input name="location" placeholder="Misal: Jakarta Selatan" required className="h-12 rounded-xl" />
              </div>
              <div className="space-y-3">
                <Label className="font-bold">Tanggal Dibutuhkan</Label>
                <Input name="date" type="date" required className="h-12 rounded-xl" />
              </div>
            </div>
            <div className="space-y-3">
              <Label className="font-bold">Catatan Tambahan</Label>
              <Textarea placeholder="Misal: Kualitas Grade A, petik segar h-1 pengiriman." className="rounded-xl min-h-[100px]" />
            </div>
            <div className="flex gap-4">
              <Button type="submit" className="flex-1 h-14 rounded-2xl bg-secondary text-white font-black text-lg">Submit Request</Button>
              <Button type="button" variant="ghost" onClick={() => setShowForm(false)} className="h-14 rounded-2xl font-bold">Batalkan</Button>
            </div>
          </form>
        </Card>
      )}

      <div className="grid gap-6">
        {rfqs.map((rfq) => (
          <Card key={rfq.id} className="rounded-[2.5rem] border-none shadow-sm hover:shadow-xl transition-all bg-white overflow-hidden group">
            <CardContent className="p-8 flex items-center gap-8">
              <div className="h-16 w-16 rounded-2xl bg-primary/5 flex items-center justify-center text-primary shrink-0">
                <FileText className="h-8 w-8" />
              </div>
              <div className="flex-1 grid md:grid-cols-4 gap-4 items-center">
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{rfq.id}</p>
                  <h3 className="text-xl font-bold text-primary">{rfq.product}</h3>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Kebutuhan</p>
                  <p className="text-sm font-bold flex items-center gap-2"><Package className="h-4 w-4 text-primary" /> {rfq.qty}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Target Tiba</p>
                  <p className="text-sm font-bold flex items-center gap-2"><Calendar className="h-4 w-4 text-primary" /> {rfq.date}</p>
                </div>
                <div className="text-right">
                  <Badge className={cn(
                    "rounded-full px-4 py-1 font-bold",
                    rfq.status === "Aktif" ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"
                  )}>
                    {rfq.status}
                  </Badge>
                  <p className="text-[10px] font-black text-primary uppercase tracking-widest mt-2">{rfq.bids} Penawaran Masuk</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="rounded-full group-hover:bg-primary/5"><ChevronRight className="h-6 w-6" /></Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="bg-primary/5 rounded-[3rem] p-12 text-center space-y-6">
         <CheckCircle2 className="h-16 w-16 text-primary mx-auto opacity-20" />
         <div className="space-y-2">
            <h3 className="text-2xl font-black font-headline text-primary">Proses RFQ yang Mudah</h3>
            <p className="text-muted-foreground max-w-xl mx-auto">Kami akan meneruskan permintaan Anda ke jaringan petani mitra terbaik di wilayah pengiriman Anda untuk mendapatkan penawaran harga grosir paling kompetitif.</p>
         </div>
      </div>
    </div>
  );
}
