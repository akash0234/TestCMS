import ArticleSelect from "@/app/[lang]/components/ArticleSelect";
import { fetchAPI } from "@/app/[lang]/utils/fetch-api";

async function fetchSideMenuData(filter: string) {
  try {
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
    const options = { headers: { Authorization: `Bearer ${token}` } };

    const articleCategoriesResponse = await fetchAPI(
      "/article-categories",
      { populate: "*" },
      options
    );
    const articlesResponse = await fetchAPI(
      "/articles",
      filter
        ? {
            filters: {
              articleCategory: {
                name: filter,
              },
            },
          }
        : {},
      options
    );

    return {
      articles: articlesResponse.data,
      articleCategories: articleCategoriesResponse.data,
    };
  } catch (error) {
    console.error(error);
  }
}


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

interface Data {
  articles: Article[];
  articleCategories: articleCategory[];
}

export default async function LayoutRoute({
  params,
  children,
}: {
  children: React.ReactNode;
  params: {
    slug: string;
    articleCategory: string;
  };
}) {
  const { articleCategory } = params;
  const { articleCategories, articles } = (await fetchSideMenuData(articleCategory)) as Data;

  return (
    <section className="container p-8 mx-auto space-y-6 sm:space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 lg:gap-4">
        <div className="col-span-2">{children}</div>
        <aside>
          <ArticleSelect
            articleCategories={articleCategories}
            articles={articles}
            params={params}
          />
        </aside>
      </div>
    </section>
  );
}

export async function generateStaticParams() {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
  const path = `/articles`;
  const options = { headers: { Authorization: `Bearer ${token}` } };
  const articleResponse = await fetchAPI(
    path,
    {
      populate: ["articleCategory"],
    },
    options
  );

  return articleResponse.data.map(
    (article: {
      attributes: {
        slug: string;
        articleCategory: {
          slug: string;
        };
      };
    }) => ({ slug: article.attributes.slug, articleCategory: article.attributes.slug })
  );
}
