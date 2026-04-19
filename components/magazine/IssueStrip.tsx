import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { MonthlyIssue } from "@/lib/site-data";

type IssueStripProps = {
  issue: MonthlyIssue;
};

export function IssueStrip({ issue }: IssueStripProps) {
  return (
    <section className="section-frame relative overflow-hidden bg-slate px-5 py-20 sm:px-8 lg:px-12">
      <div className="pointer-events-none absolute inset-x-0 top-4 text-center font-display text-[clamp(5rem,18vw,12rem)] leading-none text-ivory/5">
        ISSUE {issue.issueNumber}
      </div>

      <div className="relative mx-auto max-w-7xl space-y-10">
        <div className="space-y-3">
          <p className="label-mono text-gold">This Month&apos;s Issue</p>
          <h2 className="font-display text-5xl text-ivory sm:text-6xl">
            {issue.title}
          </h2>
        </div>

        <div className="flex gap-5 overflow-x-auto pb-3">
          {issue.articles.map((story) => (
            <Link
              key={story.slug}
              href={story.href}
              data-cursor="hover"
              className="group min-w-[290px] flex-1 border border-ivory/12 bg-black"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={story.image}
                  alt={story.title}
                  fill
                  sizes="(min-width: 1024px) 22vw, 70vw"
                  placeholder="blur"
                  blurDataURL={story.blurDataURL}
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </div>
              <div className="space-y-3 p-5">
                <p className="label-mono">{story.category}</p>
                <h3 className="font-display text-2xl text-ivory">{story.title}</h3>
                <div className="flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.35em] text-gold">
                  Read
                  <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
