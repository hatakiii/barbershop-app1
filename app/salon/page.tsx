//app/salon/page.tsx

"use client";
import { useEffect, useState } from "react";
import { Salon } from "@/lib/types";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const SalonPage = () => {
  const [salons, setSalons] = useState<Salon[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/salons", { cache: "no-cache" })
      .then((res) => res.json())
      .then((data) => setSalons(data));
  }, []);
  console.log("salons", salons);

  return (
    <div className="flex gap-2">
      {salons.map((salon) => (
        <Card
          key={salon.id}
          onClick={() => router.push(`/salon/${salon.id}`)}
          className="cursor-pointer border rounded-xl p-4"
        >
          <CardHeader>
            <CardTitle>{salon.name}</CardTitle>
            <CardDescription>{salon.salonAddress}</CardDescription>
          </CardHeader>
          <CardContent>
            <Image
              src={salon.salonImage || ""}
              alt={salon.name}
              width={100}
              height={100}
            />
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default SalonPage;
