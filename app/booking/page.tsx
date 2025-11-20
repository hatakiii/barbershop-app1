import prisma from "@/lib/prisma";

export default async function BookingPage() {
  const categories = await prisma.category.findMany({
    include: { services: true, barbers: true },
  });

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">Цаг Захиалах</h1>
      {categories?.map((cat) => (
        <div key={cat.id} className="mb-10 border p-4 rounded">
          <h2 className="text-2xl font-semibold">{cat.name}</h2>

          {/* Services */}
          <h3 className="text-xl mt-4 mb-2 font-medium">Services</h3>
          <ul className="list-disc ml-6">
            {cat.services.map((srv) => (
              <li key={srv.id}>
                {srv.name} — {srv.price}₮ ({srv.gender})
              </li>
            ))}
          </ul>

          {/* Barbers */}
          <h3 className="text-xl mt-4 mb-2 font-medium">Barbers</h3>
          <ul className="list-disc ml-6">
            {cat.barbers?.map((b) => (
              <li key={b.id}>{b.name}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
