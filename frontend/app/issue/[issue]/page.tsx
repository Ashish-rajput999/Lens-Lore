import Image from "next/image";
import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/magazine/ArticleCard";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { PageIntro } from "@/components/ui/PageIntro";
import { getIssueBySlug, issues } from "@/lib/site-data";

type IssuePageProps = {
  params: {
    issue: string;
  };
};

export default function IssuePage({ params }: IssuePageProps) {
  const issue = getIssueBySlug(params.issue);

  if (!issue) {
    notFound();
  }

  return (
    <PageWrapper>
      <section className="px-5 py-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl space-y-14">
          <PageIntro
            eyebrow={`Issue ${issue.issueNumber}`}
            title={issue.title}
            description={issue.dek}
          />

          <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr]">
            <div className="relative aspect-[4/5] overflow-hidden border border-ivory/12">
              <Image
                src={issue.coverImage}
                alt={issue.title}
                fill
                priority
                sizes="(min-width: 1024px) 35vw, 100vw"
                placeholder="blur"
                blurDataURL="data:image/svg+xml;base64,PHN2Zy8+"
                className="object-cover"
              />
            </div>
            <div className="space-y-8">
              <div className="grid gap-4 border border-ivory/12 bg-slate p-6 sm:grid-cols-3">
                <div>
                  <p className="label-mono">Month</p>
                  <p className="mt-3 font-display text-3xl text-ivory">{issue.month}</p>
                </div>
                <div>
                  <p className="label-mono">Year</p>
                  <p className="mt-3 font-display text-3xl text-ivory">{issue.year}</p>
                </div>
                <div>
                  <p className="label-mono">Stories</p>
                  <p className="mt-3 font-display text-3xl text-ivory">{issue.articles.length}</p>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                {issue.articles.map((story) => (
                  <ArticleCard key={story.slug} story={story} />
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-ivory/10 pt-10">
            <p className="label-mono text-gold">Issue Archive</p>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {issues.map((archiveIssue) => (
                <a
                  key={archiveIssue.slug}
                  href={`/issue/${archiveIssue.slug}`}
                  className="border border-ivory/12 p-5 transition-colors hover:border-gold"
                >
                  <p className="font-display text-3xl text-ivory">
                    Issue {archiveIssue.issueNumber}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-ivory/62">{archiveIssue.title}</p>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
