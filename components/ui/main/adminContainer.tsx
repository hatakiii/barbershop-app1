"use client";
import { ChangeEvent, useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../dialog";
import { Input } from "../input";
import { Label } from "../label";
import { Button } from "../button";
import { Salon, User } from "@/lib/types";
import MapSelector from "./MapSelector";

export default function AdminContainer() {
  const [managers, setManagers] = useState<{ id: string; name: string }[]>([]);
  const [selectedManagerId, setSelectedManagerId] = useState("");
  const [salons, setSalons] = useState<Salon[]>([]);
  const [salonImage, setSalonImage] = useState<File | undefined>();

  const [name, setName] = useState("");
  const [salonAddress, setSalonAddress] = useState("");

  const [editName, setEditName] = useState("");
  const [editAddress, setEditAddress] = useState("");

  const [editingSalon, setEditingSalon] = useState<Salon | null>(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  // Координатуудын state нэмсэн, анхны утга нь Улаанбаатар хотын төв
  const [lat, setLat] = useState<number | null>(47.9185);
  const [lng, setLng] = useState<number | null>(106.917);

  useEffect(() => {
    fetch("/api/salons", { cache: "no-cache" })
      .then((res) => res.json())
      .then(setSalons);
  }, []);

  console.log("What's inside salon", salons);

  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((data: User[]) =>
        setManagers(
          data
            .filter((u) => u.role === "Manager")
            .map((u) => ({ id: String(u.id), name: u.name || "" }))
        )
      )
      .catch(console.error);
  }, []);

  const openAddModal = () => {
    setEditingSalon(null);
    setName("");
    setSalonAddress("");
    setSalonImage(undefined);
    setLat(47.9185);
    setLng(106.917);
    setOpen(true);
  };

  const openEditModal = (sal: Salon) => {
    setEditingSalon(sal);
    setEditName(sal.name);
    setEditAddress(sal.salonAddress || "");
    setSelectedManagerId(sal.managerId ? String(sal.managerId) : "");
    setSalonImage(undefined); // Засах үед сайн зураг сонгож өгөх хүртэл undefined
    setLat(sal.lat || 47.9185);
    setLng(sal.lng || 106.917);
    setOpen(true);
  };

  const addSalonHandler = async () => {
    if (!name || !salonImage || !salonAddress || !lat || !lng)
      return alert("Бүх талбар + байршил!");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("salonAddress", salonAddress);
    formData.append("salonImage", salonImage);
    formData.append("managerId", selectedManagerId);
    formData.append("lat", String(lat));
    formData.append("lng", String(lng));

    console.log("what's in formdata", formData);

    setLoading(true);
    const res = await fetch("/api/salons", { method: "POST", body: formData });
    const data = await res.json();
    setLoading(false);

    if (!res.ok) return alert(data.error);
    setSalons((p) => [...p, data]);
    setOpen(false);
  };

  const updateSalonHandler = async (id: string) => {
    setLoading(true);

    // Хэрвээ шинэ зураг байвал FormData ашиглах
    if (salonImage) {
      const formData = new FormData();
      formData.append("name", editName);
      formData.append("salonAddress", editAddress);
      formData.append("salonImage", salonImage);
      formData.append("managerId", selectedManagerId);
      formData.append("lat", String(lat));
      formData.append("lng", String(lng));

      const res = await fetch(`/api/salons/${id}`, {
        method: "PUT",
        body: formData,
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok) return alert(data.error);
      setSalons((p) => p.map((s) => (s.id === id ? data : s)));
      setOpen(false);
    } else {
      // Зураг өөрчлөхгүй бол JSON ашиглах
      const res = await fetch(`/api/salons/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: editName,
          salonAddress: editAddress,
          managerId: selectedManagerId,
          lat,
          lng,
        }),
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok) return alert(data.error);
      setSalons((p) => p.map((s) => (s.id === id ? data : s)));
      setOpen(false);
    }
  };

  const deleteSalonHandler = async (id: string) => {
    if (!confirm("Устгах уу?")) return;
    await fetch(`/api/salons/${id}`, { method: "DELETE" });
    setSalons((p) => p.filter((s) => s.id !== id));
  };

  return (
    <div className="flex flex-wrap gap-4">
      {salons.map((sal) => (
        <div key={sal.id} className="w-60 border p-4 rounded flex flex-col">
          {sal.salonImage && (
            <img src={sal.salonImage} className="w-full h-32 object-cover" />
          )}
          <b>{sal.name}</b>
          <span className="text-xs">{sal.salonAddress}</span>

          <Button
            className="mt-2 bg-blue-500 text-white"
            onClick={() => openEditModal(sal)}
          >
            Засах
          </Button>

          <Button
            className="mt-2 bg-red-500 text-white"
            onClick={() => deleteSalonHandler(sal.id)}
          >
            Устгах
          </Button>
        </div>
      ))}

      <div
        className="w-60 h-32 border rounded flex justify-center items-center cursor-pointer hover:bg-gray-200"
        onClick={openAddModal}
      >
        ➕ Салон нэмэх
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="flex flex-col gap-3 max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingSalon ? "Салон засах" : "Салон нэмэх"}
            </DialogTitle>
          </DialogHeader>

          <Label>Менежер</Label>
          <select
            value={selectedManagerId}
            onChange={(e) => setSelectedManagerId(e.target.value)}
            className="border rounded p-2"
          >
            <option value="">Сонгоно уу</option>
            {managers.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name}
              </option>
            ))}
          </select>

          <Label>Салон нэр</Label>
          <Input
            value={editingSalon ? editName : name}
            onChange={(e) =>
              editingSalon
                ? setEditName(e.target.value)
                : setName(e.target.value)
            }
          />

          <Label>Хаяг</Label>
          <Input
            value={editingSalon ? editAddress : salonAddress}
            onChange={(e) =>
              editingSalon
                ? setEditAddress(e.target.value)
                : setSalonAddress(e.target.value)
            }
          />

          <Label>Байршил сонгох (газрын зураг дээр дарна уу)</Label>
          <MapSelector
            lat={lat}
            lng={lng}
            setLat={setLat}
            setLng={setLng}
            onLocationSelect={(newLat, newLng) => {
              setLat(newLat);
              setLng(newLng);
            }}
          />

          <div className="bg-gray-100 p-3 rounded text-sm">
            <p>
              <strong>Сонгосон координат:</strong>
            </p>
            <p>Өргөрөг: {lat?.toFixed(6)}</p>
            <p>Уртраг: {lng?.toFixed(6)}</p>
          </div>

          <Label>Зураг</Label>
          <Input
            type="file"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              e.target.files?.[0] && setSalonImage(e.target.files[0])
            }
          />

          {(salonImage || editingSalon?.salonImage) && (
            <img
              src={
                salonImage
                  ? URL.createObjectURL(salonImage)
                  : (editingSalon?.salonImage as string)
              }
              className="w-full h-32 object-cover rounded"
            />
          )}

          <Button
            disabled={loading}
            className="bg-blue-500 text-white"
            onClick={() =>
              editingSalon
                ? updateSalonHandler(editingSalon.id)
                : addSalonHandler()
            }
          >
            {loading ? "Уншиж..." : editingSalon ? "Шинэчлэх" : "Хадгалах"}
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
