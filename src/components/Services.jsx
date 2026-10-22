import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const services = [
  {
    number: "01",
    name: "Small Engine Repair",
    desc: "Straightforward engine fixes that don't need a full rebuild, minor leaks, belts, hoses, the small issues that are easy to ignore until they aren't.",
  },
  {
    number: "02",
    name: "Tune-Ups",
    desc: "Plugs, filters, fluids, belts. The basics that keep your car running smoothly and catch small problems before they get expensive.",
  },
  {
    number: "03",
    name: "Oil Change",
    desc: "Quick, done right, and we'll tell you if anything else needs attention while we're already under there.",
  },
  {
    number: "04",
    name: "Brakes & Suspension",
    desc: "Pads, rotors, calipers, shocks, struts. Everything it takes to keep you safe on the road.",
  },
  {
    number: "05",
    name: "A/C Repair",
    desc: "A recharge, compressor work, or a full diagnosis if your air isn't blowing cold anymore.",
  },
  {
    number: "06",
    name: "Custom Installations",
    desc: "Stereo systems, lighting, performance parts, and more. If it can be installed, we can talk about it.",
  },
];

// This is a single service card component
function ServiceCard({ service, index }) {
  const ref = useRef(null);

  // useInView detects when the card enters the screen
  const isInView = useInView(ref, {
    once: true, // only animate once
    margin: "0px 0px -100px 0px", // triggers slightly before fully in view
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }} // starts invisible and 60px below
      animate={
        isInView
          ? { opacity: 1, y: 0 } // animates to visible when in view
          : { opacity: 0, y: 60 } // stays hidden if not in view
      }
      transition={{
        duration: 0.6,
        delay: index * 0.1, // each card staggers by 0.1s
        ease: "easeOut",
      }}
      className="group relative border border-zinc-800 bg-zinc-900 p-8 hover:border-blue-500 hover:bg-zinc-800 transition-colors duration-300"
    >
      <div className="mb-6">
        <span className="font-mono text-xs text-zinc-600 tracking-widest">
          {service.number}
        </span>
      </div>

      {/* Service name */}
      <h3 className="font-black text-white uppercase text-xl tracking-wide mb-3">
        {service.name}
      </h3>

      {/* Description */}
      <p className="text-zinc-400 text-sm">{service.desc}</p>

      {/* Bottom blue line that grows on hover */}
      <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-blue-500 group-hover:w-full transition-all duration-500" />
    </motion.div>
  );
}

export default function Services({ number }) {
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true });

  return (
    <section id="services" className="bg-[#0a0a0a] py-32 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div ref={titleRef} className="mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-blue-500 font-mono text-xs tracking-[0.3em] uppercase mb-6"
          >
            // {number} / Services
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-white font-black uppercase text-4xl sm:text-5xl md:text-7xl leading-none"
          >
            What We
            <br />
            <span className="text-blue-500">Work On</span>
          </motion.h2>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-800">
          {services.map((service, index) => (
            <ServiceCard key={service.number} service={service} index={index} />
          ))}
        </div>

        {/* Mobile mechanic callout */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 bg-blue-500 p-10 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left"
        >
          <div>
            <p className="text-white font-mono text-xs tracking-[0.3em] uppercase mb-3">
              Mobile Service
            </p>
            <h3 className="text-white font-black uppercase text-3xl md:text-4xl leading-none mb-3">
              We Also Come To You
            </h3>
            <p className="text-white/90 max-w-md">
              Can't make it to the garage? Ask about mobile mechanic service,
              we'll come to your home or office for select repairs.
            </p>
          </div>
          <a
            href="#contact"
            className="inline-block flex-shrink-0 border border-white text-white font-mono text-xs tracking-widest uppercase px-8 py-4 hover:bg-white hover:text-blue-500 transition-all duration-300"
          >
            Ask About Mobile Service →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
