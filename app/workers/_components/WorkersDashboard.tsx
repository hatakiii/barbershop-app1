"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Scissors, Shield, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const cards = [
  {
    title: "Админы самбар",
    description: "Салон үүсгэх, удирдах",
    href: "/workers/admin",
    icon: Shield,
  },
  {
    title: "Менежерийн самбар",
    description: "Салоны үйл ажиллагаа, үйлчилгээ нэмэх",
    href: "/workers/manager",
    icon: Users,
  },
  {
    title: "Үсчингийн самбар",
    description: "Захиалга, ажлын хуваарь",
    href: "/workers/barber",
    icon: Scissors,
  },
];

export default function WorkersDashboard() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-5 mt-3">
        <h1 className="px-3 text-2xl font-semibold">Удирдлагын самбар</h1>
      </div>

      <div className="flex flex-col gap-6 md:grid-cols-3">
        {cards.map((card, i) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Link href={card.href} className="group block h-full">
              <Card className="h-full rounded-2xl transition-all hover:shadow-lg hover:border-accent">
                <CardContent className="p-6 flex flex-col h-full">
                  <card.icon className="h-10 w-10  mb-4 text-black" />

                  <h3 className="text-lg font-semibold mb-1">{card.title}</h3>
                  <p className="text-sm text-muted-foreground flex-1">
                    {card.description}
                  </p>

                  <div className="mt-4 flex items-center gap-1 text-sm text-black font-medium">
                    Нээх{" "}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
