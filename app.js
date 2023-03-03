const express = require('express');
const app = express();
const port = 5500;
const dir = __dirname + '/Sites/';

app.use(express.static(__dirname+'/static/'))

app.get('/', (req, res) => {
    res.sendFile(dir + 'index.html');
})

app.get('/Game', (req, res) => {
    res.sendFile(dir + 'blackjack.html');
})

app.get('/Bank', (req, res) => {
    res.sendFile(dir + 'bank.html');
})

app.listen(port, () => {
    console.log(`Listening on port ` + port)
})

