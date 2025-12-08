"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface Order {
  id: number;
  salonid: number;
  serviceid: number;
  barberid: number;
  reserveddatetime: string;
  totalprice: number;
  phonenumber: number;
  services: {
    id: number;
    name: string;
    price: number;
  };
  barbers: {
    id: number;
    name: string;
  };
  salons: {
    id: number;
    name: string;
    salonAddress: string;
  };
}

const OrderHistoryPage = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async () => {
    if (!phoneNumber.trim()) {
      alert("Утасны дугаар оруулна уу");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`/api/orders?phone=${phoneNumber}`);
      const data = await res.json();

      if (data.success) {
        setOrders(data.history);
      } else {
        alert(data.error || "Хайх боломжгүй");
        setOrders([]);
      }
    } catch (err) {
      console.error(err);
      alert("Серверийн алдаа");
      setOrders([]);
    } finally {
      setLoading(false);
      setSearched(true);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Захиалгын Түүх</h1>

        {/* Search Section */}
        <Card className="p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-3">
            <Input
              type="tel"
              placeholder="Утасны дугаар (жнь: 99000000)"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1"
            />
            <Button
              onClick={handleSearch}
              disabled={loading}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6"
            >
              {loading ? "Хайж байна..." : "Хайх"}
            </Button>
          </div>
        </Card>

        {/* Results Section */}
        {searched && (
          <div>
            {orders.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg border">
                <p className="text-gray-500 text-lg">Захиалга олдсонгүй</p>
              </div>
            ) : (
              <div>
                <h2 className="text-xl font-semibold mb-4">
                  Нийт захиалга: {orders.length}
                </h2>
                <div className="space-y-4">
                  {orders.map((order) => (
                    <Card
                      key={order.id}
                      className="p-6 hover:shadow-md transition"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Left Column */}
                        <div>
                          <p className="text-sm text-gray-500 mb-1">
                            Захиалгын ID
                          </p>
                          <p className="font-semibold mb-4">#{order.id}</p>

                          <p className="text-sm text-gray-500 mb-1">Салон</p>
                          <p className="font-semibold mb-4">
                            {order.salons.name}
                          </p>

                          <p className="text-sm text-gray-500 mb-1">
                            Салоны хаяг
                          </p>
                          <p className="text-sm mb-4">
                            {order.salons.salonAddress}
                          </p>
                        </div>

                        {/* Right Column */}
                        <div>
                          <p className="text-sm text-gray-500 mb-1">
                            Үйлчилгээ
                          </p>
                          <p className="font-semibold mb-4">
                            {order.services.name}
                          </p>

                          <p className="text-sm text-gray-500 mb-1">
                            Нэг үйлчилгээтний үнэ
                          </p>
                          <p className="font-semibold mb-4">
                            {order.services.price.toLocaleString()} ₮
                          </p>

                          <p className="text-sm text-gray-500 mb-1">Нийт үнэ</p>
                          <p className="font-bold text-lg text-green-600">
                            {order.totalprice.toLocaleString()} ₮
                          </p>
                        </div>
                      </div>

                      {/* Bottom Section */}
                      <div className="border-t mt-4 pt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <p className="text-sm text-gray-500 mb-1">
                            Цаг мэлээчийн нэр
                          </p>
                          <p className="font-semibold">{order.barbers.name}</p>
                        </div>

                        <div>
                          <p className="text-sm text-gray-500 mb-1">
                            Захиалсан цаг
                          </p>
                          <p className="font-semibold">
                            {new Date(order.reserveddatetime).toLocaleString(
                              "mn-MN",
                              {
                                year: "numeric",
                                month: "2-digit",
                                day: "2-digit",
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}
                          </p>
                        </div>

                        <div>
                          <p className="text-sm text-gray-500 mb-1">
                            Утасны дугаар
                          </p>
                          <p className="font-semibold">{order.phonenumber}</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistoryPage;
