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
  );
}
