import ArticleCard from "@/components/ArticleCard";
import ArticleListGrid from "@/components/articlelistpage/ArticleListGrid";
import { fetchArticleList } from "@/queries/queries";

// React Server Components (RSC)
//  ausgeführt: auf dem Server + im Build-Prozess
//  NICHT ausgeführt: im Browser
//  -> Default in Next.js

export default async function ArticleListPage() {
  // ... process.env.VERY_SECRET_API_KEY
  //     SQL

  console.log("ArticleListPage rendering!");

  const articleList = await fetchArticleList();

  return (
    <div className={"container mx-auto"}>
      <ArticleListGrid>
        {articleList.articles.map((a) => (
          <ArticleCard key={a.id} article={a} />
        ))}
      </ArticleListGrid>
    </div>
  );
}
