"use client";

import { Button } from "@/components/ui/button";
import { LuLayoutDashboard, LuScissors } from "react-icons/lu";
import { LiaUsersSolid } from "react-icons/lia";
import { FaPeopleGroup } from "react-icons/fa6";
import { AiOutlineHistory } from "react-icons/ai";
import Link from "next/link";

export const SideBar = () => {
  return (
    <div className="w-[205px] h-screen py-9 px-5">
      <div className="w-full flex gap-2 items-center mb-10">
        {/* Salon Logo Placeholder */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="w-9 h-[30px]"
        >
          <path
            d="M4.318 19.682a4.5 4.5 0 0 1 6.364-6.364l1.154 1.154m-1.154-1.154L6.172 7.051a4.5 4.5 0 1 1 6.364-6.364l3.536 3.536a4.5 4.5 0 0 1-6.364 6.364M19.682 4.318a4.5 4.5 0 0 1 0 6.364l-3.536 3.536a4.5 4.5 0 1 1-6.364-6.364l3.536-3.536a4.5 4.5 0 0 1 6.364 0Z"
            stroke="#EF4444"
            strokeWidth="2"
          />
        </svg>

        <div className="flex-1">
          <p className="text-lg font-semibold text-foreground">Luxe Salon</p>
          <p className="text-xs text-muted-foreground">Beauty & Style</p>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <Button
          asChild
          className="rounded-full gap-2.5 has-[>svg]:px-6 py-2.5 h-10"
        >
          <Link href="/">
            <LuLayoutDashboard className="size-[22px]" />
            <p className="w-[85px] text-left">Dashboard</p>
          </Link>
        </Button>

        <Button
          asChild
          className="rounded-full gap-2.5 has-[>svg]:px-6 py-2.5 h-10"
        >
          <Link href="/admin">
            <LuScissors className="size-[22px]" />
            <p className="w-[85px] text-left">Admin</p>
          </Link>
        </Button>

        <Button
          asChild
          className="rounded-full gap-2.5 has-[>svg]:px-6 py-2.5 h-10"
        >
          <Link href="/booking">
            <LiaUsersSolid className="size-[22px]" />
            <p className="w-[85px] text-left">Bookings</p>
          </Link>
        </Button>

        <Button
          asChild
          className="rounded-full gap-2.5 has-[>svg]:px-6 py-2.5 h-10"
        >
          <Link href="/barbers">
            <FaPeopleGroup className="size-[22px]" />
            <p className="w-[85px] text-left">Barbers</p>
          </Link>
        </Button>

        <Button
          asChild
          className="rounded-full gap-2.5 has-[>svg]:px-6 py-2.5 h-10"
        >
          <Link href="/orderHistory">
            <AiOutlineHistory className="size-[22px]" />
            <p className="w-[85px] text-left">Orders History</p>
          </Link>
        </Button>
      </div>
    </div>
  );
};
