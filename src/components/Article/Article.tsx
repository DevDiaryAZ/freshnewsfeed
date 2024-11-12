import React from 'react';
import { RelatedSmallArticle } from '../RelatedSmallArticle/RelatedSmallArticle';
import { SingleLineTitleArticle } from '../SingleLineTitleArticle/SingleLineTitleArticle';
import { ArticleAPI, Category, RelatedArticlesAPI, Source } from '../../types';
import { beautifyDate } from '../../utils';
import './Article.css';
import { useParams } from 'react-router-dom';
import { ArticleItemInfo } from '../ArticleItemInfo/ArticleItemInfo';

export const Article: React.FC = () => {
  const { id }: { id?: string } = useParams();
  const [article, setArticle] = React.useState<ArticleAPI | null>(null);
  const [relatedArticles, setRelatedArticles] = React.useState<RelatedArticlesAPI | null>(null);
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [sources, setSources] = React.useState<Source[]>([]);

  React.useEffect(() => {
    fetch('https://frontend.karpovcourses.net/api/v2/news/full/' + id)
      .then((response) => response.json())
      .then((response: ArticleAPI) => setArticle(response));

    //TODO поменять запрос, когда заработает
    //  fetch(' https://frontend.karpovcourses.net/api/v2/news/related/' + id + '?count=9').then(response => response.json()).then((response: RelatedArticlesAPI) => setRelatedArticles(response));
    Promise.all([
      fetch('https://frontend.karpovcourses.net/api/v2/ru/news/').then((response) => response.json()),
      fetch('https://frontend.karpovcourses.net/api/v2/categories').then((response) => response.json()),
      fetch('https://frontend.karpovcourses.net/api/v2/sources').then((response) => response.json()),
    ]).then((res) => {
      const articles: RelatedArticlesAPI = { items: res[0].items };
      const categories: Category[] = res[1];
      const sources: Source[] = res[2];

      setRelatedArticles(articles);
      setCategories(categories);
      setSources(sources);
    });
  }, [id]);

  if (article === null || relatedArticles === null) {
    return null;
  }

  const renderArticleItemInfo = (articleItem: ArticleAPI): React.ReactElement => {
    return (
      <ArticleItemInfo
        categoryName={articleItem.category.name}
        date={beautifyDate(articleItem.date)}
        sourceLink={articleItem.link}
        sourceName={articleItem.source?.name}
        author={articleItem.author}
      />
    );
  };

  return (
    <section className="article-page">
      <article className="article">
        {article.image && (
          <section className="article__hero" style={{ backgroundImage: `url(${article.image})` }}>
            <div className="container article__hero-content">
              <div className="grid">
                <h1 className="article__hero-title">{article.title}</h1>
              </div>
              {renderArticleItemInfo(article)}
            </div>
          </section>
        )}

        <div className="grid container article__main">
          <div className="article__content">
            {!article.image && (
              <div className="article__title-container">
                <h1 className="article__title">{article.title}</h1>
                {renderArticleItemInfo(article)}
              </div>
            )}

            <p>{article.text}</p>
          </div>

          <div className="article__small-column">
            {relatedArticles.items &&
              relatedArticles.items.slice(11, 17).map((article) => {
                const category = categories.find(({ id }) => article.category_id === id);
                const source = sources.find(({ id }) => article.source_id === id);

                return (
                  <RelatedSmallArticle
                    key={article.id}
                    id={article.id}
                    article={article}
                    category={category?.name || ''}
                    source={source?.name || ''}
                  />
                );
              })}
          </div>
        </div>
      </article>

      <section className="article-page__related-articles">
        <div className="container">
          <h2 className="article-page__related-articles-title">Читайте также:</h2>

          <div className="grid article-page__related-articles-list">
            {relatedArticles.items.slice(8, 11).map((article) => {
              const category = categories.find(({ id }) => article.category_id === id);
              const source = sources.find(({ id }) => article.source_id === id);

              return (
                <SingleLineTitleArticle
                  key={article.id}
                  id={article.id}
                  article={article}
                  category={category?.name || ''}
                  source={source?.name || ''}
                />
              );
            })}
          </div>
        </div>
      </section>
    </section>
  );
};
