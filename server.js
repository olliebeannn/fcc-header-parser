const express = require('express');
const cors = require('cors');
const _ = require('lodash');
const requestIp = require('request-ip');

const port = process.env.PORT || 3000;

let app = express();

app.use(express.static(__dirname + '/public'));

// Get IP address middleware
const getIp = (req, res, next) => {
    const clientIp = requestIp.getClientIp(req);
    res.locals.ip = clientIp;
    next();
};

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

app.get('/api/whoami', getIp, (req, res) => {
    console.log(JSON.stringify(req.headers));
    console.log(res.locals.ip);

    let whoami = _.pick(req.headers, ['accept-language', 'user-agent']);
    whoami.ipaddress = res.locals.ip;

    res.send(whoami);
});

app.listen(port, () => {
    console.log(`App up on port ${port}`);
});
