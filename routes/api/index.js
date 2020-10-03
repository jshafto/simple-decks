const router = require('express').Router();

const routes = ['users','session', 'decks', 'categories', 'cards'];

for (let route of routes) {
  router.use(`/${route}`, require(`./${route}`));
}

module.exports = router;
