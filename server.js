require("dotenv").config();
const express = require('express');
const logger = require('morgan');
const mongoose = require("mongoose");
const port = process.env.PORT || "9000"
const connUri = process.env.MONGO_LOCAL_CONN_URL;

//=== 1 - App created
// Creating express app and configuring middleware needed for authentication
const app = express();
app.use(logger("dev"))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//=== 2 - SET UP DATABASE
//Configure mongoose's promise to global promise
mongoose.set('strictQuery', false)
mongoose.promise = global.Promise;
mongoose.connect(connUri);

const connection = mongoose.connection;
connection.once('open', () => console.log('MongoDB --  database connection established successfully!'));
connection.on('error', (err) => {
    console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
    process.exit();
});

app.use("/api/v1/user", require("./routes/user"));
app.use("/api/v1/auth", require("./routes/auth"));
// app.use("/api/v1/admin", require("./routes/admin"));


app.get('/', (req, res) => {
    res.send('Hello from backend')
})

app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})