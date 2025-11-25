"use client";
import { ChangeEvent, useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../dialog";
import { Input } from "../input";
import { Label } from "../label";
import { Button } from "../button";
import { Category } from "@/lib/types";

export default function AdminContainer() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [salonImage, setSalonImage] = useState<File | undefined>();
  const [name, setName] = useState<string>("");
  const [salonAddress, setSalonAddress] = useState<string>("");
  const [editName, setEditName] = useState<string>("");
  const [editAddress, setEditAddress] = useState<string>("");
  const [editingSalon, setEditingSalon] = useState<Category | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/salons", { cache: "no-cache" })
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  const addSalonHandler = async () => {
    if (!name || !salonImage || !salonAddress) {
      alert("Бүх талбарыг бөглөнө үү");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("salonAddress", salonAddress);
    formData.append("salonImage", salonImage);

    try {
      setLoading(true);
      const res = await fetch("/api/salons", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setLoading(false);

      if (res.ok) {
        alert("Салон амжилттай нэмэгдлээ!");
        setOpen(false);
        setName("");
        setSalonAddress("");
        setSalonImage(undefined);
        setCategories((prev) => [...prev, data]);
      } else {
        alert(data.error);
      }
    } catch (err) {
      alert("Салон нэмэхэд алдаа гарлаа!");
      setLoading(false);
    }
  };

  const updateSalonHandler = async (
    id: string,
    updatedData: { name?: string; salonAddress?: string; salonImage?: string }
  ) => {
    try {
      const res = await fetch(`/api/salons/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });
      const data = await res.json();

      if (res.ok) {
        alert("Салон амжилттай шинэчлэгдлээ");
        setCategories((prev) =>
          prev.map((cat) => (cat.id === id ? data : cat))
        );
      } else {
        alert(data.error);
      }
    } catch (err) {
      alert("Салон шинэчлэхэд алдаа гарлаа!");
    }
  };

  const deleteSalonHandler = async (id: string) => {
    if (!confirm("Та энэ салоныг устгахдаа итгэлтэй байна уу?")) return;

    try {
      const res = await fetch(`/api/salons/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        alert("Салон амжилттай устлаа");
        setCategories((prev) => prev.filter((cat) => cat.id !== id));
      } else {
        const data = await res.json();
        alert(data.error || "Салон устгахад алдаа гарлаа!");
      }
    } catch (err) {
      alert("Салон устгахад алдаа гарлаа!");
    }
  };

  const fileChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSalonImage(e.target.files[0]);
    }
  };

  return (
    <div className="flex flex-wrap gap-4">
      {/* Салоны картууд */}
      {categories.map((cat) => (
        <div
          key={cat.id}
          className="w-60 h-95 border-2 rounded-md p-4 flex flex-col"
        >
          {cat.salonImage && (
            <img
              src={cat.salonImage}
              alt={cat.name}
              className="w-full h-40 object-cover rounded mb-3"
            />
          )}
          <h3 className="text-lg font-semibold">{cat.name}</h3>
          <p className="text-sm text-gray-600">{cat.salonAddress}</p>
          <div className="mt-auto flex justify-center flex-col">
            <Button
              className="mt-2 bg-blue-500 hover:bg-blue-600 text-white cursor-pointer"
              onClick={() => {
                setEditingSalon(cat);
                setEditName(cat.name || "");
                setEditAddress(cat.salonAddress || "");
                setSalonImage(undefined);
                setOpen(true);
              }}
            >
              Засах
            </Button>

            <Button
              className="mt-2 bg-red-400 hover:bg-red-500 text-white cursor-pointer"
              onClick={() => deleteSalonHandler(cat.id)}
            >
              Устгах
            </Button>
          </div>
        </div>
      ))}

      {/* Салон нэмэх карт */}
      <div
        className="w-60 h-95 border-2 rounded-md border-gray-300 flex flex-col justify-center items-center cursor-pointer hover:shadow-md transition-shadow hover:bg-gray-400 hover:text-white"
        onClick={() => {
          setEditingSalon(null);
          setName("");
          setSalonAddress("");
          setSalonImage(undefined);
          setOpen(true);
        }}
      >
        <span className="text-center font-bold">Салон нэмэх</span>
      </div>

      {/* Dialog нэмэх/засах */}
      <Dialog open={open} onOpenChange={() => setOpen(false)}>
        <DialogContent className="sm:max-w-[425px] flex flex-col gap-4">
          <DialogHeader>
            <DialogTitle>
              {editingSalon ? "Салон засах" : "Салон нэмэх"}
            </DialogTitle>
          </DialogHeader>

          <div className="grid gap-4">
            <Label>Салон нэр</Label>
            <Input
              value={editingSalon ? editName : name}
              onChange={(e) =>
                editingSalon
                  ? setEditName(e.target.value)
                  : setName(e.target.value)
              }
            />

            <Label>Салон хаяг</Label>
            <Input
              value={editingSalon ? editAddress : salonAddress}
              onChange={(e) =>
                editingSalon
                  ? setEditAddress(e.target.value)
                  : setSalonAddress(e.target.value)
              }
            />

            <Label>Салон зураг</Label>
            <Input type="file" onChange={fileChangeHandler} />

            {/* Preview зураг */}
            {editingSalon && !salonImage && editingSalon.salonImage && (
              <img
                src={editingSalon.salonImage}
                alt={editingSalon.name}
                className="w-full h-40 object-cover rounded mt-2"
              />
            )}
            {salonImage && (
              <img
                src={URL.createObjectURL(salonImage)}
                alt="Preview"
                className="w-full h-40 object-cover rounded mt-2"
              />
            )}

            <Button
              type="button"
              disabled={loading}
              className={`mt-2 ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              } text-white`}
              onClick={async () => {
                setLoading(true);
                if (editingSalon) {
                  await updateSalonHandler(editingSalon.id, {
                    name: editName,
                    salonAddress: editAddress,
                  });
                } else {
                  await addSalonHandler();
                }
                setOpen(false);
                setEditingSalon(null);
                setSalonImage(undefined);
                setLoading(false);
              }}
            >
              {loading
                ? "Уншиж байна..."
                : editingSalon
                ? "Шинчлэх"
                : "Хадгалах"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
