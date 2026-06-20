"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Wallet, Landmark, Plus, CheckCircle2, Trash2, Edit2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const paymentMethods = [
  { 
    id: "gopay", 
    type: "E-Wallet", 
    name: "GoPay", 
    account: "0812 **** 7890", 
    isDefault: true, 
    icon: Wallet,
    color: "bg-blue-50 text-blue-600"
  },
  { 
    id: "bca", 
    type: "Virtual Account", 
    name: "BCA Virtual Account", 
    account: "8801 **** 1234", 
    isDefault: false, 
    icon: Landmark,
    color: "bg-primary/5 text-primary"
  },
  { 
    id: "mandiri", 
    type: "Transfer Bank", 
    name: "Bank Mandiri", 
    account: "1310 **** 5678", 
    isDefault: false, 
    icon: Landmark,
    color: "bg-orange-50 text-orange-600"
  }
];

export function CustomerPayment() {
  const { toast } = useToast();
  const [methods, setMethods] = useState(paymentMethods);
  const [selectedId, setSelectedId] = useState("gopay");

  const handleSetDefault = (id: string) => {
    setMethods(prev => prev.map(m => ({ ...m, isDefault: m.id === id })));
    setSelectedId(id);
    toast({
      title: "Metode Utama Diubah",
      description: "Metode pembayaran utama telah berhasil diperbarui.",
    });
  };

  const handleDelete = (id: string) => {
    setMethods(prev => prev.filter(m => m.id !== id));
    toast({
      title: "Metode Dihapus",
      description: "Metode pembayaran telah dihapus dari akun Anda.",
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-black font-headline text-primary">Metode Pembayaran</h1>
          <p className="text-muted-foreground">Kelola kartu, e-wallet, dan rekening bank Anda.</p>
        </div>
        <Button className="rounded-2xl h-14 px-8 bg-primary hover:bg-primary/90 text-white font-bold shadow-xl shadow-primary/20 transition-all active:scale-95">
          <Plus className="mr-2 h-5 w-5" /> Tambah Baru
        </Button>
      </div>

      <div className="grid gap-6">
        {methods.map((method) => (
          <Card 
            key={method.id} 
            className={cn(
              "rounded-[2.5rem] border-2 transition-all cursor-pointer overflow-hidden",
              selectedId === method.id 
                ? "border-primary bg-primary/5 shadow-lg shadow-primary/5" 
                : "border-transparent bg-white shadow-sm hover:border-primary/20"
            )}
            onClick={() => setSelectedId(method.id)}
          >
            <CardContent className="p-8 flex items-center gap-8">
              <div className={cn("h-16 w-16 rounded-2xl flex items-center justify-center shrink-0 shadow-sm", method.color)}>
                <method.icon className="h-8 w-8" />
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-3">
                  <h3 className="text-xl font-bold text-primary">{method.name}</h3>
                  {method.isDefault && (
                    <Badge className="bg-primary text-white border-none font-bold text-[10px] px-2 py-0.5">UTAMA</Badge>
                  )}
                </div>
                <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest">{method.type} • {method.account}</p>
              </div>
              <div className="flex items-center gap-2">
                {!method.isDefault && (
                  <Button 
                    variant="ghost" 
                    className="text-xs font-bold text-primary hover:bg-primary/10 rounded-xl"
                    onClick={(e) => { e.stopPropagation(); handleSetDefault(method.id); }}
                  >
                    Jadikan Utama
                  </Button>
                )}
                <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10 text-muted-foreground">
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="rounded-full hover:bg-destructive/10 text-destructive"
                  onClick={(e) => { e.stopPropagation(); handleDelete(method.id); }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
                {selectedId === method.id && (
                  <CheckCircle2 className="h-6 w-6 text-primary ml-4" />
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="rounded-[3rem] border-none bg-primary/5 p-10 mt-12 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
        <div className="flex items-center gap-6 relative z-10">
          <div className="h-14 w-14 rounded-2xl bg-white shadow-md flex items-center justify-center">
            <CreditCard className="h-7 w-7 text-primary" />
          </div>
          <div>
            <h4 className="text-xl font-black font-headline text-primary mb-1">Butuh Bantuan?</h4>
            <p className="text-muted-foreground text-sm font-medium">Tim CS Farm Mart siap membantu kendala pembayaran Anda 24/7.</p>
          </div>
          <Button variant="outline" className="ml-auto rounded-xl border-primary/20 text-primary font-bold">Pusat Bantuan</Button>
        </div>
      </Card>
    </div>
  );
}
