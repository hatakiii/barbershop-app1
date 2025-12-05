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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {barbers.map((b: Barber) => (
        <button
          key={b.id}
          onClick={() => setSelectedBarber(b)}
          className={`
        relative flex flex-col items-center p-4 rounded-xl shadow-md transition-transform duration-300
        border ${
          selectedBarber?.id === b.id
            ? "border-blue-500 bg-blue-50"
            : "border-gray-200 hover:scale-105 hover:shadow-lg"
        }
      `}
        >
          <div className="w-32 h-32 mb-3">
            <img
              src={b.avatarUrl}
              alt={b.name}
              className="w-full h-full object-cover rounded-full border-2 border-gray-300"
            />
          </div>
          <h3 className="text-lg font-semibold text-gray-800">{b.name}</h3>
          <p className="text-sm text-gray-500 mt-1">
            Утасны дугаар{" "}
            <span className="font-bold text-black"> {b.phoneNumber} </span>
          </p>
          {selectedBarber?.id === b.id && (
            <span className="absolute top-2 right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
              Сонгогдсон
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
