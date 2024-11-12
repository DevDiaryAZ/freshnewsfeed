export const categoryIds: { [index: string]: number } = {
  index: 0,
  technologies: 1,
  sport: 2,
  fashion: 3,
  politics: 4,
};

export const categoryNames: { [index: string]: string } = {
  index: 'Главная',
  fashion: 'Мода',
  technologies: 'Технологии',
  sport: 'Спорт',
  politics: 'Политика',
};

export const beautifyDate = (date: string): string => {
  return new Date(date).toLocaleDateString('ru-RU', {
    month: 'long',
    day: 'numeric',
  });
};