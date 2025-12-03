import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

const teamMembers = [
  {
    name: "Заяа",
    role: "Ажилтан",
    experience: "15+ years",
    specialties: "Color Specialist, Balayage Expert",
    image:
      "https://i.pinimg.com/1200x/2b/5e/92/2b5e9258008ed30339b2d0c201cc1a7f.jpg",
  },
  {
    name: "Баяртунгалаг",
    role: "Ажилтан",
    experience: "12+ years",
    specialties: "Fantasy Colors, Corrective Color",
    image:
      "https://i.pinimg.com/1200x/52/bc/c7/52bcc7dda05e51b69164f6311f973397.jpg",
  },
  {
    name: "Билгүүн",
    role: "Ажилтан",
    experience: "8+ years",
    specialties: "Precision Cuts, Bridal Styling",
    image:
      "https://i.pinimg.com/1200x/54/dd/bc/54ddbc552b5d4703024e390753a54339.jpg",
  },
];

export function Team() {
  return (
    <section id="team" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Бидний тухай</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
           Бид шинэ дэвшилтэт тоног төхөөрөмж, бүтээгдэхүүн, үйлчилгээг нэвтрүүлэн зах зээлд эзлэх хувь хэмжээгээ нэмэгдүүлэх  хэтийн зорилт тавин ажиллаж байна.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {teamMembers.map((member, index) => (
            <Card
              key={index}
              className="overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="aspect-square overflow-hidden">
                <Image
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  width={400}
                  height={400}
                />
              </div>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                <p className="text-primary font-medium mb-2">{member.role}</p>
                <p className="text-sm text-muted-foreground mb-2">
                  {member.experience} experience
                </p>
                <p className="text-sm">{member.specialties}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
