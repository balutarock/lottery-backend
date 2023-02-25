const express = require('express')
const app = express();

const mongoose = require("mongoose")
mongoose.connect("mongodb://127.0.0.1:27017/lottery")

const port = process.env.PORT || 3002

const initializeDbAndServer = async () => {
    try {
        app.listen(port, () =>
            console.log(`Server Running at http://localhost:${port}/`)
        );
    } catch (error) {
        console.log(`DB Error: ${error}`);
        process.exit(1);
    }
};


module.exports = initializeDbAndServer;
