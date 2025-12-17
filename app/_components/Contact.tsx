// "use client";

// import { Card, CardContent } from "@/components/ui/card";
// import { Phone, Mail, MapPin } from "lucide-react";
// import Map from "./Map";

// export function Contact() {
//   return (
//     <section id="contact" className="py-24 lg:py-32 bg-card">
//       <div className="max-w-7xl mx-auto px-6 lg:px-8">
//         {/* Header */}
//         <div className="text-center max-w-2xl mx-auto mb-16">
//           <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
//             Бидэнтэй холбогдоорой
//           </h2>
//           <p className="text-muted-foreground leading-relaxed">
//             Цаг захиалах, байршил асуух эсвэл санал хүсэлт байвал бидэнтэй
//             холбогдоорой.
//           </p>
//         </div>

//         {/* Layout */}
//         <div className="grid lg:grid-cols-2 gap-12 items-stretch">
//           {/* LEFT – MAP */}
//           <div className="rounded-2xl overflow-hidden bg-muted h-full min-h-[420px]">
//             <Map />
//           </div>

//           {/* RIGHT – CONTACT INFO */}
//           <div className="flex flex-col justify-between h-full min-h-[400px] py-4">
//             {/* Address */}
//             <Card className="border border-border hover:border-accent/50 transition-colors">
//               <CardContent>
//                 <div className="flex items-start gap-3">
//                   <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center">
//                     <MapPin className="w-4 h-4 text-foreground" />
//                   </div>
//                   <div>
//                     <h3 className="font-medium text-foreground mb-0.5">Хаяг</h3>
//                     <p className="text-sm text-muted-foreground leading-snug">
//                       Салбар 1: Сүхбаатар дүүрэг, 1-р хороо
//                     </p>
//                     <p className="text-sm text-muted-foreground leading-snug">
//                       Салбар 2: Шангри-Ла Худалдааны төв, B1 давхар
//                     </p>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Phone */}
//             <Card className="border border-border hover:border-accent/50 transition-colors">
//               <CardContent>
//                 <div className="flex items-start gap-3">
//                   <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center">
//                     <Phone className="w-4 h-4 text-foreground" />
//                   </div>
//                   <div>
//                     <h3 className="font-medium text-foreground mb-0.5">Утас</h3>
//                     <p className="text-sm text-muted-foreground leading-snug">
//                       +976 7711-1234
//                     </p>
//                     <p className="text-sm text-muted-foreground leading-snug">
//                       +976 9911-5678
//                     </p>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Email */}
//             <Card className="border border-border hover:border-accent/50 transition-colors">
//               <CardContent>
//                 <div className="flex items-start gap-3">
//                   <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center">
//                     <Mail className="w-4 h-4 text-foreground" />
//                   </div>
//                   <div>
//                     <h3 className="font-medium text-foreground mb-0.5">
//                       И-мэйл
//                     </h3>
//                     <p className="text-sm text-muted-foreground leading-snug">
//                       info@luxehairstudio.com
//                     </p>
//                     <p className="text-sm text-muted-foreground leading-snug">
//                       booking@luxehairstudio.com
//                     </p>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";

import Image from "next/image";
import { CalendarCheck, Scissors, Star, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function WhyChooseLuxe() {
  return (
    <section className="relative overflow-hidden `bg-gradient-to-br` from-secondary/40 to-background py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* LEFT CONTENT */}
          <div>
            <p className="mb-4 text-sm uppercase tracking-widest text-indigo-800">
              Яагаад Luxe Hair Studio вэ?
            </p>

            <h2 className="font-serif text-4xl leading-tight text-foreground md:text-5xl">
              Таны хэв маягт
              <br />
              <span className="text-indigo-300">тохирсон үс засалт</span>
            </h2>
            {/* 
            <p className="mt-6 max-w-xl text-muted-foreground">
              Luxe Hair Studio нь таны цагийг хэмнэж, хамгийн тохиромжтой
              үйлчилгээ, мэргэжилтнийг хурдан олоход тусална.
            </p> */}

            {/* FEATURES */}
            <div className="mt-10 space-y-6">
              <Feature
                icon={<CalendarCheck className="h-6 w-6 text-indigo-600" />}
                title="Хурдан, ойлгомжтой захиалга"
                text="Цаг захиалах процесс ердөө хэдхэн алхамтай."
              />
              <Feature
                icon={<Scissors className="h-6 w-6 text-indigo-600" />}
                title="Мэргэжлийн шилдэг үсчид"
                text="Туршлагатай, баталгаатай барбер, стилистууд."
              />
              <Feature
                icon={<Star className="h-6 w-6 text-indigo-600" />}
                title="Бодит хэрэглэгчдийн үнэлгээ"
                text="Үнэлгээ, review дээр үндэслэн сонголтоо хийнэ."
              />
              <Feature
                icon={<Sparkles className="h-6 w-6 text-indigo-600" />}
                title="Тренд үс засалтын санаанууд"
                text="Орчин үеийн стиль, inspiration gallery."
              />
            </div>

            {/* <div className="mt-10 flex gap-4">
              <Button size="lg">Салонууд үзэх</Button>
              <Button size="lg" variant="outline">
                Цаг захиалах
              </Button>
            </div> */}
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative">
            <div className="relative aspect-4/3 overflow-hidden rounded-3xl shadow-2xl">
              <Image
                src="/why-luxe.jpg"
                alt="Luxe Hair Studio"
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-6 -left-6 rounded-2xl bg-card px-6 py-4 shadow-lg">
              <p className="text-sm text-muted-foreground">
                Итгэмжлэгдсэн сонголт
              </p>
              <p className="text-xl font-semibold text-foreground">
                1000+ захиалга
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* FEATURE ITEM */
function Feature({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
        {icon}
      </div>
      <div>
        <h4 className="font-medium text-foreground">{title}</h4>
        <p className="mt-1 text-sm text-muted-foreground">{text}</p>
      </div>
    </div>
  );
}
