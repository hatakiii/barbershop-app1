import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export function Hero() {
  return (
    <section id="home" className="relative min-h-[80vh] flex items-center">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.squarespace-cdn.com/content/v1/62c60263720ba005c9d695df/cd9f5c19-db5e-49d4-b5f0-8d896b6da98d/2D00EAD1-922A-47E6-8255-B30ADBE27EE8.jpeg?format=2500w"
          alt=""
          className="w-full h-full object-cover"
          fill
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-2xl text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Шилдэг, <br />
            <span className="text-accent">шинэлэг шийдлийг зөвхөн танд</span>
          </h1>
          <p className="text-xl mb-8 text-gray-200">
       Aжилтны бүтээлч ур чадвараар үйлчилгээний стандартыг хүргэж, хэрэглэгчдэд давтагдашгүй сэтгэл ханамжийг бэлэглэнэ
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/booking">
              <Button
                size="lg"
                className="bg-white text-black hover:bg-gray-100"
              >
            Цаг захиалах
              </Button>
            </Link>

            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-black"
            >
         Үйлчилгээ
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
