import MapView from "@/app/_components/MapView";
import prisma from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function SalonDetailPage({ params }: Props) {
  const { id } = await params;

  const salon = await prisma.salon.findUnique({
    where: { id: Number(id) },
    include: {
      barbers: true,
      salon_services: { include: { services: true } },
    },
  });

  if (!salon) {
    return <div className="p-6 text-red-500">Салон олдсонгүй</div>;
  }

  return (
    <div className="bg-white min-h-screen p-6 space-y-6">
      {/* Салон зураг */}
      {salon.salonImage && (
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="relative w-full md:w-1/2 h-72 rounded-xl overflow-hidden shadow-lg">
            <Image
              src={salon.salonImage}
              alt={salon.name || "Salon Image"}
              fill
              sizes="50vw"
              style={{
                objectFit: "cover",
                objectPosition: "center",
              }}
              className="rounded-xl"
            />
          </div>

          {/* Нэр болон хаяг */}
          <div className="flex flex-col gap-2 text-center md:text-left">
            <h1 className="text-3xl font-bold">{salon.name}</h1>
            <div className="flex gap-2 justify-center md:justify-start">
              <p className="font-bold">Хаяг:</p>
              <p className="text-gray-600">{salon.salonAddress}</p>
            </div>
          </div>
        </div>
      )}

      <Link href={`/booking/${salon.id}`}>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition cursor-pointer">
          Цаг захиалах
        </button>
      </Link>

      {/* Үйлчилгээ */}
      <div>
        <h2 className="text-2xl font-semibold mt-6">Үйлчилгээ</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-3">
          {salon.salon_services.map((ss) => (
            <div
              key={ss.id}
              className="border rounded-xl p-4 flex flex-col gap-1 shadow-sm hover:shadow-md transition"
            >
              <p className="font-semibold">{ss.services.name}</p>

              <p className="font-bold text-green-400">{ss.price}₮</p>
            </div>
          ))}
        </div>
      </div>

      {/* Үсчид */}
      <div>
        <h2 className="text-2xl font-semibold mt-6">Үсчид</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-3">
          {salon.barbers.map((b) => (
            <div
              key={b.id}
              className="border rounded-xl p-4 shadow-sm hover:shadow-md transition flex items-center gap-4"
            >
              <div className="relative w-20 h-20">
                <Image
                  src={b.avatarUrl || "/placeholder.png"}
                  alt={b.name || ""}
                  fill
                  sizes="80px"
                  style={{ objectFit: "cover", borderRadius: "9999px" }}
                />
              </div>

              <div>
                <p className="font-semibold text-lg">{b.name}</p>
                <p className="text-gray-600 text-sm">{b.phoneNumber}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Байршил */}
      {salon.lat == null || salon.lng == null ? (
        <div className="text-sm text-gray-500">Location not available</div>
      ) : (
        <MapView lat={salon.lat} lng={salon.lng} />
      )}
    </div>
  );
}
