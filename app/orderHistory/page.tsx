"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { Card } from "@/components/ui/card";

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

  if (!isSignedIn) return <p className="p-6"></p>;
  if (loading) return <p className="p-6"></p>;
  if (!orders.length) return <p className="p-6">Захиалга олдсонгүй</p>;

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-6">Миний Захиалгууд</h1>
      <div className="space-y-4">
        {orders.map((order) => (
          <Card key={order.id} className="p-6 hover:shadow-md transition">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Салон</p>
                <p className="font-semibold">{order.salons.name}</p>
                <p className="text-sm text-gray-500">Салоны хаяг</p>
                <p className="text-sm">{order.salons.salonAddress}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Үйлчилгээ</p>
                <p className="font-semibold">{order.services.name}</p>
                <p className="text-sm text-gray-500">Нийт үнэ</p>
                <p className="font-bold text-lg text-green-600">
                  {order.totalprice.toLocaleString()} ₮
                </p>
              </div>
            </div>
            <div className="border-t mt-4 pt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-500">Barder</p>
                <p className="font-semibold">{order.barbers.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Захиалсан цаг</p>
                <p className="font-semibold">
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
                <p className="text-sm text-gray-500">Утасны дугаар</p>
                <p className="font-semibold">{order.phonenumber}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default OrderHistoryPage;
