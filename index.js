const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./config');
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.urlencoded({ useNewUrlParser: true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/', require('./routes'));

const url = `mongodb://${config.mongodb.host}:${config.mongodb.port}/${config.mongodb.database}`;

mongoose.connect(url, { useNewUrlParser: true }, error => error ? console.error(`MongoDB Conneciton error: ${error}`): null);
mongoose.connection.on('connected', () => console.info("[MongoDB] Connected to " + url));
mongoose.set('useFindAndModify', false);
mongoose.set('useUnifiedTopology', true);

const host = config.server.host;
const port = config.server.port;

app.listen(port, host, () => console.info(`Server running at http://${host}/${port}`));