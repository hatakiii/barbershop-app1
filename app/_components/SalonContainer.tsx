"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Star, MapPin } from "lucide-react";
import { Salon } from "@/lib/types";

export function SalonContainer() {
  const [salons, setSalons] = useState<Salon[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/salons", { cache: "no-cache" })
      .then((res) => res.json())
      .then((data) => setSalons(data));
  }, []);

  return (
    <section className="py-24 bg-secondary/50">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground">
              Топ салонууд
            </h2>
            <p className="text-muted-foreground mt-2">
              Хэрэглэгчдийн сонголтоор тэргүүлсэн
            </p>
          </div>

          <button
            onClick={() => router.push("/salon")}
            className="text-sm text-foreground hover:text-accent transition-colors hidden md:block"
          >
            Бүгдийг харах →
          </button>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {salons.slice(0, 6).map((salon) => (
            <div
              key={salon.id}
              onClick={() => router.push(`/salon/${salon.id}`)}
              className="group cursor-pointer"
            >
              {/* Image */}
              <div className="relative aspect-4/3 rounded-xl overflow-hidden bg-muted mb-4">
                <Image
                  src={salon.salonImage || "/default-salon.jpg"}
                  alt={salon.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Info */}
              <div className="space-y-2">
                <h3 className="font-medium text-foreground">{salon.name}</h3>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-3.5 h-3.5" />
                  <span className="truncate">{salon.salonAddress}</span>
                </div>

                {/* <div className="flex items-center gap-2 text-sm">
                  <Star className="w-3.5 h-3.5 fill-foreground text-foreground" />
                  <span className="font-medium text-foreground">
                    {salon.rating ?? "4.8"}
                  </span>
                  <span className="text-muted-foreground">
                    ({salon.reviewCount ?? "120"})
                  </span>
                </div> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
