import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  {
    value: "10+",
    label: "Years of Experience",
  },
  {
    value: "All",
    label: "Makes & Models",
  },
  {
    value: "1:1",
    label: "Personal Service",
  },
  {
    value: "Local",
    label: "Aberdeen, NC",
  },
];

const pillars = [
  {
    title: "Straight answers, always",
    desc: "You'll know what's wrong and what it costs before we touch anything. No surprises.",
  },
  {
    title: "Your car gets full attention",
    desc: "No ticket numbers, no handing your car off to a stranger. The same person who finds the problem is the one who fixes it.",
  },
  {
    title: "Honest prices",
    desc: "No dealership markup, no padded labor hours. Just a fair price for the work that actually gets done.",
  },
  {
    title: "Built from passion",
    desc: "This didn't start as a business plan. It started with a love of cars, and that's still what drives the work.",
  },
];

// Animates each word in individually
function AnimatedHeadline({ text }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -80px 0px" });
  const words = text.split(" ");

  return (
    <h2
      ref={ref}
      className="text-white font-black uppercase leading-none text-5xl md:text-6xl lg:text-7xl"
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.5,
            delay: i * 0.08,
            ease: "easeOut",
          }}
          className="inline-block mr-4"
        >
          {word}
        </motion.span>
      ))}
    </h2>
  );
}

export default function About() {
  const cardRef = useRef(null);
  const cardInView = useInView(cardRef, {
    once: true,
    margin: "0px 0px -80px 0px",
  });

  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, {
    once: true,
    margin: "0px 0px -80px 0px",
  });

  return (
    <section className="bg-[#0a0a0a] py-32 px-6 relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section tag */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-blue-500 font-mono text-xs tracking-[0.3em] uppercase mb-6"
        >
          // 02 / About
        </motion.p>

        {/* Main two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-20">
          {/* Left: animated headline + subtext */}
          <div>
            <AnimatedHeadline text="Started in a backyard, not a boardroom." />
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-zinc-400 text-base mt-8 max-w-md"
            >
              Abstract Garage & Customs isn't a chain shop with a waiting room
              and someone trying to upsell you on services you don't need. It
              started with a Honda Prelude, a habit of taking things apart to
              see how they work, and years of learning the craft from scratch.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.65 }}
              className="text-zinc-400 text-base mt-4 max-w-md"
            >
              That same energy goes into every car that comes through the
              door now. It's a private garage, but the work is anything but
              small-time.
            </motion.p>

            {/* Blue accent badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="inline-block mt-8 border-l-2 border-blue-500 pl-4"
            >
              <p className="text-blue-500 font-mono text-xs tracking-widest uppercase">
                Started small. Still do it right.
              </p>
            </motion.div>
          </div>

          {/* Right: credibility card */}
          <motion.div
            ref={cardRef}
            initial={{ opacity: 0, x: 40 }}
            animate={cardInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative border border-zinc-800 bg-zinc-900 p-8"
          >
            {/* Top blue line accent */}
            <div className="absolute top-0 left-0 w-12 h-[2px] bg-blue-500" />

            <p className="text-zinc-500 font-mono text-xs tracking-widest uppercase mb-8">
              Why people keep coming back
            </p>

            <ul className="flex flex-col gap-0">
              {pillars.map((pillar, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={cardInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                  className="flex gap-4 items-start py-6 border-b border-zinc-800 last:border-none"
                >
                  {/* Arrow marker */}
                  <span className="text-blue-500 font-mono text-sm mt-0.5 flex-shrink-0">
                    →
                  </span>
                  <div>
                    <p className="text-white font-bold text-sm uppercase tracking-wide mb-1">
                      {pillar.title}
                    </p>
                    <p className="text-zinc-400 text-sm">
                      {pillar.desc}
                    </p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Stats row */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-px bg-zinc-800 border border-zinc-800"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={statsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-[#0a0a0a] p-8 flex flex-col items-center justify-center text-center"
            >
              <span className="font-black text-white text-4xl md:text-5xl uppercase leading-none mb-2">
                {stat.value}
              </span>
              <span className="text-zinc-500 font-mono text-xs tracking-widest uppercase">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
