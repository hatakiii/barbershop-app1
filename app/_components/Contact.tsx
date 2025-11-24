import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Clock, Mail } from "lucide-react";

export function Contact() {
  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Visit Our Salon</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Located in the heart of downtown, we're here to make you look and
            feel your best.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div className="space-y-8">
            <div className="grid sm:grid-cols-2 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-3 mb-3">
                    <MapPin className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold">Address</h3>
                  </div>
                  <p className="text-muted-foreground">
                    123 Beauty Boulevard
                    <br />
                    Downtown, CA 90210
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-3 mb-3">
                    <Phone className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold">Phone</h3>
                  </div>
                  <p className="text-muted-foreground">(555) 123-4567</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-3 mb-3">
                    <Clock className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold">Hours</h3>
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
                    <h3 className="font-semibold">Email</h3>
                  </div>
                  <p className="text-muted-foreground">
                    info@luxehairstudio.com
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-semibold">
                Ready to Transform Your Look?
              </h3>
              <p className="text-muted-foreground">
                Book your appointment today and let our expert stylists create
                the perfect look for you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="flex-1">
                  Book Online
                </Button>
                <Button variant="outline" size="lg" className="flex-1">
                  Call Now
                </Button>
              </div>
            </div>
          </div>

          <div className="bg-gray-100 rounded-lg aspect-video flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <MapPin className="w-12 h-12 mx-auto mb-4" />
              <p>Interactive Map Coming Soon</p>
              <p className="text-sm">
                123 Beauty Boulevard, Downtown, CA 90210
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
