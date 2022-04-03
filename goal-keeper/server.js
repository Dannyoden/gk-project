const sslRedirect = require('heroku-ssl-redirect').default;
const express = require('express');
const serveStatic = require('serve-static');
const history = require('connect-history-api-fallback');
const path = require('path');
const app = express();

app.use(sslRedirect());
app.use(history());
app.use(serveStatic(path.join(__dirname, 'dist')));

const port = process.env.PORT || 80;
app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`);
});
