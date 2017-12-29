const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const api = require('./routes/api');
const cors = require('cors');
const app = express();
const port = process.env.PORT || '3000';
const server = http.createServer(app);
const expressResponse = require('express-json-response');
const appConfiguration = require("./Config/config.json");
const jwt = require('express-jwt');

app.set('port', port);
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressResponse());

app.use(jwt({ secret: appConfiguration.APP_SECRET}).unless({
    path: [
        '/',
        '/api/reset',
        '/api/migrate',
        '/api/users/login'
    ]
}));

app.use((err, rew, res, next) => {
    if (err.name === 'UnauthorizedError') {
        res.sendUnauthorized('Missing or invalid token');
    }
});

app.get("*", (req, res, next) => {
    res.locals.user = req.user || null;
    next();
});

app.get('/', (req, res) => {
    res.send("Welcome to Mantra API");
});

app.use(function (req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    next();
});

app.use('/api', api);

server.listen(port, () => console.log(`API running on localhost:${port}`));