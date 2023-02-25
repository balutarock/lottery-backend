const mongoose = require("mongoose");

const User = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        create_at: { type: Date, default: Date.now },
        updated_at: { type: Date, default: Date.now }
    }, { collation: { locale: 'en_US', strength: 1 } }
);

const userModel = mongoose.model("user", User);

module.exports = userModel