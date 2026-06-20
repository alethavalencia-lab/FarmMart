"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Send, MoreVertical, Phone, Video, Image as ImageIcon, Smile } from "lucide-react";
import { cn } from "@/lib/utils";

const chatList = [
  { id: 1, name: "Petani Cabai Nusantara", lastMsg: "Selamat siang, stok cabai masih tersedia.", time: "10:30", unread: 2, avatar: "https://picsum.photos/seed/farmer1/100/100", status: "online" },
  { id: 2, name: "Kebun Organik Sejahtera", lastMsg: "Tomat organik siap dipanen besok.", time: "09:15", unread: 0, avatar: "https://picsum.photos/seed/farmer2/100/100", status: "offline" },
  { id: 3, name: "Beras Makmur Farm", lastMsg: "Pesanan Anda sedang kami siapkan.", time: "Kemarin", unread: 0, avatar: "https://picsum.photos/seed/farmer3/100/100", status: "online" },
  { id: 4, name: "Kelompok Tani Lembang", lastMsg: "Terima kasih sudah berbelanja di kebun kami.", time: "2 hari lalu", unread: 0, avatar: "https://picsum.photos/seed/farmer4/100/100", status: "offline" },
];

const mockMessages = [
  { id: 1, text: "Halo Pak, apakah cabai merahnya masih ada?", time: "10:00", isMe: true },
  { id: 2, text: "Selamat siang, stok cabai masih tersedia.", time: "10:30", isMe: false },
  { id: 3, text: "Bisa kirim hari ini kalau saya pesan sekarang?", time: "10:35", isMe: true },
  { id: 4, text: "Bisa kak, batas pengiriman hari ini jam 4 sore ya.", time: "10:40", isMe: false },
];

export function CustomerChat() {
  const [selectedChat, setSelectedChat] = useState(chatList[0]);
  const [message, setMessage] = useState("");

  return (
    <div className="flex h-[calc(100vh-160px)] bg-white rounded-[3rem] shadow-xl overflow-hidden border border-primary/5 animate-in fade-in duration-500">
      {/* Sidebar */}
      <aside className="w-full sm:w-80 border-r border-primary/5 flex flex-col bg-gray-50/50">
        <div className="p-6 space-y-4">
          <h2 className="text-2xl font-black font-headline text-primary">Pesan</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Cari percakapan..." className="pl-10 rounded-2xl border-none bg-white shadow-sm h-11" />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {chatList.map((chat) => (
            <div 
              key={chat.id} 
              onClick={() => setSelectedChat(chat)}
              className={cn(
                "p-4 flex items-center gap-4 cursor-pointer transition-all hover:bg-primary/5",
                selectedChat.id === chat.id ? "bg-primary/10 border-r-4 border-primary" : ""
              )}
            >
              <div className="relative">
                <Avatar className="h-12 w-12 border-2 border-white shadow-sm">
                  <AvatarImage src={chat.avatar} />
                  <AvatarFallback>{chat.name[0]}</AvatarFallback>
                </Avatar>
                {chat.status === "online" && (
                  <span className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 border-2 border-white rounded-full"></span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-1">
                  <h4 className="font-bold text-sm truncate">{chat.name}</h4>
                  <span className="text-[10px] text-muted-foreground font-medium">{chat.time}</span>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-xs text-muted-foreground truncate leading-tight">{chat.lastMsg}</p>
                  {chat.unread > 0 && (
                    <span className="bg-primary text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                      {chat.unread}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="hidden sm:flex flex-1 flex flex-col bg-white">
        {/* Chat Header */}
        <header className="p-4 border-b border-primary/5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-10 w-10">
              <AvatarImage src={selectedChat.avatar} />
              <AvatarFallback>{selectedChat.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-bold text-sm">{selectedChat.name}</h3>
              <p className="text-[10px] text-green-600 font-bold uppercase tracking-wider">
                {selectedChat.status === "online" ? "Online" : "Terakhir dilihat 2 jam lalu"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="rounded-full text-muted-foreground"><Phone className="h-4 w-4" /></Button>
            <Button variant="ghost" size="icon" className="rounded-full text-muted-foreground"><Video className="h-4 w-4" /></Button>
            <Button variant="ghost" size="icon" className="rounded-full text-muted-foreground"><MoreVertical className="h-4 w-4" /></Button>
          </div>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-fixed opacity-90">
          {mockMessages.map((msg) => (
            <div key={msg.id} className={cn("flex flex-col", msg.isMe ? "items-end" : "items-start")}>
              <div className={cn(
                "max-w-[70%] p-4 rounded-3xl text-sm font-medium shadow-sm",
                msg.isMe ? "bg-primary text-white rounded-tr-none" : "bg-gray-100 text-foreground rounded-tl-none"
              )}>
                {msg.text}
              </div>
              <span className="text-[10px] text-muted-foreground mt-1 px-2">{msg.time}</span>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <footer className="p-4 bg-gray-50 border-t border-primary/5">
          <div className="flex items-center gap-2 bg-white p-2 rounded-2xl shadow-sm border border-primary/10">
            <Button variant="ghost" size="icon" className="rounded-full text-muted-foreground"><ImageIcon className="h-5 w-5" /></Button>
            <Button variant="ghost" size="icon" className="rounded-full text-muted-foreground"><Smile className="h-5 w-5" /></Button>
            <Input 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tulis pesan..." 
              className="border-none focus-visible:ring-0 bg-transparent flex-1" 
            />
            <Button 
              size="icon" 
              className="h-10 w-10 rounded-xl bg-primary hover:bg-secondary text-white shadow-lg transition-all active:scale-95"
              onClick={() => setMessage("")}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </footer>
      </main>
    </div>
  );
}
