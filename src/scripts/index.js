import '../styles/index.scss';
import './modules/script.js';
import './modules/templateBook.js';
if (process.env.NODE_ENV === 'development') {
  require('../index.html');
}

console.log('webpack starterkit');
