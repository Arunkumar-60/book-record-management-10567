const express = require("express");
const dotenv = require("dotenv");

//datebase connection
const DbConnection = require("./databaseConnection");

//destructuring an object

//importing routes
const usersRouter = require("./routes/users");
const booksRouter = require("./routes/books");

dotenv.config();

const app = express();

DbConnection();
//calling function formaking connnection possible

const port = 8081;

app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({
        message: "server is up and running"
    });
});

app.use("/users", usersRouter);
app.use("/books", booksRouter);


app.get("*", (req, res) => {
    res.status(404).json({
        message: "This route does not exist"
    });
});

app.listen(port, () => {
    console.log(`server is ruuning on port ${port}`);
});