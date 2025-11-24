"use client";
import { Header } from "./_components/Header";
import { Hero } from "./_components/Hero";
import { Services } from "./_components/Services";
import { Team } from "./_components/Team";
import { Gallery } from "./_components/Gallery";
import { Contact } from "./_components/Contact";
import { Footer } from "./_components/Footer";

export default function Home() {
  return (
    <div>
      Barber Shop Frontend
      <Header />
      <Hero />
      <Services />
      <Team />
      <Gallery />
      <Contact />
      <Footer />
    </div>
  );
}
