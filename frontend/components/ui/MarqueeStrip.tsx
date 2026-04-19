type MarqueeStripProps = {
  items: string[];
};

export function MarqueeStrip({ items }: MarqueeStripProps) {
  const repeated = [...items, ...items];

  return (
    <section className="border-y border-black bg-ivory py-4 text-black">
      <div className="overflow-hidden whitespace-nowrap">
        <div className="marquee-track flex min-w-max gap-10 pr-10">
          {repeated.map((item, index) => (
            <span
              key={`${item}-${index}`}
              className="font-mono text-xs uppercase tracking-[0.45em]"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
