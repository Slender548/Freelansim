import {parse} from 'node-html-parser';

type Order = {
  title?: string;
  price?: string;
  views?: string;
  responses?: string;
  published?: string;
  tags: string[];
  url?: string;
};

export function SearchParse(query: string, page: string | number) {
  const res: Order[] = [];
  fetch(`https://freelance.habr.com/tasks?q=${query}&page=${page}`)
    .then(result => result.text())
    .then(text => {
      const dom = parse(text);
      dom
        .querySelectorAll('article')
        .forEach(jobListing => {
          const title = jobListing
            .querySelector('.task__title')
            ?.textContent.trim();
          const url = jobListing.querySelector('a')?.getAttribute('href');
          const responses = jobListing
            .querySelector('.params__responses')
            ?.textContent.trim();
          const views = jobListing
            .querySelector('.params__views')
            ?.textContent.trim();
          const published = jobListing
            .querySelector('.params__published-at')
            ?.textContent.trim();
          const price = jobListing
            .querySelector('.task__price')
            ?.textContent.trim() || 'Договорная';
          const tags = Array.from(
            jobListing.querySelectorAll('.tags__item_link'),
          ).map(tag => tag.textContent.trim());
          res.push({title, responses, views, published, price, tags, url});
        });
    });
  return res;
}
