
"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingBag, MessageCircle, Send, Users, Heart, Share2, Play } from "lucide-react";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function LiveCommercePage() {
  const liveImg = PlaceHolderImages.find(img => img.id === 'live-stream');

  return (
    <div className="min-h-screen bg-background overflow-hidden flex flex-col">
      <Navbar />
      
      <div className="flex-1 flex flex-col lg:flex-row pt-20 h-screen max-h-screen">
        {/* Main Video Section */}
        <div className="flex-1 relative bg-black flex items-center justify-center overflow-hidden">
          <Image
            src={liveImg?.imageUrl || ""}
            alt="Live Stream"
            fill
            className="object-cover opacity-80"
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40"></div>
          
          <div className="absolute top-6 left-6 flex items-center gap-3">
            <Badge className="bg-destructive hover:bg-destructive text-white border-none px-3 py-1 flex items-center gap-2 animate-pulse">
              <div className="h-2 w-2 rounded-full bg-white"></div>
              LIVE
            </Badge>
            <Badge className="bg-black/40 backdrop-blur-md text-white border-none flex items-center gap-2">
              <Users className="h-3 w-3" />
              1,245 Menonton
            </Badge>
          </div>

          <div className="absolute top-6 right-6">
            <div className="flex items-center gap-3 bg-black/40 backdrop-blur-md p-2 rounded-2xl text-white">
              <Avatar className="h-8 w-8 border-2 border-primary">
                <AvatarImage src="https://picsum.photos/seed/farmer/100/100" />
                <AvatarFallback>PF</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-xs font-bold">Pak Tani Maman</p>
                <p className="text-[10px] opacity-70">Lembang, Jawa Barat</p>
              </div>
              <Button size="sm" className="bg-primary hover:bg-primary/90 h-8 rounded-xl px-4 text-xs font-bold">Follow</Button>
            </div>
          </div>

          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="bg-white/20 backdrop-blur-md p-6 rounded-full border border-white/30">
              <Play className="h-12 w-12 text-white fill-white ml-1" />
            </div>
          </div>

          {/* Pinned Product Card */}
          <div className="absolute bottom-6 left-6 w-full max-w-sm animate-in slide-in-from-left duration-500 delay-300">
            <Card className="glassmorphism border-none text-white overflow-hidden rounded-3xl group cursor-pointer hover:scale-[1.02] transition-all">
              <CardContent className="p-3 flex items-center gap-4">
                <div className="relative w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0">
                  <Image src="https://picsum.photos/seed/tomato/200/200" alt="Pinned Product" fill className="object-cover" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-bold text-secondary mb-1">PRODUK UTAMA</p>
                  <h4 className="font-bold text-sm leading-tight mb-1 line-clamp-1">Tomat Cherry Organik Segar (Langsung Panen)</h4>
                  <div className="flex items-center justify-between">
                    <p className="font-bold text-lg">Rp 24.000</p>
                    <Button size="sm" className="bg-secondary hover:bg-secondary/90 h-9 rounded-xl px-4 text-xs font-bold shadow-lg shadow-secondary/40">
                      Beli Langsung
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Chat Section */}
        <aside className="w-full lg:w-96 bg-white flex flex-col border-l">
          <div className="p-4 border-b flex items-center justify-between">
            <h3 className="font-bold flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-primary" />
              Obrolan Langsung
            </h3>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" className="text-muted-foreground"><Share2 className="h-5 w-5" /></Button>
              <Button variant="ghost" size="icon" className="text-destructive"><Heart className="h-5 w-5 fill-destructive" /></Button>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {[
              { user: "Andi Saputra", msg: "Tomatnya kelihatan segar banget pak!", color: "bg-blue-100" },
              { user: "Siti Aminah", msg: "Bisa kirim ke Jakarta Barat gak?", color: "bg-pink-100" },
              { user: "Budi Jaya", msg: "Udah checkout 5 kg ya pak maman!", color: "bg-green-100" },
              { user: "Tani Mart Bot", msg: "Stok tinggal 15 kg lagi. Segera pesan!", color: "bg-primary/10", isBot: true },
              { user: "Rudi Hartono", msg: "Wih live panen keren banget fiturnya.", color: "bg-orange-100" },
            ].map((chat, i) => (
              <div key={i} className="flex gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className={chat.color}>{chat.user[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-xs font-bold text-primary">{chat.user} {chat.isBot && <Badge className="scale-75 bg-primary/20 text-primary border-none">MOD</Badge>}</p>
                  <p className="text-sm text-muted-foreground bg-gray-50 p-2 rounded-2xl rounded-tl-none">{chat.msg}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t space-y-3">
            <div className="flex gap-2">
              <Input placeholder="Tulis komentar..." className="rounded-full border-primary/20 bg-gray-50 h-11" />
              <Button size="icon" className="rounded-full bg-primary h-11 w-11 flex-shrink-0">
                <Send className="h-5 w-5" />
              </Button>
            </div>
            <div className="flex items-center justify-between px-2">
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs font-semibold text-muted-foreground">1.2k Menonton</span>
              </div>
              <div className="flex items-center gap-1">
                <Heart className="h-4 w-4 text-secondary" />
                <span className="text-xs font-semibold text-muted-foreground">4.5k Likes</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
