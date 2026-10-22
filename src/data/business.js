// Single source of truth for business details. Used by the header, contact
// section, footer, and the structured data injected into index.html.

export const business = {
  name: "Abstract Garage & Customs",
  tagline: "Mechanics On A Different Level",
  description:
    "Private auto repair garage in Aberdeen, NC. Tune-ups, oil changes, brakes and suspension, A/C repair, custom installs, and mobile mechanic service. By appointment.",

  // Set once the site has a domain, e.g. "https://abstractgarage.com"
  url: "",

  phone: {
    display: "(910) 960-7008",
    e164: "+19109607008",
  },
  email: "abstractgarage2@gmail.com",

  location: {
    city: "Aberdeen",
    region: "NC",
    country: "US",
  },

  hours: [
    { days: "Mon – Fri", time: "8AM – 6PM", schema: "Mo-Fr 08:00-18:00" },
    { days: "Sat", time: "9AM – 3PM", schema: "Sa 09:00-15:00" },
    { days: "Sun", time: "Closed" },
  ],

  owner: {
    name: "",
    // Path under /public, e.g. "/images/owner.jpg"
    photo: "",
  },

  // e.g. [{ label: "Instagram", href: "https://instagram.com/..." }]
  socials: [],
};

export const telHref = `tel:${business.phone.e164}`;
export const smsHref = `sms:${business.phone.e164}`;
export const mailHref = `mailto:${business.email}`;

export function structuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    name: business.name,
    description: business.description,
    telephone: business.phone.e164,
    email: business.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: business.location.city,
      addressRegion: business.location.region,
      addressCountry: business.location.country,
    },
    areaServed: `${business.location.city}, ${business.location.region}`,
    openingHours: business.hours.filter((h) => h.schema).map((h) => h.schema),
  };
  if (business.url) data.url = business.url;
  if (business.socials.length) data.sameAs = business.socials.map((s) => s.href);
  return data;
}
