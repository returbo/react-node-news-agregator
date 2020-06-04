import unirest from "unirest";
import cheerio from "cheerio";


 function parsePost(url, { title, image, attr, text, views }) {
    unirest.get(url).end( ( { body } ) => {

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

        console.log(post);
    });
}

export default parsePost;