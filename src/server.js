const express = require('express')
const app = express()

const cookieParser = require('cookie-parser')
app.use(cookieParser());

const expires = new Date('Fri, 01 Jan 2100 00:00:00 UTC');
const options = {secure: true, httpOnly: true};

app.get('/set', function (req, res) {
    console.log('Setting cookies');
    const value = `hello_${Date.now()}`;
    res.cookie('itp-none', value, {sameSite: 'none', ...options, expires})
    res.cookie('itp-lax', value, {sameSite: 'lax', ...options, expires})
    res.cookie('itp-strict', value, {sameSite: 'strict', ...options, expires})
    res.send('Cookies set.')
})

app.get('/flow', function (req, res) {
    console.log('Doing flow with redirect to', req.query.returnUrl);
    const value = `hello_${Date.now()}`;
    res.cookie('itp-none', value, {sameSite: 'none', ...options, expires})
    res.cookie('itp-lax', value, {sameSite: 'lax', ...options, expires})
    res.cookie('itp-strict', value, {sameSite: 'strict', ...options, expires})
    res.send(`<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body style="margin-top: 200px;">
    <p>Cookies are set. Click <a href="${req.query.returnUrl}">here</a> to go back.</p>
</body>
</html>`);
})

app.get('/remove', function (req, res) {
    console.log('Removing cookies');
    res.clearCookie('itp-none', {sameSite: 'none', ...options})
    res.clearCookie('itp-lax', {sameSite: 'lax', ...options})
    res.clearCookie('itp-strict', {sameSite: 'strict', ...options})
    res.send('Cookies cleared.')
})

app.get('/', function (req, res) {
    console.log('Showing cookies');
    res.send([
        'itp-none=' + (req.cookies['itp-none'] || '**UNAVAILABLE**'),
        'itp-lax=' + (req.cookies['itp-lax'] || '**UNAVAILABLE**'),
        'itp-strict=' + (req.cookies['itp-strict'] || '**UNAVAILABLE**'),
    ].join('<br/>'))
});

const fs = require('fs');
const https = require('https');
https.createServer({
    key: fs.readFileSync(__dirname + '/certs/127.0.0.1-key.pem'),
    cert: fs.readFileSync(__dirname + '/certs/127.0.0.1.pem')
}, app).listen(443);
