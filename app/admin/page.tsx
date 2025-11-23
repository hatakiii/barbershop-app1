"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import AdminContainer from "@/components/ui/main/adminContainer";
import BarberContainer from "@/components/ui/main/barberContainer";
import SalonManagerContainer from "@/components/ui/main/salonManagerContainer";

type TabType = "admin" | "salon-manager" | "barber";

export default function AdminPage() {
    const [activeTab, setActiveTab] = useState<TabType>("admin");

    return (
        <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100">
            <div className="container mx-auto p-6">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>
                    <p className="text-gray-600">Системийн удирдлагын самбар</p>
                </div>

                {/* Tab Buttons */}
                <div className="bg-white rounded-lg shadow-md p-2 mb-6 flex gap-2">
                    <Button
                        onClick={() => setActiveTab("admin")}
                        variant={activeTab === "admin" ? "default" : "outline"}
                        className={`flex-1 py-6 text-lg font-semibold transition-all ${activeTab === "admin"
                            ? "bg-blue-600 hover:bg-blue-700 shadow-lg scale-105"
                            : "hover:bg-gray-50"
                            }`}
                    >
                        <span className="mr-2">👨‍💼</span>
                        Admin
                    </Button>

                    <Button
                        onClick={() => setActiveTab("salon-manager")}
                        variant={activeTab === "salon-manager" ? "default" : "outline"}
                        className={`flex-1 py-6 text-lg font-semibold transition-all ${activeTab === "salon-manager"
                            ? "bg-purple-600 hover:bg-purple-700 shadow-lg scale-105"
                            : "hover:bg-gray-50"
                            }`}
                    >
                        <span className="mr-2">🏪</span>
                        Salon Manager
                    </Button>

                    <Button
                        onClick={() => setActiveTab("barber")}
                        variant={activeTab === "barber" ? "default" : "outline"}
                        className={`flex-1 py-6 text-lg font-semibold transition-all ${activeTab === "barber"
                            ? "bg-green-600 hover:bg-green-700 shadow-lg scale-105"
                            : "hover:bg-gray-50"
                            }`}
                    >
                        <span className="mr-2">✂️</span>
                        Barber
                    </Button>
                </div>

                {/* Content Area */}
                <div className="bg-white rounded-lg shadow-lg p-6 min-h-[500px] animate-in fade-in duration-300">
                    {activeTab === "admin" && <AdminContainer />}
                    {activeTab === "salon-manager" && <SalonManagerContainer />}
                    {activeTab === "barber" && <BarberContainer />}
                </div>
            </div>
        </div>
    );
}
