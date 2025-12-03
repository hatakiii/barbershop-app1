"use client";

import { Service } from "@/lib/types";

type ServiceSelectorProps = {
  services: Service[];
  selectedService: Service | null;
  setSelectedService: (service: Service) => void;
};

export default function ServiceSelector({
  services,
  selectedService,
  setSelectedService,
}: ServiceSelectorProps) {
  return (
    <div className="space-y-2">
      {services.map((srv: Service) => (
        <button
          key={srv.id}
          onClick={() => setSelectedService(srv)}
          className={`w-full border p-3 rounded text-left ${
            selectedService?.id === srv.id
              ? "bg-blue-100 border-blue-500"
              : "hover:bg-gray-50"
          }`}
        >
          <div className="flex justify-between">
            <span>{srv.name}</span>
            <span className="text-green-600">{srv.price}₮</span>
          </div>
        </button>
      ))}
    </div>
  );
}
