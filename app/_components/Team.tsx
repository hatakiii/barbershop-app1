"use client";

const team = [
  {
    id: 1,
    name: "Содбилэгт",
    role: "Сурагч",
    image: "/25LP5593.jpg",
  },
  {
    id: 2,
    name: "Гантулга",
    role: "Сурагч",
    image: "/professional-asian-woman-portrait-developer.jpg",
  },
  {
    id: 3,
    name: "...",
    role: "Сурагч",
    image: "/young-asian-man-software-engineer.jpg",
  },
  {
    id: 4,
    name: "...",
    role: "Сурагч",
    image: "/creative-asian-woman-designer.jpg",
  },
  {
    id: 5,
    name: "...",
    role: "Сурагч",
    image: "/asian-man-mobile-developer.jpg",
  },
];

export function Team() {
  return (
    <section id="team" className="pt-24">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">
            Манай баг
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Бид технологийн шийдлээр салон эзэмшигчид болон хэрэглэгчдэд хялбар,
            хурдан, найдвартай үйлчилгээ хүргэх зорилготой.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {team.map((member) => (
            <div key={member.id} className="text-center group">
              <div className="aspect-square rounded-xl overflow-hidden bg-muted mb-4">
                <img
                  src={member.image}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <h3 className="font-medium text-foreground">{member.name}</h3>
              <p className="text-sm text-muted-foreground mt-1">
                {member.role}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
