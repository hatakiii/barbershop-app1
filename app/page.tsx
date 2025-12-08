"use client";
import { Header } from "./_components/Header";
import { Hero } from "./_components/Hero";
import { Services } from "./_components/Services";
import { Team } from "./_components/Team";
import { Gallery } from "./_components/Gallery";
import { Contact } from "./_components/Contact";
import { Footer } from "./_components/Footer";
import { HairstyleGallery } from "./_components/HairStyleGallery";
import { GeminiChat } from "./_components/GeminiChat";
import { HaircutWheel } from "./_components/HaircutWheel";
import { SalonContainer } from "./_components/SalonContainer";

export default function Home() {
  return (
    <div>
      {/* <Header /> */}
      <Hero />
      <SalonContainer />

      <HairstyleGallery />
      <Services />
      <Team />
      <Gallery />
      <Contact />
      <HaircutWheel />
      <Footer />
      <div className="absolute right-9 bottom-9">
        <GeminiChat />
      </div>
    </div>
  );
}
