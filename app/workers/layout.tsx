// app/workers/layout.tsx
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

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
        <h2 className="font-bold mb-4">Worker Panel</h2>
        <nav className="space-y-2">
          <a href="/workers/admin" className="block p-2 hover:bg-white rounded">
            Dashboard
          </a>
          {/* Add more links here */}
        </nav>
      </aside>

      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
