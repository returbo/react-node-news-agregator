import { parseLinks, getPosts } from './parsePost';
import fs from 'fs';
import { elems } from './configs';



const saveResult = (json, file) => {
    fs.writeFile(file, json, (err) => {
        if (err) console.log('NOT SAVED!')
    });
};


parseLinks('http://magastimes.ru', '.td_block_16 .td-module-title a', 15)
.then(links => {
    getPosts(links, elems.magastimes).then(posts => saveResult(JSON.stringify(posts, 0, 4), 'magastimes.json'));
}).catch(e => console.log(e));


parseLinks('https://www.riadagestan.ru', '.b-mid-col__layout li a', 15)
.then(links => {
    getPosts(links, elems.riadagestan).then(posts => saveResult(JSON.stringify(posts, 0, 4), 'riadegestan.json'));
}).catch(e => console.log(e));

