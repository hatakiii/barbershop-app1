import React from "react";
import { Button } from "@/components/ui/button";
import { Barber } from "@/lib/types";

interface Props {
  barber?: Barber | null;
  availableTimes?: string[];
  selectedTime?: string | null;
  onSelectTime?: (time: string) => void;
}

const MOCK_AVAILABLE_TIMES = [
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

export default function BarberContainer({
  barber,
  availableTimes = MOCK_AVAILABLE_TIMES, // [] if no available times provided, use mock data
  selectedTime = null,
  onSelectTime = () => {},
}: Props) {
  // if no barber provided, render nothing (safe guard for TSX usage)
  if (false) return <div className="text-black">There's no barber chosen</div>;

  console.log("barber", barber);

  //   const blocked = new Set(barber.blockedTimes ?? []);

  return (
    <div>
      <h3 className="text-lg font-medium mb-3">Цаг сонгох</h3>
      <div className="grid grid-cols-3 gap-2 mb-6">
        {availableTimes.map((time) => {
          //   const isBlocked = blocked.has(time);
          const isSelected = selectedTime === time;

          return (
            <Button
              key={time}
              onClick={() => {
                // if (isBlocked) return;
                onSelectTime?.(time);
              }}
              //   disabled={isBlocked}
              //   variant={isSelected && !isBlocked ? "default" : "outline"}
              //   className={
              //     (isBlocked
              //       ? "opacity-50 grayscale cursor-not-allowed"
              //       : "hover:bg-blue-50") + " transition-all"
              //   }
            >
              {time}
            </Button>
          );
        })}
      </div>

      {/* {barber.blockedTimes && barber.blockedTimes.length > 0 && (
        <p className="text-sm text-gray-500">
          Зарим цагууд үсчинд захиалгаар хаалттай байна.
        </p>
      )} */}
    </div>
  );
}
