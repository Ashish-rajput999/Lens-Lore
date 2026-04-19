type PageIntroProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function PageIntro({ eyebrow, title, description }: PageIntroProps) {
  return (
    <div className="space-y-4">
      <p className="label-mono text-gold">{eyebrow}</p>
      <h1 className="max-w-4xl font-display text-5xl leading-[0.92] text-ivory sm:text-6xl lg:text-7xl">
        {title}
      </h1>
      <p className="max-w-2xl text-base leading-8 text-ivory/66 sm:text-lg">
        {description}
      </p>
    </div>
  );
}
