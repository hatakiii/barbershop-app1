"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import ReviewModal from "./ReviewModal";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface Props {
  salonId: number;
}

export default function ReviewButton({ salonId }: Props) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleSubmit = async (rating: number) => {
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          salonId,
          rating,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        toast.error(data.message || "Үнэлгээ хадгалахад алдаа гарлаа");
        return;
      }

      toast.success("Үнэлгээ өглөө ⭐");
      setOpen(false);

      // ⭐ average rating шинэчлэх
      router.refresh();
    } catch (err) {
      console.error(err);
      toast.error("Server error");
    }
  };

  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>
        Үнэлгээ өгөх
      </Button>

      <ReviewModal
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={handleSubmit}
      />
    </>
  );
}
