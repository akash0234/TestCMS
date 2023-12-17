import Link from "next/link";

interface articleCategory {
  id: number;
  attributes: {
    categoryName: string;
    categoryIcon: Picture;
    slug: string;
    articles: {
      data: Array<{}>;
    };
  };
}
interface Picture {
  data: {
    id: string;
    attributes: {
      url: string;
      name: string;
      alternativeText: string;
    };
  };
}
interface Article {
  id: number;
  attributes: {
    title: string;
    slug: string;
  };
}

function selectedFilter(current: string, selected: string) {
  return current === selected
    ? "px-3 py-1 rounded-lg hover:underline dark:bg-violet-700 dark:text-gray-100"
    : "px-3 py-1 rounded-lg hover:underline dark:bg-violet-400 dark:text-gray-900";
}

export default function ArticleSelect({
  articleCategories,
  articles,
  params,
}: {
  articleCategories: articleCategory[];
  articles: Article[];
  params: {
    slug: string;
    articleCategory: string;
  };
}) {
  return (
    <div className="p-4 rounded-lg dark:bg-gray-900 min-h-[365px] relative">
      <h4 className="text-xl font-semibold">Browse By articleCategory</h4>

      <div>
        <div className="flex flex-wrap py-6 space-x-2 dark:border-gray-400">
          {articleCategories.map((articleCategory: articleCategory) => {
            if (articleCategory.attributes.articles.data.length === 0) return null;
            return (
              <Link
                href={`/blog/${articleCategory.attributes.slug}`}
                className={selectedFilter(
                  articleCategory.attributes.slug,
                  params.articleCategory
                )}
              >
                #{articleCategory.attributes.categoryName}
              </Link>
            );
          })}
          <Link href={"/blog"} className={selectedFilter("", "filter")}>
            #all
          </Link>
        </div>

        <div className="space-y-2">
          <h4 className="text-lg font-semibold">Other Posts You May Like</h4>
          <ul className="ml-4 space-y-1 list-disc">
            {articles.map((article: Article) => {
              return (
                <li>
                  <Link
                    rel="noopener noreferrer"
                    href={`/blog/${params.articleCategory}/${article.attributes.slug}`}
                    className={`${
                      params.slug === article.attributes.slug &&
                      "text-violet-400"
                    }  hover:underline hover:text-violet-400 transition-colors duration-200`}
                  >
                    {article.attributes.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
