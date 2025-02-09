"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export default function HeroSection() {
  const { scrollY } = useScroll();


  // Анімація тексту та кнопки
  const yOffset = useTransform(scrollY, [0, 300, 500], [0, -300, -450]);

  return (
    <div
      className="relative h-[120vh] overflow-hidden bg-black"
    >
      {/* Фон */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/mainPageBackgrd.jpg')",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      />

      {/* Текст і кнопка */}
      <motion.div
        className="absolute inset-0 mb-40 flex flex-col items-center justify-end text-white pb-16"
        style={{
          y: yOffset, // Рух тексту та кнопки при скролі
        }}
      >
        <h1 className="text-5xl font-extrabold mb-5 tracking-wide text-center">
          MAKE WAVES
        </h1>
        <motion.button
          className="bg-[#484444] text-white font-semibold text-sm uppercase px-10 py-5 tracking-wide transition hover:bg-[#5a5a5a]"
        >
          SEE STYLES
        </motion.button>
      </motion.div>
    </div>
  );
}
