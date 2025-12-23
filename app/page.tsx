"use client";
import { Header } from "./_components/Header";
import { Hero } from "./_components/Hero";
import { Services } from "./_components/Services";
import { Team } from "./_components/Team";
import { Gallery } from "./_components/Gallery";

import { Footer } from "./_components/Footer";
import { HairstyleGallery } from "./_components/HairStyleGallery";

import { SalonContainer } from "./_components/SalonContainer";
import WhyChooseLuxe from "./_components/Contact";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-linear-to-b bg-red-400 flex flex-col items-center">
      <Header />
      <Hero />
      <SalonContainer />
      <HairstyleGallery />

      <WhyChooseLuxe />
      <Footer />
    </div>
  );
}
