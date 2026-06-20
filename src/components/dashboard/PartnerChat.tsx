"use client";

import { useState, useEffect, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Send, Phone, Video, MoreVertical, Store, Badge } from "lucide-react";
import { cn } from "@/lib/utils";

const b2bChatList = [
  { id: 1, name: "Kelompok Tani Lembang", lastMsg: "Quotation untuk tomat 500Kg sudah dikirim.", time: "10:30", unread: 1, avatar: "https://picsum.photos/seed/farmer1/100/100" },
  { id: 2, name: "Arif Hidayat Farm", lastMsg: "Bisa kirim besok pagi jam 6.", time: "09:15", unread: 0, avatar: "https://picsum.photos/seed/farmer2/100/100" },
  { id: 3, name: "Siti Makmur", lastMsg: "Stok cabai kami ready skala besar.", time: "Kemarin", unread: 0, avatar: "https://picsum.photos/seed/farmer3/100/100" },
];

export function PartnerChat() {
  const [selectedChat, setSelectedChat] = useState(b2bChatList[0]);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { id: 1, text: "Apakah bisa supply 500 Kg tomat setiap minggu?", time: "10:00", isMe: true },
    { id: 2, text: "Bisa Pak, kapasitas produksi kami mencapai 1.2 Ton per minggu.", time: "10:15", isMe: false },
    { id: 3, text: "Mohon kirimkan penawaran resminya ya.", time: "10:20", isMe: true },
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const handleSend = () => {
    if (!message.trim()) return;
    const newMsg = { id: Date.now(), text: message, time: "Now", isMe: true };
    setMessages([...messages, newMsg]);
    setMessage("");
  };

  return (
    <div className="flex h-[calc(100vh-160px)] bg-white rounded-[3rem] shadow-xl overflow-hidden border border-primary/5 animate-in fade-in duration-500">
      <aside className="w-80 border-r flex flex-col bg-gray-50/50">
        <div className="p-6 space-y-4">
          <h2 className="text-2xl font-black font-headline text-primary">Pesan B2B</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Cari supplier..." className="pl-10 rounded-xl bg-white h-11" />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {b2bChatList.map((chat) => (
            <div key={chat.id} onClick={() => setSelectedChat(chat)} className={cn("p-6 flex items-center gap-4 cursor-pointer transition-all hover:bg-primary/5", selectedChat.id === chat.id && "bg-white border-r-4 border-primary")}>
              <Avatar className="h-12 w-12 border-2 border-white"><AvatarImage src={chat.avatar} /></Avatar>
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-sm truncate">{chat.name}</h4>
                <p className="text-xs text-muted-foreground truncate">{chat.lastMsg}</p>
              </div>
            </div>
          ))}
        </div>
      </aside>

      <main className="flex-1 flex flex-col">
        <header className="p-6 border-b flex items-center justify-between">
          <div className="flex items-center gap-4">
             <Avatar className="h-12 w-12"><AvatarImage src={selectedChat.avatar} /></Avatar>
             <div>
                <h3 className="font-bold">{selectedChat.name}</h3>
                <p className="text-[10px] text-primary font-black flex items-center gap-1 uppercase tracking-widest"><Store className="h-3 w-3" /> Supplier Terverifikasi</p>
             </div>
          </div>
          <div className="flex gap-2">
             <Button variant="ghost" size="icon" className="rounded-full"><Phone className="h-5 w-5" /></Button>
             <Button variant="ghost" size="icon" className="rounded-full"><Video className="h-5 w-5" /></Button>
             <Button variant="ghost" size="icon" className="rounded-full"><MoreVertical className="h-5 w-5" /></Button>
          </div>
        </header>

        <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-6 bg-primary/5">
           {messages.map((msg) => (
             <div key={msg.id} className={cn("flex flex-col", msg.isMe ? "items-end" : "items-start")}>
               <div className={cn("max-w-[70%] p-5 rounded-[2rem] text-sm font-medium shadow-sm", msg.isMe ? "bg-primary text-white rounded-tr-none" : "bg-white text-primary rounded-tl-none")}>
                 {msg.text}
               </div>
               <span className="text-[10px] text-muted-foreground mt-2 px-2 font-bold">{msg.time}</span>
             </div>
           ))}
        </div>

        <footer className="p-6 border-t bg-white">
          <div className="flex gap-4 items-center bg-gray-50 p-2 rounded-2xl border">
             <Input value={message} onChange={(e) => setMessage(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSend()} placeholder="Ketik pesan penawaran..." className="border-none focus-visible:ring-0 bg-transparent flex-1" />
             <Button onClick={handleSend} size="icon" className="h-11 w-11 rounded-xl bg-primary text-white"><Send className="h-5 w-5" /></Button>
          </div>
        </footer>
      </main>
    </div>
  );
}
