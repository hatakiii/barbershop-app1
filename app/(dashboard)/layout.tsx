// app/(dashboard)/layout.tsx

import { Header } from "@/components/ui/dashboard/common/Header";
import { Sidebar } from "@/components/ui/dashboard/common/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1">
        <Header />
        {children}
      </main>
    </div>
  );
}
