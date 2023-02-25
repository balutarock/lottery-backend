const express = require("express");
const app = express();
const router = express.Router();
const { getUser } = require("../controllers/user");

router.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
    next();
});

router.get('/login', getUser);