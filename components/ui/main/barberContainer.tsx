"use client";

import { useEffect, useState } from "react";
import { BusyTime } from "@/lib/types";

interface BarberContainerProps {
  salonId: string;
  barberId: string;
}

export default function BarberContainer({}: BarberContainerProps) {
  const [activeTab, setActiveTab] = useState<"calendar" | "history">(
    "calendar"
  );
  const [salons, setSalons] = useState<any[]>([]);
  const [barbers, setBarbers] = useState<any[]>([]);
  const [selectedSalon, setSelectedSalon] = useState<string | null>(null);
  const [selectedBarber, setSelectedBarber] = useState<string | null>(null);
  const [busyTimes, setBusyTimes] = useState<BusyTime[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [freeTimes, setFreeTimes] = useState<string[]>([]);
  const [allOrders, setAllOrders] = useState<any[]>([]);
  const [barberSearch, setBarberSearch] = useState<string>("");
  const [searchedBarberName, setSearchedBarberName] = useState<string | null>(
    null
  );
  const [searchLoading, setSearchLoading] = useState<boolean>(false);
  const selectedBarberObj =
    barbers.find((b) => String(b.id) === selectedBarber) || null;

  useEffect(() => {
    if (!selectedBarber) return;
    setSearchLoading(true);
    fetch(`/api/orders/barber/all?barberId=${selectedBarber}`)
      .then((res) => res.json())
      .then((data) => {
        setAllOrders(data.orders);
        setSearchedBarberName(data.orders?.[0]?.barbers?.name || null);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => setSearchLoading(false));
  }, [selectedBarber]);

  const handleBarberSearch = () => {
    const q = barberSearch.trim();
    if (!q) {
      alert("Үсчний нэр эсвэл id оруулна уу");
      return;
    }
    // If user enters numeric id, use it directly — keep existing flow
    if (/^\d+$/.test(q)) {
      setSearchLoading(true);
      setSelectedBarber(q);
      return;
    }

    // Otherwise, call the orders/barber/all endpoint which supports name queries
    setSearchLoading(true);
    fetch(`/api/orders/barber/all?barberId=${encodeURIComponent(q)}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.success) {
          alert(data.error || "Үсчин олдсонгүй");
          setAllOrders([]);
          setSearchedBarberName(null);
          return;
        }
        setAllOrders(data.orders || []);
        setSearchedBarberName(data.orders?.[0]?.barbers?.name || q);
      })
      .catch((err) => {
        console.error(err);
        alert("Серверийн алдаа");
      })
      .finally(() => setSearchLoading(false));
  };

  // 1. Салонууд авах
  useEffect(() => {
    fetch("/api/salons")
      .then((res) => res.json())
      .then((data) => setSalons(data));
  }, []);

  // 2. Салон сонгоход Barber-ууд авах
  useEffect(() => {
    if (!selectedSalon) return;
    fetch(`/api/barbers?salonId=${selectedSalon}`)
      .then((res) => res.json())
      .then((data) => setBarbers(data));
  }, [selectedSalon]);

  // 3. Өдөр сонгоход — тухайн Barber-ийн захиалга авах
  useEffect(() => {
    if (!selectedBarber || !selectedDate) return;

    const isoDate = selectedDate.toISOString().split("T")[0];

    fetch(`/api/orders/barber?barberId=${selectedBarber}&date=${isoDate}`)
      .then((res) => res.json())
      .then((data) => {
        setBusyTimes(data.busyTimes);
        setFreeTimes(data.freeTimes);
      });
  }, [selectedBarber, selectedDate]);

  return (
    <div className="text-black">
      <div className="mb-4">
        <div className="inline-flex rounded-md bg-muted p-1">
          <button
            onClick={() => setActiveTab("calendar")}
            className={`px-4 py-2 rounded-md transition-colors font-medium text-sm ${
              activeTab === "calendar"
                ? "bg-white shadow"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Calendar
          </button>
          <button
            onClick={() => setActiveTab("history")}
            className={`ml-1 px-4 py-2 rounded-md transition-colors font-medium text-sm ${
              activeTab === "history"
                ? "bg-white shadow"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            History
          </button>
        </div>
      </div>

      {/* Tab panes */}
      <div>
        {activeTab === "calendar" && (
          <div>
            <h1 className="text-2xl font-bold mb-4 ">Barber Calendar</h1>

            {/* All Salons */}
            <h2 className="font-semibold mb-2 ">Салон сонгох</h2>
            <select
              className="border p-2 rounded mb-4"
              onChange={(e) => setSelectedSalon(e.target.value)}
            >
              <option value="">Сонгоно уу</option>
              {salons.map((salon) => (
                <option key={salon.id} value={salon.id}>
                  {salon.name}
                </option>
              ))}
            </select>

            {/* Barbers of the selected salon */}
            {barbers.length > 0 && (
              <>
                <h2 className="font-semibold mb-2 mt-4">Барбер сонгох</h2>
                <select
                  className="border p-2 rounded mb-4"
                  onChange={(e) => setSelectedBarber(e.target.value)}
                >
                  <option value="">Сонгоно уу</option>
                  {barbers.map((barber) => (
                    <option key={barber.id} value={barber.id}>
                      {barber.name}
                    </option>
                  ))}
                </select>
              </>
            )}

            {/* Calendar */}
            {selectedBarber && (
              <>
                <h2 className="font-semibold mb-2 mt-4">Огноо сонгох</h2>
                <input
                  type="date"
                  className="border p-2"
                  onChange={(e) => setSelectedDate(new Date(e.target.value))}
                />
              </>
            )}

            {/* Busy and empty times */}
            {selectedDate && (
              <div className="mt-6">
                <h3 className="font-semibold mb-2">Захиалгатай цагууд:</h3>{" "}
                <div className="flex gap-2 flex-wrap">
                  {" "}
                  {busyTimes.map((b) => (
                    <div key={b.time} className="px-3 py-1 bg-red-300 rounded">
                      <p className="font-medium">{b.time}</p>
                      <p className="text-xs">Үйлчилгээ: {b.serviceName}</p>
                      <p className="text-xs">Дугаар: {b.phonenumber}</p>
                      <p className="text-xs">Нийт: {b.totalprice}₮</p>
                    </div>
                  ))}{" "}
                </div>
                <h3 className="font-semibold mt-4 mb-2">Сул цагууд:</h3>
                <div className="flex gap-2 flex-wrap">
                  {freeTimes.map((t) => (
                    <span key={t} className="px-3 py-1 bg-green-300 rounded">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === "history" && (
          <div>
            <h3 className="font-semibold mt-6">Захиалгын түүх</h3>
            <div className="flex gap-2 items-center mt-2">
              <input
                type="text"
                value={barberSearch}
                onChange={(e) => setBarberSearch(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleBarberSearch()}
                placeholder="Үсчний нэр эсвэл ID-ыг оруулна уу"
                className="border p-2 rounded flex-1"
              />
              <button
                onClick={handleBarberSearch}
                className="bg-blue-500 text-white px-3 py-2 rounded flex items-center"
                disabled={searchLoading}
              >
                {searchLoading ? (
                  <svg
                    className="animate-spin h-4 w-4 mr-2 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                  </svg>
                ) : null}
                {searchLoading ? "Хайж байна..." : "Хайх"}
              </button>
            </div>

            <div className="border rounded p-2 mt-2">
              {allOrders.length === 0 ? (
                <p className="text-gray-500 text-sm">
                  Үсчин{" "}
                  {searchedBarberName ||
                    selectedBarberObj?.name ||
                    "(сонгогдоогүй)"}{" "}
                  таньд одоогоор захиалга байхгүй
                </p>
              ) : (
                allOrders.map((order) => (
                  <div
                    key={order.id}
                    className="border-b last:border-none py-2 text-sm"
                  >
                    <p>
                      {order.services.name} —{" "}
                      {new Date(order.reserveddatetime).toLocaleString()}
                    </p>
                    <p>Утас: {order.phonenumber}</p>
                    <p>Нийт: {order.totalprice}₮</p>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
