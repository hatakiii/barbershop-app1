//barbers/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Barber } from "@/lib/types";

export default function BarberDynamicPage() {
  const { id } = useParams();
  const [barber, setBarber] = useState<Barber | null>(null);

  useEffect(() => {
    const fetchBarbers = async () => {
      try {
        const res = await fetch(`/api/barbers/all/${id}`);
        const data = await res.json();
        setBarber(data);
      } catch (error) {
        console.error("Үсчид татахад алдаа гарлаа:", error);
      }
    };

    fetchBarbers();
  }, []);

  if (!barber) return <p className="p-6">Loading barber...</p>;

  return (
    <div className="p-6">
      <Image
        src={barber.avatarUrl || "/placeholder-avatar.png"}
        alt={barber.name}
        width={160}
        height={160}
        className="rounded-full mx-auto"
      />
      <h1 className="text-2xl font-bold text-center mt-4">{barber.name}</h1>
      <p className="text-center text-gray-600 mt-2">{barber.phoneNumber}</p>

      <div className="mt-6 p-4 border rounded-md">
        <p className="text-lg font-semibold">More info coming soon… ✂️</p>
      </div>
    </div>
  );
}
