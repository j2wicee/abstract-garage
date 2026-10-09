import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const services = [
  "Small Engine Repair",
  "Tune-Ups",
  "Oil Change",
  "Brakes & Suspension",
  "A/C Repair",
  "Custom Installations",
  "Mobile Mechanic Visit",
  "Not Sure / Need Diagnosis",
  "Other",
];

const contactInfo = [
  {
    label: "Location",
    value: "Aberdeen, NC",
    note: "It's a private garage, we'll send the address once you book",
  },
  {
    label: "Phone / Text",
    value: "(910) 000-0000",
    note: "Texting gets you the fastest reply",
  },
  {
    label: "Email",
    value: "abstractgarage2@gmail.com",
    note: "We reply within 24 hours",
  },
  {
    label: "Hours",
    value: "Mon – Fri: 8AM – 6PM",
    note: "Sat: 9AM – 3PM · Sun: Closed",
  },
];

export default function Contact() {
  const formRef = useRef(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, {
    once: true,
    margin: "0px 0px -80px 0px",
  });

  const [form, setForm] = useState({
    from_name: "",
    phone: "",
    email: "",
    vehicle: "",
    service: "",
    message: "",
  });

  const [status, setStatus] = useState("idle"); // idle | loading | success | error

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.from_name || !form.phone || !form.service) {
      alert("Please fill in your name, phone number, and service needed.");
      return;
    }

    setStatus("loading");

    // Placeholder: simulates a delay before showing success
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setStatus("success");
    setForm({
      from_name: "",
      phone: "",
      email: "",
      vehicle: "",
      service: "",
      message: "",
    });
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="bg-[#0a0a0a] py-32 px-6 relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section tag */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-blue-500 font-mono text-xs tracking-[0.3em] uppercase mb-6"
        >
          // 03 / Contact
        </motion.p>

        {/* Section title */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-white font-black uppercase leading-none text-5xl md:text-7xl mb-16"
        >
          Book Your
          <br />
          <span className="text-blue-500">Appointment</span>
        </motion.h2>

        {/* Two column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: contact info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-col gap-0"
          >
            {contactInfo.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                className="flex gap-5 items-start py-6 border-b border-zinc-800 last:border-none"
              >
                <div className="w-10 h-10 bg-zinc-900 border border-blue-500 flex items-center justify-center flex-shrink-0">
                  <span className="font-mono text-xs text-blue-500">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <div>
                  <p className="text-blue-500 font-mono text-xs tracking-widest uppercase mb-1">
                    {item.label}
                  </p>
                  <p className="text-white font-bold text-base">{item.value}</p>
                  <p className="text-zinc-500 text-xs mt-0.5 font-mono">
                    {item.note}
                  </p>
                </div>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="mt-8 border-l-2 border-blue-500 pl-4"
            >
              <p className="text-zinc-400 text-sm">
                By appointment only. Fill out the form and we'll reach out
                within 24 hours to confirm your booking and share the address.
              </p>
            </motion.div>
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative border border-zinc-800 bg-zinc-900 p-8"
          >
            <div className="absolute top-0 left-0 w-12 h-[2px] bg-blue-500" />

            {/* Success message */}
            {status === "success" && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 border border-blue-500 bg-zinc-900 p-4"
              >
                <p className="text-blue-500 font-mono text-xs tracking-widest uppercase">
                  Got it. We'll be in touch within 24 hours.
                </p>
              </motion.div>
            )}

            {/* Error message */}
            {status === "error" && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 border border-red-500 bg-zinc-900 p-4"
              >
                <p className="text-red-400 font-mono text-xs tracking-widest uppercase">
                  Something went wrong. Please try again or text us directly.
                </p>
              </motion.div>
            )}

            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="flex flex-col gap-5"
            >
              {/* Name + Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label className="text-zinc-500 font-mono text-xs tracking-widest uppercase">
                    Name
                  </label>
                  <input
                    type="text"
                    name="from_name"
                    value={form.from_name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                    className="bg-zinc-900 border border-zinc-700 text-white text-sm px-4 py-3 outline-none focus:border-blue-500 transition-colors duration-200 placeholder:text-zinc-600"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-zinc-500 font-mono text-xs tracking-widest uppercase">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="(704) 555-0000"
                    required
                    className="bg-zinc-900 border border-zinc-700 text-white text-sm px-4 py-3 outline-none focus:border-blue-500 transition-colors duration-200 placeholder:text-zinc-600"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="flex flex-col gap-2">
                <label className="text-zinc-500 font-mono text-xs tracking-widest uppercase">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@email.com"
                  className="bg-zinc-900 border border-zinc-700 text-white text-sm px-4 py-3 outline-none focus:border-blue-500 transition-colors duration-200 placeholder:text-zinc-600"
                />
              </div>

              {/* Vehicle */}
              <div className="flex flex-col gap-2">
                <label className="text-zinc-500 font-mono text-xs tracking-widest uppercase">
                  Vehicle
                </label>
                <input
                  type="text"
                  name="vehicle"
                  value={form.vehicle}
                  onChange={handleChange}
                  placeholder="Year, Make, Model (e.g. 2018 Honda Civic)"
                  className="bg-zinc-900 border border-zinc-700 text-white text-sm px-4 py-3 outline-none focus:border-blue-500 transition-colors duration-200 placeholder:text-zinc-600"
                />
              </div>

              {/* Service dropdown */}
              <div className="flex flex-col gap-2">
                <label className="text-zinc-500 font-mono text-xs tracking-widest uppercase">
                  Service Needed
                </label>
                <select
                  name="service"
                  value={form.service}
                  onChange={handleChange}
                  required
                  className="bg-zinc-900 border border-zinc-700 text-white text-sm px-4 py-3 outline-none focus:border-blue-500 transition-colors duration-200 appearance-none cursor-pointer"
                >
                  <option value="" disabled>
                    Select a service...
                  </option>
                  {services.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div className="flex flex-col gap-2">
                <label className="text-zinc-500 font-mono text-xs tracking-widest uppercase">
                  Describe the Issue
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="What's going on with the car? Any sounds, warning lights, or symptoms..."
                  rows={4}
                  className="bg-zinc-900 border border-zinc-700 text-white text-sm px-4 py-3 outline-none focus:border-blue-500 transition-colors duration-200 placeholder:text-zinc-600 resize-none"
                />
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={status === "loading"}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-blue-500 disabled:bg-zinc-700 disabled:cursor-not-allowed text-white font-mono text-xs tracking-widest uppercase py-4 mt-2"
              >
                {status === "loading" ? "Sending..." : "Send It →"}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
