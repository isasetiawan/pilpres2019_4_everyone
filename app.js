var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')

var indexRouter = require('./routes/index');
var kpuRouter = require('./routes/kpu');

var app = express();

var whitelist = ['http://localhost:3000', 'https://realcount.id']
var corsOptions = {
  origin: 'https://realcount.id',
  credential:true
}

app.use(cors(corsOptions))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/kpu', kpuRouter);

module.exports = app;
