"use client";
import React from "react";

const hairstyles = [
  {
    id: "hs001",
    name: "Modern Curtain Fringe",
    description:
      "Салбарласан урт челктэй, бага зэрэг texture өгөсөн, залуу, минималistic look. Өөрчлөлт хийхэд хялбар.",
    category: "Fringe / Bangs",
    length: "Medium",
    gender: "Unisex",
    popularity_score: 92,
    image_url: "https://placehold.co/600x400?text=Modern+Curtain+Fringe",
    tags: ["curtain bangs", "textured", "soft"],
    recommended_face_shapes: ["Oval", "Heart", "Round"],
    color_variations: ["Warm Brown", "Honey Blonde", "Rich Black"],
    created_at: "2025-02-10",
  },
  {
    id: "hs002",
    name: "Textured French Crop",
    description:
      "Богино талдаа, дээд талдаа текстур ихтэй, low-maintenance, fades-тай хослуулж хамгийн их тренд.",
    category: "Crop",
    length: "Short",
    gender: "Male",
    popularity_score: 89,
    image_url: "https://placehold.co/600x400?text=Textured+French+Crop",
    tags: ["french crop", "textured top", "fade"],
    recommended_face_shapes: ["Square", "Oval"],
    color_variations: ["Matte Brown", "Platinum Blonde"],
    created_at: "2025-03-01",
  },
  {
    id: "hs003",
    name: "Soft Shag with Layers",
    description:
      "70-аад оны эффекттэй, давхарга ихтэй, хөдөлгөөнтэй, salon-д их зарагдах загваруудын нэг.",
    category: "Shag",
    length: "Medium-Long",
    gender: "Female",
    popularity_score: 90,
    image_url: "https://placehold.co/600x400?text=Soft+Shag+with+Layers",
    tags: ["shag", "layers", "retro"],
    recommended_face_shapes: ["Oval", "Diamond"],
    color_variations: ["Copper Red", "Sandy Blonde", "Chestnut"],
    created_at: "2025-01-20",
  },
  {
    id: "hs004",
    name: "Modern Mullet (Clean Neck)",
    description:
      "Эридийн шинэчлэгдсэн муллет — цэвэр ар тал, урт дээд тал, edgy стильтэй хүмүүсэд тохирно.",
    category: "Mullet",
    length: "Medium-Long",
    gender: "Unisex",
    popularity_score: 82,
    image_url: "https://placehold.co/600x400?text=Modern+Mullet",
    tags: ["mullet", "edgy", "contrast"],
    recommended_face_shapes: ["Oval", "Long"],
    color_variations: ["Jet Black", "Ash Blonde"],
    created_at: "2025-04-10",
  },
  {
    id: "hs005",
    name: "Skin Fade + Curly Top",
    description:
      "Ар тал нь skin fade, дээд тал нь байгалийн чёлк болон үсний текстуртай хослогдсон төрх.",
    category: "Fade + Curls",
    length: "Short-Medium",
    gender: "Male",
    popularity_score: 88,
    image_url: "https://placehold.co/600x400?text=Skin+Fade+Curly+Top",
    tags: ["skin fade", "curls", "contrast"],
    recommended_face_shapes: ["Oval", "Square"],
    color_variations: ["Natural Black", "Dark Brown"],
    created_at: "2025-05-05",
  },
  {
    id: "hs006",
    name: "Long Layered Beach Waves",
    description:
      "Урт, зөөлөн давхарга, beach-waves текстуртэй — зуны улиралд хамгийн их эрэлттэй.",
    category: "Waves",
    length: "Long",
    gender: "Female",
    popularity_score: 86,
    image_url: "https://placehold.co/600x400?text=Long+Beach+Waves",
    tags: ["beach waves", "layers", "glossy"],
    recommended_face_shapes: ["Oval", "Round"],
    color_variations: ["Caramel Blonde", "Balayage"],
    created_at: "2025-06-12",
  },
  {
    id: "hs007",
    name: "Buzz Cut with Skin Design",
    description:
      "Классик buzz cut дээр нарийн шугам/пattern оруулсан, minimal гэхдээ statement төрх.",
    category: "Buzz / Skin",
    length: "Very Short",
    gender: "Male",
    popularity_score: 78,
    image_url: "https://placehold.co/600x400?text=Buzz+Cut+Design",
    tags: ["buzz cut", "hair design", "minimal"],
    recommended_face_shapes: ["Square", "Oval"],
    color_variations: ["Natural Black"],
    created_at: "2025-02-28",
  },
  {
    id: "hs008",
    name: "Curtain Bob",
    description:
      "Урт челктэй богино bob — элегант, ажил хэрэгч, social media-д их харагдсан.",
    category: "Bob",
    length: "Short-Medium",
    gender: "Female",
    popularity_score: 91,
    image_url: "https://placehold.co/600x400?text=Curtain+Bob",
    tags: ["bob", "curtain bangs", "chic"],
    recommended_face_shapes: ["Heart", "Oval"],
    color_variations: ["Platinum", "Golden Brown"],
    created_at: "2025-03-30",
  },
  {
    id: "hs009",
    name: "Disconnected Undercut",
    description:
      "Тод контрастатай undercut, дээд тал урт, styling-тай хослуулж хүчтэй эффект өгнө.",
    category: "Undercut",
    length: "Short-Medium",
    gender: "Unisex",
    popularity_score: 80,
    image_url: "https://placehold.co/600x400?text=Disconnected+Undercut",
    tags: ["undercut", "disconnected", "statement"],
    recommended_face_shapes: ["Oval", "Long"],
    color_variations: ["Ash Brown", "Jet Black"],
    created_at: "2025-04-18",
  },
  {
    id: "hs010",
    name: "Blunt Lob with Glassy Finish",
    description:
      "Нэг хэмжигдсэн blunt cut, shoulder-length, glassy smooth finish — minimal yet polished.",
    category: "Lob",
    length: "Medium",
    gender: "Female",
    popularity_score: 87,
    image_url: "https://placehold.co/600x400?text=Blunt+Lob+Glassy",
    tags: ["lob", "blunt", "glossy"],
    recommended_face_shapes: ["Oval", "Round", "Heart"],
    color_variations: ["Chocolate Brown", "Warm Blonde"],
    created_at: "2025-05-22",
  },
];

export function HairstyleGallery() {
  return (
    <section className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">2025 оны тренд үс засалтууд</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {hairstyles.map((h) => (
          <article
            key={h.id}
            className="bg-white rounded-2xl shadow-md overflow-hidden"
          >
            <div className="h-44 md:h-52 bg-gray-100 overflow-hidden">
              <img
                src={h.image_url}
                alt={h.name}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>

            <div className="p-4">
              <h3 className="font-semibold text-lg">{h.name}</h3>
              <p className="text-sm text-gray-600 mt-1 line-clamp-3">
                {h.description}
              </p>

              <div className="flex items-center justify-between mt-3">
                <div className="text-xs text-gray-500">
                  {h.category} · {h.length}
                </div>
                <div className="text-xs font-medium text-gray-700">
                  ⭐ {h.popularity_score}
                </div>
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                {h.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-1 bg-gray-100 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
