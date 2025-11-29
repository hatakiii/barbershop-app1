//app/salon/page.tsx

"use client";
import { useEffect, useState } from "react";
import { Salon } from "@/lib/types";
import { useRouter } from "next/navigation";
import Image from "next/image";

const SalonPage = () => {
  const [salons, setSalons] = useState<Salon[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/salons", { cache: "no-cache" })
      .then((res) => res.json())
      .then((data) => setSalons(data));
  }, []);

  return (
    <div className="flex">
      {salons.map((salon) => (
        <div
          key={salon.id}
          onClick={() => router.push(`/salon/${salon.id}`)}
          className="cursor-pointer border rounded-xl p-4"
        >
          <Image
            src={salon.salonImage || ""}
            alt={salon.name}
            width={30}
            height={30}
          />
          <h2 className="text-xl/7 font-semibold mt-3">{salon.name}</h2>
          <p className="text-gray-600">{salon.salonAddress}</p>
        </div>
      ))}
    </div>
  );
};

export default SalonPage;
