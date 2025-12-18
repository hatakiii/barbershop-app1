"use client";
import { ChangeEvent, useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../dialog";
import { Input } from "../input";
import { Label } from "../label";
import { Button } from "../button";
import { Salon } from "@/lib/types";
import MapSelector from "./MapSelector";

export default function AdminContainer() {
  const [salons, setSalons] = useState<Salon[]>([]);
  const [salonImage, setSalonImage] = useState<File | undefined>();
  const [name, setName] = useState("");
  const [salonAddress, setSalonAddress] = useState("");
  const [editName, setEditName] = useState("");
  const [editAddress, setEditAddress] = useState("");
  const [editingSalon, setEditingSalon] = useState<Salon | null>(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [lat, setLat] = useState<number | null>(47.9185);
  const [lng, setLng] = useState<number | null>(106.917);

  useEffect(() => {
    fetch("/api/salons", { cache: "no-cache" })
      .then((res) => res.json())
      .then(setSalons);
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
    setSalonImage(undefined);
    setLat(sal.lat || 47.9185);
    setLng(sal.lng || 106.917);
    setOpen(true);
  };

  return (
    <div className="flex flex-wrap gap-6 p-6 `bg-gradient-to-br` from-pink-50 via-white to-blue-50 ">
      {salons.length === 0 ? (
        // Skeleton cards
        Array.from({ length: 5 }).map((_, idx) => (
          <div
            key={idx}
            className="w-64 h-112 bg-white shadow-lg rounded-2xl overflow-hidden animate-pulse flex flex-col gap-2 p-4"
          >
            {/* Image skeleton */}
            <div className="w-full h-36 bg-gray-300 rounded-lg mb-2"></div>

            {/* Text skeleton */}
            <div className="h-4 bg-gray-300 rounded w-3/4 mb-1"></div>
            <div className="h-3 bg-gray-300 rounded w-1/2 mb-2"></div>

            {/* Button skeleton */}
            <div className="h-8 bg-gray-300 rounded w-full mt-auto"></div>
          </div>
        ))
      ) : (
        <div className="flex flex-wrap gap-6 p-6">
          {salons.map((sal) => (
            <div
              key={sal.id}
              className="w-64 bg-white shadow-lg rounded-2xl overflow-hidden transform hover:scale-105 transition-all duration-300"
            >
              {sal.salonImage && (
                <img
                  src={sal.salonImage}
                  className="w-full h-60 object-cover"
                />
              )}
              <div className="p-4 flex flex-col gap-2 justify-end ">
                <b className="text-lg text-gray-800 line-clamp-1">{sal.name}</b>
                <span className="text-sm text-gray-500 line-clamp-2">
                  {sal.salonAddress}
                </span>

                <div className="flex gap-2 mt-3 flex-col">
                  <Button
                    className="flex-1 bg-gradient-to-r from-pink-400 to-pink-600 text-white hover:from-pink-500 hover:to-pink-700 shadow-md"
                    onClick={() => openEditModal(sal)}
                  >
                    Засах
                  </Button>

                  <Button
                    className="flex-1 bg-gradient-to-r from-red-400 to-red-600 text-white hover:from-red-500 hover:to-red-700 shadow-md"
                    onClick={() => alert("Устгах")} // Логикыг оролдохгүй
                  >
                    Устгах
                  </Button>
                </div>
              </div>
            </div>
          ))}
          <div
            className="w-64 h-40 bg-white shadow-lg rounded-2xl flex flex-col justify-center items-center cursor-pointer hover:scale-105 transition-all duration-300 hover:bg-pink-50"
            onClick={openAddModal}
          >
            <span className="text-4xl mb-2">➕</span>
            <span className="text-gray-600 font-semibold">Салон нэмэх</span>
          </div>
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="flex flex-col gap-4 max-h-[90vh] overflow-y-auto bg-white rounded-xl shadow-xl p-6">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-gray-800">
              {editingSalon ? "Салон засах" : "Салон нэмэх"}
            </DialogTitle>
          </DialogHeader>

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

          <Label>Байршил сонгох</Label>
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

          <div className="bg-gray-100 p-3 rounded-md text-sm">
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
              className="w-full h-40 object-cover rounded-lg mt-2"
            />
          )}

          <Button
            disabled={loading}
            className="mt-4 bg-gradient-to-r from-pink-400 to-pink-600 text-white hover:from-pink-500 hover:to-pink-700 shadow-md"
          >
            {editingSalon ? "Шинэчлэх" : "Хадгалах"}
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
