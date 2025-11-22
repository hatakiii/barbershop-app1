"use client";

import { Button } from "@/components/ui/button";
import { Category, Service, Barber } from "@/lib/types";
import { useState, useEffect } from "react";

// Жишээ available times
const AVAILABLE_TIMES = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
  "15:00", "15:30", "16:00", "16:30", "17:00", "17:30"
];

export default function BookingPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedBarber, setSelectedBarber] = useState<Barber | null>(null);

  useEffect(() => {
    fetch("/api/categories", { cache: "no-cache" })
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  return (
    <div className="p-4 flex gap-6">
      <div className="flex-1">
        <h1 className="text-3xl font-bold mb-6">Цаг Захиалах</h1>
        <div className="space-y-4">
          {categories?.map((cat) => (
            <div key={cat.id} className="border p-4 rounded">
              <Button
                onClick={() => setSelectedCategory(cat)}
                variant={selectedCategory?.id === cat.id ? "default" : "outline"}
                className="text-xl font-semibold w-full"
              >
                {cat.name}
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Services хажуу тал */}
      {selectedCategory && (
        <div className="flex-1 border-l pl-6">
          <h2 className="text-2xl font-bold mb-4">{selectedCategory.name}</h2>

          <h3 className="text-xl mt-4 mb-3 font-medium">Үйлчилгээнүүд</h3>
          <div className="space-y-2">
            {selectedCategory.services.map((srv) => (
              <button
                key={srv.id}
                onClick={() => setSelectedService(srv)}
                className={`w-full border p-3 rounded text-left transition-all ${selectedService?.id === srv.id
                  ? "bg-blue-100 border-blue-500 ring-2 ring-blue-300"
                  : "hover:bg-gray-50"
                  }`}
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium">{srv.name}</span>
                  <span className="text-green-600 font-semibold">{srv.price}₮</span>
                </div>
                {srv.gender && (
                  <span className="text-sm text-gray-500">({srv.gender})</span>
                )}
              </button>
            ))}
          </div>

          <h3 className="text-xl mt-6 mb-3 font-medium">Үсчид</h3>
          <div className="space-y-2">
            {selectedCategory.barbers?.map((b) => (
              <button
                key={b.id}
                onClick={() => setSelectedBarber(b)}
                className={`w-full border p-3 rounded text-left transition-all ${selectedBarber?.id === b.id
                  ? "bg-blue-100 border-blue-500 ring-2 ring-blue-300"
                  : "hover:bg-gray-50"
                  }`}
              >
                <span className="font-medium">{b.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Available Times */}
      {selectedService && selectedBarber && (
        <div className="flex-1 border-l pl-6">
          <h2 className="text-2xl font-bold mb-4">Боломжит цагууд</h2>

          <div className="mb-4 p-4 bg-gray-50 rounded">
            <p className="text-sm text-gray-600">Сонгосон үйлчилгээ:</p>
            <p className="font-semibold">{selectedService.name} - {selectedService.price}₮</p>
            <p className="text-sm text-gray-600 mt-2">Сонгосон үсчин:</p>
            <p className="font-semibold">{selectedBarber.name}</p>
          </div>

          <h3 className="text-lg font-medium mb-3">Цаг сонгох</h3>
          <div className="grid grid-cols-3 gap-2">
            {AVAILABLE_TIMES.map((time) => (
              <Button
                key={time}
                variant="outline"
                className="hover:bg-blue-50"
              >
                {time}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
