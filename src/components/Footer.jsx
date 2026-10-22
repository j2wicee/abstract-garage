import { business, telHref, smsHref, mailHref } from "../data/business";

const linkClass = "hover:text-white transition-colors duration-200";

export default function Footer({ links }) {
  return (
    <footer className="bg-[#0a0a0a] border-t border-zinc-800 px-6 pt-20 pb-10">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div>
            <p className="font-black uppercase text-white tracking-wide text-lg leading-tight mb-3">
              Abstract <span className="text-blue-500">Garage</span>
              <br />& Customs
            </p>
            <p className="text-zinc-500 text-sm">
              Private garage in {business.location.city},{" "}
              {business.location.region}. By appointment only, mobile service
              available.
            </p>
          </div>

          {/* Contact */}
          <div>
            <p className="text-blue-500 font-mono text-xs tracking-widest uppercase mb-4">
              Contact
            </p>
            <ul className="flex flex-col gap-2 text-zinc-400 text-sm">
              <li>
                <a href={telHref} className={linkClass}>
                  {business.phone.display}
                </a>
                {" · "}
                <a href={smsHref} className={linkClass}>
                  Text
                </a>
              </li>
              <li>
                <a href={mailHref} className={`${linkClass} break-all`}>
                  {business.email}
                </a>
              </li>
              {business.socials.map((social) => (
                <li key={social.href}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkClass}
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours */}
          <div>
            <p className="text-blue-500 font-mono text-xs tracking-widest uppercase mb-4">
              Hours
            </p>
            <ul className="flex flex-col gap-2 text-zinc-400 text-sm">
              {business.hours.map((h) => (
                <li key={h.days} className="flex justify-between gap-4 max-w-56">
                  <span>{h.days}</span>
                  <span>{h.time}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Site links */}
          <nav aria-label="Footer">
            <p className="text-blue-500 font-mono text-xs tracking-widest uppercase mb-4">
              Explore
            </p>
            <ul className="flex flex-col gap-2 text-zinc-400 text-sm">
              {links.map((link) => (
                <li key={link.id}>
                  <a href={`#${link.id}`} className={linkClass}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="border-t border-zinc-800 pt-8 flex flex-col md:flex-row justify-between gap-4 text-zinc-600 font-mono text-xs">
          <p>
            © {new Date().getFullYear()} {business.name}
          </p>
          <p className="uppercase tracking-widest">{business.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
