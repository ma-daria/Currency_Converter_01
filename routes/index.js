let express = require('express');
let router = express.Router();
const axios = require('axios');

/**
 * роут для страницы index пустая.
 */
router.get('/', async function(req, res) {

  let mas = await getValute();
  let flag = mas.flag;
  let currencyList = mas.currencyList;

  res.render('index', {
    mFrom: null,
    mTo: null,
    currencyFrom: currencyList,
    currencyTo: currencyList,
    flag: flag
  });
});

/**
 * Получение доступных валют
 * @returns {Promise<{flag: *, currencyList: *}>}
 */
async function getValute(){
  let flag;
  let currencyList = [];
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
  return {flag, currencyList}
}

module.exports = router;
