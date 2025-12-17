"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Salon } from "@/lib/types";

import { Search, Star } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const SalonPage = () => {
  const [salons, setSalons] = useState<Salon[]>([]);
  const [search, setSearch] = useState(""); // ✅ search state
  const router = useRouter();

  useEffect(() => {
    fetch("/api/salons", { cache: "no-cache" })
      .then((res) => res.json())
      .then((data) => setSalons(data));
  }, []);

  const filteredSalons = useMemo(() => {
    if (!search.trim()) return salons;

    const keyword = search.toLowerCase();

    return salons.filter((salon) => salon.name.toLowerCase().includes(keyword));
  }, [salons, search]);

  return (
    <>
      {/* HERO + SEARCH */}
      <section className="border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="py-12 md:py-20">
            <p className="mb-3 text-sm uppercase tracking-widest text-muted-foreground">
              Таны гоо сайхны түнш
            </p>

            <h2 className="max-w-2xl font-serif text-4xl italic leading-tight text-foreground md:text-5xl lg:text-6xl">
              Өөрт тохирсон салоноо
              <br />
              <span className=" text-pink-800">олоорой</span>
            </h2>

            <p className="mt-6 max-w-lg text-muted-foreground">
              Улаанбаатар хотын шилдэг үсчний газрууд нэг дороос. Хялбар
              захиалга, баталгаатай үйлчилгээ.
            </p>

            {/* ✅ REAL SEARCH */}
            <div className="mt-8 flex max-w-xl flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Салон хайх..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="h-12 bg-card pl-10 text-base"
                />
              </div>
              <Button size="lg" className="h-12 px-8" onClick={() => {}}>
                Хайх
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* SALON GRID */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h3 className="font-serif text-2xl italic text-foreground">
            Бүх салонууд
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {filteredSalons.length} салон олдлоо
          </p>
        </div>

        {filteredSalons.length === 0 ? (
          <p className="text-muted-foreground">
            😕 Таны хайлтад тохирох салон олдсонгүй
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredSalons.map((salon) => (
              <Card
                key={salon.id}
                onClick={() => router.push(`/salon/${salon.id}`)}
                className="cursor-pointer overflow-hidden rounded-2xl border bg-card transition hover:shadow-lg"
              >
                {/* IMAGE */}
                <div className="relative h-48 w-full">
                  <Image
                    src={salon.salonImage || "/placeholder.jpg"}
                    alt={salon.name}
                    fill
                    className="object-cover"
                  />

                  {/* ⭐ REVIEW BADGE (баруун дээд буланд) */}
                  <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-white/90 px-2 py-1 text-xs font-medium text-foreground backdrop-blur">
                    <Star className="h-3.5 w-3.5 fill-accent text-yellow-500" />
                    {(salon.avgRating ?? 0).toFixed(1)}
                  </div>
                </div>

                {/* HEADER – padding багасгав (gap арилна) */}
                <CardHeader className="pb-2">
                  <CardTitle className="line-clamp-1 text-base">
                    {salon.name}
                  </CardTitle>
                  <CardDescription className="line-clamp-2">
                    {salon.salonAddress}
                  </CardDescription>
                </CardHeader>

                <CardContent className="pt-0">
                  <span className="text-xs text-muted-foreground">
                    Дэлгэрэнгүй үзэх →
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>
    </>
  );
};

export default SalonPage;
