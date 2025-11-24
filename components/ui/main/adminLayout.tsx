"use client";

import { useState } from "react";
import { Input } from "../input";
import { Button } from "../button";



export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const [step, setStep] = useState<number>(1);
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [userRole, setUserRole] = useState<string>("");

    const handleLogin = async () => {
        setError("");
        setLoading(true);

        try {
            const res = await fetch("/api/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || "Нэвтрэх нэр эсвэл нууц үг буруу байна");
                setLoading(false);
                return;
            }

            setUserRole(data.role);
            setStep(2);
        } catch (err) {
            setError("Алдаа гарлаа. Дахин оролдоно уу.");
        } finally {
            setLoading(false);
        }
    };

    // Clone children and pass userRole as prop
    const childrenWithProps = typeof children === 'function'
        ? children
        : children && typeof children === 'object'
            ? (children as any)
            : children;
    return (
        <div>
            {step === 1 && (
                <div className="flex flex-col w-1/5 gap-3 mx-auto mt-20">
                    <h2 className="text-2xl font-bold text-center mb-4">Нэвтрэх</h2>

                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                            {error}
                        </div>
                    )}

                    <label className="font-medium">Email</label>
                    <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={loading}
                    />

                    <label className="font-medium">Password</label>
                    <Input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={loading}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && !loading) {
                                handleLogin();
                            }
                        }}
                    />

                    <Button
                        className="mt-5"
                        onClick={handleLogin}
                        disabled={loading || !email || !password}
                    >
                        {loading ? "Шалгаж байна..." : "Нэвтрэх"}
                    </Button>
                </div>
            )}
            {step === 2 && (
                <div data-user-role={userRole}>{children}</div>
            )}

        </div>
    );
}
