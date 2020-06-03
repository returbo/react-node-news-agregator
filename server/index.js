import parsePost from './parsePost';
import { elems } from './configs';

parsePost(
    'https://www.riadagestan.ru/news/education/v_detdomakh_dagestana_otmetili_mezhdunarodnyy_den_zashchity_detey/', 
    elems.riadagestan
    );

// parsePost(
//     'http://magastimes.ru/ingushskie-sudby-v-ekspozicii-gosudarstvennogo-muzeya-istorii-gulaga/',
//     elems.magastimes
// );

console.log('test lol');