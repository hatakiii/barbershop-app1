"use client";
import { ChangeEvent, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../dialog";
import { Input } from "../input";
import { Label } from "../label";
import { Button } from "../button";

export default function AdminContainer() {
  const [salonImage, setSalonImage] = useState<File | undefined>();
  const [name, setName] = useState<string>("");
  const [salonAddress, setSalonAddress] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);

  const addSalonHandler = async () => {
    if (!name || !salonImage || !salonAddress) {
      alert("All fields are required");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("salonAddress", salonAddress);
    formData.append("salonImage", salonImage);

    try {
      const res = await fetch("https://localhost:3000/api/categories", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        alert("Salon created successfully!");
        // await refetchSalons();
        setOpen(false);
        setName("");
        setSalonAddress("");
        setSalonImage(undefined);
      } else {
        alert(data.error);
      }
    } catch (err) {
      alert("Failed to create salon");
    }
  };

  const fileChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSalonImage(e.target.files[0]);
    }
  };

  return (
    <div>
      Admin Container
      <div className="flex gap-4 flex-wrap">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <div className="w-[270px] h-20 border-2 rounded-md border-gray-300 flex flex-col gap-2 justify-center items-center cursor-pointer">
              <span className="w-[150px] text-center ">Салон нэмэх</span>
            </div>
          </DialogTrigger>

          <DialogContent className="sm:max-w-[425px] flex flex-col gap-4">
            <DialogHeader>
              <DialogTitle>Салон шинээр үүсгэх</DialogTitle>
            </DialogHeader>

            <div className="grid gap-4">
              <div className="grid gap-3">
                <Label htmlFor="name">Салон нэр</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="salonAddress">Салон хаяг</Label>
                <Input
                  id="salonAddress"
                  value={salonAddress}
                  onChange={(e) => setSalonAddress(e.target.value)}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="salonImage">Зураг</Label>
                <Input
                  id="salonImage"
                  type="file"
                  onChange={fileChangeHandler}
                />
              </div>
              <Button
                type="button"
                className="w-fit px-4 py-2 mt-2"
                onClick={addSalonHandler}
              >
                Save changes
              </Button>
            </div>

            <DialogFooter></DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
