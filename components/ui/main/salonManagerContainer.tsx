"use client";

import { useEffect, useState } from "react";
import { Salon } from "@/lib/types";
import BarberManager from "./manager/BarberManager";
import ServiceManager from "./manager/ServiceManager";

export default function SalonManagerContainer() {
  const [salons, setSalons] = useState<Salon[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSalons = async () => {
      try {
        const res = await fetch("/api/salons");
        if (!res.ok) {
          throw new Error("Salon татаж чадсангүй");
        }

        const data: Salon[] = await res.json();
        setSalons(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSalons();
  }, []);

  if (loading) {
    return <p>Ачаалж байна...</p>;
  }

  if (salons.length === 0) {
    return <p>Танд хамаарах салон олдсонгүй</p>;
  }

  return (
    <div className="space-y-6">
      {salons.map((salon) => (
        <div key={salon.id} className="p-4 border rounded-md space-y-4">
          <h2 className="text-xl font-bold">{salon.name}</h2>
          <p className="text-sm text-muted-foreground">{salon.salonAddress}</p>

          <BarberManager salonId={salon.id} />
          <ServiceManager salonId={salon.id} />
        </div>
      ))}
    </div>
  );
}
