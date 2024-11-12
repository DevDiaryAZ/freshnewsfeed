import React, { FC } from 'react';
import { Item } from '../../types';
import './RelatedSmallArticle.css';
import { Link } from 'react-router-dom';

interface Props {
  id: number;
  article: Item;
  category: string;
  source: string;
}

export const RelatedSmallArticle: FC<Props> = ({ id, article, category, source }) => {
  return (
    <Link to={`/article/${id}`} className="related-small-article">
      <article className="related-small-article__container">
        <img className="related-small-article__image" src={article.image} alt="" />
        <div className="related-small-article__content">
          <span className="article-category related-small-article__category">{category}</span>
          <h2 className="related-small-article__title">{article.title}</h2>
          <span className="article-source related-small-article__source">{source}</span>
        </div>
      </article>
    </Link>
  );
};
