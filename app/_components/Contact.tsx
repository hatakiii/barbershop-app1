"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Phone, Mail, MapPin } from "lucide-react";
import Map from "./Map";

export function Contact() {
  return (
    <section id="contact" className="py-24 lg:py-32 bg-card">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Бидэнтэй холбогдоорой
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Цаг захиалах, байршил асуух эсвэл санал хүсэлт байвал бидэнтэй
            холбогдоорой.
          </p>
        </div>

        {/* Layout */}
        <div className="grid lg:grid-cols-2 gap-12 items-stretch">
          {/* LEFT – MAP */}
          <div className="rounded-2xl overflow-hidden bg-muted h-full min-h-[420px]">
            <Map />
          </div>

          {/* RIGHT – CONTACT INFO */}
          <div className="flex flex-col justify-between h-full min-h-[400px] py-4">
            {/* Address */}
            <Card className="border border-border hover:border-accent/50 transition-colors">
              <CardContent>
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-foreground" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground mb-0.5">Хаяг</h3>
                    <p className="text-sm text-muted-foreground leading-snug">
                      Салбар 1: Сүхбаатар дүүрэг, 1-р хороо
                    </p>
                    <p className="text-sm text-muted-foreground leading-snug">
                      Салбар 2: Шангри-Ла Худалдааны төв, B1 давхар
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Phone */}
            <Card className="border border-border hover:border-accent/50 transition-colors">
              <CardContent>
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center">
                    <Phone className="w-4 h-4 text-foreground" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground mb-0.5">Утас</h3>
                    <p className="text-sm text-muted-foreground leading-snug">
                      +976 7711-1234
                    </p>
                    <p className="text-sm text-muted-foreground leading-snug">
                      +976 9911-5678
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Email */}
            <Card className="border border-border hover:border-accent/50 transition-colors">
              <CardContent>
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center">
                    <Mail className="w-4 h-4 text-foreground" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground mb-0.5">
                      И-мэйл
                    </h3>
                    <p className="text-sm text-muted-foreground leading-snug">
                      info@luxehairstudio.com
                    </p>
                    <p className="text-sm text-muted-foreground leading-snug">
                      booking@luxehairstudio.com
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
