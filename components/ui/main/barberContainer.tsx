"use client";

import { useEffect, useState } from "react";
import { BusyTime } from "@/lib/types";

interface BarberContainerProps {
  salonId: string;
  barberId: string;
}

export default function BarberContainer({}: BarberContainerProps) {
  const [salons, setSalons] = useState<any[]>([]);
  const [barbers, setBarbers] = useState<any[]>([]);
  const [selectedSalon, setSelectedSalon] = useState<string | null>(null);
  const [selectedBarber, setSelectedBarber] = useState<string | null>(null);
  const [busyTimes, setBusyTimes] = useState<BusyTime[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [freeTimes, setFreeTimes] = useState<string[]>([]);

  // 1. Салонууд авах
  useEffect(() => {
    fetch("/api/salons")
      .then((res) => res.json())
      .then((data) => setSalons(data));
  }, []);

  // 2. Салон сонгоход Barber-ууд авах
  useEffect(() => {
    if (!selectedSalon) return;
    fetch(`/api/barbers?salonId=${selectedSalon}`)
      .then((res) => res.json())
      .then((data) => setBarbers(data));
  }, [selectedSalon]);

  // 3. Өдөр сонгоход — тухайн Barber-ийн захиалга авах
  useEffect(() => {
    if (!selectedBarber || !selectedDate) return;

    const isoDate = selectedDate.toISOString().split("T")[0];

    fetch(`/api/orders/barber?barberId=${selectedBarber}&date=${isoDate}`)
      .then((res) => res.json())
      .then((data) => {
        setBusyTimes(data.busyTimes);
        setFreeTimes(data.freeTimes);
      });
  }, [selectedBarber, selectedDate]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Barber Calendar</h1>

      {/* All Salons */}
      <h2 className="font-semibold mb-2">Салон сонгох</h2>
      <select
        className="border p-2 rounded mb-4"
        onChange={(e) => setSelectedSalon(e.target.value)}
      >
        <option value="">Сонгоно уу</option>
        {salons.map((salon) => (
          <option key={salon.id} value={salon.id}>
            {salon.name}
          </option>
        ))}
      </select>

      {/* Barbers of the selected salon */}
      {barbers.length > 0 && (
        <>
          <h2 className="font-semibold mb-2 mt-4">Барбер сонгох</h2>
          <select
            className="border p-2 rounded mb-4"
            onChange={(e) => setSelectedBarber(e.target.value)}
          >
            <option value="">Сонгоно уу</option>
            {barbers.map((barber) => (
              <option key={barber.id} value={barber.id}>
                {barber.name}
              </option>
            ))}
          </select>
        </>
      )}

      {/* Calendar */}
      {selectedBarber && (
        <>
          <h2 className="font-semibold mb-2 mt-4">Огноо сонгох</h2>
          <input
            type="date"
            className="border p-2"
            onChange={(e) => setSelectedDate(new Date(e.target.value))}
          />
        </>
      )}

      {/* Busy and empty times */}
      {selectedDate && (
        <div className="mt-6">
          <h3 className="font-semibold mb-2">Захиалгатай цагууд:</h3>{" "}
          <div className="flex gap-2 flex-wrap">
            {" "}
            {busyTimes.map((b) => (
              <div key={b.time} className="px-3 py-1 bg-red-300 rounded">
                <p className="font-medium">{b.time}</p>
                <p className="text-xs">Үйлчилгээ: {b.serviceName}</p>
                <p className="text-xs">Дугаар: {b.phonenumber}</p>
                <p className="text-xs">Нийт: {b.totalprice}₮</p>
              </div>
            ))}{" "}
          </div>
          <h3 className="font-semibold mt-4 mb-2">Сул цагууд:</h3>
          <div className="flex gap-2 flex-wrap">
            {freeTimes.map((t) => (
              <span key={t} className="px-3 py-1 bg-green-300 rounded">
                {t}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
