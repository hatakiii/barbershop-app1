"use client";

import { useEffect, useState } from "react";
import AdminContainer from "@/components/ui/main/adminContainer";
import BarberContainer from "@/components/ui/main/barberContainer";
import SalonManagerContainer from "@/components/ui/main/salonManagerContainer";
import AdminLayout from "@/components/ui/main/adminLayout";

export default function AdminPage() {
    const [userRole, setUserRole] = useState<string>("");

    useEffect(() => {
        // Get role from parent div data attribute after login
        const checkRole = () => {
            const roleDiv = document.querySelector('[data-user-role]');
            if (roleDiv) {
                const role = roleDiv.getAttribute('data-user-role');
                if (role) setUserRole(role);
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
            case "salon manager":
            case "salon-manager":
                return <SalonManagerContainer />;
            case "barber":
                return <BarberContainer />;
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
                            {userRole === "salon manager" && "Salon Manager Dashboard"}
                            {userRole === "barber" && "Barber Dashboard"}
                        </h1>
                        <p className="text-gray-600">
                            {userRole && `Таны үүрэг: ${userRole}`}
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
