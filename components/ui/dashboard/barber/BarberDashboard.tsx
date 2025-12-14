"use client";
import { useAuth } from "@clerk/nextjs";
import React from "react";

export const BarberDashboard = () => {
  const { userId, sessionId, getToken } = useAuth(); // ✅ client-side

  console.log(userId);
  return <div>{userId}</div>;
};
