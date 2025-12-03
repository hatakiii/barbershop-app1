import Image from "next/image";

const galleryImages = [
  {
    src: "https://i.pinimg.com/736x/f1/f0/f8/f1f0f865a56728766d8ed6f9408da16a.jpg",
    alt: "Beautiful hair color transformation",
    category: "Color",
  },
  {
    src: "https://i.pinimg.com/736x/bc/8a/94/bc8a94d8bee5d9fddb3653ce4d80e562.jpg",
    alt: "Stylish haircut",
    category: "Cut & Style",
  },
  {
    src: "https://i.pinimg.com/1200x/b0/fb/e0/b0fbe056648858fd4d3b74d8b63cf38d.jpg",
    alt: "Wedding updo styling",
    category: "Special Events",
  },
  {
    src: "https://i.pinimg.com/1200x/d1/28/8a/d1288abb082dce2bed8c1e8319fb7ba4.jpg",
    alt: "Modern salon equipment",
    category: "Our Salon",
  },
  {
    src: "https://i.pinimg.com/736x/d2/12/17/d21217563aa2857fc8a7b0c5c2c5a6ba.jpg",
    alt: "Professional hair service",
    category: "Our Work",
  },
  {
    src: "https://i.pinimg.com/736x/c3/5e/dc/c35edc36c573b991985958349a8efd26.jpg",
    alt: "Hair salon services",
    category: "Styling",
  },
];

export function Gallery() {
  return (
    <section id="gallery" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Амжилтууд</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
        “Монголын үсчин гоо сайханчдын холбоо”-ноос “Шилдэг менежменттэй” салон.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-lg aspect-square"
            >
              <Image
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                fill
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors duration-300 flex items-end">
                <div className="p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="font-medium">{image.category}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
