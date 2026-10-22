import { motion } from "framer-motion";
import { reviews } from "../data/content";

// Shown in dev only, while reviews is empty
const placeholders = Array.from({ length: 3 }, () => ({
  name: "Customer name",
  text: "Add real customer reviews in src/data/content.js. This section stays hidden on the live site until there's at least one.",
  detail: "Vehicle, service",
}));

export default function Reviews({ number }) {
  const items = reviews.length ? reviews : placeholders;
  const isPlaceholder = !reviews.length;

  return (
    <section id="reviews" className="bg-[#0a0a0a] py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-blue-500 font-mono text-xs tracking-[0.3em] uppercase mb-6"
        >
          // {number} / Reviews
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-white font-black uppercase text-4xl sm:text-5xl md:text-7xl leading-none mb-16"
        >
          Don't Take
          <br />
          <span className="text-blue-500">Our Word For It</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-zinc-800 border border-zinc-800">
          {items.map((review, i) => (
            <motion.figure
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -80px 0px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative bg-zinc-900 p-8 flex flex-col justify-between gap-8 ${
                isPlaceholder ? "border border-dashed border-zinc-700" : ""
              }`}
            >
              <div className="absolute top-0 left-0 w-12 h-[2px] bg-blue-500" />
              <blockquote className="text-zinc-300 text-base">
                “{review.text}”
              </blockquote>
              <figcaption>
                <p className="text-white font-bold text-sm uppercase tracking-wide">
                  {review.name}
                </p>
                {review.detail && (
                  <p className="text-zinc-500 font-mono text-xs tracking-widest uppercase mt-1">
                    {review.detail}
                  </p>
                )}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
