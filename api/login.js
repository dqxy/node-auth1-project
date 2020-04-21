  
const router = require("express").Router();
const bcrypt = require("bcryptjs");

const Users = require("./users/users-model.js");

router.post("/", (req, res) => {
    let { username, password } = req.body;

    Users.findBy({ username })
        .then(([thisUser]) => {
            if (thisUser && bcrypt.compareSync(password, thisUser.password)) {
                req.session.loggedIn = true;
                req.session.loggedInAs = thisUser.username;
                res.status(200).json({ message: "Logged in" });
            } else {
                res.status(401).json({ message: "Authentication problem. You shall not pass." });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ errorMessage: err.message });
        })
})

module.exports = router;