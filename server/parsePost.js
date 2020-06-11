import unirest from "unirest";
import cheerio from "cheerio";

const log = (i, count, ms) =>
    new Promise((resolve) => setTimeout( () => { 
        console.log(`
        ИНДЕКС: ${i};
        Всего записей: ${count}
        `);
        resolve();
        }, ms)
    );

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
                url,
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

            if (!links.length) reject({ error: 'NO LINKS!' });
            resolve(links);

        });
    });
}



async function getPosts(links, element) {
    return new Promise(async (resolve, reject) => {

        let posts = [];
        let count = links.length;

        for (let i = 0; i < count; i++) {
            const post = await parsePost(
                links[i],
                element
            ).then(post => post);
            posts.push(post);
            await log(i + 1, count, 500);
        }

        if (!posts.length) reject({ error: 'NO POSTS DATA SAVED!' });
        resolve(posts);
    })
}


export { parsePost, parseLinks, getPosts }