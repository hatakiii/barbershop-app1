"use client";
import { useEffect, useState } from "react";
import { Salon } from "@/lib/types";
import BarberManager from "./manager/BarberManager";
import ServiceManager from "./manager/ServiceManager";

interface SalonManagerContainerProps {
  managerId: string; // Manager-ийн id frontend-с ирнэ
}

export default function SalonManagerContainer({
  managerId,
}: SalonManagerContainerProps) {
  const [salon, setSalon] = useState<Salon | null>(null);

  useEffect(() => {
    if (!managerId) return;

    fetch(`/api/salons?managerId=${managerId}`)
      .then((res) => res.json())
      .then((data: Salon[]) => {
        if (data.length > 0) {
          setSalon(data[0]);
        } else {
          setSalon(null);
        }
      })
      .catch((err) => console.error(err));
  }, [managerId]);

  if (!salon) {
    return <p>Танд хамаарах салон олдсонгүй</p>;
  }

  return (
    <div className="p-4 border rounded-md space-y-6">
      {/* Салон мэдээлэл */}
      <div>
        <h2 className="text-xl font-bold">{salon.name}</h2>
        <p>{salon.salonAddress}</p>

        {salon.salonImage && (
          <img
            src={salon.salonImage}
            alt={salon.name}
            className="w-full h-40 object-cover mt-2 rounded"
          />
        )}
      </div>

      <BarberManager salonId={Number(salon.id)} />
      <ServiceManager salonId={Number(salon.id)} />
    </div>
  );
}
