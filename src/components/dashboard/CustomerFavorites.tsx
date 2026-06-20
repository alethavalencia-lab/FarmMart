
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { 
  Heart, 
  ShoppingCart, 
  Star, 
  MapPin, 
  Trash2, 
  ChevronRight,
  ArrowRight
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/badge"; // Note: Re-using badge or common UI parts
import { mockProducts } from "./CustomerMarketplace";
import { cn } from "@/lib/utils";

interface CustomerFavoritesProps {
  favorites: number[];
  toggleFavorite: (id: number) => void;
  addToCart: (product: any) => void;
}

export function CustomerFavorites({ favorites, toggleFavorite, addToCart }: CustomerFavoritesProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const formatPrice = (price: number) => {
    if (!mounted) return price.toString();
    return price.toLocaleString('id-ID');
  };

  const favoriteProducts = mockProducts.filter(p => favorites.includes(p.id));

  if (favoriteProducts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6 glassmorphism rounded-[3rem] p-12 animate-in fade-in duration-500">
        <div className="bg-destructive/10 p-8 rounded-full">
          <Heart className="h-16 w-16 text-destructive animate-pulse" />
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-black font-headline text-primary">Belum Ada Favorit</h1>
          <p className="text-muted-foreground max-w-md mx-auto text-lg">
            Simpan produk yang Anda sukai untuk memudahkan Anda menemukannya kembali nanti.
          </p>
        </div>
        <button className="rounded-2xl h-14 px-10 bg-primary hover:bg-primary/90 text-white font-bold text-lg shadow-xl shadow-primary/20 transition-all">
          Mulai Jelajahi Produk
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <div className="space-y-2">
        <h1 className="text-3xl font-black font-headline text-primary">Produk Favorit</h1>
        <p className="text-muted-foreground">Koleksi produk tani pilihan yang Anda simpan.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {favoriteProducts.map((p) => (
          <Card key={p.id} className="group cursor-pointer rounded-[2.5rem] border-none shadow-sm hover:shadow-2xl bg-white overflow-hidden transition-all duration-500">
            <div className="relative aspect-square overflow-hidden">
              <Image 
                src={p.image} 
                alt={p.name} 
                fill 
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <button 
                onClick={() => toggleFavorite(p.id)}
                className="absolute top-4 right-4 h-10 w-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-destructive transition-all shadow-lg"
              >
                <Heart className="h-5 w-5 fill-current" />
              </button>
            </div>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-1">
                <p className="text-[10px] font-black text-secondary uppercase tracking-widest">{p.category}</p>
                <h3 className="text-xl font-bold leading-tight group-hover:text-primary transition-colors">{p.name}</h3>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                  <MapPin className="h-3 w-3 text-primary" /> {p.location}
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t border-primary/5">
                <p className="text-xl font-black text-primary">Rp {formatPrice(p.price)}</p>
                <div className="flex items-center gap-1 bg-yellow-400/10 px-2 py-1 rounded-lg">
                  <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                  <span className="text-xs font-black">{p.rating}</span>
                </div>
              </div>
              
              <div className="flex gap-2">
                <button 
                  onClick={() => addToCart(p)}
                  className="flex-1 h-11 rounded-xl bg-primary hover:bg-secondary text-white font-bold transition-all text-xs"
                >
                  Beli
                </button>
                <button 
                  onClick={() => toggleFavorite(p.id)}
                  className="h-11 w-11 rounded-xl bg-destructive/5 text-destructive hover:bg-destructive hover:text-white transition-all flex items-center justify-center"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
