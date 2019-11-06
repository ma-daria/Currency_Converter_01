let express = require('express');
let router = express.Router();
const axios = require('axios');

/* GET home page. */
router.get('/', async function(req, res, next) {
  let  currency = await axios.get('https://www.cbr-xml-daily.ru/daily_json.js');
  let currency_list = Object.keys(currency.data.Valute);
  currency_list.push('RUS');


  res.render('index', {
    mFrom: null,
    mTo: null,
    currency: currency_list
  });
});

module.exports = router;
