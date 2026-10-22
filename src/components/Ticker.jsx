const items = [
  "Abstract Garage & Customs",
  "Mechanics On A Different Level",
  "Small Engine Repair",
  "Tune-Ups",
  "Oil Change",
  "Brakes & Suspension",
  "A/C Repair",
  "Custom Installations",
  "Mobile Mechanic Available",
  "All Makes & Models",
  "Aberdeen, NC",
];

export default function Ticker() {
  return (
    // Decorative: everything here is repeated elsewhere on the page
    <div aria-hidden="true" className="w-full bg-blue-500 overflow-hidden py-3">
      <div className="flex whitespace-nowrap animate-ticker motion-reduce:animate-none">
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className="text-white font-mono text-xs tracking-widest uppercase mx-8"
          >
            {item}
            <span className="text-white mx-8">•</span>
          </span>
        ))}
      </div>
    </div>
  );
}
