"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Salon, Service, Barber } from "@/lib/types";
import { DatePickerDemo } from "@/components/ui/main/exampleDatePicker";
import { format } from "date-fns";

const ALL_TIMES = [
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

export default function SalonBookingPage() {
  const { id } = useParams();
  const [salon, setSalon] = useState<Salon | null>(null);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedBarber, setSelectedBarber] = useState<Barber | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isConfirmed, setIsConfirmed] = useState(false);

  const formatted = selectedDate ? format(selectedDate, "yyyy-MM-dd") : null;

  useEffect(() => {
    const fetchSalon = async () => {
      try {
        const res = await fetch(`/api/salons/${id}`);
        if (!res.ok) throw new Error("Salon олдсонгүй");
        const data = await res.json();
        setSalon(data);
      } catch (err) {
        console.error(err);
        setSalon(null);
      }
    };
    fetchSalon();
  }, [id]);

  const handleConfirm = () => setIsConfirmed(true);

  const handlePayment = async () => {
    if (!salon || !selectedService || !selectedBarber || !selectedTime)
      return alert("Мэдээлэл дутуу байна!");

    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        salonId: salon.id,
        serviceId: selectedService.id,
        barberId: selectedBarber.id,
        reservedTime: selectedTime,
        reservedDate: formatted,
        totalPrice: selectedService.price,
        phoneNumber: Number(phoneNumber),
      }),
    });

    const data = await res.json();
    if (data.success) alert("Захиалга амжилттай!");
    else alert("Алдаа гарлаа!");
  };

  if (!salon)
    return <p className="p-6">Салон олдсонгүй эсвэл ачаалж байна...</p>;

  return (
    <div className="p-4 flex gap-6 w-full">
      <div className="flex-1">
        <h1 className="text-2xl font-bold mb-4">{salon.name}</h1>
        {salon.salonImage && (
          <img
            src={salon.salonImage}
            className="w-full h-48 object-cover rounded mb-4"
          />
        )}
        <p className="text-gray-600 mb-8">📍 {salon.salonAddress}</p>

        {/* Services */}
        <h2 className="text-xl font-semibold mb-3">Үйлчилгээ сонгох</h2>
        <div className="space-y-2">
          {salon.services.map((srv) => (
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

        {/* Barbers */}
        {selectedService && salon.barbers && (
          <>
            <h2 className="text-xl font-semibold mt-6 mb-3">Үсчин сонгох</h2>
            <div className="space-y-2">
              {salon.barbers.map((b) => (
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
          </>
        )}
      </div>

      {/* Time & booking */}
      {selectedService && selectedBarber && (
        <div className="flex-1 border-l pl-6">
          <h2 className="text-2xl font-bold mb-4">Цаг сонгох</h2>
          <DatePickerDemo
            dateValue={selectedDate}
            setDateValue={setSelectedDate}
          />
          <input
            type="tel"
            className="border p-3 w-full rounded my-4"
            placeholder="Утасны дугаар"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />

          <div className="grid grid-cols-3 gap-2">
            {ALL_TIMES.map((time) => (
              <Button
                key={time}
                onClick={() => setSelectedTime(time)}
                variant={selectedTime === time ? "default" : "outline"}
              >
                {time}
              </Button>
            ))}
          </div>

          {!isConfirmed && selectedTime && (
            <Button
              onClick={handleConfirm}
              className="w-full mt-6 bg-green-600 text-white"
            >
              Батлах
            </Button>
          )}

          {isConfirmed && (
            <div className="mt-6 border-t pt-6">
              <h3 className="text-xl font-bold mb-4">Захиалгын дэлгэрэнгүй</h3>
              <div className="space-y-2">
                <p>Үйлчилгээ: {selectedService.name}</p>
                <p>Үсчин: {selectedBarber.name}</p>
                <p>Өдөр: {formatted}</p>
                <p>Цаг: {selectedTime}</p>
                <p>Утас: {phoneNumber}</p>
              </div>
              <Button
                onClick={handlePayment}
                className="w-full mt-8 bg-blue-600 text-white"
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
