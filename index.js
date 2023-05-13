const express = require('express'); 
const bodyParser = require("body-parser");
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');
const fetch = require("node-fetch");

const apiProxy = createProxyMiddleware('/api', {
    target: 'https://sitr.cnd.com.pa',
    changeOrigin: true,
  });
const port = process.env.PORT || 3001;
const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.post('/api/data', async (req, res) => {
  try {
    console.log(req.body)
    const response = await fetch(`https://sitr.cnd.com.pa/m/pub/data/gen.json?${req.body.id}`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Hubo un error al obtener los datos');
  }
});

app.use('/api', apiProxy);
app.listen(port, () => {
  console.log(`Listen Port ${port}`);
});

module.exports=app;