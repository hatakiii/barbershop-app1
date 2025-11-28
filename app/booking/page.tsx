"use client";

import { Button } from "@/components/ui/button";
import { Service, Barber, Salon } from "@/lib/types";
import { useState, useEffect } from "react";
import { format } from "date-fns";

import { DatePickerDemo } from "@/components/ui/main/exampleDatePicker";

// Жишээ available times
const AVAILABLE_TIMES = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
];

export default function BookingPage() {
  const [salons, setSalons] = useState<Salon[]>([]);
  const [selectedSalon, setSelectedSalon] = useState<Salon | null>(null);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedBarber, setSelectedBarber] = useState<Barber | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const formatted = selectedDate ? format(selectedDate, "yyyy-MM-dd") : null;

  useEffect(() => {
    fetch("/api/salons", { cache: "no-cache" })
      .then((res) => res.json())
      .then((data) => setSalons(data));
  }, []);

  const handleConfirm = () => {
    setIsConfirmed(true);
  };

  const handlePayment = async () => {
    if (!selectedSalon || !selectedService || !selectedBarber || !selectedTime)
      return alert("Мэдээлэл дутуу байна!");

    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        salonId: selectedSalon.id,
        serviceId: selectedService.id,
        barberId: selectedBarber.id,
        reservedTime: selectedTime,
        reservedDate: formatted,
        totalPrice: selectedService.price,
      }),
    });

    const data = await res.json();

    if (data.success) {
      alert("Захиалга амжилттай бүртгэгдлээ!");
    } else {
      alert("Алдаа гарлаа!");
    }
  };

  return (
    <div className="p-4 flex gap-6">
      <div className="flex-1">
        <h1 className="text-2xl font-bold mb-6">Салон Сонгох</h1>
        <div className="space-y-4">
          {salons?.map((sal) => (
            <div
              key={sal.id}
              className="border p-4 rounded hover:shadow-md transition-shadow"
            >
              {sal.salonImage && (
                <img
                  src={sal.salonImage}
                  alt={sal.name}
                  className="w-full h-48 object-cover rounded mb-3"
                />
              )}
              <Button
                onClick={() => setSelectedSalon(sal)}
                variant={selectedSalon?.id === sal.id ? "default" : "outline"}
                className="text-xl font-semibold w-full mb-2"
              >
                {sal.name}
              </Button>
              {sal.salonAddress && (
                <p className="text-sm text-gray-600 mt-2 flex items-center gap-1">
                  <span>📍</span> {sal.salonAddress}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Services хажуу тал */}
      {selectedSalon && (
        <div className="flex-1 border-l pl-6">
          <div className="mb-4">
            <h2 className="text-2xl font-bold mb-6">{selectedSalon.name}</h2>
            {selectedSalon.salonImage && (
              <img
                src={selectedSalon.salonImage}
                alt={selectedSalon.name}
                className="w-full h-40 object-cover rounded mb-3"
              />
            )}
            {selectedSalon.salonAddress && (
              <p className="text-sm text-gray-600 mt-1 flex items-center gap-1">
                <span>📍</span> {selectedSalon.salonAddress}
              </p>
            )}
          </div>

          <h3 className="text-xl mt-4 mb-3 font-medium">Үйлчилгээ сонгох</h3>
          <div className="space-y-2">
            {selectedSalon.services.map((srv) => (
              <button
                key={srv.id}
                onClick={() => setSelectedService(srv)}
                className={`w-full border p-3 rounded text-left transition-all ${
                  selectedService?.id === srv.id
                    ? "bg-blue-100 border-blue-500 ring-2 ring-blue-300"
                    : "hover:bg-gray-50"
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium">{srv.name}</span>
                  <span className="text-green-600 font-semibold">
                    {srv.price}₮
                  </span>
                </div>
                {srv.gender && (
                  <span className="text-sm text-gray-500">({srv.gender})</span>
                )}
              </button>
            ))}
          </div>

          <h3 className="text-xl mt-6 mb-3 font-medium">Үсчин сонгох</h3>
          <div className="space-y-2">
            {selectedSalon.barbers?.map((b) => (
              <button
                key={b.id}
                onClick={() => setSelectedBarber(b)}
                className={`w-full border p-3 rounded text-left transition-all ${
                  selectedBarber?.id === b.id
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
            <p className="font-semibold">
              {selectedService.name} - {selectedService.price}₮
            </p>
            <p className="text-sm text-gray-600 mt-2">Сонгосон үсчин:</p>
            <p className="font-semibold">{selectedBarber.name}</p>
            <img
              src={selectedBarber.avatarUrl}
              alt={selectedBarber.name}
              className="w-40 h-40 object-cover mt-2 rounded"
            />
            <p className="text-sm text-gray-600 mt-2">Утасны дугаар:</p>
            <p className="font-semibold">{selectedBarber.phoneNumber}</p>
          </div>
          // Available times
          <DatePickerDemo
            dateValue={selectedDate}
            setDateValue={setSelectedDate}
          />
          <h3 className="text-lg font-medium mb-3">Цаг сонгох</h3>
          <div className="grid grid-cols-3 gap-2 mb-6">
            {AVAILABLE_TIMES.map((time) => (
              <Button
                key={time}
                onClick={() => setSelectedTime(time)}
                variant={selectedTime === time ? "default" : "outline"}
                className="hover:bg-blue-50"
              >
                {time}
              </Button>
            ))}
          </div>
          {selectedTime && !isConfirmed && (
            <Button
              onClick={handleConfirm}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3"
            >
              Батлах
            </Button>
          )}
          {isConfirmed && selectedTime && (
            <div className="mt-6 border-t pt-6">
              <h3 className="text-xl font-bold mb-4">Захиалгын дэлгэрэнгүй</h3>

              <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Үйлчилгээ:</span>
                    <span className="font-semibold">
                      {selectedService.name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Үсчин:</span>
                    <span className="font-semibold">{selectedBarber.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Цаг:</span>
                    <span className="font-semibold">{selectedTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Өдөр:</span>
                    <span className="font-semibold">
                      {selectedDate && format(selectedDate, "yyyy-MM-dd")}
                    </span>
                  </div>
                  <div className="flex justify-between border-t pt-2 mt-2">
                    <span className="text-gray-600">Төлбөр:</span>
                    <span className="font-bold text-lg text-green-600">
                      {selectedService.price}₮
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg mb-4">
                <h4 className="font-semibold text-yellow-800 mb-2">
                  ⚠️ Анхаар
                </h4>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>
                    • Дансны дугаар: <strong>5555 1234 5678</strong>
                  </li>
                  <li>
                    • Гүйлгээний утга: <strong>Утасны дугаар</strong>
                  </li>
                  <li>
                    • Төлбөр шилжүүлсний дараа төлбөр төлсөн товч дээр дарна уу
                  </li>
                </ul>
              </div>

              <Button
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3"
                onClick={handlePayment}
              >
                Төлбөр төлсөн
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
