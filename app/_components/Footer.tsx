import { Instagram, Facebook, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <h3 className="text-2xl font-bold mb-4">Luxe Hair Studio</h3>
            <p className="text-gray-300 mb-4">
              Aжилтны бүтээлч ур чадвараар үйлчилгээний стандартыг хүргэж,
              хэрэглэгчдэд давтагдашгүй сэтгэл ханамжийг бэлэглэнэ
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-accent transition-colors">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-accent transition-colors">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-accent transition-colors">
                <Twitter className="w-6 h-6" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4"></h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a
                  href="#services"
                  className="hover:text-white transition-colors"
                >
                  Үйлчилгээ
                </a>
              </li>
              <li>
                <a href="#team" className="hover:text-white transition-colors">
                  Бид
                </a>
              </li>
              <li>
                <a
                  href="#gallery"
                  className="hover:text-white transition-colors"
                >
                  Блог
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="hover:text-white transition-colors"
                >
                  Холбогдох
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; Luxe Hair Studio 2025. Зохиогчийн эрх хамгаалагдсан.</p>
        </div>
      </div>
    </footer>
  );
}
