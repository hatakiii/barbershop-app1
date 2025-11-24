import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export function Hero() {
  return (
    <section id="home" className="relative min-h-[80vh] flex items-center">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1600948836101-f9ffda59d250?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYWlyJTIwc2Fsb24lMjBpbnRlcmlvciUyMG1vZGVybnxlbnwxfHx8fDE3NTU0MTk5MDZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Modern hair salon interior"
          className="w-full h-full object-cover"
          fill
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-2xl text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Your Hair, <br />
            <span className="text-accent">Our Passion</span>
          </h1>
          <p className="text-xl mb-8 text-gray-200">
            Experience luxury hair care with our expert stylists. From cuts to
            color, we bring your vision to life in our modern, welcoming salon.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/booking">
              <Button
                size="lg"
                className="bg-white text-black hover:bg-gray-100"
              >
                Booking
              </Button>
            </Link>

            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-black"
            >
              View Services
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
