const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.get('/api/quotes/random', (req, res, next) => {
    randomQuote = getRandomElement(quotes);
    res.send({quote: randomQuote});
});

app.get('/api/quotes', (req, res, next) => {


    if (!req.query.hasOwnProperty('person')) {
        res.send({quotes: quotes});
    } else {
        const filteredQuotes = quotes.filter(element => element.person === req.query.person);
        res.send({quotes: filteredQuotes});
    }
});

app.post('/api/quotes', (req, res, next) => {
    if (req.query.quote && req.query.person) {
        const newQuote = {quote: req.query.quote, person: req.query.person};
        quotes.push(newQuote);
        res.send({quote: newQuote});
    } else {
        res.status(400).send();
    }
});

app.listen(PORT, (req, res, next) => {
    console.log(`Listening on port ${PORT}...`);
});

