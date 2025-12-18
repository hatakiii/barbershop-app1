// app/workers/layout.tsx
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import WorkersDashboard from "./_components/WorkersDashboard";

export default async function WorkersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  // 1. Check if user exists and has ANY valid worker role
  // This prevents random customers from seeing the worker dashboard shell
  const isWorker = ["admin", "owner", "manager", "barber"].includes(
    user?.role || ""
  );

  if (!user || !isWorker) {
    redirect("/"); // Send unauthorized users home
  }

  return (
    <div className="flex min-h-screen">
      {/* You can add a shared Sidebar or Nav here for all workers */}
      <aside className="w-64 border-r bg-gray-50 p-4">
        <WorkersDashboard />
      </aside>

      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
