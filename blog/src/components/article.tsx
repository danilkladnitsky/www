import { formatDate } from '@/utils/formatDate';
import React from 'react'

interface ArticleProps {
    children: React.ReactNode;
}

export const Article = ({ children }: ArticleProps) => {
  return (
    <article className="p-8 pt-8">
        {children}
    </article>
  )
}

interface ArticleHeaderProps {
    date: string;
    category: string;
}

const ArticleHeader = ({ date, category }: ArticleHeaderProps) => {
  return (
    <header className="flex gap-2 text-md text-muted">
      <p>{formatDate(date)}</p>
      <span className="text-muted-foreground">•</span>
        <p>{category}</p>
    </header>
  )
}

interface ArticleContentProps {
    children: React.ReactNode;
}

const ArticleContent = ({ children }: ArticleContentProps) => {
  return (
    <div className="prose prose-neutral dark:prose-invert prose-headings:font-semibold prose-a:text-neutral-900 prose-a:underline dark:prose-a:text-neutral-100 max-w-none">
        {children}
    </div>
  )
}

Article.Header = ArticleHeader;
Article.Content = ArticleContent;