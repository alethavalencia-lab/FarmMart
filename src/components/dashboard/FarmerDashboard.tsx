
"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Sprout, CloudRain, Sun, Thermometer, Calendar, Send, Sparkles, TrendingUp, Package } from "lucide-react";
import { predictHarvestWindow, PredictHarvestWindowOutput } from "@/ai/flows/predict-harvest-window";
import { useToast } from "@/hooks/use-toast";

export function FarmerDashboard() {
  const { toast } = useToast();
  const [predicting, setPredicting] = useState(false);
  const [prediction, setPrediction] = useState<PredictHarvestWindowOutput | null>(null);

  const handlePredict = async () => {
    setPredicting(true);
    try {
      const result = await predictHarvestWindow({
        cropType: "Tomat Cherry",
        plantingDate: "2024-01-15",
        historicalYieldData: "Tahun lalu rata-rata 1.2 ton per hektar. Panen terjadi di bulan April.",
        currentWeatherTrends: "Musim hujan sedikit lebih lama, suhu rata-rata 24-28 derajat celcius.",
        soilType: "Loamy",
        irrigationMethod: "Drip Irrigation"
      });
      setPrediction(result);
    } catch (error) {
      toast({ title: "Error", description: "Gagal memprediksi panen.", variant: "destructive" });
    } finally {
      setPredicting(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold font-headline text-primary">Halo, Pak Tani! 👋</h1>
          <p className="text-muted-foreground">Kelola lahan dan maksimalkan hasil panen Anda hari ini.</p>
        </div>
        <div className="flex gap-2">
          <Button className="bg-primary hover:bg-primary/90 rounded-xl h-11"><PlusIcon className="mr-2 h-4 w-4" /> Input Data Lahan</Button>
          <Button variant="outline" className="border-secondary text-secondary rounded-xl h-11">Download Report</Button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="rounded-3xl border-none shadow-lg glassmorphism">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="bg-primary/10 p-4 rounded-2xl">
              <Package className="text-primary h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Stok Produk</p>
              <p className="text-2xl font-bold">1,250 Kg</p>
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-3xl border-none shadow-lg glassmorphism">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="bg-secondary/10 p-4 rounded-2xl">
              <TrendingUp className="text-secondary h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Estimasi Pendapatan</p>
              <p className="text-2xl font-bold text-secondary">Rp 15.4M</p>
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-3xl border-none shadow-lg glassmorphism">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="bg-accent/10 p-4 rounded-2xl">
              <CloudRain className="text-accent h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Kondisi Cuaca</p>
              <p className="text-2xl font-bold">Cerah Berawan</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Harvest Prediction Tool */}
        <Card className="rounded-[2.5rem] border-none shadow-xl overflow-hidden bg-white">
          <CardHeader className="bg-primary p-8 text-white">
            <div className="flex justify-between items-center mb-2">
              <Badge className="bg-white/20 text-white border-none hover:bg-white/30">AI Powered</Badge>
              <Sparkles className="h-6 w-6 animate-pulse" />
            </div>
            <CardTitle className="text-2xl font-bold font-headline">Harvest Prediction Tool</CardTitle>
            <CardDescription className="text-primary-foreground/80">Prediksi waktu panen optimal dan dapatkan saran optimasi hasil.</CardDescription>
          </CardHeader>
          <CardContent className="p-8 space-y-6">
            {!prediction ? (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Jenis Komoditas</Label>
                    <Input defaultValue="Tomat Cherry" disabled className="rounded-xl border-primary/10" />
                  </div>
                  <div className="space-y-2">
                    <Label>Tanggal Tanam</Label>
                    <Input defaultValue="2024-01-15" disabled className="rounded-xl border-primary/10" />
                  </div>
                </div>
                <div className="p-6 bg-primary/5 rounded-3xl border border-primary/10 space-y-4">
                  <div className="flex items-center gap-3">
                    <CloudRain className="text-primary h-5 w-5" />
                    <p className="text-sm font-medium">Data Cuaca Terkini Tersinkronisasi</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Sprout className="text-primary h-5 w-5" />
                    <p className="text-sm font-medium">Analisis Kualitas Tanah: Optimal (pH 6.5)</p>
                  </div>
                </div>
                <Button 
                  onClick={handlePredict}
                  disabled={predicting}
                  className="w-full h-14 rounded-full bg-secondary hover:bg-secondary/90 text-white font-bold text-lg shadow-xl shadow-secondary/20 transition-all active:scale-95"
                >
                  {predicting ? "Menganalisis Data..." : "Dapatkan Prediksi Sekarang"}
                </Button>
              </div>
            ) : (
              <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
                <div className="p-6 bg-secondary/5 border-2 border-secondary/20 rounded-3xl space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-lg text-primary">Jendela Panen Optimal</h4>
                    <Calendar className="text-secondary h-6 w-6" />
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex-1 p-4 bg-white rounded-2xl border border-secondary/10 text-center">
                      <p className="text-xs text-muted-foreground uppercase">Mulai</p>
                      <p className="text-xl font-bold">{prediction.optimalHarvestWindow.startDate}</p>
                    </div>
                    <div className="flex-1 p-4 bg-white rounded-2xl border border-secondary/10 text-center">
                      <p className="text-xs text-muted-foreground uppercase">Selesai</p>
                      <p className="text-xl font-bold">{prediction.optimalHarvestWindow.endDate}</p>
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground italic">"{prediction.optimalHarvestWindow.reasoning}"</p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="bg-primary/10 p-2 rounded-lg">
                      <TrendingUp className="text-primary h-4 w-4" />
                    </div>
                    <h4 className="font-bold">Saran Optimasi</h4>
                  </div>
                  <p className="text-sm bg-primary/5 p-4 rounded-2xl leading-relaxed border border-primary/10">
                    {prediction.yieldOptimizationAdvice}
                  </p>
                  <div className="flex justify-between items-center p-4 bg-accent/10 rounded-2xl border border-accent/20">
                    <span className="font-semibold text-sm">Potensi Peningkatan Hasil</span>
                    <Badge className="bg-accent text-white border-none">{prediction.potentialYieldIncrease}</Badge>
                  </div>
                </div>
                
                <Button variant="ghost" onClick={() => setPrediction(null)} className="text-muted-foreground">Reset Analisis</Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Live Marketplace Status */}
        <Card className="rounded-[2.5rem] border-none shadow-xl bg-white overflow-hidden">
          <CardHeader className="p-8">
            <CardTitle className="text-2xl font-bold font-headline text-primary">Status Pasar & Harga</CardTitle>
            <CardDescription>Update real-time harga komoditas nasional.</CardDescription>
          </CardHeader>
          <CardContent className="px-8 pb-8 space-y-6">
            {[
              { name: "Cabai Merah", price: "Rp 32.000", change: "+5.2%", status: "up" },
              { name: "Bawang Merah", price: "Rp 28.500", change: "-1.2%", status: "down" },
              { name: "Tomat", price: "Rp 15.000", change: "+12.5%", status: "up" },
              { name: "Jagung Manis", price: "Rp 8.000", change: "0%", status: "stable" },
            ].map((market, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 hover:bg-primary/5 rounded-2xl transition-colors border border-transparent hover:border-primary/10">
                <div className="flex items-center gap-4">
                  <div className="bg-primary/5 p-3 rounded-xl">
                    <Package className="text-primary h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-bold">{market.name}</p>
                    <p className="text-xs text-muted-foreground">Harga per Kg</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-primary">{market.price}</p>
                  <span className={cn(
                    "text-xs font-semibold px-2 py-0.5 rounded-full",
                    market.status === 'up' ? "bg-green-100 text-green-600" : market.status === 'down' ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-600"
                  )}>
                    {market.change}
                  </span>
                </div>
              </div>
            ))}
            
            <div className="pt-4 space-y-4">
              <div className="flex justify-between items-end">
                <h4 className="font-bold">Inventory Capacity</h4>
                <span className="text-sm font-semibold">85% Full</span>
              </div>
              <Progress value={85} className="h-3 bg-primary/10" />
              <p className="text-xs text-muted-foreground">Waktunya untuk melakukan pengiriman ke gudang pusat.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function PlusIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
  );
}
