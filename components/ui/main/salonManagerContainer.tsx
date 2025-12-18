"use client";

import { useEffect, useState } from "react";
import { Salon } from "@/lib/types";
import BarberManager from "./manager/BarberManager";
import ServiceManager from "./manager/ServiceManager";
import { Skeleton } from "../skeleton";

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
    return (
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, idx) => (
          <div
            key={idx}
            className="p-4 border rounded-md flex items-center justify-between animate-pulse bg-gray-100"
          >
            <div className="space-y-2 flex-1">
              <div className="h-5 w-3/4 bg-gray-300 rounded"></div>
              <div className="h-3 w-1/2 bg-gray-200 rounded"></div>
            </div>
            <div className="h-8 w-20 bg-gray-300 rounded"></div>
          </div>
        ))}
      </div>
    );
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

        <div className="flex flex-col gap-3">
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
            className="text-sm border-2 px-3 py-2 rounded-xl"
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
