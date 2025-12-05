"use client";
import { ChangeEvent, useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../dialog";
import { Input } from "../input";
import { Label } from "../label";
import { Button } from "../button";
import { Salon, User } from "@/lib/types";

export default function AdminContainer() {
  const [managers, setManagers] = useState<{ id: string; name: string }[]>([]);
  const [selectedManagerId, setSelectedManagerId] = useState<string>("");
  const [salons, setSalons] = useState<Salon[]>([]);
  const [salonImage, setSalonImage] = useState<File | undefined>();
  const [name, setName] = useState<string>("");
  const [salonAddress, setSalonAddress] = useState<string>("");
  const [editName, setEditName] = useState<string>("");
  const [editAddress, setEditAddress] = useState<string>("");
  const [editingSalon, setEditingSalon] = useState<Salon | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/salons", { cache: "no-cache" })
      .then((res) => res.json())
      .then((data) => setSalons(data));
  }, []);

  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((data: User[]) => {
        const managerOptions = data
          .filter((user) => user.role === "Manager")
          .map((user) => ({
            id: user.id.toString(), // number -> string
            name: user.name || "", // undefined бол хоосон string
          }));
        setManagers(managerOptions);
      })
      .catch((err) => console.error(err));
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
    formData.append("managerId", selectedManagerId);

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
        setSalons((prev) => [...prev, data]);
      } else {
        alert(data.error);
      }
    } catch (err) {
      alert("Салон нэмэхэд алдаа гарлаа!");
      setLoading(false);
    }
  };

  const updateSalonHandler = async (
    id: number,
    data: { name: string; salonAddress: string; salonImage?: File }
  ) => {
    const form = new FormData();
    form.append("name", data.name);
    form.append("salonAddress", data.salonAddress);
    if (data.salonImage) form.append("salonImage", data.salonImage);

    const res = await fetch(`/api/salons/${id}`, {
      method: "PUT",
      body: form,
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Салон шинэчлэхэд алдаа гарлаа");
    }

    return res.json();
  };

  const deleteSalonHandler = async (id: string) => {
    if (!confirm("Та энэ салоныг устгахдаа итгэлтэй байна уу?")) return;

    try {
      const res = await fetch(`/api/salons/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        alert("Салон амжилттай устлаа");
        setSalons((prev) => prev.filter((cat) => cat.id !== id));
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
      {salons.map((sal) => (
        <div
          key={sal.id}
          className="w-60 h-95 border-2 rounded-md p-4 flex flex-col"
        >
          {sal.salonImage && (
            <img
              src={sal.salonImage}
              alt={sal.name}
              className="w-full h-40 object-cover rounded mb-3"
            />
          )}
          <h3 className="text-lg font-semibold">{sal.name}</h3>
          <p className="text-sm text-gray-600">{sal.salonAddress}</p>
          <div className="mt-auto flex justify-center flex-col">
            <Button
              className="mt-2 bg-blue-500 hover:bg-blue-600 text-white cursor-pointer"
              onClick={() => {
                setEditingSalon(sal);
                setEditName(sal.name || "");
                setEditAddress(sal.salonAddress || "");
                setSalonImage(undefined);
                setOpen(true);
              }}
            >
              Засах
            </Button>

            <Button
              className="mt-2 bg-red-400 hover:bg-red-500 text-white cursor-pointer"
              onClick={() => deleteSalonHandler(sal.id)}
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
          setSelectedManagerId("");
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

          <Label>Салон удирдах менежер</Label>
          <select
            value={selectedManagerId}
            onChange={(e) => setSelectedManagerId(e.target.value)}
            className="border rounded p-2"
          >
            <option value="">Сонгоно уу</option>
            {managers.map((manager) => (
              <option key={manager.id} value={manager.id}>
                {manager.name}
              </option>
            ))}
          </select>

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
                try {
                  if (editingSalon) {
                    await updateSalonHandler(Number(editingSalon.id), {
                      name: editName,
                      salonAddress: editAddress,
                      // Шинэ зураг байгаа бол дамжуулна
                      salonImage: salonImage,
                    });
                  } else {
                    await addSalonHandler();
                  }
                  // state цэвэрлэх
                  setOpen(false);
                  setEditingSalon(null);
                  setSalonImage(undefined);

                  // Шинэ мэдээллийг дахин татах
                  const res = await fetch("/api/salons", { cache: "no-cache" });
                  const data = await res.json();
                  setSalons(data);
                } catch (err) {
                  console.error(err);
                  alert("Салон шинэчлэхэд алдаа гарлаа!");
                } finally {
                  setLoading(false);
                }
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
