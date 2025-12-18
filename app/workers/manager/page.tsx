import SalonManagerContainer from "@/components/ui/main/salonManagerContainer";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import React from "react";

const page = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Үйлчилгээ</h1>

        <Button asChild className="gap-2">
          <Link href="/workers/manager/service">
            <Plus className="h-4 w-4" />
            Салоны үйлчилгээ оруулах
          </Link>
        </Button>
      </div>

      {/* Content */}
      <SalonManagerContainer />
    </div>
  );
};

export default page;
