import fetch from 'node-fetch';
import { JSDOM } from 'jsdom';

export default async (req, res) => {
  const { query } = req;
  if (!query.url) {
    return res.status(404).end();
  }

  const url = Array.isArray(query.url) ? query.url[0] : query.url;

  if (!url.match(/https?:\/\/[-_.!~*\'()a-zA-Z0-9;\/?:\@&=+\$,%#]+/g)) {
    return res.status(400).end();
  }

  try {
    const result = await fetch(url)
      .then((data) => {
        if (!data.ok) {
          throw new Error(`${data.status}: ${data.statusText}`);
        }
        return data.text();
      })
      .then((text) => {
        const dom = new JSDOM(text);
        const meta = dom.window.document.querySelectorAll(`head > meta`);

        return Array.from(meta)
          .filter((el) => {
            const isProperty = el.hasAttribute('property');
            const property = el.getAttribute('property');
            return (
              isProperty &&
              !property.includes('twitter') &&
              !property.includes('fb')
            );
          })
          .reduce((pre, ogp) => {
            const property = ogp
              .getAttribute('property')
              .trim()
              .replace('og:', '');
            const content = ogp.getAttribute('content');

            return { ...pre, [property]: content };
          }, {});
      });
    console.log(result);
    res.setHeader('Cache-Control', 'max-age=0, s-maxage=86400');

    return res.status(200).json(result);
  } catch (error) {
    return res.status(200).json(error);
  }
};
