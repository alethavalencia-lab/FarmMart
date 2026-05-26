
"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { TrendingUp, Wallet, ShieldCheck, Leaf, Sparkles, ArrowUpRight } from "lucide-react";
import { generateInvestorSummary, InvestorPortfolioOutput } from "@/ai/flows/generate-investor-summary";
import { useToast } from "@/hooks/use-toast";

const portfolioData = [
  { name: "Jagung Organik", value: 4500, roi: 18 },
  { name: "Greenhouse Melon", value: 3200, roi: 24 },
  { name: "Vanilla Premium", value: 8900, roi: 32 },
  { name: "Padi Modern", value: 2100, roi: 12 },
];

export function InvestorDashboard() {
  const { toast } = useToast();
  const [analyzing, setAnalyzing] = useState(false);
  const [summary, setSummary] = useState<InvestorPortfolioOutput | null>(null);

  const handleAnalyze = async () => {
    setAnalyzing(true);
    try {
      const result = await generateInvestorSummary({
        portfolioName: "Agri-Impact Fund I",
        investments: [
          { name: "Jagung Organik Jatim", amountInvested: 150000000, currentValue: 175000000, roiPercentage: 16.6, fundingProgressPercentage: 100, sustainabilityMetrics: "Mengurangi penggunaan pestisida kimia sebesar 80%." },
          { name: "Greenhouse Melon Bandung", amountInvested: 250000000, currentValue: 310000000, roiPercentage: 24, fundingProgressPercentage: 100, sustainabilityMetrics: "Efisiensi penggunaan air 90% dengan sistem hidroponik." },
          { name: "Vanilla Premium NTT", amountInvested: 500000000, fundingProgressPercentage: 45, roiPercentage: 0, sustainabilityMetrics: "Mendukung pemberdayaan 50 keluarga petani lokal." },
        ],
        overallPortfolioRoiPercentage: 18.4,
        overallPortfolioFundingProgressPercentage: 72,
        overallSustainabilityImpactSummary: "Fokus pada pemberdayaan petani daerah terpencil dan teknologi hemat air."
      });
      setSummary(result);
    } catch (error) {
      toast({ title: "Error", description: "Gagal memproses data portofolio.", variant: "destructive" });
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold font-headline text-primary">Investment Portfolio</h1>
          <p className="text-muted-foreground">Pantau pertumbuhan aset agrikultur dan dampak keberlanjutan Anda.</p>
        </div>
        <div className="flex gap-2">
          <Button className="bg-secondary hover:bg-secondary/90 rounded-xl h-11"><ArrowUpRight className="mr-2 h-4 w-4" /> Tambah Investasi</Button>
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        {[
          { label: "Total Aset", value: "Rp 1.25M", icon: Wallet, color: "text-primary", bg: "bg-primary/10" },
          { label: "ROI Tahunan", value: "18.4%", icon: TrendingUp, color: "text-secondary", bg: "bg-secondary/10" },
          { label: "Dampak Karbon", value: "-12.5T", icon: Leaf, color: "text-green-600", bg: "bg-green-100" },
          { label: "Skor ESG", value: "A+", icon: ShieldCheck, color: "text-accent", bg: "bg-accent/10" },
        ].map((stat, idx) => (
          <Card key={idx} className="rounded-3xl border-none shadow-lg glassmorphism">
            <CardContent className="p-6 flex items-center gap-4">
              <div className={cn("p-4 rounded-2xl", stat.bg)}>
                <stat.icon className={cn("h-6 w-6", stat.color)} />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
                <p className="text-xl font-bold">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 rounded-[2.5rem] border-none shadow-xl bg-white p-8">
          <div className="flex justify-between items-center mb-8">
            <CardTitle className="text-xl font-bold font-headline text-primary">Alokasi & Performa Proyek</CardTitle>
            <div className="flex gap-2">
              <Badge variant="outline">Monthly</Badge>
              <Badge variant="outline" className="bg-primary text-white">Yearly</Badge>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={portfolioData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <RechartsTooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                  cursor={{ fill: '#F57C0022' }}
                />
                <Bar dataKey="value" fill="hsl(var(--primary))" radius={[10, 10, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* AI Insight Sidebar */}
        <Card className="rounded-[2.5rem] border-none shadow-xl overflow-hidden bg-primary text-white">
          <CardHeader className="p-8">
            <div className="flex justify-between items-center mb-2">
              <Badge className="bg-white/20 text-white border-none">AI Insight</Badge>
              <Sparkles className="h-6 w-6" />
            </div>
            <CardTitle className="text-2xl font-bold font-headline">Portofolio Analyst</CardTitle>
            <CardDescription className="text-primary-foreground/70">Dapatkan ringkasan performa dan rekomendasi cerdas.</CardDescription>
          </CardHeader>
          <CardContent className="px-8 pb-8 space-y-6">
            {!summary ? (
              <div className="space-y-4">
                <div className="p-6 bg-white/5 rounded-3xl border border-white/10">
                  <p className="text-sm italic">"Terdeteksi pertumbuhan ROI di sektor hortikultura bulan ini."</p>
                </div>
                <Button 
                  onClick={handleAnalyze}
                  disabled={analyzing}
                  className="w-full h-14 rounded-full bg-white text-primary hover:bg-white/90 font-bold shadow-xl transition-all active:scale-95"
                >
                  {analyzing ? "Menganalisis Portofolio..." : "Proses Analisis AI"}
                </Button>
              </div>
            ) : (
              <div className="space-y-6 animate-in slide-in-from-right duration-500">
                <div className="space-y-2">
                  <h4 className="font-bold text-accent">Summary</h4>
                  <p className="text-sm leading-relaxed opacity-90">{summary.summary}</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-bold text-accent">ROI Insights</h4>
                  <p className="text-sm leading-relaxed opacity-90">{summary.roiInsights}</p>
                </div>
                <div className="space-y-4">
                  <h4 className="font-bold text-accent">Rekomendasi</h4>
                  <ul className="space-y-2">
                    {summary.keyRecommendations.map((rec, i) => (
                      <li key={i} className="text-xs bg-white/10 p-3 rounded-xl border border-white/5">• {rec}</li>
                    ))}
                  </ul>
                </div>
                <Button variant="ghost" onClick={() => setSummary(null)} className="text-white/60 hover:text-white">Refresh Data</Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      {/* Sustainability Impact Tracker */}
      <Card className="rounded-[2.5rem] border-none shadow-xl bg-white p-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Leaf className="text-primary h-5 w-5" />
              <h3 className="text-lg font-bold">Social Impact</h3>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Pemberdayaan Petani</span>
                <span className="font-bold">450 Keluarga</span>
              </div>
              <Progress value={70} className="h-2" />
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Leaf className="text-primary h-5 w-5" />
              <h3 className="text-lg font-bold">Food Security</h3>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Kontribusi Pangan</span>
                <span className="font-bold">120 Ton/Bulan</span>
              </div>
              <Progress value={85} className="h-2" />
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Leaf className="text-primary h-5 w-5" />
              <h3 className="text-lg font-bold">Climate Action</h3>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Water Saved</span>
                <span className="font-bold">2.5M Liter</span>
              </div>
              <Progress value={92} className="h-2" />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
