"use client";
import { CalendarCheck, Scissors, Layers, Clock } from "lucide-react";
import { useEffect } from "react";

const stats = [
  { label: "Өнөөдрийн захиалга", value: 12, icon: CalendarCheck },
  { label: "Идэвхтэй үсчин", value: 4, icon: Scissors },
  { label: "Үйлчилгээ", value: 8, icon: Layers },
  { label: "Хүлээгдэж буй", value: 3, icon: Clock },
];

// useEffect(() => {
//   const fetchOrders = async () => {
//     try {
//       const res = await fetch("/api/orders");
//       const data = await res.json();
//       console.log("data", data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   fetchOrders();
// }, []);

export default function page() {
  return (
    <div className="p-8">
      <h1 className="text-xl font-semibold mb-6">Өнөөдрийн товч тойм</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="border rounded-xl p-4 flex items-center gap-4"
          >
            <s.icon className="w-6 h-6" />
            <div>
              <p className="text-sm text-muted-foreground">{s.label}</p>
              <p className="text-2xl font-semibold">{s.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
