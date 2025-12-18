"use client";

import { useEffect, useState } from "react";
import { BusyTime } from "@/lib/types";

export default function BarberContainer() {
  const [activeTab, setActiveTab] = useState<"calendar" | "history">(
    "calendar"
  );
  const [salons, setSalons] = useState<any[]>([]);
  const [barbers, setBarbers] = useState<any[]>([]);
  const [selectedSalon, setSelectedSalon] = useState<string | null>(null);
  const [selectedBarber, setSelectedBarber] = useState<string | null>(null);

  const [busyTimes, setBusyTimes] = useState<BusyTime[]>([]);
  const [freeTimes, setFreeTimes] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [busyDates, setBusyDates] = useState<string[]>([]);

  const [allOrders, setAllOrders] = useState<any[]>([]);
  const [barberSearch, setBarberSearch] = useState("");
  const [searchedBarberName, setSearchedBarberName] = useState<string | null>(
    null
  );
  const [searchLoading, setSearchLoading] = useState(false);

  /* ===================== helpers ===================== */

  const getMonthData = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const days: Date[] = [];
    for (let d = 1; d <= lastDay.getDate(); d++) {
      days.push(new Date(year, month, d));
    }

    const startOffset = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1;

    return { days, startOffset };
  };

  /* ===================== effects ===================== */

  useEffect(() => {
    fetch("/api/salons")
      .then((r) => r.json())
      .then(setSalons);
  }, []);

  useEffect(() => {
    if (!selectedSalon) return;
    fetch(`/api/barbers?salonId=${selectedSalon}`)
      .then((r) => r.json())
      .then(setBarbers);
  }, [selectedSalon]);

  // тухайн өдөр
  useEffect(() => {
    if (!selectedBarber || !selectedDate) return;

    const iso = selectedDate.toISOString().split("T")[0];

    fetch(`/api/orders/barber?barberId=${selectedBarber}&date=${iso}`)
      .then((r) => r.json())
      .then((d) => {
        setBusyTimes(d.busyTimes);
        setFreeTimes(d.freeTimes);
      });
  }, [selectedBarber, selectedDate]);

  // тухайн сарын захиалгатай өдрүүд
  useEffect(() => {
    if (!selectedBarber) return;

    const y = currentMonth.getFullYear();
    const m = currentMonth.getMonth() + 1;

    fetch(
      `/api/orders/barber/month?barberId=${selectedBarber}&year=${y}&month=${m}`
    )
      .then((r) => r.json())
      .then((d) => setBusyDates(d.busyDates || []));
  }, [selectedBarber, currentMonth]);

  /* ===================== render ===================== */

  const { days, startOffset } = getMonthData(currentMonth);

  return (
    <div>
      <div className="mb-4">
        <div className="inline-flex rounded-md bg-muted p-1">
          {["calendar", "history"].map((t) => (
            <button
              key={t}
              onClick={() => setActiveTab(t as any)}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                activeTab === t
                  ? "bg-white shadow"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {t === "calendar" ? "Calendar" : "History"}
            </button>
          ))}
        </div>
      </div>

      {activeTab === "calendar" && (
        <>
          <h1 className="text-2xl font-bold mb-4">Үсчиний хувийн календар</h1>

          <select
            className="border p-2 rounded mb-4"
            onChange={(e) => setSelectedSalon(e.target.value)}
          >
            <option value="">Салон сонгох</option>
            {salons.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>

          {barbers.length > 0 && (
            <select
              className="border p-2 rounded mb-4 block"
              onChange={(e) => setSelectedBarber(e.target.value)}
            >
              <option value="">Үсчин сонгох</option>
              {barbers.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name}
                </option>
              ))}
            </select>
          )}

          {selectedBarber && (
            <div className="mt-4">
              <div className="flex justify-between items-center mb-3">
                <button
                  onClick={() =>
                    setCurrentMonth(
                      new Date(
                        currentMonth.getFullYear(),
                        currentMonth.getMonth() - 1,
                        1
                      )
                    )
                  }
                >
                  ←
                </button>

                <h2 className="font-semibold">
                  {currentMonth.toLocaleString("mn-MN", {
                    year: "numeric",
                    month: "long",
                  })}
                </h2>

                <button
                  onClick={() =>
                    setCurrentMonth(
                      new Date(
                        currentMonth.getFullYear(),
                        currentMonth.getMonth() + 1,
                        1
                      )
                    )
                  }
                >
                  →
                </button>
              </div>

              <div className="grid grid-cols-7 gap-2 text-center text-sm">
                {["Да", "Мя", "Лх", "Пү", "Ба", "Бя", "Ня"].map((d) => (
                  <div key={d} className="text-gray-500 font-medium">
                    {d}
                  </div>
                ))}

                {Array.from({ length: startOffset }).map((_, i) => (
                  <div key={i} />
                ))}

                {days.map((day) => {
                  const iso = day.toISOString().split("T")[0];
                  const isBusy = busyDates.includes(iso);
                  const isSelected =
                    selectedDate?.toDateString() === day.toDateString();

                  return (
                    <button
                      key={iso}
                      onClick={() => setSelectedDate(day)}
                      className={`relative p-2 text-sm rounded transition
    ${
      isSelected
        ? "bg-blue-500 text-white"
        : isBusy
        ? "bg-red-100 border border-red-400 text-red-700 hover:bg-red-200"
        : "border hover:bg-gray-100"
    }`}
                    >
                      {day.getDate()}
                      {isBusy && (
                        <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-red-500 rounded-full" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {selectedDate && (
            <div className="mt-6">
              <h3 className="font-semibold mb-2">Захиалгатай цагууд</h3>
              <div className="flex gap-2 flex-wrap">
                {busyTimes.map((b) => (
                  <div key={b.time} className="bg-red-300 px-3 py-1 rounded">
                    <p>{b.time}</p>
                    <p className="text-xs">{b.serviceName}</p>
                    <p className="text-xs">{b.phonenumber}</p>
                    <p className="text-xs">{b.totalprice}₮</p>
                  </div>
                ))}
              </div>

              <h3 className="font-semibold mt-4 mb-2">Сул цагууд</h3>
              <div className="flex gap-2 flex-wrap">
                {freeTimes.map((t) => (
                  <span key={t} className="bg-green-300 px-3 py-1 rounded">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {activeTab === "history" && <div>{/* history чинь 100% хэвээр */}</div>}
    </div>
  );
}
