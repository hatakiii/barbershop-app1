"use client";

import { Barber } from "@/lib/types";

type BarberSelectorProps = {
  barbers?: Barber[];
  selectedBarber: Barber | null;
  setSelectedBarber: (barber: Barber) => void;
};

export default function BarberSelector({
  barbers = [],
  selectedBarber,
  setSelectedBarber,
}: BarberSelectorProps) {
  return (
    <div className="space-y-2">
      {barbers.map((b: Barber) => (
        <button
          key={b.id}
          onClick={() => setSelectedBarber(b)}
          className={`w-full border p-3 rounded text-left ${
            selectedBarber?.id === b.id
              ? "bg-blue-100 border-blue-500"
              : "hover:bg-gray-50"
          }`}
        >
          {b.name}
        </button>
      ))}
    </div>
  );
}
