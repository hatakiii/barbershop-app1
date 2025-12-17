"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Order {
  id: number;
  salonid: number;
  serviceid: number;
  barberid: number;
  reserveddatetime: string;
  totalprice: number;
  phonenumber: string;
  services: { id: number; name: string; price: number };
  barbers: { id: number; name: string };
  salons: { id: number; name: string; salonAddress: string };
}

const OrderHistoryPage = () => {
  const { userId, isSignedIn } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  // EDIT STATE
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);
  const [newDateTime, setNewDateTime] = useState("");

  useEffect(() => {
    if (!isSignedIn || !userId) return;

    const fetchOrders = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/orders");
        const data = await res.json();
        if (data.success) setOrders(data.orders);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [isSignedIn, userId]);

  // DELETE
  async function handleDelete(id: number) {
    const ok = confirm("Энэ захиалгыг устгах уу?");
    if (!ok) return;

    const res = await fetch(`/api/orders/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();

    if (data.success) {
      setOrders((prev) => prev.filter((o) => o.id !== id));
    } else {
      alert("Устгах үед алдаа гарлаа");
    }
  }

  // UPDATE
  async function handleUpdate() {
    if (!editingOrder) return;

    const res = await fetch(`/api/orders/${editingOrder.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        reserveddatetime: newDateTime,
      }),
    });

    const data = await res.json();

    if (data.success) {
      setOrders((prev) =>
        prev.map((o) =>
          o.id === editingOrder.id ? { ...o, reserveddatetime: newDateTime } : o
        )
      );
      setEditingOrder(null);
    } else {
      alert("Засах үед алдаа гарлаа");
    }
  }

  if (!isSignedIn) return <p className="p-6"></p>;
  if (loading) return <p className="p-6"></p>;
  if (!orders.length) return <p className="p-6">Захиалга олдсонгүй</p>;

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-8">Миний захиалгууд</h1>

      <div className="space-y-4">
        {orders.map((order) => (
          <Card key={order.id} className="p-6 hover:shadow-md transition">
            {/* TOP */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-xs text-gray-500">Салон</p>
                <p className="font-semibold">{order.salons.name}</p>
                <p className="text-sm text-gray-600">
                  {order.salons.salonAddress}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500">Үйлчилгээ</p>
                <p className="font-semibold">{order.services.name}</p>
                <p className="text-lg font-bold text-green-600">
                  {order.totalprice.toLocaleString()} ₮
                </p>
              </div>
            </div>

            {/* META */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-gray-500 text-xs">Barber</p>
                <p className="font-medium">{order.barbers.name}</p>
              </div>

              <div>
                <p className="text-gray-500 text-xs">Цаг</p>
                <p className="font-medium">
                  {new Date(order.reserveddatetime).toLocaleString("mn-MN", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>

              <div>
                <p className="text-gray-500 text-xs">Утас</p>
                <p className="font-medium">{order.phonenumber}</p>
              </div>
            </div>

            {/* ACTIONS */}
            <div className="flex justify-end gap-3 mt-6">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setEditingOrder(order);
                  setNewDateTime(order.reserveddatetime.slice(0, 16));
                }}
              >
                Цаг өөрчлөх
              </Button>

              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDelete(order.id)}
              >
                Цуцлах
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* EDIT MODAL */}
      {editingOrder && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-sm space-y-4">
            <h2 className="text-lg font-semibold">Захиалга засах</h2>

            <input
              type="datetime-local"
              value={newDateTime}
              onChange={(e) => setNewDateTime(e.target.value)}
              className="w-full border rounded-md px-3 py-2"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setEditingOrder(null)}
                className="text-sm text-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="bg-black text-white px-4 py-2 rounded-md text-sm"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderHistoryPage;
