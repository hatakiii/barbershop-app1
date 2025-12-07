"use client";
import { useEffect, useState } from "react";
import { Salon } from "@/lib/types";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const SalonContainer = () => {
  const [salons, setSalons] = useState<Salon[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/salons", { cache: "no-cache" })
      .then((res) => res.json())
      .then((data) => setSalons(data));
  }, []);

  return (
    <div className="flex flex-col gap-6 py-6">
      <p className="text-center text-xl font-semibold">✨ Топ салонууд ✨</p>

      <div className="flex flex-wrap justify-center gap-6 px-4">
        {salons.slice(0, 5).map((salon) => (
          <motion.div
            key={salon.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 200, damping: 14 }}
            onClick={() => router.push(`/salon/${salon.id}`)}
            className="cursor-pointer"
          >
            <Card className="w-44 h-56 rounded-xl shadow-md hover:shadow-xl bg-white transition">
              <CardHeader className="text-center p-3">
                <CardTitle className="text-base font-bold truncate">
                  {salon.name}
                </CardTitle>
                <CardDescription className="text-xs text-gray-500 truncate">
                  {salon.salonAddress}
                </CardDescription>
              </CardHeader>

              <CardContent className="flex justify-center items-center p-0">
                <div className="relative w-36 h-28 rounded-lg overflow-hidden border">
                  <Image
                    src={salon.salonImage || "/default-salon.jpg"}
                    alt={salon.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
