"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Salon, Service, Barber } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { format, isWeekend } from "date-fns";

import ServiceSelector from "./_components/ServiceSelector";
import BarberSelector from "./_components/BarberSelector";
import TimeSelector from "./_components/TimeSelector";

// Reusable modal
function Modal({
  children,
  open,
  onClose,
}: {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}

export default function SalonBookingPage() {
  const { id } = useParams();
  const [salon, setSalon] = useState<Salon | null>(null);

  // Booking states
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedBarber, setSelectedBarber] = useState<Barber | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [phoneNumber, setPhoneNumber] = useState("");

  // Wizard step
  const [step, setStep] = useState(1);

  // Modal states
  const [openModal, setOpenModal] = useState(false);

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

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

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
    if (data.success) alert("Booking confirmed!");
    else alert("Error!");
  };

  if (!salon) return <p className="p-6">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-50 p-6 max-w-4xl mx-auto flex flex-col gap-6">
      <div className="bg-white rounded-xl shadow-md p-6 flex flex-col gap-6">
        <h1 className="text-2xl font-bold">{salon.name}</h1>
        {salon.salonImage && (
          <img
            src={salon.salonImage}
            alt={salon.name}
            className="w-full h-48 object-cover rounded-lg"
          />
        )}
        <p className="text-gray-500">📍 {salon.salonAddress}</p>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 flex flex-col gap-4">
        <h2 className="text-xl font-semibold mb-2">Booking Step {step} / 3</h2>

        {step === 1 && (
          <ServiceSelector
            services={salon.services}
            selectedService={selectedService}
            setSelectedService={(s) => {
              setSelectedService(s);
              setSelectedBarber(null);
              nextStep();
            }}
          />
        )}

        {step === 2 && selectedService && (
          <BarberSelector
            barbers={salon.barbers}
            selectedBarber={selectedBarber}
            setSelectedBarber={(b) => {
              setSelectedBarber(b);
              nextStep();
            }}
          />
        )}

        {step === 3 && selectedService && selectedBarber && (
          <>
            <div className="grid grid-cols-7 gap-2 mb-4">
              {Array.from({ length: 30 }, (_, i) => {
                const date = new Date();
                date.setDate(date.getDate() + i);
                const isDayWeekend = isWeekend(date);
                const dayFormatted = format(date, "yyyy-MM-dd");
                return (
                  <button
                    key={dayFormatted}
                    onClick={() => setSelectedDate(date)}
                    className={`p-2 rounded-lg transition ${
                      isDayWeekend
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-gray-100 hover:bg-gray-200"
                    } ${
                      selectedDate?.toDateString() === date.toDateString()
                        ? "ring-2 ring-green-500"
                        : ""
                    }`}
                  >
                    {format(date, "d")}
                  </button>
                );
              })}
            </div>

            <TimeSelector
              ALL_TIMES={[
                "10:00",
                "11:00",
                "12:00",
                "13:00",
                "14:00",
                "15:00",
                "16:00",
              ]}
              selectedTime={selectedTime}
              setSelectedTime={setSelectedTime}
            />

            <input
              type="tel"
              placeholder="Утасны дугаар"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="border rounded-lg p-3 w-full mt-4"
            />
          </>
        )}

        <div className="flex justify-between mt-4">
          {step > 1 && (
            <Button onClick={prevStep} variant="outline">
              Back
            </Button>
          )}
          {step < 3 && (
            <Button
              onClick={nextStep}
              disabled={step === 1 && !selectedService}
            >
              Next
            </Button>
          )}
          {step === 3 && selectedTime && selectedDate && (
            <Button
              onClick={handlePayment}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              Цаг авах
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
