import { motion } from "framer-motion";
import { workItems } from "../data/content";

// Shown in dev only, while workItems is empty
const placeholders = Array.from({ length: 6 }, () => ({
  image: "",
  caption: "Add photos in src/data/content.js",
}));

function WorkTile({ item, index }) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
      className="group relative bg-zinc-900 overflow-hidden"
    >
      {item.image ? (
        <img
          src={item.image}
          alt={item.caption}
          loading="lazy"
          className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-500"
        />
      ) : (
        <div className="w-full aspect-[4/3] border border-dashed border-zinc-700 flex items-center justify-center">
          <span className="font-mono text-xs text-zinc-600 tracking-widest uppercase">
            Photo {String(index + 1).padStart(2, "0")}
          </span>
        </div>
      )}
      <figcaption className="p-4 border-t border-zinc-800 text-zinc-400 text-sm">
        {item.caption}
      </figcaption>
      <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-blue-500 group-hover:w-full transition-all duration-500" />
    </motion.figure>
  );
}

export default function Work({ number }) {
  const items = workItems.length ? workItems : placeholders;

  return (
    <section id="work" className="bg-[#0a0a0a] py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-blue-500 font-mono text-xs tracking-[0.3em] uppercase mb-6"
        >
          // {number} / Recent Work
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-white font-black uppercase text-4xl sm:text-5xl md:text-7xl leading-none mb-16"
        >
          Fresh Out
          <br />
          <span className="text-blue-500">The Garage</span>
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-800 border border-zinc-800">
          {items.map((item, i) => (
            <WorkTile key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
