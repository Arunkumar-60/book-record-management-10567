const express = require("express");
const { getAllBooks, getSingleBookById, getAllIssuedBooks, addNewBook, updateBookById, getSingleBookByName } = require("../controllers/book-controller");

const { books } = require("../data/books.json");
const { users } = require("../data/users.json");
//json import data

const { UserModel, BookModel } = require("../models");

const router = express.Router();


/**
 * Route: /books
 * Method: GET
 * Description: get all books
 * Access: public
 * Parameters: none
*/

router.get("/", getAllBooks)

/**
 * Route: /books/:id
 * Method: GET
 * Description: get single book by id
 * Access: public
 * Parameters: id
*/

router.get("/:id", getSingleBookById)

/**
 * Route: /books/issued/by-user
 * Method: GET
 * Description: Get all issued books
 * Access: public
 * Parameters: none
*/

router.get("/issued/by-user", getAllIssuedBooks);

/**
 * Route: /books
 * Method: POST
 * Description: create new book
 * Access: public
 * Parameters: none
 * Data: author, name, genre, price, publisher, id
*/

router.post('/', addNewBook);

/**
 * Route: /books/:id
 * Method: PUT
 * Description: Update book
 * Access: public
 * Parameters: ID
 * Data: author, name, genre, price, publisher, id
*/

router.put("/:id", updateBookById)

//additional route to get single book by name

router.get("/getbook/name/:name", getSingleBookByName);


//default export
module.exports = router;