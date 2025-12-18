"use client";

import { CalendarCheck, Scissors, Star, Sparkles } from "lucide-react";

export default function WhyChooseLuxe() {
  return (
    <section id="bid" className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-14 text-center">
          <p className="mb-3 text-xs uppercase tracking-widest text-muted-foreground">
            Яагаад Luxe Hair Studio вэ?
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground">
            Таны хэв маягт тохирсон
            <br />
            <span className="text-indigo-400">ухаалаг сонголт</span>
          </h2>
        </div>

        {/* 4 FEATURES */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard
            icon={<CalendarCheck className="h-6 w-6" />}
            title="Хурдан, ойлгомжтой захиалга"
            text="Цаг захиалах процесс ердөө хэдхэн алхамтай."
          />

          <FeatureCard
            icon={<Scissors className="h-6 w-6" />}
            title="Мэргэжлийн шилдэг үсчид"
            text="Туршлагатай, баталгаатай барбер, стилистууд."
          />

          <FeatureCard
            icon={<Star className="h-6 w-6" />}
            title="Бодит хэрэглэгчдийн үнэлгээ"
            text="Үнэлгээ, review дээр үндэслэн сонголтоо хийнэ."
          />

          <FeatureCard
            icon={<Sparkles className="h-6 w-6" />}
            title="Тренд үс засалтын санаанууд"
            text="Орчин үеийн стиль, inspiration gallery."
          />
        </div>
      </div>
    </section>
  );
}

/* CARD */
function FeatureCard({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="group rounded-2xl bg-transparent p-6 shadow-sm transition-all duration-300">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
        {icon}
      </div>

      <h4 className="mb-2 font-medium text-foreground">{title}</h4>

      <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
    </div>
  );
}
