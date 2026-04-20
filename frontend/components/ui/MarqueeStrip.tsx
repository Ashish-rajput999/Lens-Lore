type MarqueeStripProps = {
  items: string[];
};

export function MarqueeStrip({ items }: MarqueeStripProps) {
  const repeated = [...items, ...items];

  return (
    <section className="border-y border-black bg-ivory py-4 text-black">
      <div className="overflow-hidden">
        <div className="marquee-track flex w-max items-center">
          {[0, 1].map((group) => (
            <div key={group} className="flex shrink-0 items-center gap-8 pr-8">
              {repeated.map((item, index) => (
                <span
                  key={`${group}-${item}-${index}`}
                  className="flex items-center gap-8 font-mono text-[0.72rem] uppercase tracking-[0.28em]"
                >
                  <span>{item}</span>
                  <span className="text-black/40">/</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
