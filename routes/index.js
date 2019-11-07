let express = require('express');
let router = express.Router();
const axios = require('axios');

router.get('/', async function(req, res, next) {
  let flag;
  let currencyList = [];
  console.log(process.env.TEST);
  let f = true;
  let  currency;
  try {
    currency = await axios.get(process.env.URL_VALUTE);
  } catch (e) {
    f = false;
    flag = "В данный момент сервис не доступен. Попробуйте позднее.";
    currencyList = [];
  }

  if (f) {
    if (currency.status >= 300) {
      flag = "В данный момент сервис не доступен. Попробуйте позднее.";
      currencyList = [];
    } else {
      flag = currency.data.Date;
      currencyList = Object.keys(currency.data.Valute);
      currencyList.push('RUS');
    }
  }


  res.render('index', {
    mFrom: null,
    mTo: null,
    currencyFrom: currencyList,
    currencyTo: currencyList,
    flag: flag
  });
});

module.exports = router;
