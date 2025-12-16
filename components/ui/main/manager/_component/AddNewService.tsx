"use client";

import { useEffect, useState } from "react";
import {
  getServices,
  createService,
  updateService,
  deleteService,
} from "@/lib/api/services";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Service {
  id: number;
  name: string;
}

export const AddNewService = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [name, setName] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  const loadServices = async () => {
    const data = await getServices();
    setServices(data);
  };

  useEffect(() => {
    loadServices();
  }, []);

  const handleAddOrUpdate = async () => {
    if (!name.trim()) return;

    if (editingId) {
      await updateService(editingId, name);
      setEditingId(null);
    } else {
      await createService(name);
    }

    setName("");
    loadServices();
  };

  const handleEdit = (service: Service) => {
    setName(service.name);
    setEditingId(service.id);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Устгах уу?")) return;
    await deleteService(id);
    loadServices();
  };

  return (
    <div className="max-w-md pt-20 flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Label>Үйлчилгээний нэр</Label>
        <Input
          placeholder="Жишээ: Салоны засалт"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Button onClick={handleAddOrUpdate}>
          {editingId ? "Шинэчлэх" : "Нэмэх"}
        </Button>
      </div>

      <div className="border rounded p-3 flex flex-col gap-2">
        {services.map((s) => (
          <div
            key={s.id}
            className="flex justify-between items-center border-b pb-1"
          >
            <span>{s.name}</span>
            <div className="flex gap-2">
              <Button size="sm" onClick={() => handleEdit(s)}>
                Засах
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => handleDelete(s.id)}
              >
                Устгах
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
