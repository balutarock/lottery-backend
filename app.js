const express = require('express')
const bcrypt = require("bcryptjs");
const env = require("dotenv");
const jwt = require("jsonwebtoken")
var cors = require("cors");

const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/lottery")
//         console.log("DB connection: ", dbConnection)
// mongoose.set('strictQuery', true);

// process.on('unhandledRejection', (reason, promise) => {
//     console.error('Unhandled Rejection at:', promise, 'reason:', reason);
//     // Your code here
// });

const app = express();

app.use(cors());

env.config();


// DB
// const initializeDbAndServer = require("./config/db")

// Models
const User = require("./models/user.model")
const Results = require("./models/results.model")

// routes 
// const userRoute = require("./routes/user.router");

app.use(express.json())

const initializeDbAndServer = async () => {
    try {

        app.listen(3001, () =>
            console.log(`Server Running at http://localhost:${"3001"}/`)
        );
    } catch (error) {
        console.log(`DB Error: ${error}`);
        process.exit(1);
    }
};

initializeDbAndServer();


// app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => res.send("Server up and running"));


// app.use("/api", userRoute)

app.post("/signup/", async (request, response) => {
    console.log("singup request >>>> ")
    const { name, email, password } = request.body
    const hashedPassword = await bcrypt.hash(password, 10);
    const dbUser = await User.findOne({ name: name })
    console.log("dbUser >> ", dbUser)
    if (dbUser !== null) {
        response.status(400)
        response.send({ status: 400, errror: "User name exist" });
    } else {
        const user = await User.create({
            name: name,
            email: email,
            password: hashedPassword
        })
        response.send({ status: 200, msg: "Registraction success" })
    }
})

app.post("/login/", async (request, response) => {
    const { name, password } = request.body
    const dbUser = await User.findOne({ name: name })
    const isPasswordMatched = await bcrypt.compare(password, dbUser.password);
    // console.log("dbuser >> ",dbUser)
    // console.log("ispa >> ",isPasswordMatched)
    if (dbUser === null) {
        response.status(400)
        response.send({ status: 400, errror: "User name is not exist" });
    } else {
        if (isPasswordMatched) {
            const payload = { username: name }
            const jwtToken = jwt.sign(payload, "MY_SECREAT_TOKEN")
            response.status(200)
            response.send({ status: 200, msg: "Login success", jwtToken: jwtToken })
        } else {
            response.status(401)
            response.send({ status: 200, msg: "Invalid Password" })
        }
    }
})

const authonticateToken = (request, response, next) => {
    let jwtToken;
    const authHeader = request.headers["authorization"]
    if (authHeader !== undefined) {
        jwtToken = authHeader.split(" ")[1]
    }
    if (jwtToken === undefined) {
        response.send(401)
        response.send("Unauthorized, Empty accesstoken");
    } else {
        jwt.verify(jwtToken, "MY_SECREAT_TOKEN", async (err, payload) => {
            if (err) {
                response.status(401)
                response.send("Invalid Access Token")
            } else {
                // console.log("user>> ",payload)
                request.username = payload.username
                next()
            }
        })
    }
}

app.post("/v1/result-post", async (request, response) => {
    const { firstPrice, secondPrice, thirdPrice, fouthPrice, fifthPrice, sixthPrice, seventhPrice, eightPrice, ninthPrice, tenthPrice, eleventhPrice } = request.body
    const today = new Date();
    console.log("date >> ", today)
    const year = today.getFullYear()
    const month = today.getMonth() + 1;
    const day = today.getDate()
    const date = `${year}-${month}-${day}`
    console.log("date >> ", date)
    const db = await Results.find({ created_at: `${date}` })
    console.log("db >> ", db)
    if (db.length > 0) {
        response.send({ status: 208, msg: "Already today results released" })
    } else {
        const result = await Results.create({
            first_price: firstPrice,
            second_price: secondPrice,
            third_price: thirdPrice,
            fourth_price: fouthPrice,
            fifth_price: fifthPrice,
            sixth_price: sixthPrice,
            seventh_price: seventhPrice,
            eight_price: eightPrice,
            ninth_price: ninthPrice,
            tenth_price: tenthPrice,
            eleventh_price: eleventhPrice,
        })
        response.send({ status: 201, msg: "Results Added Successfully" })
    }
})

app.put("/v1/update-result", async (request, response) => {
    const { firstPrice, secondPrice, thirdPrice, fouthPrice, fifthPrice, sixthPrice, seventhPrice, eightPrice, ninthPrice, tenthPrice, eleventhPrice, id, category } = request.body
    const result = await Results.updateOne({ _id: id }, {
        $set: {
            first_price: firstPrice,
            second_price: secondPrice,
            third_price: thirdPrice,
            fourth_price: fouthPrice,
            fifth_price: fifthPrice,
            sixth_price: sixthPrice,
            seventh_price: seventhPrice,
            eight_price: eightPrice,
            ninth_price: ninthPrice,
            tenth_price: tenthPrice,
            eleventh_price: eleventhPrice,
            category: category,
            updated_at: Date.now()
        }
    })
    console.log("response >> ", result)
    response.send({ status: 201, msg: "Results Updated Successfully" })
})

app.get("/v1/results", async (request, response) => {
    const result = await Results.find()
    response.send({ status: 200, data: JSON.stringify(result) })
})

app.get("/v1/result", async (request, response) => {
    const today = new Date();
    console.log("date >> ", today)
    const year = today.getFullYear()
    const month = today.getMonth() + 1;
    const day = today.getDate()
    const date = `${year}-${month}-${day}`
    console.log("date >> ", date)
    let result = await Results.findOne({ create_at: `2023-02-23` })
    if (result === null) result = []
    response.send({ status: 200, data: JSON.stringify(result) })
})