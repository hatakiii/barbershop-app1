import { useState } from "react";
import { format, isWeekend } from "date-fns";
import { Barber } from "@/lib/types";

interface StepBookingProps {
  selectedBarber: Barber;
  bookedTimes: string[];
  selectedTime: string | null;
  setSelectedTime: (t: string) => void;
  selectedDate: Date | undefined;
  setSelectedDate: (d: Date) => void;
  phoneNumber: string;
  setPhoneNumber: (p: string) => void;
  ALL_TIMES: string[];
}

export default function StepBooking({
  selectedBarber,
  bookedTimes,
  selectedTime,
  setSelectedTime,
  selectedDate,
  setSelectedDate,
  phoneNumber,
  setPhoneNumber,
  ALL_TIMES,
}: StepBookingProps) {
  const times = ALL_TIMES || [];
  const now = new Date();
  if (!selectedDate) selectedDate = now;

  // 2 хуваалттай цаг
  const morningTimes = times.filter((t) => {
    const hour = Number(t.split(":")[0]);
    return hour >= 9 && hour < 15;
  });

  const eveningTimes = times.filter((t) => {
    const hour = Number(t.split(":")[0]);
    return hour >= 15 && hour < 21;
  });

  const [activeTab, setActiveTab] = useState<"morning" | "evening">("morning");

  return (
    <div className="bg-white p-6 rounded-xl shadow-md flex flex-col gap-6">
      {/* Date selector */}
      <div className="flex overflow-x-auto gap-3 py-2 scrollbar-hide">
        {Array.from({ length: 30 }, (_, i) => {
          const date = new Date();
          date.setDate(date.getDate() + i);
          const isToday = date.toDateString() === now.toDateString();
          const weekend = isWeekend(date);
          const isPast = date < now;

          return (
            <button
              key={date.toDateString()}
              onClick={() => setSelectedDate(date)}
              disabled={isPast}
              className={`flex flex-col items-center min-w-[60px] p-3 rounded-xl transition transform hover:scale-105 ${
                selectedDate?.toDateString() === date.toDateString()
                  ? "bg-blue-500 text-white shadow-lg"
                  : weekend
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-gray-100 hover:bg-gray-200"
              } ${isPast ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              <span className="text-xs">{format(date, "EEE")}</span>
              <span className="font-semibold">{format(date, "d")}</span>
              {isToday && (
                <span className="text-[10px] text-blue-700">Today</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Time selector tabs */}
      <div className="flex gap-2 mb-2">
        <button
          className={`flex-1 p-2 rounded-lg font-medium ${
            activeTab === "morning" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("morning")}
        >
          Үдээс өмнө
        </button>
        <button
          className={`flex-1 p-2 rounded-lg font-medium ${
            activeTab === "evening" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("evening")}
        >
          Үдээс хойш
        </button>
      </div>

      {/* Time grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
        {(activeTab === "morning" ? morningTimes : eveningTimes).map((time) => {
          const isBooked = bookedTimes.includes(time);
          const isSelected = selectedTime === time;

          return (
            <button
              key={time}
              onClick={() => !isBooked && setSelectedTime(time)}
              disabled={isBooked}
              className={`p-3 rounded-lg text-center font-medium transition transform hover:scale-105 ${
                isBooked
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : isSelected
                  ? "bg-blue-500 text-white shadow-lg"
                  : "bg-blue-100 hover:bg-blue-200"
              }`}
            >
              {time}
            </button>
          );
        })}
      </div>

      {/* Phone input */}
      <input
        type="tel"
        placeholder="Утасны дугаар"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        className="border rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      />
    </div>
  );
}
