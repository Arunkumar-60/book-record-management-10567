const express = require("express");

const { users } = require("../data/users.json")
//json import data

const router = express.Router();


/**
 * Route: /users
 * Method: GET
 * Description: get all users
 * Access: public
 * Parameters: none
*/

router.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        data: users,
    })
})

/**
 * Route: /users/:id
 * Method: GET
 * Description: get single user by id
 * Access: public
 * Parameters: none
*/

router.get("/:id", (req, res) => {
    const { id } = req.params;
    const user = users.find((each) => each.id === id);
    if (!user) {
        return res.status(404).json({
            sucess: false,
            message: "User not found"
        });
    }
    return res.status(200).json({
        success: true,
        data: user,
    });
});

/**
 * Route: /users/
 * Method: POST
 * Description: create new user
 * Access: public
 * Parameters: none
*/

router.post("/", (req, res) => {
    const { id, name, surname, email, subscriptionType, subscriptionDate } = req.body;

    const user = users.find((each) => each.id === id);

    if (user) {
        return res.status(404).json({
            success: false,
            message: "User exist with that id"
        });
    }

    users.push({
        id,
        name,
        surname,
        email,
        subscriptionType,
        subscriptionDate
    });
    return res.status(201).json({
        success: true,
        data: users,
    });
});

/**
 * Route: /users/:id
 * Method: PUT
 * Description: updating user details
 * Access: public
 * Parameters: id
*/

router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { data } = req.body;

    const user = users.find((each) => each.id === id);

    if (!user) return res.status(404).json({ success: false, message: "User not found" })

    const updateUser = users.map((each) => {
        if (each.id === id) {
            return {
                ...each,
                ...data,

                // lets say we have 
                // data= { name: "arun", age: "26" }
                // as i want o update it
                //i destructure it with { ...data, add updation, if key field matches (it will be overwritten) ,if key name doesnt match or doesnt exist (new key field is added) }
                //as my put is raw json format with {"keyfeild1": "info-regarding this field", "keyfield2": "info-regarding this field"}
                //which is req.body = {"keyfeild1": "info-regarding this field", "keyfield2": "info-regarding this field"}
                //i had to destructure it with ...req.body
                //as we put ...each,...data every macthing keyfields will be overwritten(secquence matters as each data from users will be overwitten with data  from req.body)
            };
        }
        return each;
    })
    return res.status(200).json({
        success: true,
        data: updateUser,
    });
});

/**
 * Route: /users/:id
 * Method: DELETE
 * Description: Delete user by id
 * Access: public
 * Parameters: id
*/

router.delete("/:id", (req, res) => {
    const { id } = req.params;
    const user = users.find((each) => each.id === id);

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "user to be deleted was not found"
        })
    }

    //using indexof( )
    //var names = ["arun","dev","mix"]

    //names.indexof("mix") ---> output -> 2
    //names.indexof("arun") ---> output -> 0

    const index = users.indexOf(user);
    users.splice(index, 1);

    return res.status(202).json({ sucess: true, data: users });
});


/**
 * Route: /users/subscription-details/:id
 * Method: GET
 * Description: Get all subscription details of user by id
 * Access: public
 * Parameters: id
*/

router.get("/subscription-details/:id", (req, res) => {
    const { id } = req.params;

    const user = users.find((each) => each.id === id);

    if (!user)
        return res.status(404).json({
            success: false,
            message: "User with that specified ID not found"
        })

    const getDateInDays = (data = "") => {
        let date;
        if (data === "") {
            //current date
            date = new Date();
        }
        else {
            //date on basis of data variable
            date = new Date(data);
        }
        //floor gives the interger value of data ingnoring the decimal value of it , (float to int)

        let days = Math.floor(date / (1000 * 60 * 60 * 24));
        return days;
        //1000 to tackle milli seconds
        //60 to tackle seconds
        //60 to tackle mins
        //24 to tackle hours
    };

    const subscriptionType = (date) => {
        if (user.subscriptionType === "Basic") {
            date = date + 90;
        }

        else if (user.subscriptionType === "Standard") {
            date = date + 180;
        }

        else if (user.subscriptionType === "Premium") {
            date = date + 365;
        }

        return date;
    };

    // subscription expiration calculation
    // January 1,1970, UTC. //milliseconds

    let returnDate = getDateInDays(user.returnDate);
    let currentDate = getDateInDays();
    let subscriptionDate = getDateInDays(user.subscriptionDate);
    let subscriptionExpiration = subscriptionType(subscriptionDate);

    const data = {
        ...user,
        subscriptionExpired: subscriptionExpiration < currentDate,
        daysLeftForExpiration:
            subscriptionExpiration <= currentDate
                ? 0
                : subscriptionExpiration - currentDate,
        fine:
            returnDate < currentDate
                ? subscriptionExpiration <= currentDate
                    ? 200
                    : 100
                : 0,
    };

    res.status(200).json({
        success: true,
        data,
    });
});

module.exports = router;
//exporting routers
