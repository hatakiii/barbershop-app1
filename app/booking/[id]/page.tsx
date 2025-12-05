"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Salon, Service, Barber } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { format, isWeekend } from "date-fns";
import { ALL_TIMES } from "@/lib/get-data";

import ServiceSelector from "./_components/ServiceSelector";
import BarberSelector from "./_components/BarberSelector";
import TimeSelector from "./_components/TimeSelector";
import ConfirmSection from "./_components/ConfirmSelector";

// Reusable modal component
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

  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedBarber, setSelectedBarber] = useState<Barber | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isConfirmed, setIsConfirmed] = useState(false);

  const [openServiceModal, setOpenServiceModal] = useState(false);
  const [openBarberModal, setOpenBarberModal] = useState(false);
  const [openDateModal, setOpenDateModal] = useState(false);
  const [openTimeModal, setOpenTimeModal] = useState(false);

  const [bookedTimes, setBookedTimes] = useState<string[]>([]);

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

  //   useEffect(() => {
  //     if (formatted) {
  //       // Normally fetch booked times from API
  //       setBookedTimes(["10:00", "13:00", "15:00"]); // Example
  //       setSelectedTime(null);
  //     }
  //   }, [formatted]);

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
    if (data.success) alert("Цаг захиалга амжилттай!");
    else alert("Error!");
  };

  if (!salon) return <p className="p-6">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-50 p-6 max-w-7xl mx-auto flex flex-col lg:flex-row gap-6">
      {/* LEFT PANEL */}
      <div className="flex-1 flex flex-col gap-6">
        {/* Salon info */}
        <div className="bg-white rounded-xl shadow-md p-6 flex flex-col gap-4">
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

        {/* Service selection */}
        <div className="bg-white rounded-xl shadow-md p-6 flex flex-col gap-4">
          <h2 className="text-xl font-semibold mb-2">Үйлчилгээ сонгох</h2>
          <Button onClick={() => setOpenServiceModal(true)} className="w-full">
            {selectedService ? selectedService.name : "Үйлчилгээ сонгох"}
          </Button>
        </div>

        {/* Barber selection */}
        {selectedService && (
          <div className="bg-white rounded-xl shadow-md p-6 flex flex-col gap-4">
            <h2 className="text-xl font-semibold mb-2">Үсчин сонгох</h2>
            <Button onClick={() => setOpenBarberModal(true)} className="w-full">
              {selectedBarber ? selectedBarber.name : "Үсчин сонгох"}
            </Button>
          </div>
        )}

        {/* Date & Time */}
        {selectedService && selectedBarber && (
          <div className="bg-white rounded-xl shadow-md p-6 flex flex-col gap-4">
            <h2 className="text-xl font-semibold mb-2">Өдөр & Цаг сонгох</h2>
            <Button onClick={() => setOpenDateModal(true)} className="w-full">
              {selectedDate ? `Өдөр: ${formatted}` : "Өдөр сонгох"}
            </Button>
            {selectedDate && (
              <Button onClick={() => setOpenTimeModal(true)} className="w-full">
                {selectedTime ? `Цаг: ${selectedTime}` : "Цаг сонгох"}
              </Button>
            )}
            <input
              type="tel"
              placeholder="Утасны дугаар"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="border rounded-lg p-3 w-full mt-4"
            />
            {!isConfirmed && selectedTime && selectedDate && (
              <Button
                onClick={handlePayment}
                className="w-full mt-4 bg-green-600 text-white hover:bg-green-700 transition-colors"
              >
                Цаг авах
              </Button>
            )}
          </div>
        )}
      </div>

      {/* RIGHT PANEL: Summary */}
      <div className="flex-1 bg-white rounded-xl shadow-md p-6 flex flex-col gap-4 sticky top-6 h-fit">
        <h2 className="text-2xl font-bold mb-2">Таны сонголт</h2>
        <div className="flex flex-col gap-2 text-gray-700">
          {selectedService && <p>Үйлчилгээ: {selectedService.name}</p>}
          {selectedBarber && <p>Үсчин: {selectedBarber.name}</p>}
          {selectedDate && <p>Өдөр: {formatted}</p>}
          {selectedTime && <p>Цаг: {selectedTime}</p>}
          {phoneNumber && <p>Утас: {phoneNumber}</p>}
          {isConfirmed && (
            <p className="text-green-600 font-semibold">Баталгаажсан!</p>
          )}
        </div>

        {isConfirmed && selectedService && selectedBarber && selectedTime && (
          <ConfirmSection
            selectedService={selectedService}
            selectedBarber={selectedBarber}
            selectedTime={selectedTime}
            formatted={formatted}
            phoneNumber={phoneNumber}
          />
        )}
      </div>

      {/* MODALS */}
      <Modal open={openServiceModal} onClose={() => setOpenServiceModal(false)}>
        <h2 className="text-xl font-semibold mb-2">Үйлчилгээ сонгох</h2>
        <ServiceSelector
          services={salon.services}
          selectedService={selectedService}
          setSelectedService={(s) => {
            setSelectedService(s);
            setSelectedBarber(null);
            setOpenServiceModal(false);
          }}
        />
      </Modal>

      <Modal open={openBarberModal} onClose={() => setOpenBarberModal(false)}>
        <h2 className="text-xl font-semibold mb-2">Үсчин сонгох</h2>
        <BarberSelector
          barbers={salon.barbers}
          selectedBarber={selectedBarber}
          setSelectedBarber={(b) => {
            setSelectedBarber(b);
            setOpenBarberModal(false);
          }}
        />
      </Modal>

      <Modal open={openDateModal} onClose={() => setOpenDateModal(false)}>
        <h2 className="text-xl font-semibold mb-2">Өдөр сонгох</h2>
        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: 30 }, (_, i) => {
            const date = new Date();
            date.setDate(date.getDate() + i);
            const isDayWeekend = isWeekend(date);
            const dayFormatted = format(date, "yyyy-MM-dd");
            return (
              <button
                key={dayFormatted}
                onClick={() => {
                  setSelectedDate(date);
                  setOpenDateModal(false);
                }}
                className={`p-2 rounded-lg transition ${
                  isDayWeekend
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                {format(date, "d")}
              </button>
            );
          })}
        </div>
      </Modal>

      <Modal open={openTimeModal} onClose={() => setOpenTimeModal(false)}>
        <h2 className="text-xl font-semibold mb-2">Цаг сонгох</h2>
        <TimeSelector
          ALL_TIMES={ALL_TIMES}
          selectedTime={selectedTime}
          setSelectedTime={setSelectedTime}
        />
      </Modal>
    </div>
  );
}
