"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Salon } from "@/lib/types";
import { Header } from "../_components/Header";

export default function BookingHomePage() {
  const router = useRouter();
  const [salons, setSalons] = useState<Salon[]>([]);

  useEffect(() => {
    fetch("/api/salons")
      .then((res) => res.json())
      .then((data) => setSalons(data))
      .catch((err) => console.error("Fetch salons error:", err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-5xl mx-auto p-6">
          <h1 className="text-3xl font-bold text-gray-800 text-center">
            Салон Сонгох
          </h1>
        </div>
      </header>
      <main className="flex-1 flex justify-center p-6">
        <div className="w-full max-w-5xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {salons.map((sal) => (
              <div
                key={sal.id}
                className="bg-white border rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 ease-in-out transform hover:-translate-y-1"
              >
                {sal.salonImage && (
                  <img
                    src={sal.salonImage}
                    alt={sal.name}
                    className="w-full h-48 object-cover transition-transform duration-300 ease-in-out hover:scale-105"
                  />
                )}
                <div className="p-4 flex flex-col gap-2">
                  <Button
                    onClick={() => router.push(`/booking/${sal.id}`)}
                    className="w-full text-lg font-semibold transition-transform duration-200 hover:scale-105"
                  >
                    {sal.name}
                  </Button>
                  {sal.salonAddress && (
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                      📍 {sal.salonAddress}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Loading / empty state */}
          {salons.length === 0 && (
            <p className="text-gray-400 text-center mt-10 italic">
              Loading salons...
            </p>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white shadow-inner mt-6">
        <div className="max-w-5xl mx-auto p-4 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} Your Company. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
