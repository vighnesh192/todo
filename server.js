const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const todos = require("./routes/api/todos")
require('dotenv').config();

const app = express();

//BodyParser Middleware function
app.use(bodyParser.json());

//DB Config With mongoURI Stored In .env
const db = process.env.mongoURI;

//Use Routes Api
app.use('/api/todos', todos);

//Connect DB
mongoose
.connect(db, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {console.log("DB CONNECTED...")})
.catch((err) => console.log(err));

const port = process.env.PORT || 5000;

app.listen(port,() => console.log(`Server started on ${port}...`));
