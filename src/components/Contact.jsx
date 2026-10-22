import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import emailjs from "@emailjs/browser";
import { business, telHref, smsHref, mailHref } from "../data/business";

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

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

const [weekdayHours, ...otherHours] = business.hours;

const contactInfo = [
  {
    label: "Location",
    value: `${business.location.city}, ${business.location.region}`,
    note: "It's a private garage, we'll send the address once you book",
  },
  {
    label: "Phone / Text",
    value: business.phone.display,
    href: telHref,
    note: (
      <>
        <a href={smsHref} className="text-blue-500 hover:text-white underline">
          Send a text
        </a>{" "}
        · Texting gets you the fastest reply
      </>
    ),
  },
  {
    label: "Email",
    value: business.email,
    href: mailHref,
    note: "We reply within 24 hours",
  },
  {
    label: "Hours",
    value: `${weekdayHours.days}: ${weekdayHours.time}`,
    note: otherHours.map((h) => `${h.days}: ${h.time}`).join(" · "),
  },
];

const emptyForm = {
  from_name: "",
  phone: "",
  email: "",
  vehicle: "",
  service: "",
  message: "",
};

const requiredFields = {
  from_name: "Please enter your name.",
  phone: "Please enter a phone number so we can reach you.",
  service: "Please pick the service you need.",
};

const inputClass =
  "bg-zinc-900 border text-white text-sm px-4 py-3 outline-none focus:border-blue-500 transition-colors duration-200 placeholder:text-zinc-600";

function Field({ id, label, error, children }) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className="text-zinc-500 font-mono text-xs tracking-widest uppercase"
      >
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="text-red-400 text-xs font-mono">
          {error}
        </p>
      )}
    </div>
  );
}

export default function Contact({ number }) {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, {
    once: true,
    margin: "0px 0px -80px 0px",
  });

  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | loading | success | error

  function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: undefined });
  }

  // Props shared by every input: id, value, error state wiring
  function fieldProps(name) {
    return {
      id: `contact-${name}`,
      name,
      value: form[name],
      onChange: handleChange,
      "aria-invalid": errors[name] ? true : undefined,
      "aria-describedby": errors[name] ? `contact-${name}-error` : undefined,
      className: `${inputClass} ${errors[name] ? "border-red-500" : "border-zinc-700"}`,
    };
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const newErrors = {};
    for (const [name, message] of Object.entries(requiredFields)) {
      if (!form[name].trim()) newErrors[name] = message;
    }
    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      document.getElementById(`contact-${Object.keys(newErrors)[0]}`)?.focus();
      return;
    }

    setStatus("loading");

    try {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form, {
        publicKey: EMAILJS_PUBLIC_KEY,
      });
    } catch (err) {
      console.error("Failed to send booking request:", err);
      setStatus("error");
      return;
    }

    setStatus("success");
    setForm(emptyForm);
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
          // {number} / Contact
        </motion.p>

        {/* Section title */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-white font-black uppercase leading-none text-4xl sm:text-5xl md:text-7xl mb-16"
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
                key={item.label}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                className="flex gap-5 items-start py-6 border-b border-zinc-800 last:border-none"
              >
                <div className="w-10 h-10 bg-zinc-900 border border-blue-500 flex items-center justify-center flex-shrink-0">
                  <span className="font-mono text-xs text-blue-500">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="min-w-0">
                  <p className="text-blue-500 font-mono text-xs tracking-widest uppercase mb-1">
                    {item.label}
                  </p>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-white font-bold text-base break-all hover:text-blue-500 transition-colors duration-200"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-white font-bold text-base">{item.value}</p>
                  )}
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

            {/* Status messages, announced to screen readers */}
            <div aria-live="polite">
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

              {status === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 border border-red-500 bg-zinc-900 p-4"
                >
                  <p className="text-red-400 font-mono text-xs tracking-widest uppercase">
                    Something went wrong. Please try again or{" "}
                    <a href={smsHref} className="underline">
                      text us directly
                    </a>
                    .
                  </p>
                </motion.div>
              )}
            </div>

            <form
              onSubmit={handleSubmit}
              noValidate
              className="flex flex-col gap-5"
            >
              {/* Name + Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field id="contact-from_name" label="Name" error={errors.from_name}>
                  <input
                    type="text"
                    autoComplete="name"
                    placeholder="Your name"
                    required
                    {...fieldProps("from_name")}
                  />
                </Field>
                <Field id="contact-phone" label="Phone" error={errors.phone}>
                  <input
                    type="tel"
                    autoComplete="tel"
                    placeholder="(910) 555-0000"
                    required
                    {...fieldProps("phone")}
                  />
                </Field>
              </div>

              <Field id="contact-email" label="Email (optional)">
                <input
                  type="email"
                  autoComplete="email"
                  placeholder="you@email.com"
                  {...fieldProps("email")}
                />
              </Field>

              <Field id="contact-vehicle" label="Vehicle">
                <input
                  type="text"
                  placeholder="Year, Make, Model (e.g. 2018 Honda Civic)"
                  {...fieldProps("vehicle")}
                />
              </Field>

              <Field id="contact-service" label="Service Needed" error={errors.service}>
                <select
                  required
                  {...fieldProps("service")}
                  className={`${fieldProps("service").className} appearance-none cursor-pointer`}
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
              </Field>

              <Field id="contact-message" label="Describe the Issue">
                <textarea
                  placeholder="What's going on with the car? Any sounds, warning lights, or symptoms..."
                  rows={4}
                  {...fieldProps("message")}
                  className={`${fieldProps("message").className} resize-none`}
                />
              </Field>

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={status === "loading"}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-zinc-700 disabled:cursor-not-allowed text-white font-mono text-xs tracking-widest uppercase py-4 mt-2"
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
