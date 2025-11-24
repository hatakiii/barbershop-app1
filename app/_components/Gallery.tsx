import Image from "next/image";

const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1653241625670-3a1e643464ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dGlmdWwlMjBoYWlyJTIwY29sb3IlMjB0cmFuc2Zvcm1hdGlvbnxlbnwxfHx8fDE3NTU0MTk5NDd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    alt: "Beautiful hair color transformation",
    category: "Color",
  },
  {
    src: "https://images.unsplash.com/photo-1493775379751-a6c3940f3cbc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHlsaXNoJTIwaGFpcmN1dCUyMHdvbWFufGVufDF8fHx8MTc1NTQxOTk0OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    alt: "Stylish haircut",
    category: "Cut & Style",
  },
  {
    src: "https://images.unsplash.com/photo-1594039284778-b6443907408b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYWlyJTIwc3R5bGluZyUyMHdlZGRpbmclMjB1cGRvfGVufDF8fHx8MTc1NTQxOTk0OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    alt: "Wedding updo styling",
    category: "Special Events",
  },
  {
    src: "https://images.unsplash.com/photo-1629136627594-428799f827e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBoYWlyJTIwc2Fsb24lMjBlcXVpcG1lbnR8ZW58MXx8fHwxNzU1NDE5OTQ4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    alt: "Modern salon equipment",
    category: "Our Salon",
  },
  {
    src: "https://images.unsplash.com/photo-1511920593290-3cb2deb1ce1c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYWlyc3R5bGlzdCUyMGN1dHRpbmclMjBoYWlyfGVufDF8fHx8MTc1NTQxNjU2Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    alt: "Professional hair service",
    category: "Our Work",
  },
  {
    src: "https://images.unsplash.com/photo-1647462741268-e5724e5886c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYWlyJTIwc2Fsb24lMjBzZXJ2aWNlcyUyMHN0eWxpbmd8ZW58MXx8fHwxNzU1NDE5OTA3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    alt: "Hair salon services",
    category: "Styling",
  },
];

export function Gallery() {
  return (
    <section id="gallery" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Our Work</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            See the transformations and artistry that make our clients feel
            beautiful and confident.
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
