import { lazy, Suspense, useRef } from "react";
import {
  motion,
  motionValue,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { business } from "../data/business";

const HeroScene = lazy(() => import("./HeroScene"));

const isSmallScreen =
  typeof window !== "undefined" &&
  window.matchMedia("(max-width: 768px)").matches;

// Stand-in when there's no scroll progress (reduced motion), so hooks
// still run in the same order
const NO_PROGRESS = motionValue(0);

// 0 before `start`, 1 after `end`, linear in between
const between = (p, start, end) =>
  Math.min(1, Math.max(0, (p - start) / (end - start)));

// Solid blue sides angled down-left, matching the logo's extruded look.
// Stacked hard shadows in em units so the depth scales with the font size.
const EXTRUDE = Array.from({ length: 12 }, (_, i) => {
  const d = ((i + 1) * 0.0045).toFixed(4);
  return `-${d}em ${d}em 0 ${i < 9 ? "#1d4ed8" : "#172554"}`;
}).join(", ");

// Each letter's "level" (em, + is down). Letters drop in from these
// heights on load and split back out to them as the logo assembles.
const LETTER_LEVELS = [-0.3, 0.2, -0.12, 0.34, -0.24, 0.12, -0.36, 0.26];

function Letter({ char, level, index, progress }) {
  const splitY = useTransform(progress ?? NO_PROGRESS, (p) =>
    `${level * between(p, 0, 0.3)}em`
  );

  return (
    <motion.span
      className="inline-block"
      initial={{ y: `${level * 1.8}em`, opacity: 0 }}
      animate={{ y: "0em", opacity: 1 }}
      transition={{
        y: { type: "spring", stiffness: 130, damping: 13, delay: 0.2 + index * 0.06 },
        opacity: { duration: 0.3, delay: 0.2 + index * 0.06 },
      }}
    >
      <motion.span
        className="inline-block"
        style={progress ? { y: splitY } : undefined}
      >
        {char}
      </motion.span>
    </motion.span>
  );
}

function AbstractWord({ progress }) {
  return (
    <span
      aria-hidden="true"
      className="block text-white font-black tracking-tight"
      style={{ fontSize: "clamp(3.5rem, 14vw, 11rem)", textShadow: EXTRUDE }}
    >
      {"Abstract".split("").map((char, i) => (
        <Letter
          key={i}
          char={char}
          level={LETTER_LEVELS[i]}
          index={i}
          progress={progress}
        />
      ))}
    </span>
  );
}

// "Mechanics on a different level": the logo starts split across depth
// levels and locks together as the visitor scrolls. The section is two
// screens tall with a pinned (sticky) frame, so the first screen of
// scrolling drives the assembly. With reduced motion it's a normal,
// static one-screen hero.
export default function Hero() {
  const ref = useRef(null);
  const inView = useInView(ref);
  const reducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  // Function transforms (not range arrays) keep these fades in JS instead of
  // handing them to native scroll-linked animations, so every browser
  // behaves the same.
  const introOpacity = useTransform(scrollYProgress, (p) => 1 - between(p, 0, 0.3));
  const introY = useTransform(scrollYProgress, (p) => -60 * between(p, 0, 0.3));
  const introPointer = useTransform(scrollYProgress, (p) =>
    p < 0.25 ? "auto" : "none"
  );
  const captionOpacity = useTransform(scrollYProgress, (p) => between(p, 0.7, 0.95));
  const cueOpacity = useTransform(scrollYProgress, (p) => 1 - between(p, 0, 0.08));

  return (
    <section
      id="top"
      ref={ref}
      className={`relative bg-[#0a0a0a] ${reducedMotion ? "h-svh" : "h-[200svh]"}`}
    >
      <div className="sticky top-0 h-svh overflow-hidden flex items-center justify-center">
        {/* 3D logo: fades in once three.js has loaded */}
        <motion.div
          aria-hidden="true"
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        >
          <Suspense fallback={null}>
            <HeroScene
              progress={scrollYProgress}
              active={inView}
              lite={isSmallScreen}
              still={reducedMotion}
            />
          </Suspense>
        </motion.div>

        {/* Darkens the middle so the headline reads over the logo pieces */}
        <motion.div
          aria-hidden="true"
          style={{ opacity: introOpacity }}
          className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(10,10,10,0.75)_0%,rgba(10,10,10,0.35)_45%,transparent_75%)]"
        />

        {/* Intro: headline + CTA, fades out as the logo assembles */}
        <motion.div
          style={reducedMotion ? undefined : { opacity: introOpacity, y: introY }}
          className="relative z-10 text-center px-6"
        >
          {/* The name leads so it sticks; the slogan supports it */}
          <h1 className="uppercase leading-none mb-6">
            <span className="sr-only">Abstract </span>
            <AbstractWord progress={reducedMotion ? null : scrollYProgress} />
            <span className="block text-blue-500 font-mono text-xs md:text-sm tracking-[0.5em] mt-3 mb-8 md:mb-10">
              Garage & Customs
            </span>
            <span
              className="block text-white font-black"
              style={{ fontSize: "clamp(1.5rem, 4.5vw, 3.75rem)" }}
            >
              Mechanics On A{" "}
              <span className="text-blue-500">Different Level.</span>
            </span>
          </h1>
          <p className="text-zinc-400 text-sm tracking-widest uppercase font-mono mb-10">
            {business.location.city}, {business.location.region} · By Appointment
          </p>

          <motion.a
            href="#contact"
            style={reducedMotion ? undefined : { pointerEvents: introPointer }}
            className="inline-block border border-blue-500 text-blue-500 bg-[#0a0a0a]/60
            font-mono text-xs tracking-widest uppercase px-8 py-4 hover:bg-blue-500
            hover:text-white transition-colors duration-300"
          >
            Book a Service →
          </motion.a>
        </motion.div>

        {!reducedMotion && (
          <>
            {/* Scroll cue */}
            <motion.div
              aria-hidden="true"
              style={{ opacity: cueOpacity }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 pointer-events-none"
            >
              <span className="text-zinc-500 font-mono text-[10px] tracking-[0.3em] uppercase">
                Scroll
              </span>
              <span className="block w-px h-10 bg-gradient-to-b from-blue-500 to-transparent" />
            </motion.div>

            {/* Caption under the assembled logo */}
            <motion.div
              style={{ opacity: captionOpacity }}
              className="absolute bottom-[8svh] inset-x-0 text-center px-6 pointer-events-none"
            >
              <p className="text-white font-black uppercase tracking-wide text-xl md:text-3xl leading-none">
                Abstract <span className="text-blue-500">Garage</span> & Customs
              </p>
              <p className="text-zinc-500 font-mono text-xs tracking-[0.3em] uppercase mt-3">
                {business.tagline}
              </p>
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
}
