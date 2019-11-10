let express = require('express');
let router = express.Router();
const axios = require('axios');

/**
 * роут для страницы index с данными.
 */
router.get('/', async function(req, res) {
    let moneyFrom = req.query.moneyFrom;
    let currencyFrom = req.query.currencyFrom;
    let currencyTo = req.query.currencyTo;

    let mas = await getValute(moneyFrom, currencyFrom, currencyTo);

    res.render('index', {
        mFrom: moneyFrom,
        mTo: mas.moneyTo.toFixed(2),
        currencyFrom: mas.currencyListFrom,
        currencyTo: mas.currencyListTo,
        flag: mas.flag
    });
});

/**
 * Перевод в другую валюту
 * @param moneyFrom - сумма денег
 * @param mFrom - курс исходной валюты
 * @param mTo - курс запрашиваемой валюты
 * @returns {number} - полученная сумма денег
 */
function convert(moneyFrom, mFrom, mTo) {
    return (moneyFrom * mFrom) / mTo;
}

/**
 * Получение данных для конферктации
 * @param moneyFrom  - сумма денег
 * @param currencyFrom - куурс исходной валюты
 * @param currencyTo - курс запрашиваемой валюты
 * @returns {Promise<{flag: *, moneyTo: *, currencyListTo: *, currencyListFrom: *}>} - {флаг состояния, сумма после конвертирования, курс новой волюты, курс исходной}
 */
async function getValute(moneyFrom, currencyFrom, currencyTo){

    let mFrom;
    let mTo;
    let moneyTo = 0;
    let currencyListFrom = [];
    let currencyListTo = [];
    let f = true;
    let flag;

    let  currency;
    try {
        currency = await axios.get(process.env.URL_VALUTE);
    } catch (e) {
        flag = "В данный момент сервис не доступен. Попробуйте позднее.";
        currencyListTo = [];
        currencyListFrom = [];
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

            moneyTo = convert(moneyFrom, mFrom, mTo);


            let currencyList = Object.keys(currency.data.Valute);
            currencyList.push('RUS');

            currencyListFrom = Object.create(currencyList);
            currencyListTo = Object.create(currencyList);

            ToUnshift(currencyListFrom, currencyFrom);
            ToUnshift(currencyListTo, currencyTo);
        }

        return {flag, moneyTo, currencyListFrom, currencyListTo}
    }
}

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