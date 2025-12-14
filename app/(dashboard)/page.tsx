// app/(dashboard)/page.tsx
import { BarberDashboard } from "@/components/ui/dashboard/barber/BarberDashboard";
import { ManagerDashboard } from "@/components/ui/dashboard/manager/ManagerDashboard";
import { OwnerDashboard } from "@/components/ui/dashboard/owner/OwnerDashboard";
import { getCurrentUser } from "@/lib/auth";

export default async function DashboardPage() {
  const user = await getCurrentUser();

  //   switch (user.role) {
  //     case "OWNER":
  //       return <OwnerDashboard />;
  //     case "MANAGER":
  //       return <ManagerDashboard />; //salonId={user.salonId} next time
  //     case "BARBER":
  //       return <BarberDashboard />; // barberId={user.barberId} next time
  //   }
}
