import { lazy, Suspense, useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { business } from "../data/business";

const HeroScene = lazy(() => import("./HeroScene"));

const isSmallScreen =
  typeof window !== "undefined" &&
  window.matchMedia("(max-width: 768px)").matches;

export default function Hero() {
  const ref = useRef(null);
  const inView = useInView(ref);
  const reducedMotion = useReducedMotion();

  return (
    <div
      id="top"
      ref={ref}
      className="relative w-full h-svh bg-[#0a0a0a] flex items-center justify-center overflow-hidden"
    >
      {/* 3D Canvas: fades in once three.js and the model have loaded */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      >
        <Suspense fallback={null}>
          <HeroScene
            active={inView}
            lite={isSmallScreen}
            still={reducedMotion}
          />
        </Suspense>
      </motion.div>

      {/* Hero Text */}
      <div className="relative z-10 text-center px-6 pointer-events-none">
        <p className="text-blue-500 text-xs tracking-[0.4em] uppercase font-mono mb-6">
          {business.name}
        </p>
        <h1
          className="text-white font-black uppercase leading-none mb-6"
          style={{ fontSize: "clamp(2.5rem, 8vw, 7rem)" }}
        >
          Mechanics On A<br />
          <span className="text-blue-500">Different Level.</span>
        </h1>
        <p className="text-zinc-400 text-sm tracking-widest uppercase font-mono mb-10">
          {business.location.city}, {business.location.region} · By Appointment
        </p>

        <a
          href="#contact"
          className="pointer-events-auto inline-block border border-blue-500 text-blue-500
          font-mono text-xs tracking-widest uppercase px-8 py-4 hover:bg-blue-500
          hover:text-white transition-all duration-300"
        >
          Book a Service →
        </a>
      </div>
    </div>
  );
}
