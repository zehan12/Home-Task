require("dotenv").config();
const express = require('express');
const app = express();
const logger = require('morgan');
const port = process.env.PORT || "9000"

app.use(logger("dev"))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.send('Hello from backend')
})

app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})