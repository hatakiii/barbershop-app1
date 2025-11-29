import prisma from "@/lib/prisma";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function SalonDetailPage({ params }: Props) {
  const { id } = await params;

  const salon = await prisma.salon.findUnique({
    where: { id: Number(id) },
    include: { barbers: true, services: true },
  });

  if (!salon) {
    return <div className="p-6 text-red-500">Салон олдсонгүй</div>;
  }

  return (
    <div className="p-6">
      <img
        src={salon.salonImage || ""}
        alt={salon.name}
        className="w-full h-72 object-cover rounded-xl"
      />

      <h1 className="text-3xl font-bold mt-4">{salon.name}</h1>
      <p>{salon.salonAddress}</p>

      <h2 className="text-2xl font-semibold mt-6">Үйлчилгээ</h2>
      <ul>
        {salon.services.map((s) => (
          <li key={s.id}>{s.name}</li>
        ))}
      </ul>

      <h2 className="text-2xl font-semibold mt-6">Үсчид</h2>
      <ul>
        {salon.barbers.map((b) => (
          <li key={b.id}>{b.name}</li>
        ))}
      </ul>
    </div>
  );
}
