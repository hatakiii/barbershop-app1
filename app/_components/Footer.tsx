import { Instagram, Facebook, Phone, Mail, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer id="contact" className="bg-primary text-white py-14">
      <div className="container mx-auto px-4">
        {/* TOP */}
        <div className="grid gap-10 md:grid-cols-4">
          {/* LEFT – BRAND + DESC */}
          <div className="md:col-span-2 space-y-4">
            <h3 className="text-2xl font-bold">Luxe Hair Studio</h3>
            <p className="text-gray-300 max-w-md">
              Ажилтны бүтээлч ур чадвараар үйлчилгээний стандартыг хүргэж,
              хэрэглэгчдэд давтагдашгүй сэтгэл ханамжийг бэлэглэнэ.
            </p>
          </div>

          {/* MIDDLE – CONTACT */}
          <div className="space-y-4">
            <h4 className="text-sm uppercase tracking-widest text-gray-400">
              Холбоо барих
            </h4>

            <div className="flex items-center gap-3 text-gray-300">
              <Phone className="w-4 h-4 text-accent" />
              <a
                href="tel:+97699112233"
                className="hover:text-white transition-colors"
              >
                +976 99 11 22 33
              </a>
            </div>

            <div className="flex items-center gap-3 text-gray-300">
              <Mail className="w-4 h-4 text-accent" />
              <a
                href="mailto:info@luxehair.mn"
                className="hover:text-white transition-colors"
              >
                info@luxehair.mn
              </a>
            </div>
          </div>

          {/* RIGHT – SOCIAL */}
          <div className="space-y-4 md:text-right">
            <h4 className="text-sm uppercase tracking-widest text-gray-400">
              Follow us
            </h4>

            <div className="flex md:justify-end gap-4">
              <a
                href="#"
                className="hover:text-accent transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-6 h-6" />
              </a>
              <a
                href="#"
                className="hover:text-accent transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-6 h-6" />
              </a>
              <a
                href="#"
                className="hover:text-accent transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="border-t border-white/10 mt-10 pt-6 text-center text-sm text-gray-400">
          <p>© 2025 Luxe Hair Studio. Бүх эрх хуулиар хамгаалагдсан.</p>
        </div>
      </div>
    </footer>
  );
}
