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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
      {services.map((srv: Service) => (
        <button
          key={srv.id}
          onClick={() => setSelectedService(srv)}
          className={`
        relative flex flex-col justify-center items-center p-6 rounded-2xl shadow-lg transition-transform duration-300 border
        w-full ]
        ${
          selectedService?.id === srv.id
            ? "border-blue-500 bg-blue-50"
            : "border-gray-200 hover:scale-105 hover:shadow-2xl hover:bg-gray-50"
        }
      `}
        >
          <span className="text-gray-900 font-bold text-xl text-center">
            {srv.name}
          </span>

          <span className="text-blue-400 font-medium mt-1">
            {srv.gender === "male"
              ? "Эрэгтэй"
              : srv.gender === "female"
              ? "Эмэгтэй"
              : "Үл мэдэгдэх"}
          </span>

          <span className="text-green-600 font-semibold text-lg mt-2">
            {srv.price}₮
          </span>
        </button>
      ))}
    </div>
  );
}
