**Задание 1. «Конвертер валют»**

   Напишите веб-приложение, «конвертер валют», которое позволит пользователю
пересчитывать суммы денег между разными валютами по текущему курсу
на момент конвертации. В качестве источника информации о курсе валют
можете использовать любой API, который сочтете подходящим, если он не требует
регистрации от проверяющего выполнение задачи.

   Для конечного пользователя должен быть предоставлен интерфейс в виде страницы,
где пользователь может указать исходную сумму, исходную валюту и целевую
валюту перевода, и после этого увидеть итоговую сумму.


**Запуск приложения**

1) cd Currency_Converter_01
2) npm install
3) npm start


**Описание router**

/ - получение валют

/convert?moneyFrom=&currencyFrom=&moneyTo=&currencyTo= - конвектация суммы moneyFrom из валюты currencyFrom в валюту currencyTo 

**Алгоритм**

При загрузке страницы идет подключение к внейшнему api, для получения списка валют. 
При запросе на перевод идет запрос на получения текущего курса 2х валют по отношению к рублю
Если одна из валют рубль - считается 1.
Далее происходит подсчет новой суммы.