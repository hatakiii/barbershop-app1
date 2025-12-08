"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Salon, Service, Barber } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { format, isWeekend } from "date-fns";
import { ALL_TIMES } from "@/lib/get-data";

import StepService from "./_components/StepService";
import StepBarber from "./_components/StepBarber";
import StepBooking from "./_components/StepBooking";
import toast from "react-hot-toast";

// ------------------- Step Indicator -------------------
function StepIndicator({ step }: { step: number }) {
  const labels = ["Service", "Barber", "Booking"];
  return (
    <div className="flex items-center gap-4 mb-6">
      {labels.map((label, index) => (
        <div key={index} className="flex-1 flex flex-col items-center">
          <div
            className={`w-8 h-8 flex items-center justify-center rounded-full text-white transition-all ${
              step > index ? "bg-blue-400" : "bg-gray-400"
            }`}
          >
            {index + 1}
          </div>
          <span className="text-sm mt-1">{label}</span>
        </div>
      ))}
    </div>
  );
}

// ------------------- Main Booking Page -------------------
export default function SalonBookingPage() {
  const { id } = useParams();
  const [salon, setSalon] = useState<Salon | null>(null);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedBarber, setSelectedBarber] = useState<Barber | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [step, setStep] = useState(1);
  const [bookedTimes, setBookedTimes] = useState<string[]>([]);

  const formatted = selectedDate ? format(selectedDate, "yyyy-MM-dd") : null;

  // Fetch salon info
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

  // Fetch booked times when date/barber changes
  useEffect(() => {
    if (!selectedDate || !selectedBarber || !formatted) return;
    const fetchTimes = async () => {
      try {
        const res = await fetch(
          `/api/booked-times?barberId=${selectedBarber.id}&date=${formatted}`
        );
        const data = await res.json();
        setBookedTimes(data.bookedTimes || []);
        setSelectedTime(null);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTimes();
  }, [selectedDate, selectedBarber, formatted]);

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const handlePayment = async () => {
    if (!salon || !selectedService || !selectedBarber || !selectedTime)
      return toast.error("Мэдээлэл дутуу байна!");

    if (!/^\d{8,10}$/.test(phoneNumber))
      return toast.error("Утасны дугаар буруу байна!");

    try {
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

      if (data.success) {
        toast.success("Цаг амжилттай бүртгэгдсэн!");
        setBookedTimes((prev) => [...prev, selectedTime]);
        setSelectedTime(null);
        setPhoneNumber(""); // Хэрэглэгчийн утасны field-ийг цэвэрлэх
      } else {
        toast.error(data.message || "Алдаа гарлаа!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error, try again later.");
    }
  };

  if (!salon) return <p className="p-6">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-50 p-6 max-w-3xl mx-auto flex flex-col gap-6">
      {/* Salon Info */}
      <div className="bg-white rounded-xl shadow-md p-6 flex flex-col gap-4">
        <h1 className="text-2xl font-bold">{salon.name}</h1>
        {salon.salonImage && (
          <img
            src={salon.salonImage}
            alt={salon.name}
            className="w-full h-48 object-cover rounded-lg shadow-sm"
          />
        )}
        <p className="text-gray-500">📍 {salon.salonAddress}</p>
      </div>

      {/* Step Indicator */}
      <StepIndicator step={step} />

      {/* Booking Steps */}
      <div className="bg-white rounded-xl shadow-md p-6 flex flex-col gap-4">
        {step === 1 && (
          <StepService
            services={salon.services}
            selectedService={selectedService}
            setSelectedService={setSelectedService}
            onNext={nextStep}
          />
        )}

        {step === 2 && selectedService && (
          <StepBarber
            barbers={salon.barbers}
            selectedBarber={selectedBarber}
            setSelectedBarber={setSelectedBarber}
            onNext={nextStep}
          />
        )}

        {step === 3 && selectedService && selectedBarber && (
          <StepBooking
            selectedBarber={selectedBarber}
            bookedTimes={bookedTimes}
            selectedTime={selectedTime}
            setSelectedTime={setSelectedTime}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
            ALL_TIMES={ALL_TIMES} // <--- undefined алдааг зассан
          />
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-4">
          {step > 1 && (
            <Button
              onClick={prevStep}
              variant="outline"
              className="transition hover:scale-105"
            >
              Back
            </Button>
          )}
          {step < 3 && (
            <Button
              onClick={nextStep}
              disabled={step === 1 && !selectedService}
              className="transition hover:scale-105"
            >
              Next
            </Button>
          )}
          {step === 3 && selectedTime && selectedDate && (
            <Button
              onClick={handlePayment}
              className="bg-blue-500 hover:bg-blue-600 text-white transition hover:scale-105"
              disabled={!/^\d{8,10}$/.test(phoneNumber)}
            >
              Цаг авах
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
