// app/salon/[id]/SalonDetailPage.tsx
import MapView from "@/app/_components/MapView";
import prisma from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import Service from "./_components/Service";
import { MapPin, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import Head from "next/head";
import { Header } from "@/app/_components/Header";
import ReviewButton from "./_components/ReviewButton";
import { Star } from "lucide-react";
import { SalonImage } from "@/app/_components/SalonContainer";
import { ArrowLeft } from "lucide-react";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function SalonDetailPage({ params }: Props) {
  const { id } = await params;

  const salon = await prisma.salon.findUnique({
    where: { id: Number(id) },
    include: {
      barbers: true,
      salon_services: { include: { services: true } },
      reviews: true,
    },
  });

  if (!salon) {
    return <div className="p-6 text-red-500">Салон олдсонгүй</div>;
  }
  const reviews = salon.reviews;
  const avgRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        ).toFixed(1)
      : "0.0";

  return (
    <div className="relative min-h-screen overflow-hidden bg-linear-to-b from-[#FAFAF9] via-[#e2e6ec] to-[#f2f1f3]">
      {/* Salon Header – isalon style */}
      {/* Back button */}
      <div className="absolute top-9 left-12 z-50">
        <Link
          href="/salon"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 backdrop-blur shadow hover:bg-white transition"
        >
          <ArrowLeft className="h-6 w-6 text-primary" />
        </Link>
      </div>

      <section className="relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="boverflow-hidden">
            {/* Content */}
            <div className="p-6 md:p-8 flex flex-col gap-4">
              {/* Name + rating */}
              <div className="space-y-2">
                <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                  {salon.name}
                </h1>
                <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
                  {/* Rating */}
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            Number(avgRating) >= i
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {avgRating} ({reviews.length})
                    </span>
                  </div>

                  {/* Address */}
                  <div className="flex items-start gap-2 text-muted-foreground text-sm">
                    <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                    <span>{salon.salonAddress}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                <Link href={`/booking/${salon.id}`}>
                  <Button>Цаг захиалах</Button>
                </Link>

                <ReviewButton salonId={salon.id} />
              </div>

              {/* Image */}
              <div className="relative w-full h-[420px] border border-border rounded-xl overflow-hidden mt-4">
                <SalonImage
                  src={salon.salonImage || "/salon_fallback.jpg"}
                  alt={salon.name}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section (client component) */}
      <Service services={salon.salon_services} />

      {/* Barbers Section (v0 style, tighter spacing) */}
      <section className="py-18 md:py-25">
        <div className="max-w-6xl mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-15">
            <p className="text-muted-foreground tracking-[0.2em] uppercase text-sm mb-4">
              Манай баг
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-foreground text-balance">
              Мэргэжилтнүүд
            </h2>
          </div>

          {/* Barbers Grid */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-10">
            {salon.barbers.map((b) => (
              <div
                key={b.id}
                className="group text-center flex flex-col items-center gap-3"
              >
                {/* Image */}
                <div className="relative w-32 h-46 md:w-46 md:h-52 overflow-hidden rounded-xl shadow-lg group-hover:shadow-2xl transition-shadow duration-300">
                  <Image
                    src={b.avatarUrl || "/placeholder.png"}
                    alt={b.name || ""}
                    fill
                    style={{ objectFit: "cover" }}
                    className="transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Name */}
                <h3 className="font-serif text-2xl text-foreground mt-1">
                  {b.name}
                </h3>

                {/* Role */}
                <p className="text-muted-foreground text-sm uppercase tracking-wider">
                  Үсчин
                </p>

                {/* Phone */}
                {b.phoneNumber && (
                  <a
                    href={`tel:+976${b.phoneNumber}`}
                    className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors text-sm"
                  >
                    {b.phoneNumber}
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 md:py-28 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <p className="text-muted-foreground tracking-[0.2em] uppercase text-sm mb-4">
              Хаяг байршил
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-foreground text-balance">
              Бидэнтэй холбогдох
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Map */}
            {salon.lat != null && salon.lng != null ? (
              <div className="relative aspect-square lg:aspect-4/3 overflow-hidden border border-border rounded-xl">
                <MapView lat={salon.lat} lng={salon.lng} />
              </div>
            ) : (
              <p className="text-sm text-gray-500">Location not available</p>
            )}

            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h3 className="font-serif text-2xl text-foreground mb-4">
                  {salon.name}
                </h3>
                <div className="space-y-4 text-muted-foreground">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <div>
                      <p>Улаанбаатар хот</p>
                      <p>{salon.salonAddress}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* <div className="space-y-3">
                <h4 className="text-foreground font-medium">Ажлын цаг</h4>
                <div className="space-y-2 text-muted-foreground text-sm">
                  <div className="flex justify-between">
                    <span>Даваа - Баасан</span>
                    <span>10:00 - 20:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Бямба - Ням</span>
                    <span>11:00 - 19:00</span>
                  </div>
                </div>
              </div> */}

              <Button
                variant="outline"
                className="rounded-none border-foreground text-foreground hover:bg-foreground hover:text-background transition-colors bg-transparent"
                asChild
              >
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${salon.lat},${salon.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Navigation className="w-4 h-4 mr-2" />
                  Чиглэл авах
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-background py-16 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <h2 className="font-serif text-3xl mb-2">{salon.name}</h2>
            <p className="text-background/60 text-sm">
              Таны гоо үзэсгэлэнг тодотгоно
            </p>
          </div>
          <div className="text-center md:text-right">
            <p className="text-background/60 text-sm mb-1">Холбоо барих</p>
            <a
              href={`tel:+97690547812`}
              className="hover:text-background/80 transition-colors"
            >
              +976 9054 7812
            </a>
          </div>
        </div>
        <div className="border-t border-background/20 mt-12 pt-8 text-center">
          <p className="text-background/50 text-sm">
            © 2025 Шаргал Салон. Бүх эрх хуулиар хамгаалагдсан.
          </p>
        </div>
      </footer>
    </div>
  );
}
