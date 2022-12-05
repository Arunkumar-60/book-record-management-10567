const express = require("express");
const { getAllUser, getSingleUserById, deleteUser, updateUserById, createNewUser, getSubscriptionDetailsById } = require("../controllers/user-controller");

const { users } = require("../data/users.json")
//json import data

const { UserModel, BookModel } = require("../models")

const router = express.Router();


/**
 * Route: /users
 * Method: GET
 * Description: get all users
 * Access: public
 * Parameters: none
*/

router.get("/", getAllUser)

/**
 * Route: /users/:id
 * Method: GET
 * Description: get single user by id
 * Access: public
 * Parameters: none
*/

router.get("/:id", getSingleUserById);

/**
 * Route: /users/
 * Method: POST
 * Description: create new user
 * Access: public
 * Parameters: none
*/

router.post("/", createNewUser);

/**
 * Route: /users/:id
 * Method: PUT
 * Description: updating user details
 * Access: public
 * Parameters: id
*/

router.put("/:id", updateUserById);

/**
 * Route: /users/:id
 * Method: DELETE
 * Description: Delete user by id
 * Access: public
 * Parameters: id
*/

router.delete("/:id", deleteUser);


/**
 * Route: /users/subscription-details/:id
 * Method: GET
 * Description: Get all subscription details of user by id
 * Access: public
 * Parameters: id
*/

router.get("/subscription-details/:id", getSubscriptionDetailsById);

module.exports = router;
//exporting routers
