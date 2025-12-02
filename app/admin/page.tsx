"use client";

import { useEffect, useState } from "react";
import AdminContainer from "@/components/ui/main/adminContainer";
import BarberContainer from "@/components/ui/main/barberContainer";
import SalonManagerContainer from "@/components/ui/main/salonManagerContainer";
import AdminLayout from "@/components/ui/main/adminLayout";

export default function AdminPage() {
  const [userRole, setUserRole] = useState<string>("");
  const [salonId, setSalonId] = useState<string | number | null>(null);
  const [barberId, setBarberId] = useState<number | null>(null);

  useEffect(() => {
    // Get role from parent div data attribute after login
    const checkRole = () => {
      const roleDiv = document.querySelector("[data-user-role]");
      if (roleDiv) {
        const role = roleDiv.getAttribute("data-user-role");
        const salon = roleDiv.getAttribute("data-salon-id");
        const barber = roleDiv.getAttribute("data-barber-id");

        if (role) {
          setUserRole(role);

          // Parse IDs
          const parsedSalonId = salon ? parseInt(salon) : null;
          const parsedBarberId = barber ? parseInt(barber) : null;

          setSalonId(parsedSalonId);
          setBarberId(parsedBarberId);
        }
      }
    };

    checkRole();
    const interval = setInterval(checkRole, 100);

    return () => clearInterval(interval);
  }, []);

  const renderContent = () => {
    switch (userRole.toLowerCase()) {
      case "admin":
        return <AdminContainer />;
      case "manager":
        if (!salonId)
          return <p className="text-red-500">Салоны мэдээлэл олдсонгүй</p>;
        return <SalonManagerContainer managerId={salonId.toString()} />;
      case "barber":
        if (!salonId || !barberId)
          return <p className="text-red-500">Мэдээлэл дутуу байна</p>;
        return (
          <BarberContainer
            salonId={salonId.toString()}
            barberId={barberId.toString()}
          />
        );
      default:
        return (
          <div className="text-center py-8 text-gray-500">
            <p>Ачааллаж байна...</p>
          </div>
        );
    }
  };

  return (
    <AdminLayout>
      <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto p-6">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              {userRole === "admin" && "Admin Dashboard"}
              {userRole === "manager" && "Manager Dashboard"}
              {userRole === "barber" && "Barber Dashboard"}
            </h1>
            <p className="text-gray-600">
              {userRole && `Таны үүрэг: ${userRole}`}
              {salonId && ` | Салон ID: ${salonId}`}
              {barberId && ` | Үсчин ID: ${barberId}`}
            </p>
          </div>

          {/* Content Area */}
          <div className="bg-white rounded-lg shadow-lg p-6 min-h-[500px]">
            {renderContent()}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
