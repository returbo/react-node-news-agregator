const unirest = require('unirest');
const cheerio = require('cheerio');

function riadagestan() {
    unirest.get('https://www.riadagestan.ru/news/education/v_detdomakh_dagestana_otmetili_mezhdunarodnyy_den_zashchity_detey/')
        .end(function (response) {

            const body = response.body;
            const $ = cheerio.load(body);

            const title = $('.itemTitle').text().trim();
            const image = 'https://www.riadagestan.ru' + $('.preview_picture').attr('src');
            const text = $('#qaz').text().trim().replace(/[\n+\t]/g, '');
            const views = $('.itemHits b').text().trim();

            const post = {
                title,
                image,
                text,
                views,
            }
        });
}



function groznyinform() {
    unirest.get('https://www.grozny-inform.ru/news/society/119579/')
    .end(function (response) {

        const body = response.body;
        const $ = cheerio.load(body);

        const title = $('.news h1').text().trim();
        const image = 'https://www.grozny-inform.ru' + $('.imgB img').attr('src');
        const text = $('.news p').text().trim();
        // const views = $('???').text();

        const post = {
            title,
            image,
            text,
            views: 0,
        }
    });
}



function magastimes() {
    unirest.get('http://magastimes.ru/ingushskie-sudby-v-ekspozicii-gosudarstvennogo-muzeya-istorii-gulaga/')
    .end(function (response) {

        const body = response.body;
        const $ = cheerio.load(body);

        const title = $('.td-post-title .entry-title').text();
        // const image = $('???').attr('src');
        const text = $('.td-post-content p').text().trim();
        const views = $('.td-post-views span').text();

        const post = {
            title,
            image: "https://unsplash.it/250/250?random&i=0",
            text,
            views,
        }

    });
}

function parsePost(url, titleClass, imageClass, textClass, viewsCalss) {
    unirest.get(url).end(function (response) {

        const body = response.body;
        const $ = cheerio.load(body);

        const domain = url.match(/https/);
        const title = $(titleClass).text().trim();
        const image = $(imageClass).attr('src');


        const text = $(textClass).text().trim();
        const views = $(viewsCalss).text().trim();

        const post = {
            title,
            image,
            text,
            views,
        }

        console.log(post);
    });
}