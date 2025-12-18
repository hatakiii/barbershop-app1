"use client";

import { useEffect, useState } from "react";
import { Salon } from "@/lib/types";
import BarberManager from "./manager/BarberManager";
import ServiceManager from "./manager/ServiceManager";

export default function SalonManagerContainer() {
  const [salons, setSalons] = useState<Salon[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSalonId, setSelectedSalonId] = useState<string | null>(null);

  useEffect(() => {
    const fetchSalons = async () => {
      try {
        const res = await fetch("/api/salons");
        if (!res.ok) {
          throw new Error("Salon татаж чадсангүй");
        }

        const data: Salon[] = await res.json();
        setSalons(data);

        // Хэрэв ганц салонтой бол автоматаар сонгоно
        if (data.length === 1) {
          setSelectedSalonId(data[0].id);
        }
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

  /* -------------------------------------------
     1. Салон сонгох дэлгэц
  -------------------------------------------- */
  if (!selectedSalonId) {
    return (
      <div className="space-y-4">
        <h1 className="text-xl font-bold">Салон сонгоно уу</h1>

        {salons.map((salon) => (
          <div
            key={salon.id}
            className="p-4 border rounded-md flex items-center justify-between"
          >
            <div>
              <p className="font-medium">{salon.name}</p>
              <p className="text-sm text-muted-foreground">
                {salon.salonAddress}
              </p>
            </div>

            <button
              onClick={() => setSelectedSalonId(salon.id)}
              className="px-4 py-2 text-sm bg-black text-white rounded-md hover:opacity-90"
            >
              Сонгох
            </button>
          </div>
        ))}
      </div>
    );
  }

  /* -------------------------------------------
     2. Сонгогдсон салон
  -------------------------------------------- */
  const selectedSalon = salons.find((salon) => salon.id === selectedSalonId);

  if (!selectedSalon) return null;

  return (
    <div className="space-y-6">
      <div className="p-4 border rounded-md space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold">{selectedSalon.name}</h2>
            <p className="text-sm text-muted-foreground">
              {selectedSalon.salonAddress}
            </p>
          </div>

          <button
            onClick={() => setSelectedSalonId(null)}
            className="text-sm underline"
          >
            ← Өөр салон сонгох
          </button>
        </div>

        <BarberManager salonId={selectedSalon.id} />
        <ServiceManager salonId={selectedSalon.id} />
      </div>
    </div>
  );
}
