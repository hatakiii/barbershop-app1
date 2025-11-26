"use client";
import { useEffect, useState, ChangeEvent } from "react";
import { Button } from "../../button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../dialog";
import { Label } from "../../label";
import { Input } from "../../input";
import { Barber } from "@/lib/types";

export default function BarberManager({ salonId }: { salonId: number }) {
  const [barbers, setBarbers] = useState<Barber[]>([]);
  const [open, setOpen] = useState(false);
  const [editingBarber, setEditingBarber] = useState<Barber | null>(null);

  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [barberImage, setBarberImage] = useState<File | undefined>();
  const [loading, setLoading] = useState(false);

  const fetchBarbers = async () => {
    const res = await fetch(`/api/barbers?salonId=${salonId}`);
    const data = await res.json();
    setBarbers(data);
  };

  useEffect(() => {
    fetchBarbers();
  }, [salonId]);

  const fileChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setBarberImage(e.target.files[0]);
    }
  };

  const saveBarber = async () => {
    if (!name) {
      alert("Нэрээ оруулна уу!");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("phoneNumber", phoneNumber);
    if (barberImage) {
      formData.append("barberImage", barberImage);
    }
    formData.append("salonId", salonId.toString());

    try {
      setLoading(true);
      let res;
      if (editingBarber) {
        // Update
        res = await fetch(`/api/barbers/${editingBarber.id}`, {
          method: "PUT",
          body: formData,
        });
      } else {
        // Create
        res = await fetch(`/api/barbers`, {
          method: "POST",
          body: formData,
        });
      }

      const data = await res.json();
      if (res.ok) {
        fetchBarbers();
        setOpen(false);
        setEditingBarber(null);
        setName("");
        setPhoneNumber("");
        setBarberImage(undefined);
      } else {
        alert(data.error);
      }
    } catch (err) {
      alert("Алдаа гарлаа!");
    } finally {
      setLoading(false);
    }
  };

  const deleteBarber = async (id: string) => {
    if (!confirm("Устгах уу?")) return;
    await fetch(`/api/barbers/${id}`, { method: "DELETE" });
    fetchBarbers();
  };

  return (
    <div>
      <h3 className="text-lg font-bold mb-2">Үсчид</h3>
      <div className="flex flex-wrap gap-4">
        {barbers.map((b) => (
          <div key={b.id} className="border p-2 rounded w-52">
            {b.avatarUrl && (
              <img
                src={b.avatarUrl}
                alt={b.name}
                className="w-full h-32 object-cover rounded mb-2"
              />
            )}
            <p className="font-semibold">{b.name}</p>
            <p className="text-sm text-gray-600">{b.phoneNumber}</p>
            <div className="flex gap-2 mt-2">
              <Button
                onClick={() => {
                  setEditingBarber(b);
                  setName(b.name);
                  setPhoneNumber(b.phoneNumber || "");
                  setBarberImage(undefined);
                  setOpen(true);
                }}
              >
                Засах
              </Button>
              <Button onClick={() => deleteBarber(b.id)} className="bg-red-400">
                Устгах
              </Button>
            </div>
          </div>
        ))}

        {/* Barber нэмэх */}
        <div
          className="border w-52 h-32 flex items-center justify-center cursor-pointer hover:shadow-md"
          onClick={() => {
            setEditingBarber(null);
            setName("");
            setPhoneNumber("");
            setBarberImage(undefined);
            setOpen(true);
          }}
        >
          <span className="font-bold">Үсчин нэмэх</span>
        </div>
      </div>

      {/* Dialog */}
      <Dialog open={open} onOpenChange={() => setOpen(false)}>
        <DialogContent className="sm:max-w-[400px] flex flex-col gap-4">
          <DialogHeader>
            <DialogTitle>
              {editingBarber ? "Үсчин засах" : "Үсчин нэмэх"}
            </DialogTitle>
          </DialogHeader>

          <Label>Нэр</Label>
          <Input value={name} onChange={(e) => setName(e.target.value)} />

          <Label>Утасны дугаар</Label>
          <Input
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />

          <Label>Зураг</Label>
          <Input type="file" onChange={fileChangeHandler} />
          {barberImage && (
            <img
              src={URL.createObjectURL(barberImage)}
              alt="preview"
              className="w-full h-40 object-cover rounded mt-2"
            />
          )}
          {!barberImage && editingBarber?.avatarUrl && (
            <img
              src={editingBarber.avatarUrl}
              alt={editingBarber.name}
              className="w-full h-40 object-cover rounded mt-2"
            />
          )}

          <Button
            onClick={saveBarber}
            disabled={loading}
            className={`mt-2 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            } text-white`}
          >
            {loading
              ? "Уншиж байна..."
              : editingBarber
              ? "Шинчлэх"
              : "Хадгалах"}
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
