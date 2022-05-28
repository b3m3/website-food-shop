import webp from './lib/webp.js';
import burger from './modules/burger.js';
import {tabs, pruductsMenuTab} from './modules/tabs.js';
import select from './modules/select.js';
import createPoducts from './modules/create-products.js';
import cartEvents from './modules/cart-events.js';
import formSubmission from './modules/form-submission.js';

document.addEventListener('DOMContentLoaded', () => {
  webp();
  burger();
  select();
  createPoducts();
  cartEvents();
  formSubmission();
  tabs();
  pruductsMenuTab();
});