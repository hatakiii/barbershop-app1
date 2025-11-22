import { User } from "@/lib/types";

export default async function AdminPage() {
    const res = await fetch("http://localhost:3000/api/users", {
        cache: "no-cache",
    });
    const users: User[] = await res.json();

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Admin - Хэрэглэгчид</h1>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-2 border">ID</th>
                            <th className="px-4 py-2 border">Нэр</th>
                            <th className="px-4 py-2 border">Email</th>
                            <th className="px-4 py-2 border">Clerk ID</th>
                            <th className="px-4 py-2 border">Үүрэг</th>
                            <th className="px-4 py-2 border">Үүсгэсэн</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id} className="hover:bg-gray-50">
                                <td className="px-4 py-2 border text-center">{user.id}</td>
                                <td className="px-4 py-2 border">{user.name || "-"}</td>
                                <td className="px-4 py-2 border">{user.email}</td>
                                <td className="px-4 py-2 border font-mono text-sm">{user.clerkid}</td>
                                <td className="px-4 py-2 border">
                                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">
                                        {user.role || "user"}
                                    </span>
                                </td>
                                <td className="px-4 py-2 border text-sm">
                                    {user.createdat ? new Date(user.createdat).toLocaleDateString('mn-MN') : "-"}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {users.length === 0 && (
                    <p className="text-center text-gray-500 py-8">Хэрэглэгч олдсонгүй</p>
                )}
            </div>

            <div className="mt-4 text-sm text-gray-600">
                Нийт: <strong>{users.length}</strong> хэрэглэгч
            </div>
        </div>
    );
}
