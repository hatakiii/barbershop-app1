"use client";

import { Button } from "@/components/ui/button";

type TimeSelectorProps = {
  ALL_TIMES: string[];
  selectedTime: string | null;
  setSelectedTime: (time: string) => void;
};

export default function TimeSelector({
  ALL_TIMES,
  selectedTime,
  setSelectedTime,
}: TimeSelectorProps) {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 p-3">
      {ALL_TIMES.map((time) => {
        const isSelected = selectedTime === time;

        return (
          <button
            key={time}
            onClick={() => setSelectedTime(time)} // toggle-г ашиглахгүй
            className={`
          w-full py-3 rounded-xl text-sm sm:text-base font-medium transition-all duration-200
          ${
            isSelected
              ? "bg-blue-600 text-white shadow-lg scale-105"
              : "bg-white text-gray-800 border border-gray-300 hover:bg-blue-50 hover:scale-105"
          }
        `}
          >
            {time}
          </button>
        );
      })}
    </div>
  );
}
