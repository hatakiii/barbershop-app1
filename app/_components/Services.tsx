import { Card, CardContent } from "@/components/ui/card";
import { Scissors, Palette, Sparkles, Crown } from "lucide-react";

const services = [
  {
    icon: Scissors,
    title: "ТАЙРАЛТ",
    description:
      "Өөрийн төрх, толгой нүүрний хэлбэрт тохирсон болон хүсэл сонирхолдоо тулгуурлан стиль имижээ бүрдүүлэн хүссэн тайралтаа хийлгээрэй Мөн та хэдийгээр үсээ ургуулж байгаа ч гэсэн 3 сард тутамд тайралт хийлгэж үсээ сэргээж байх шаардлагатай.",
   
  },
  {
    icon: Palette,
    title: "БУДАГ",
    description:
      "Бүсгүйчүүдийн хувьд үс бол гоо сайхны гол зэвсэг гэж хэлж болно. Үсээ будуулах нь өнөө үед хотын соёлын томоохон хэсэг болсон зүйл. Ялангуяа үсний өнгө царай төрх, төрөлхийн гоо сайхныг тодотгоход чухал үүрэгтэй.",

  },
  {
    icon: Sparkles,
    title: "ХИМИ",
    description:
      "Эмчилгээний хими нь үсний бүтцийг гэмтээхгүй,  гарын аясаар хэлбэржүүлж болох хамгийн зөөлөн хими бөгөөд угаахад хүссэн хэлбэрээ авдаг дэгжин сонголт юм Чөлөөт стильтэй хүмүүст илүү тохиромжтой ба үсийг өтгөн харагдуулдаг онцлогтой.",
 
  },
  {
    icon: Crown,
    title: "ХЭЛБЭРЖҮҮЛЭЛТ",
    description:
      "Баяр наадам, хүлээн авалтанд оролцохын өмнө ямар үс засалт өөрийг тань эрхэмсэг, сайхан харагдуулах талаар төсөөлж эхэлдэг. Үс сайхан бол зүс сайхан гэдэгчлэн охид бүсгүйчүүдий маань эрхэмсэг харагдуулахад хамгийн чухал зүйл бол үс билээ.",

  },
];

export function Services() {
  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Үйлчилгээ</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Манай салон үйлчлүүлэгч нартаа үнийн хөнгөлөлт, урамшуулал тогтмол санал болгон ажиллаж байгаа бөгөөд үнэнч үйлчлүүлэгчдээ гишүүнчлэлийн карт олгон ажиллаж байна.




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
             
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
