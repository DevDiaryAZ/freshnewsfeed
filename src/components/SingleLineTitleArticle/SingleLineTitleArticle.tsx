import React, { FC } from 'react';
import { Item } from '../../types';
import './SingleLineTitleArticle.css';
import { Link } from 'react-router-dom';

interface Props {
  id: number;
  article: Item;
  category: string;
  source: string;
}

export const SingleLineTitleArticle: FC<Props> = ({ id, article, category, source }) => {
  return (
    <Link to={`/article/${id}`} className="single-line-title-article">
      <article className="single-line-title-article__container">
        <img className="single-line-title-article__image" src={article.image} alt="" />
        <span className="article-category single-line-title-article__category">{category}</span>
        <h2 className="single-line-title-article__title">{article.title}</h2>
        <p className="single-line-title-article__text">{article.description}</p>
        <span className="article-source single-line-title-article__source">{source}</span>
      </article>
    </Link>
  );
};
