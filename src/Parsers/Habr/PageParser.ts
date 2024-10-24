import {parse} from 'node-html-parser';

type FullOrder = {
  title?: string;
  description?: string;
  price?: string;
  views?: string;
  responses?: string;
  published?: string;
  tags?: string[];
  url?: string;
};

export function PageParse(url: string) {
  let res: FullOrder = {};
  fetch(url)
    .then(result => result.text())
    .then(text => {
      const dom = parse(text);
      const title = dom.querySelector('.task__title ')?.textContent.trim();
      const price = dom.querySelector('.task__finance')?.textContent.trim();
      const tags = Array.from(dom.querySelectorAll('.tags__item_link')).map(
        tag => tag.textContent.trim(),
      );
      const description = dom
        .querySelector('.task__description')
        ?.textContent.trim();
      const metaText = dom.querySelector('.task__meta')?.textContent.trim();
      if (metaText) {
        const [published, responses, views] = metaText
          .trim()
          .replaceAll('\n', '')
          .split('•');
        res = {
          published,
          responses,
          views,
          description,
          title,
          price,
          tags,
          url,
        };
      }
    });
  return res;
}
