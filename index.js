const express = require("express");

const { users } = require("./data/users.json");
//JSON data import
//destructuring an object

const app = express();

const port = 8081;

app.use(express.json())

app.get('/', (req, res) => {
    res.status(200).json({
        message: "server is up and running"
    });
});

/**
 * Route: /users
 * Method: GET
 * Description: get all users
 * Access: public
 * Parameters: none
*/

app.get("/users", (req, res) => {
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

app.get("/users/:id", (req, res) => {
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
    })
})

/**
 * Route: /users/
 * Method: POST
 * Description: create new user
 * Access: public
 * Parameters: none
*/

app.post("/users", (req, res) => {
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
    })
});

/**
 * Route: /users/:d
 * Method: PUT
 * Description: updating user details
 * Access: public
 * Parameters: id
*/

app.put("/users/:id", (req, res) => {
    const { id } = req.params;
    const { data } = req.body;

    const user = users.find((each) => each.id === id);

    if (!user)
        return res.status(404).json({ success: false, message: "User not found" })

    const updateUser = users.map((each) => {
        if (each.id === id) {
            return {
                ...each,
                ...data,

            };
        }
        return each;
    })
    return res.status(200).json({
        success: true,
        data: updateUser,
    })
})


app.get("*", (req, res) => {
    res.status(404).json({
        message: "This route does not exist"
    })
})

app.listen(port, () => {
    console.log(`server is ruuning on port ${port}`);
});