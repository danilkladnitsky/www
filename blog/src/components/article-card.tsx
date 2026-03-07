import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/utils/formatDate";
import type { ArticleMeta } from "@/utils/getArticles";

interface ArticleCardProps {
  article: ArticleMeta;
}

export function ArticleCard({ article }: ArticleCardProps) {
  const { slug, title, category, date, thumbnail } = article;
  const ariaLabel = `${title} - ${category} - ${formatDate(date)}`;

  return (
    <Link
      href={`/articles/${slug}`}
      aria-label={ariaLabel}
      className="group relative block w-full transition-opacity duration-200 ease-out hover:opacity-90"
    >
      <div className="relative w-full overflow-hidden rounded-md [&_img]:transition-transform [&_img]:duration-300 [&_img]:ease-out group-hover:[&_img]:scale-[1.025]">
        <div className="relative w-full" style={{ aspectRatio: "1 / 1" }}>
          {thumbnail ? (
            <Image
              src={thumbnail}
              alt=""
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          ) : (
            <div
              className="h-full w-full rounded-md bg-[var(--color-muted)]/20"
              aria-hidden
            />
          )}
        </div>
      </div>
      <div className="relative mt-2 w-full pt-2">
        <h2 className="mb-1 text-lg font-semibold leading-snug text-[var(--color-foreground)]">
          {title}
        </h2>
        <p className="flex flex-wrap gap-x-2 pt-2 gap-y-1 text-sm">
          <span>{category}</span>
          <time dateTime={date} className="whitespace-nowrap text-muted">
            {formatDate(date)}
          </time>
        </p>
      </div>
    </Link>
  );
}
