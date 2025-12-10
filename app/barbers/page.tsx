//barbers/page.tsx
"use client";
import { useState, useEffect } from "react";
import { Barber } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";

export default function BarbersPage() {
  const [barbers, setBarbers] = useState<Barber[]>([]);

  useEffect(() => {
    const fetchBarbers = async () => {
      try {
        const res = await fetch("/api/barbers/all");
        const data = await res.json();
        setBarbers(data);
      } catch (error) {
        console.error("Үсчид татахад алдаа гарлаа:", error);
      }
    };

    fetchBarbers();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">All Barbers</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {barbers.length === 0 && (
          <p className="text-gray-500">Loading barbers...</p>
        )}

        {barbers.map((barber) => (
          <Link
            href={`/barbers/${barber.id}`}
            key={barber.id}
            className="p-4 border rounded-lg shadow-sm flex flex-col items-center gap-2 hover:bg-gray-50 cursor-pointer"
          >
            <Image
              src={barber.avatarUrl || "/placeholder-avatar.png"}
              alt={barber.name}
              width={120}
              height={120}
              className="rounded-full object-cover"
            />
            <p className="font-bold">{barber.name}</p>
            <p className="text-gray-600">{barber.phoneNumber}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
