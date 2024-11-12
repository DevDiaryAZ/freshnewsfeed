export interface ArticlesAPI {
  sources: Source[];
  categories: Category[];
  items: Item[];
}

export interface Source {
  id: number;
  name: string;
}

export interface Category {
  id: number;
  name: string;
}

export interface Item {
  id: number;
  lang: string;
  date: string;
  title: string;
  description: string;
  image: string;
  source_id: number;
  category_id: number;
}

export interface ArticleAPI {
  id: number;
  lang: string;
  date: string;
  title: string;
  description: string;
  image: string;
  link: string;
  author: string;
  text: string;
  category: Category;
  source: Source;
}

export interface RelatedArticlesAPI {
  items: Item[];
}
