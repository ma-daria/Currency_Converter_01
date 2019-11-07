let express = require('express');
let router = express.Router();
const axios = require('axios');

router.get('/', async function(req, res, next) {
    let moneyFrom = req.query.moneyFrom;
    let currencyFrom = req.query.currencyFrom;
    let currencyTo = req.query.currencyTo;
    let currency = await axios.get(process.env.URL_VALUTE);
    let mFrom;
    let mTo;

    if (currencyFrom === 'RUS'){
        mFrom = 1;
    }else{
        mFrom = currency.data.Valute[currencyFrom].Value;
    }
    if (currencyTo === 'RUS'){
        mTo = 1;
    }else {
        mTo = currency.data.Valute[currencyTo].Value;
    }

    let moneyTo = (moneyFrom * mFrom) / mTo;


    let currencyList = Object.keys(currency.data.Valute);
    currencyList.push('RUS');

    console.log(typeof(currencyList));

    let currencyListFrom = Object.create(currencyList);
    let currencyListTo = Object.create(currencyList);

    ToUnshift(currencyListFrom, currencyFrom);
    ToUnshift(currencyListTo, currencyTo);



    res.render('index', {
        mFrom: moneyFrom,
        mTo: moneyTo.toFixed(2),
        currencyFrom: currencyListFrom,
        currencyTo: currencyListTo
    });
});




function  ToUnshift(list, currency){
    let i = list.indexOf(currency);
    list.splice(i, 1);
    list.unshift(currency);
}




module.exports = router;