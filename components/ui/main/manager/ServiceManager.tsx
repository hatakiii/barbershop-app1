"use client";
import { useEffect, useState } from "react";

interface Service {
  id: number;
  name: string;
  price: number;
}

export default function ServiceManager({ salonId }: { salonId: number }) {
  const [services, setServices] = useState<Service[]>([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number | "">("");

  const fetchServices = async () => {
    const res = await fetch(`/api/services?salonId=${salonId}`);
    const data = await res.json();
    setServices(data);
  };

  useEffect(() => {
    fetchServices();
  }, [salonId]);

  const addService = async () => {
    if (!name || price === "") return;
    await fetch(`/api/services`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, price: Number(price), salon_id: salonId }),
    });
    setName("");
    setPrice("");
    fetchServices();
  };

  const updateService = async (
    id: number,
    oldName: string,
    oldPrice: number
  ) => {
    const newName = prompt("Шинэ нэр:", oldName);
    if (!newName) return;
    const newPriceStr = prompt("Шинэ үнэ:", oldPrice.toString());
    if (!newPriceStr) return;
    await fetch(`/api/services/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newName, salon_id: salonId }),
    });
    fetchServices();
  };

  const deleteService = async (id: number) => {
    if (!confirm("Устгах уу?")) return;
    await fetch(`/api/services/${id}`, { method: "DELETE" });
    fetchServices();
  };

  return (
    <div className="border p-4 rounded-md mt-4">
      <h3 className="text-lg font-bold mb-2">Үйлчилгээ</h3>
      <ul>
        {services.map((s) => (
          <li key={s.id} className="flex justify-between p-1">
            {s.name} — {s.price}₮
            <div className="space-x-2">
              <button
                onClick={() => updateService(s.id, s.name, s.price)}
                className="text-blue-500"
              >
                Edit
              </button>
              <button
                onClick={() => deleteService(s.id)}
                className="text-red-500"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-2 space-y-2">
        <input
          className="border px-2 py-1 rounded w-full"
          placeholder="Үйлчилгээний нэр"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="border px-2 py-1 rounded w-full"
          type="number"
          placeholder="Үнэ"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
        />
        <button
          className="bg-green-500 text-white px-3 py-1 rounded w-full"
          onClick={addService}
        >
          Нэмэх
        </button>
      </div>
    </div>
  );
}
