const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');

const app = express();
app.engine('hbs', hbs({ extname: 'hbs' }));
app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, '/views/layouts')));
app.use(express.static(path.join(__dirname, '/views/*')));
app.use(express.static(path.join(__dirname, '/views/404')));

app.use(express.urlencoded({ extended: false }));

app.post('/contact/send-message', (req, res) => {

    const { author, sender, title, message, file } = req.body;

    if (author && sender && title && message && file) {
        res.render('contact/contact', { isSent: true, fileName: file });
    }
    else {
        res.render('contact/contact', { isError: true });
    }
});

app.get('/', (req, res) => {
    res.render('home/home');
});

app.get('/home', (req, res) => {
    res.render('home/home');
});

app.get('/about', (req, res) => {
    res.render('about/about', { layout: "dark" });
});

app.get('/contact', (req, res) => {
    res.render('contact/contact');
});

app.get('/hello/:name', (req, res) => {
    res.render('hello/hello', { name: req.params.name });
});

app.use('/user/', (req, res) => {
    res.render('forbidden/forbidden');
});

app.use((req, res) => {
    res.status(404).render('404/404');
});

app.listen(8000, () => {
    console.log('Server is running...');
});
