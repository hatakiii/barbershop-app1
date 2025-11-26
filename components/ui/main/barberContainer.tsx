"use client";

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";

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

export default function BarberContainer() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-6 p-4">
      {/* Календар */}
      <div>
        <h2 className="font-bold text-lg mb-2">Өдөр сонгох</h2>
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          className="rounded-md border"
        />
      </div>

      {/* Хэрвээ өдөр сонгосон бол цагийн list гарна */}
      {selectedDate && (
        <div>
          <h2 className="font-bold text-lg mb-3">Боломжтой цагууд</h2>

          <div className="grid grid-cols-3 gap-2">
            {AVAILABLE_TIMES.map((time) => (
              <Button
                key={time}
                variant={selectedTime === time ? "default" : "outline"}
                onClick={() => setSelectedTime(time)}
                className="text-sm"
              >
                {time}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* сонгосон цаг + өдөр харуулах */}
      {selectedDate && selectedTime && (
        <div className="p-4 rounded-md border mt-4">
          <p className="font-semibold">Таны сонголт:</p>
          <p>
            <span className="font-medium">Өдөр:</span>{" "}
            {selectedDate.toLocaleDateString()}
          </p>
          <p>
            <span className="font-medium">Цаг:</span> {selectedTime}
          </p>
        </div>
      )}
    </div>
  );
}
