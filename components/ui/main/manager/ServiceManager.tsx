"use client";

import { useEffect, useState } from "react";
import { Button } from "../../button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../dialog";
import { Label } from "../../label";
import { Input } from "../../input";

interface Service {
  id: number;
  name: string;
  price?: number;
}

interface SalonService {
  id: number;
  price: number;
  services: Service;
}

export default function ServiceManager({
  salonId,
}: {
  salonId: number | string;
}) {
  const [services, setServices] = useState<SalonService[]>([]);
  const [allServices, setAllServices] = useState<Service[]>([]);
  const [open, setOpen] = useState(false);
  const [editingService, setEditingService] = useState<SalonService | null>(
    null
  );
  const [serviceId, setServiceId] = useState<number | "">("");
  const [price, setPrice] = useState<number | "">("");

  // Салонд нэмэгдсэн service-уудыг авах
  const fetchServices = async () => {
    try {
      const res = await fetch(`/api/salon_services?salonId=${salonId}`);
      const data = await res.json();
      setServices(data);
    } catch (err) {
      console.error("Fetch services error:", err);
    }
  };

  // Бүх боломжит service-уудыг авах
  const fetchAllServices = async () => {
    try {
      const res = await fetch(`/api/services/all`);
      const data = await res.json();
      setAllServices(data);
    } catch (err) {
      console.error("Fetch all services error:", err);
    }
  };

  useEffect(() => {
    fetchServices();
    fetchAllServices();
  }, [salonId]);

  // Dropdown-д аль хэдийн нэмэгдсэн service-г гаргахгүй
  const availableServices = allServices.filter(
    (s) => !services.some((added) => added.services.id === s.id)
  );

  // Service нэмэх / засах
  const saveService = async () => {
    if (!serviceId || price === "") {
      alert("Service болон үнийг оруулна уу");
      return;
    }

    try {
      if (editingService) {
        // Update
        const res = await fetch(`/api/salon_services/${editingService.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ price: Number(price) }),
        });
        if (!res.ok) throw new Error("Алдаа гарлаа");
      } else {
        // New
        const res = await fetch(`/api/salon_services`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ salonId, serviceId, price: Number(price) }),
        });
        if (!res.ok) throw new Error("Алдаа гарлаа");
      }

      fetchServices();
      setOpen(false);
      setEditingService(null);
      setServiceId("");
      setPrice("");
    } catch (err) {
      console.error(err);
      alert("Алдаа гарлаа");
    }
  };

  // Service устгах
  const deleteService = async (id: number) => {
    if (!confirm("Устгах уу?")) return;
    try {
      const res = await fetch(`/api/salon_services/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Алдаа гарлаа");
      fetchServices();
    } catch (err) {
      console.error(err);
      alert("Алдаа гарлаа");
    }
  };

  return (
    <div className="border p-4 rounded-md mt-4">
      <h3 className="text-lg font-bold mb-2">Үйлчилгээ</h3>

      <div className="flex flex-col gap-2">
        {services.map((s) => (
          <div
            key={s.id}
            className="border p-2 flex justify-between items-center rounded"
          >
            <div>
              <p className="font-semibold">{s.services.name}</p>
              <p>{s.price}₮</p>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => {
                  setEditingService(s);
                  setServiceId(s.services.id);
                  setPrice(s.price);
                  setOpen(true);
                }}
              >
                Засах
              </Button>
              <Button
                className="bg-red-500"
                onClick={() => deleteService(s.id)}
              >
                Устгах
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Button
        className="mt-4"
        onClick={() => {
          setEditingService(null);
          setServiceId("");
          setPrice("");
          setOpen(true);
        }}
      >
        Өөрийн салонд үйлчилгээ нэмэх
      </Button>

      <Dialog open={open} onOpenChange={() => setOpen(false)}>
        <DialogContent className="sm:max-w-[400px] flex flex-col gap-3">
          <DialogHeader>
            <DialogTitle>
              {editingService ? "Үйлчилгээ засах" : "Үйлчилгээ нэмэх"}
            </DialogTitle>
          </DialogHeader>

          <Label>Нэр</Label>
          <select
            className="border px-2 py-1 rounded"
            value={serviceId}
            onChange={(e) => setServiceId(Number(e.target.value))}
          >
            <option value="">Сонгох...</option>
            {editingService &&
              !availableServices.some(
                (s) => s.id === editingService.services.id
              ) && (
                <option value={editingService.services.id}>
                  {editingService.services.name}
                </option>
              )}
            {availableServices.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>

          <Label>Үнэ</Label>
          <Input
            type="number"
            value={price}
            onChange={(e) =>
              setPrice(e.target.value === "" ? "" : Number(e.target.value))
            }
          />

          <Button className="mt-3 bg-blue-500 text-white" onClick={saveService}>
            {editingService ? "Шинэчлэх" : "Хадгалах"}
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
