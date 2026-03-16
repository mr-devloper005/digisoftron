'use client'

import { ArticleCard } from '@/components/cards/article-card'
import type { Article } from '@/types/post'

export default function ArticlesClient({ articles }: { articles: Article[] }) {
  return (
    <div className="py-8 lg:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Articles
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            In-depth stories and insights from our community of writers
          </p>
        </div>

        {articles.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article, index) => (
              <ArticleCard
                key={article.id}
                article={article}
                delay={index * 0.03}
              />
            ))}
          </div>
        ) : (
          <div className="py-12 text-center">
            <p className="text-lg text-muted-foreground">No articles found</p>
          </div>
        )}
      </div>
    </div>
  )
}
