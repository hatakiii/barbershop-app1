"use client";
import { Header } from "./_components/Header";
import { Hero } from "./_components/Hero";
import { Services } from "./_components/Services";
import { Team } from "./_components/Team";
import { Gallery } from "./_components/Gallery";
import { Contact } from "./_components/Contact";
import { Footer } from "./_components/Footer";
import { HairstyleGallery } from "./_components/HairStyleGallery";

import { SalonContainer } from "./_components/SalonContainer";

export default function Home() {
  return (
    <div>
      <Header />
      <Hero />
      <SalonContainer />
      <HairstyleGallery />
      <Team />
      <Contact />
      <Footer />
    </div>
  );
}
