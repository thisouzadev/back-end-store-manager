const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routes');
const err = require('./middlewares/errorHandler');

const app = express();
app.use(bodyParser.json());
const port = 3000;
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});
app.use(router);
app.use(err);
app.get('/', (req, res) => res.send('Hello World!'));
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
