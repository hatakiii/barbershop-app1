import React, { useState, useRef } from "react";

// HaircutWheelComponent.tsx (TypeScript version)
// Spinner wheel for haircut selection (React + Tailwind)

interface Hairstyle {
  id: number;
  name: string;
  subtitle: string;
}

export function HaircutWheel() {
  const hairstyles: Hairstyle[] = [
    { id: 1, name: "Skin Fade", subtitle: "Clean sides, soft top" },
    { id: 2, name: "Crew Cut", subtitle: "Low-maintenance classic" },
    { id: 3, name: "French Crop", subtitle: "Textured fringe" },
    { id: 4, name: "Pompadour", subtitle: "Volume & style" },
    { id: 5, name: "Undercut", subtitle: "Sharp contrast" },
    { id: 6, name: "Buzz Cut", subtitle: "Very short & bold" },
    { id: 7, name: "Mullet", subtitle: "Retro & edgy" },
    { id: 8, name: "Textured Crop", subtitle: "Modern textured look" },
  ];

  const segmentAngle = 360 / hairstyles.length;
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [selected, setSelected] = useState<Hairstyle | null>(null);
  const wheelRef = useRef<SVGSVGElement | null>(null);

  function getRandomIndex(): number {
    return Math.floor(Math.random() * hairstyles.length);
  }

  function spin() {
    if (isSpinning) return;
    setSelected(null);
    setIsSpinning(true);

    const index = getRandomIndex();

    const fullSpins = 6;
    const targetSegmentCenter = index * segmentAngle + segmentAngle / 2;
    const finalRotation = fullSpins * 360 + (360 - targetSegmentCenter);

    const wheel = wheelRef.current;
    if (!wheel) return;

    wheel.style.transition = "transform 4s cubic-bezier(.17,.67,.31,1)";
    wheel.style.transform = `rotate(${finalRotation}deg)`;

    const handleEnd = () => {
      wheel.style.transition = "";
      const normalized = finalRotation % 360;
      wheel.style.transform = `rotate(${normalized}deg)`;

      setTimeout(() => {
        setSelected(hairstyles[index]);
        setIsSpinning(false);
      }, 50);

      wheel.removeEventListener("transitionend", handleEnd);
    };

    wheel.addEventListener("transitionend", handleEnd);
  }

  function resetWheel() {
    const wheel = wheelRef.current;
    if (!wheel) return;
    wheel.style.transition = "transform 0.4s ease";
    wheel.style.transform = `rotate(0deg)`;
    setSelected(null);
    setIsSpinning(false);
  }

  return (
    <div className="max-w-xl mx-auto p-4">
      <h3 className="text-2xl font-semibold text-center mb-3">
        Хүрд эргүүлж өөрт тохирох засалтаа ол!
      </h3>

      <div className="relative flex items-center justify-center">
        <div className="absolute top-0 -mt-6 w-0 h-0 border-l-8 border-r-8 border-b-12 border-transparent border-b-red-500"></div>

        <div className="w-72 h-72 rounded-full shadow-lg overflow-hidden flex items-center justify-center bg-white">
          <svg
            ref={wheelRef}
            width="288"
            height="288"
            viewBox="0 0 288 288"
            className="transform"
            style={{ borderRadius: "50%" } as React.CSSProperties}
          >
            <g transform="translate(144 144)">
              {hairstyles.map((h, i) => {
                const startAngle = i * segmentAngle - 90;
                const endAngle = (i + 1) * segmentAngle - 90;
                const a0 = (startAngle * Math.PI) / 180;
                const a1 = (endAngle * Math.PI) / 180;
                const large = segmentAngle > 180 ? 1 : 0;

                const x0 = Math.cos(a0) * 140;
                const y0 = Math.sin(a0) * 140;
                const x1 = Math.cos(a1) * 140;
                const y1 = Math.sin(a1) * 140;

                const path = `M 0 0 L ${x0} ${y0} A 140 140 0 ${large} 1 ${x1} ${y1} Z`;
                const textAngle = startAngle + segmentAngle / 2;

                return (
                  <g key={h.id}>
                    <path
                      d={path}
                      fill={i % 2 === 0 ? "#FDE68A" : "#FED7AA"}
                      stroke="#fff"
                    />
                    <g transform={`rotate(${textAngle}) translate(80 0)`}>
                      <text
                        x="0"
                        y="0"
                        fontSize="10"
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        {h.name}
                      </text>
                    </g>
                  </g>
                );
              })}
            </g>
          </svg>

          <div className="absolute">
            <button
              onClick={spin}
              disabled={isSpinning}
              className={`px-4 py-2 rounded-full shadow-md font-semibold ${
                isSpinning
                  ? "opacity-60 cursor-not-allowed"
                  : "bg-red-500 text-white"
              }`}
            >
              {isSpinning ? "Эргүүлж байна..." : "Эргүүл!"}
            </button>
          </div>
        </div>
      </div>

      <div className="mt-5 text-center">
        {selected ? (
          <div className="inline-block bg-white shadow p-4 rounded-lg">
            <h4 className="text-lg font-bold">
              Сонгосон засалт: {selected.name}
            </h4>
            <p className="text-sm text-gray-600">{selected.subtitle}</p>
            <div className="mt-3 flex gap-2 justify-center">
              <button className="px-3 py-1 rounded bg-green-500 text-white font-medium">
                Book Now
              </button>
              <button onClick={resetWheel} className="px-3 py-1 rounded border">
                Try Again
              </button>
            </div>
          </div>
        ) : (
          <p className="text-sm text-gray-500">
            "Эргүүл" товч дарж өөрт тохирох засалтаа олно уу.
          </p>
        )}
      </div>
    </div>
  );
}
