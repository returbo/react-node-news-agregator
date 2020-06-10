import unirest from "unirest";
import cheerio from "cheerio";
import { elems } from './configs';

const log = (i, count, ms) => new Promise(r => setTimeout(() => {
    console.log(`
        ИНДЕКС: ${i};
        Всего записей: ${count}
    `)
}, ms));

function parsePost(url, { title, image, attr, text, views }) {
    return new Promise((resolve, reject) => {

        unirest.get(url).end(({ body, error }) => {
            if (error) reject(error);

            const $ = cheerio.load(body);

            const parseDomain = url.match(/\/\/(.*?)\//)[1];
            const parseTitle = $(title).text().trim();
            let parseImage = $(image).attr(attr);
            parseImage = parseImage.indexOf('http') >= 0
                ? parseImage
                : `http://${parseDomain}/${parseImage}`;
            const parseText = $(text).text().trim().replace(/[\n+\t]/g, '');
            const parseViews = $(views).text().trim();

            const post = {
                parseTitle,
                parseImage,
                parseText,
                parseViews,
            }

            resolve(post);
        });
    });
}

function parseLinks(url, className, maxLinks = 5) {
    return new Promise((resolve, reject) => {
        let links = [];

        unirest.get(url).end(({ body, error }) => {
            if (error) reject(error);

            const $ = cheerio.load(body);
            const parseDomain = url.match(/[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,9}/)[0];

            $(className).each((i, e) => {
                if (i + 1 <= maxLinks) {
                    let link = $(e).attr('href');
                    link = link.indexOf('http') >= 0
                        ? link
                        : `http://${parseDomain}${link}`;
                    links.push(link);
                }
            });

            resolve(links);
            if (!links.length) reject({ error: 'empty' });
        });
    });
}

async function getPosts(links) {
    return new Promise(async (resolve, reject) => {

        let posts = [];
        let count = links.length;

        for (let i = 0; i < count; i++) {
            const post = await parsePost(
                links[i],
                elems.riadagestan
            ).then(post => post);
            posts.push(post);
            await log(i, count, 2000);
        }

        if (!posts.length) reject({ error: 'empty' });
        resolve(posts);
    })
}


export { parsePost, parseLinks, getPosts }