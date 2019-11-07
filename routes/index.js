let express = require('express');
let router = express.Router();
const axios = require('axios');

router.get('/', async function(req, res, next) {
  let  currency = await axios.get('https://www.cbr-xml-daily.ru/daily_json.js');



  let currencyList = Object.keys(currency.data.Valute);
  currencyList.push('RUS');


  res.render('index', {
    mFrom: null,
    mTo: null,
    currencyFrom: currencyList,
    currencyTo: currencyList
  });
});

module.exports = router;
