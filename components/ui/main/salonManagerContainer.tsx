"use client";
import { useEffect, useState } from "react";
import { Salon } from "@/lib/types";
import BarberManager from "./manager/BarberManager";
import ServiceManager from "./manager/ServiceManager";

export default function SalonManagerContainer() {
  const [salon, setSalon] = useState<Salon | null>(null);
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    // ✔ Login хийсэн хэрэглэгчийн local ID авч байна
    const id = localStorage.getItem("userId");
    console.log("localStorage userId:", id);

    if (id) setUserId(Number(id));
  }, []);

  useEffect(() => {
    if (!userId) return;

    console.log("API руу илгээж буй userId:", userId);

    fetch(`/api/salons?userId=${userId}`)
      .then((res) => res.json())
      .then((data: Salon[]) => {
        console.log("API-аас ирсэн салон:", data);
        if (data.length > 0) setSalon(data[0]);
      });
  }, [userId]);

  if (!salon) return <p>Танд хамаарах салон олдсонгүй</p>;

  return (
    <div className="p-4 border rounded-md space-y-6">
      <h2 className="text-xl font-bold">{salon.name}</h2>
      <p>{salon.salonAddress}</p>

      <BarberManager salonId={Number(salon.id)} />
      <ServiceManager salonId={Number(salon.id)} />
    </div>
  );
}
