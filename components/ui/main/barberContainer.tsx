import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Barber } from "@/lib/types";

interface Props {
  barber?: Barber | null;
  availableTimes?: string[];
  selectedTime?: string | null;
  onSelectTime?: (time: string) => void;
}

export default function BarberContainer({
  barber,
  availableTimes = [],
  selectedTime,
  onSelectTime = () => {},
}: Props) {
  const [orders, setOrders] = useState<{ time: string }[]>([]);

  useEffect(() => {
    if (!barber?.id) return;
    fetch(`/api/orders?barberId=${barber.id}`)
      .then((res) => res.json())
      .then((data) => setOrders(data.orders || []));
  }, [barber?.id]);

  const blockedTimes = new Set(orders.map((o) => o.time));

  return (
    <div>
      <h3 className="text-lg font-medium mb-3">Цаг сонгох</h3>

      <div className="grid grid-cols-3 gap-2 mb-6">
        {availableTimes.map((time) => {
          const isBlocked = blockedTimes.has(time);
          const isSelected = selectedTime === time;

          return (
            <Button
              key={time}
              onClick={() => !isBlocked && onSelectTime?.(time)}
              disabled={isBlocked}
              variant={isSelected && !isBlocked ? "default" : "outline"}
              className={
                isBlocked
                  ? "opacity-50 grayscale cursor-not-allowed"
                  : "hover:bg-blue-50"
              }
            >
              {time}
            </Button>
          );
        })}
      </div>

      {orders.length > 0 && (
        <div className="mt-4 bg-gray-100 p-3 rounded text-sm">
          <h4 className="font-semibold mb-2">Өнөөдрийн захиалгууд:</h4>
          <ul className="list-disc pl-4">
            {orders.map((o, i) => (
              <li key={i}>{o.time}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
