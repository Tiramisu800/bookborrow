const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const fileUpload = require('express-fileupload');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

const app = express();
const port = process.env.PORT || 8000;
require('dotenv').config();

//middlewares
app.use(express.urlencoded( { extended: true } ));
app.use(express.static('public'));
app.use(expressLayouts);

app.use(cookieParser('BookBorrowingSecure'));
app.use(session({
    secret: 'BookBorrowingSecretSession',
    saveUninitialized: true,
    resave: true
}));
app.use(flash());
app.use(fileUpload());


app.set('layout','./layouts/main');
app.set('view engine','ejs');

const routes = require('./server/routes/bookRoutes.js')
app.use('/',routes);

app.listen(port, ()=>console.log(`Started on port ${port}`));

