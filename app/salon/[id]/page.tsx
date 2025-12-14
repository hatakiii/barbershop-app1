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
    },
  });

  if (!salon) {
    return <div className="p-6 text-red-500">Салон олдсонгүй</div>;
  }

  return (
    <div className="bg-background min-h-screen">
      {/* Hero Section */}
      {salon.salonImage && (
        <div className="relative h-[60vh] md:h-[70vh] w-full">
          <Image
            src={salon.salonImage}
            alt={salon.name || "Salon Image"}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 `bg-gradient-to-b` from-foreground/60 via-foreground/40 to-foreground/70" />
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6">
            <p className="text-primary-foreground/80 tracking-[0.3em] uppercase text-sm mb-4 font-sans">
              {salon.salonAddress}
            </p>
            <h1 className="font-serif text-5xl md:text-7xl text-primary-foreground mb-6 text-balance">
              {salon.name}
            </h1>
            <Link href={`/booking/${salon.id}`}>
              <Button
                size="lg"
                className="bg-green-950 text-primary-foreground hover:bg-primary/90 px-8 py-4 text-lg tracking-wide rounded-[5px]"
              >
                Цаг захиалах
              </Button>
            </Link>
          </div>
        </div>
      )}

      {/* Services Section (client component) */}
      <Service services={salon.salon_services} />

      {/* Barbers Section (v0 style, tighter spacing) */}
      <section className="py-18 md:py-25 bg-secondary">
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
      <section className="py-20 md:py-28 px-6 bg-card">
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
      <footer className="bg-foreground text-background py-16 px-6">
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
