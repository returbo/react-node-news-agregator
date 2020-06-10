import { parseLinks, getPosts, parsePost } from './parsePost';
import fs from 'fs';
import { elems } from './configs';








// const saveResult = (json) => {
//     fs.writeFile('result.json', json, (err) => {
//         if (err) console.log('NOT SAVED!')
//     });
// };

// const urlPage = 'http://magastimes.ru';

// parseLinks(urlPage, '.td-module-title a')
// .then(links => {
//     getPosts(links).then(posts => saveResult(posts));
// }).catch(e => console.log(e));




// --- Работает ---

// parseLinks('http://magastimes.ru', '.td_block_16 .td-module-title a').then(links => console.log(links));

// parseLinks('https://www.riadagestan.ru', '.b-mid-col__layout li a' ).then(links => console.log(links));

// --- Работает ---

// parsePost(
//     'http://magastimes.ru/i-vremenem-ne-vylechit-toj-boli-s-kakoj-smotreli-gory-gorcam-vsled/',
//     elems.magastimes
// ).then(post => console.log(post));

// parsePost('https://www.riadagestan.ru/news/education/v_detdomakh_dagestana_otmetili_mezhdunarodnyy_den_zashchity_detey/',
//     elems.riadagestan
// ).then(post => console.log(post));
