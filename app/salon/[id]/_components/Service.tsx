"use client";

import { useState } from "react";

interface Service {
  id: number;
  price: number;
  services: {
    name: string | null;
  };
}

interface Props {
  services: Service[];
}

export default function Service({ services }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-20 md:py-28 px-6 max-w-4xl mx-auto">
      <div className="text-center mb-16">
        <p className="text-muted-foreground tracking-[0.2em] uppercase text-sm mb-4">
          Манай үйлчилгээ
        </p>
        <h2 className="font-serif text-4xl md:text-5xl text-foreground text-balance">
          Үйлчилгээний жагсаалт
        </h2>
      </div>

      <div className="divide-y divide-border border-y border-border">
        {services.map((ss, index) => (
          <div key={ss.id} className="group">
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full flex items-center justify-between py-6 text-left hover:bg-muted/30 transition-colors px-4 -mx-4"
            >
              <span className="text-lg md:text-xl text-foreground font-medium">
                {ss.services.name}
              </span>
              <span className="text-primary font-serif text-xl md:text-2xl">
                {ss.price}₮
              </span>
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
