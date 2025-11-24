import { Card, CardContent } from "@/components/ui/card";
import { Scissors, Palette, Sparkles, Crown } from "lucide-react";

const services = [
  {
    icon: Scissors,
    title: "Hair Cuts & Styling",
    description:
      "Professional cuts and styling for all hair types. From classic to trendy, we create the perfect look for you.",
    price: "Starting at $65",
  },
  {
    icon: Palette,
    title: "Hair Coloring",
    description:
      "Expert color services including highlights, balayage, ombre, and full color transformations.",
    price: "Starting at $120",
  },
  {
    icon: Sparkles,
    title: "Hair Treatments",
    description:
      "Nourishing treatments to restore health and shine. Deep conditioning, keratin, and protein treatments.",
    price: "Starting at $85",
  },
  {
    icon: Crown,
    title: "Special Occasions",
    description:
      "Bridal hair, updos, and styling for special events. Make your day memorable with our expertise.",
    price: "Starting at $150",
  },
];

export function Services() {
  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Our Services</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover our comprehensive range of professional hair services,
            tailored to enhance your natural beauty.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <Card
              key={index}
              className="text-center hover:shadow-lg transition-shadow"
            >
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <service.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-muted-foreground mb-4">
                  {service.description}
                </p>
                <p className="font-semibold text-primary">{service.price}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
