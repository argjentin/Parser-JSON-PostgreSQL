const express = require('express');
require('dotenv').config();
const port = process.env.APP_PORT;
const routes = require('./routes/routes');



const app = express();

app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`))

app.use('/laureate', routes);

// app.all("*",(req, res) => {
//   res.status(404).send(`<h1 style="color: red">ERROR 404: PAGE NOT FOUND</h1>`)
//   throw new Error(`Requested URL ${req.path} not found !`);
// })


app.listen(port, () => {
    console.log("Le serveur ecoute sur le port : " + port);
});