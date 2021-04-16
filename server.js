const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');
const { extname } = require('path');

const app = express();
app.engine('hbs', hbs({ extname: 'hbs' }));
app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, '/views/layouts')));
app.use(express.static(path.join(__dirname, '/views')));

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/home', (req, res) => {
    res.render('home');
});

app.get('/about', (req, res) => {
    res.render('about', { layout: "dark" });
});

app.get('/hello/:name', (req, res) => {
    res.render('hello', { name: req.params.name });
});

app.use('/user/', (req, res) => {
    res.render('forbidden');
});

app.use((req, res) => {
    res.status(404).render('404');
});

app.listen(8000, () => {
    console.log('Server is running...');
});
