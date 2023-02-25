// controllers/todo.js
const User = require("../models/user.model");

exports.getUser = (req, res) => {
    User.find()
        .then((todo) => res.json(todo))
        .catch((err) =>
            res
                .status(404)
                .json({ message: "User not found", error: err.message })
        );
};