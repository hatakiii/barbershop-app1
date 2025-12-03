"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Salon } from "@/lib/types";

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
    <div className="p-4 flex gap-6 w-full">
      <div className="flex-1">
        <h1 className="text-2xl font-bold mb-6">Салон Сонгох</h1>

        <div className="space-y-4 w-[450px]">
          {salons?.map((sal) => (
            <div
              key={sal.id}
              className="border p-4 rounded hover:shadow-md transition-shadow"
            >
              {sal.salonImage && (
                <img
                  src={sal.salonImage}
                  alt={sal.name}
                  className="w-full h-48 object-cover rounded mb-3"
                />
              )}

              <Button
                onClick={() => router.push(`/booking/${sal.id}`)}
                className="w-full text-xl font-semibold"
              >
                {sal.name}
              </Button>

              {sal.salonAddress && (
                <p className="text-sm text-gray-600 mt-2 flex items-center gap-1">
                  📍 {sal.salonAddress}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
