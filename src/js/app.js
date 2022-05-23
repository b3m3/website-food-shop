import webp from './lib/webp.js';
import burger from './modules/burger.js';
import tabs from './modules/tabs.js';
import select from './modules/select.js';
import createPoducts from './modules/create-products.js';

document.addEventListener('DOMContentLoaded', () => {
  webp();
  burger();
  tabs();
  select();
  createPoducts();
});