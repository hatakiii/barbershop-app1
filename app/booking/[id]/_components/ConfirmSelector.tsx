"use client";

import { Service, Barber } from "@/lib/types";

interface ConfirmSectionProps {
  selectedService: Service;
  selectedBarber: Barber;
  selectedTime: string | null;
  formatted: string | null;
  phoneNumber: string;
}

export default function ConfirmSection({
  selectedService,
  selectedBarber,
  selectedTime,
  formatted,
  phoneNumber,
}: ConfirmSectionProps) {
  return (
    <div className="mt-6 border-t pt-6">
      <h3 className="text-xl font-bold mb-4">Захиалгын дэлгэрэнгүй</h3>

      <div className="space-y-2">
        <p>Үйлчилгээ: {selectedService.name}</p>
        <p>Үсчин: {selectedBarber.name}</p>
        <p>Өдөр: {formatted}</p>
        <p>Цаг: {selectedTime}</p>
        <p>Утас: {phoneNumber}</p>
      </div>
    </div>
  );
}
