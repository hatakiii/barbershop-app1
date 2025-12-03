import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Clock, Mail } from "lucide-react";
import Map from "./Map";

export function Contact() {
  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Холбоо барих</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
  
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div className="space-y-8">
            <div className="grid sm:grid-cols-2 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-3 mb-3">
                    <MapPin className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold">Хаяг:</h3>
                  </div>
                  <p className="text-muted-foreground">
                Салбар 1: Шангри-Ла Худалдааны төв, 2 давхар, Ulemj Grease салон
                    <br />
                  Салбар 2: Шангри-Ла Худалдааны төв, B1 давхар, Good Price дэлгүүр дотор
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-3 mb-3">
                    <Phone className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold">Утас: </h3>
                  </div>
                  <p className="text-muted-foreground">77779999</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-3 mb-3">
                    <Clock className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold">Цаг</h3>
                  </div>
                  <div className="text-muted-foreground space-y-1">
                    <p>Mon-Fri: 9AM - 8PM</p>
                    <p>Saturday: 9AM - 6PM</p>
                    <p>Sunday: 10AM - 5PM</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-3 mb-3">
                    <Mail className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold">И-мэйл хаяг: </h3>
                  </div>
                  <p className="text-muted-foreground">
                    info@luxehairstudio.com
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-semibold">
            Харилцагч, хамтран ажиллагч танд баярлалаа
              </h3>
              <p className="text-muted-foreground">
               Бид үйл ажиллагаа явуулж буй салбар бүртээ
манлайлагч нь байна.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="flex-1">
                 Цагаа цахимаар захиалаарай
                </Button>
                <Button variant="outline" size="lg" className="flex-1">
                Холбоо барих
                </Button>
              </div>
            </div>
          </div>

          <div className="bg-gray-100 rounded-lg aspect-video flex items-center justify-center">
            <Map />
          </div>
        </div>
      </div>
    </section>
  );
}
