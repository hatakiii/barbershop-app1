"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (rating: number) => void;
}

export default function ReviewModal({ open, onClose, onSubmit }: Props) {
  const [rating, setRating] = useState(0);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-sm rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-center text-xl">
            Үнэлгээ өгөх
          </DialogTitle>
        </DialogHeader>

        {/* Stars */}
        <div className="flex justify-center gap-2 py-6">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => setRating(star)}
              className="transition hover:scale-110"
            >
              <Star
                className={`w-8 h-8 ${
                  rating >= star
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            </button>
          ))}
        </div>

        {/* Actions */}
        <div className="flex justify-between">
          <Button variant="outline" className="w-fit" onClick={onClose}>
            Болих
          </Button>
          <Button
            className="w-fit"
            disabled={rating === 0}
            onClick={() => {
              onSubmit(rating);
              onClose();
            }}
          >
            Илгээх
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
