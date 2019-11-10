let express = require('express');
let router = express.Router();
const axios = require('axios');

/**
 * конверктация
 */
router.get('/', async function(req, res) {
    let moneyFrom = req.query.moneyFrom;
    let currencyFrom = req.query.currencyFrom;
    let currencyTo = req.query.currencyTo;
    let mFrom;
    let mTo;
    let moneyTo = 0;
    let currencyListFrom = [];
    let currencyListTo = [];
    let f = true;

    let  currency;
    try {
        currency = await axios.get(process.env.URL_VALUTE);
    } catch (e) {
        flag = "В данный момент сервис не доступен. Попробуйте позднее.";
        currencyList = [];
        f= false;
    }

    if (f) {
        if (currency.status >= 300) {
            moneyTo = 0;
            flag = "В данный момент сервис не доступен. Попробуйте позднее.";
        } else {
            flag = currency.data.Date;

            if (currencyFrom === 'RUS') {
                mFrom = 1;
            } else {
                mFrom = currency.data.Valute[currencyFrom].Value;
            }
            if (currencyTo === 'RUS') {
                mTo = 1;
            } else {
                mTo = currency.data.Valute[currencyTo].Value;
            }

            moneyTo = (moneyFrom * mFrom) / mTo;


            let currencyList = Object.keys(currency.data.Valute);
            currencyList.push('RUS');

            currencyListFrom = Object.create(currencyList);
            currencyListTo = Object.create(currencyList);

            ToUnshift(currencyListFrom, currencyFrom);
            ToUnshift(currencyListTo, currencyTo);
        }
    }


    res.render('index', {
        mFrom: moneyFrom,
        mTo: moneyTo.toFixed(2),
        currencyFrom: currencyListFrom,
        currencyTo: currencyListTo,
        flag: flag
    });
});

/**
 * перенос выбранной валюты в начало списка
 * @param list - список валют
 * @param currency - выбранная валюта
 */
function  ToUnshift(list, currency){
    let i = list.indexOf(currency);
    list.splice(i, 1);
    list.unshift(currency);
}

module.exports = router;