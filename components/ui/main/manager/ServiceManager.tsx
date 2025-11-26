"use client";
import { useEffect, useState } from "react";
import { Button } from "../../button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../dialog";
import { Label } from "../../label";
import { Input } from "../../input";
import { Service } from "@/lib/types";

export default function ServiceManager({ salonId }: { salonId: number }) {
  const [services, setServices] = useState<Service[]>([]);

  const [open, setOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);

  const [name, setName] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [gender, setGender] = useState("male");

  const fetchServices = async () => {
    const res = await fetch(`/api/services?salonId=${salonId}`);
    const data = await res.json();
    setServices(data);
  };

  useEffect(() => {
    fetchServices();
  }, [salonId]);

  const saveService = async () => {
    if (!name || price === "" || !gender) {
      alert("Бүх мэдээллийг бөглөнө үү");
      return;
    }

    const body = {
      name,
      price: Number(price),
      gender,
      salon_id: salonId,
    };

    let res;
    if (editingService) {
      // PUT
      res = await fetch(`/api/services/${Number(editingService.id)}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    } else {
      // POST
      res = await fetch(`/api/services`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    }

    const data = await res.json();
    if (res.ok) {
      setOpen(false);
      setEditingService(null);
      setName("");
      setPrice("");
      setGender("male");
      fetchServices();
    } else {
      alert(data.error || "Алдаа гарлаа");
    }
  };

  const deleteService = async (id: string | number) => {
    if (!confirm("Устгах уу?")) return;

    await fetch(`/api/services/${Number(id)}`, { method: "DELETE" });
    fetchServices();
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
              <p className="font-semibold">{s.name}</p>
              <p>{s.price}₮</p>
              <p className="text-sm text-gray-500">Хүйс: {s.gender ?? "—"}</p>
            </div>

            <div className="flex gap-2">
              <Button
                onClick={() => {
                  setEditingService(s);
                  setName(s.name || "");
                  setPrice(s.price || "");
                  setGender(s.gender || "male");
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
          setName("");
          setPrice("");
          setGender("male");
          setOpen(true);
        }}
      >
        Үйлчилгээ нэмэх
      </Button>

      {/* Dialog */}
      <Dialog open={open} onOpenChange={() => setOpen(false)}>
        <DialogContent className="sm:max-w-[400px] flex flex-col gap-3">
          <DialogHeader>
            <DialogTitle>
              {editingService ? "Үйлчилгээ засах" : "Үйлчилгээ нэмэх"}
            </DialogTitle>
          </DialogHeader>

          <Label>Нэр</Label>
          <Input value={name} onChange={(e) => setName(e.target.value)} />

          <Label>Үнэ</Label>
          <Input
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          />

          <Label>Хүйс</Label>
          <select
            className="border px-2 py-1 rounded"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="male">Эрэгтэй</option>
            <option value="female">Эмэгтэй</option>
          </select>

          <Button className="mt-3 bg-blue-500 text-white" onClick={saveService}>
            {editingService ? "Шинэчлэх" : "Хадгалах"}
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
