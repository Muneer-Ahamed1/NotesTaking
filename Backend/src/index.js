const express = require("express");
const dotenv = require("dotenv");
var app = express();
const cookieParser = require('cookie-parser')
const mongoConnect = require("./utils/MongoDB");
const Liked = require("./routes/Liked");
dotenv.config({ path: "./.env" });
const note = require("./routes/Note");
const user = require("./routes/User");
const customError = require("./middleware/customError")
const serverError = require("./middleware/serverError");
const category = require("./routes/Category");
const cors = require("cors");

app.use(cors({
    origin: 'http://localhost:5000',
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type,Authorization,withCredentials', // Add 'withCredentials' to allowed headers
}));


app.use(express.json());
app.use(express.urlencoded({ extended: false }));


mongoConnect().then(() => {
    console.log('connected to database');
}).catch((e) => console.log(e));
app.use(cookieParser());
app.use("/api/user", user)
app.use("/api/note", note);
app.use("/api/likedNotes", Liked)
app.use("/api/category", category);
app.get("/", (req, res) => {
    res.status(200).send("working")
})
app.use(customError);
app.use(serverError);

app.listen(process.env.PORT, () => {
    console.log("listing port " + process.env.PORT);
})