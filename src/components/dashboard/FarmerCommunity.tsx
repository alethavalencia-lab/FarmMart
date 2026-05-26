
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  MessageSquare, 
  Users, 
  Search, 
  Send, 
  Plus, 
  TrendingUp, 
  Globe,
  Heart,
  Share2
} from "lucide-react";
import { cn } from "@/lib/utils";

const communities = [
  { id: 1, name: "Paguyuban Tani Lembang", members: "1.2k", category: "Sayuran", image: "https://picsum.photos/seed/c1/100/100" },
  { id: 2, name: "Forum Hidroponik Jabar", members: "3.5k", category: "Teknologi", image: "https://picsum.photos/seed/c2/100/100" },
  { id: 3, name: "Mitra Kopi Toraja", members: "850", category: "Kopi", image: "https://picsum.photos/seed/c3/100/100" },
  { id: 4, name: "Pejuang Pangan Organik", members: "2.1k", category: "Organik", image: "https://picsum.photos/seed/c4/100/100" },
];

const messages = [
  { id: 1, user: "Pak Maman", text: "Harga tomat di pasar induk lagi naik nih pak, lumayan hari ini.", time: "10:15", isMe: false, avatar: "https://picsum.photos/seed/u1/100/100" },
  { id: 2, user: "Ibu Siti", text: "Wah iya pak, cabe rawit juga mulai merangkak naik.", time: "10:18", isMe: false, avatar: "https://picsum.photos/seed/u2/100/100" },
  { id: 3, user: "You", text: "Izin tanya pak, pupuk organik yang bagus buat kentang apa ya?", time: "10:25", isMe: true, avatar: "https://picsum.photos/seed/u3/100/100" },
  { id: 4, user: "Pak Budi", text: "Coba pakai yang kompos sapi campur sekam pak, mantap itu.", time: "10:30", isMe: false, avatar: "https://picsum.photos/seed/u4/100/100" },
];

export function FarmerCommunity() {
  const [chatMsg, setChatMsg] = useState("");

  return (
    <div className="grid lg:grid-cols-3 gap-8 h-[calc(100vh-160px)] animate-in fade-in duration-500">
      <div className="lg:col-span-1 space-y-6 flex flex-col h-full">
        <div className="space-y-2">
          <h1 className="text-3xl font-black font-headline text-primary">Komunitas Tani</h1>
          <p className="text-muted-foreground text-sm">Bergabung dengan jaringan mitra tani seluruh Indonesia.</p>
        </div>

        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Cari komunitas..." className="pl-11 rounded-2xl h-12 bg-white/50 border-primary/10" />
        </div>

        <Card className="flex-1 rounded-[2.5rem] border-none shadow-xl bg-white overflow-hidden flex flex-col">
          <CardHeader className="px-6 py-5 border-b border-primary/5 flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-bold">Populer</CardTitle>
            <Button variant="ghost" size="icon" className="rounded-full"><Plus className="h-4 w-4" /></Button>
          </CardHeader>
          <CardContent className="p-0 overflow-y-auto">
            <div className="divide-y divide-primary/5">
              {communities.map((c) => (
                <div key={c.id} className="p-6 hover:bg-primary/5 transition-all cursor-pointer group">
                  <div className="flex items-center gap-4">
                    <div className="relative h-12 w-12 rounded-2xl overflow-hidden shadow-md">
                      <img src={c.image} alt={c.name} className="object-cover w-full h-full" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-sm group-hover:text-primary transition-colors">{c.name}</h4>
                      <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-tight flex items-center gap-1.5">
                        <Users className="h-3 w-3" /> {c.members} Anggota • {c.category}
                      </p>
                    </div>
                    <Button size="sm" variant="outline" className="rounded-xl h-8 text-[10px] font-bold border-primary/20 hover:bg-primary hover:text-white transition-all">Join</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="lg:col-span-2 rounded-[3rem] border-none shadow-xl bg-white overflow-hidden flex flex-col">
        <div className="p-6 border-b border-primary/5 flex items-center justify-between bg-primary/5">
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 rounded-2xl bg-primary flex items-center justify-center text-white shadow-lg">
              <MessageSquare className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold">Diskusi Harga & Tips Panen</h3>
              <p className="text-[10px] text-green-600 font-bold flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-green-600 animate-pulse"></span> 42 Petani Online
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" className="rounded-full"><Globe className="h-5 w-5 text-muted-foreground" /></Button>
            <Button variant="ghost" size="icon" className="rounded-full"><TrendingUp className="h-5 w-5 text-muted-foreground" /></Button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-6">
          {messages.map((msg) => (
            <div key={msg.id} className={cn("flex gap-4 max-w-[80%]", msg.isMe ? "ml-auto flex-row-reverse" : "mr-auto")}>
              <Avatar className="h-10 w-10 shadow-sm">
                <AvatarImage src={msg.avatar} />
                <AvatarFallback>{msg.user[0]}</AvatarFallback>
              </Avatar>
              <div className={cn("space-y-1", msg.isMe ? "items-end text-right" : "items-start")}>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-black text-primary uppercase">{msg.user}</span>
                  <span className="text-[10px] text-muted-foreground">{msg.time}</span>
                </div>
                <div className={cn(
                  "p-4 rounded-3xl shadow-sm text-sm font-medium",
                  msg.isMe ? "bg-primary text-white rounded-tr-none" : "bg-primary/5 text-foreground rounded-tl-none border border-primary/5"
                )}>
                  {msg.text}
                </div>
                {!msg.isMe && (
                  <div className="flex gap-4 mt-2 px-2">
                    <button className="text-[10px] font-bold text-muted-foreground hover:text-destructive flex items-center gap-1"><Heart className="h-3 w-3" /> Like</button>
                    <button className="text-[10px] font-bold text-muted-foreground hover:text-primary flex items-center gap-1"><Share2 className="h-3 w-3" /> Balas</button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="p-6 border-t border-primary/5 bg-primary/5">
          <div className="flex gap-3 bg-white p-2 rounded-[2rem] shadow-inner border border-primary/10">
            <Input 
              value={chatMsg}
              onChange={(e) => setChatMsg(e.target.value)}
              placeholder="Tulis pesan ke komunitas..." 
              className="border-none focus-visible:ring-0 bg-transparent h-12 px-6"
            />
            <Button size="icon" className="h-12 w-12 rounded-full bg-primary hover:bg-secondary text-white shadow-lg transition-all active:scale-95">
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
