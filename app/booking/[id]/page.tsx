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
import { ArrowLeft, MapPin } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

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
      const localDateTime = `${formatted}T${selectedTime}:00`;
      const reserveddatetime = new Date(localDateTime + "+08:00").toISOString();
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          salonId: salon.id,
          serviceId: selectedService.id,
          barberId: selectedBarber.id,
          reserveddatetime,
          totalPrice: selectedService.price,
          phoneNumber: Number(phoneNumber),
        }),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Цаг амжилттай бүртгэгдсэн!");
        setBookedTimes((prev) => [...prev, selectedTime]);
        setSelectedTime(null);
        setPhoneNumber("");

        setTimeout(() => {
          router.push(`/salon/${salon.id}`);
        }, 1000);
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
    <div className="min-h-screen bg-muted/40 py-10 pt-20">
      <div className="absolute top-25 left-12 z-50">
        <Link
          href={`/salon/${id}`}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 backdrop-blur shadow hover:bg-white transition"
        >
          <ArrowLeft className="h-6 w-6 text-primary" />
        </Link>
      </div>

      <div className="m-auto grid max-w-6xl grid-cols-1 lg:grid-cols-2 gap-25 items-start">
        {/* LEFT – SALON IMAGE CARD */}
        <div className="relative">
          <div className="relative overflow-hidden rounded-3xl p-1.5">
            {salon.salonImage && (
              <div className="relative h-[520px] w-full overflow-hidden rounded-2xl">
                <img
                  src={salon.salonImage}
                  alt={salon.name}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-black/25" />

                {/* Overlay */}
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <h1 className="text-3xl font-serif tracking-wide">
                    {salon.name}
                  </h1>
                  <div className="mt-2 flex items-center gap-2 text-sm opacity-90">
                    <MapPin className="w-4 h-4" />
                    {salon.salonAddress}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT – STEPS */}
        <div className="flex justify-center">
          <div className="w-full max-w-xl space-y-6">
            {/* Step Indicator */}
            <div className="flex items-center gap-4">
              {["Service", "Barber", "Booking"].map((label, i) => {
                const active = step === i + 1;
                return (
                  <div key={label} className="flex-1 text-center">
                    <div
                      className={`mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-full text-sm font-medium transition
            ${
              active
                ? "bg-neutral-800 text-white"
                : "bg-neutral-200 text-neutral-500"
            }
          `}
                    >
                      {i + 1}
                    </div>
                    <span
                      className={`text-xs ${
                        active
                          ? "text-foreground font-medium"
                          : "text-muted-foreground"
                      }`}
                    >
                      {label}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Step Content */}
            <div className="rounded-3xl border bg-white shadow-lg p-6 min-h-[420px]">
              {step === 1 && (
                <StepService
                  services={salon.salon_services.map((ss) => ({
                    ...ss.services,
                    price: ss.price,
                  }))}
                  selectedService={selectedService}
                  setSelectedService={setSelectedService}
                  onNext={() => setStep(2)}
                />
              )}

              {step === 2 && selectedService && (
                <StepBarber
                  barbers={salon.barbers}
                  selectedBarber={selectedBarber}
                  setSelectedBarber={setSelectedBarber}
                  onNext={() => setStep(3)}
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
                  ALL_TIMES={ALL_TIMES}
                />
              )}

              {/* NAV */}
              <div className="mt-8 flex justify-between">
                {step > 1 ? (
                  <Button variant="outline" onClick={() => setStep(step - 1)}>
                    Буцах
                  </Button>
                ) : (
                  <div />
                )}

                {step === 3 && selectedTime && selectedDate && (
                  <Button
                    onClick={handlePayment}
                    className="bg-neutral-900 hover:bg-neutral-800 text-white"
                  >
                    Цаг захиалах
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
