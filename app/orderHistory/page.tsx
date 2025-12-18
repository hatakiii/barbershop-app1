"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface Order {
  id: number;
  reserveddatetime: string;
  totalprice: number;
  phonenumber: string;
  services: { name: string };
  barbers: { name: string };
  salons: { name: string; salonAddress: string };
}

export default function OrderHistoryPage() {
  const { userId, isSignedIn } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const [editingOrder, setEditingOrder] = useState<Order | null>(null);
  const [newDateTime, setNewDateTime] = useState("");

  useEffect(() => {
    if (!isSignedIn || !userId) return;

    fetch("/api/orders")
      .then((r) => r.json())
      .then((d) => d.success && setOrders(d.orders))
      .finally(() => setLoading(false));
  }, [isSignedIn, userId]);

  async function handleDelete(id: number) {
    if (!confirm("Захиалгыг цуцлах уу?")) return;

    const res = await fetch(`/api/orders/${id}`, { method: "DELETE" });
    const data = await res.json();

    if (data.success) {
      setOrders((prev) => prev.filter((o) => o.id !== id));
    }
  }

  async function handleUpdate() {
    if (!editingOrder) return;

    const res = await fetch(`/api/orders/${editingOrder.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reserveddatetime: newDateTime }),
    });

    const data = await res.json();

    if (data.success) {
      setOrders((prev) =>
        prev.map((o) =>
          o.id === editingOrder.id ? { ...o, reserveddatetime: newDateTime } : o
        )
      );
      setEditingOrder(null);
    }
  }

  if (!isSignedIn || loading) return null;
  if (!orders.length)
    return (
      <div className="py-20 text-center text-muted-foreground">
        Захиалга олдсонгүй
      </div>
    );

  return (
    <div className="max-w-3xl pl-30 pt-10 flex flex-col gap-6">
      <div className="absolute top-26 left-12 z-50">
        <Link
          href="/"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 backdrop-blur shadow hover:bg-white transition"
        >
          <ArrowLeft className="h-6 w-6 text-primary" />
        </Link>
      </div>

      <h1 className="text-2xl font-semibold">Миний захиалгууд</h1>

      {orders.map((o) => (
        <Card
          key={o.id}
          className="p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        >
          {/* LEFT */}
          <div className="space-y-2">
            <p className="font-medium">{o.salons.name}</p>
            <p className="text-xs text-muted-foreground">
              {o.services.name} · {o.barbers.name}
            </p>
            <p className="text-xs text-muted-foreground">
              {new Date(o.reserveddatetime).toLocaleString("mn-MN")}
            </p>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold">
              {o.totalprice.toLocaleString()} ₮
            </span>

            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                setEditingOrder(o);
                setNewDateTime(o.reserveddatetime.slice(0, 16));
              }}
            >
              Засах
            </Button>

            <Button
              size="sm"
              variant="ghost"
              className="text-red-500 hover:bg-red-50"
              onClick={() => handleDelete(o.id)}
            >
              Цуцлах
            </Button>
          </div>
        </Card>
      ))}

      {/* EDIT MODAL */}
      {editingOrder && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 w-full max-w-sm space-y-4">
            <h2 className="font-medium text-lg">Цаг өөрчлөх</h2>

            <input
              type="datetime-local"
              value={newDateTime}
              onChange={(e) => setNewDateTime(e.target.value)}
              className="w-full border rounded-md px-3 py-2 text-sm"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setEditingOrder(null)}
                className="text-sm text-muted-foreground"
              >
                Болих
              </button>
              <button
                onClick={handleUpdate}
                className="bg-black text-white px-4 py-2 rounded-md text-sm"
              >
                Хадгалах
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
