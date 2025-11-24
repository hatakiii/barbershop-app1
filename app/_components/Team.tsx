import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

const teamMembers = [
  {
    name: "Sarah Johnson",
    role: "Senior Stylist & Owner",
    experience: "15+ years",
    specialties: "Color Specialist, Balayage Expert",
    image:
      "https://images.unsplash.com/photo-1638474368314-59198edde028?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoYWlyc3R5bGlzdCUyMHBvcnRyYWl0fGVufDF8fHx8MTc1NTM0NjAzNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    name: "Maria Rodriguez",
    role: "Master Colorist",
    experience: "12+ years",
    specialties: "Fantasy Colors, Corrective Color",
    image:
      "https://images.unsplash.com/photo-1511920593290-3cb2deb1ce1c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYWlyc3R5bGlzdCUyMGN1dHRpbmclMjBoYWlyfGVufDF8fHx8MTc1NTQxNjU2Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    name: "Jessica Chen",
    role: "Cut & Style Specialist",
    experience: "8+ years",
    specialties: "Precision Cuts, Bridal Styling",
    image:
      "https://images.unsplash.com/photo-1647462741268-e5724e5886c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYWlyJTIwc2Fsb24lMjBzZXJ2aWNlcyUyMHN0eWxpbmd8ZW58MXx8fHwxNzU1NDE5OTA3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
];

export function Team() {
  return (
    <section id="team" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Meet Our Team</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our talented stylists bring years of experience and passion to every
            appointment.
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
