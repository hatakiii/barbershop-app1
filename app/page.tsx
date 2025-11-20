import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-200 h-200 flex justify-center items-center">
      <Link href="/booking">
        <button className="px-4 py-2 bg-blue-600 text-white rounded">
          Book
        </button>
      </Link>
    </div>
  );
}
