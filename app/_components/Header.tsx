import { Button } from "@/components/ui/button";
import { Menu, Phone, MapPin } from "lucide-react";

export function Header() {
  return (
    <header className="bg-white/95 backdrop-blur-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold text-primary">
              Luxe Hair Studio
            </h1>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <a href="#home" className="hover:text-primary transition-colors">
              Нүүр
            </a>
            <a
              href="#services"
              className="hover:text-primary transition-colors"
            >
              Үйлчилгээ
            </a>
            <a href="#team" className="hover:text-primary transition-colors">
              Бид
            </a>
            <a href="#gallery" className="hover:text-primary transition-colors">
              Блог
            </a>
            <a href="#contact" className="hover:text-primary transition-colors">
              Холбогдох
            </a>
          </nav>

          <div className="hidden lg:flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Phone className="w-4 h-4" />
              <span>77779999</span>
            </div>
            <Button>Цагаа цахимаар захиалаарай</Button>
          </div>

          <Button variant="ghost" size="sm" className="md:hidden">
            <Menu className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
