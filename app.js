const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const deployRoutes = require("./routes/deploy");
const userRoutes = require("./routes/user");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

app.use(deployRoutes);

app.use(userRoutes);

// app.get("/", (req, res) => {
//   res.send("<h1>Hey I'm front Page</h1>");
// });

// creates a server and listen to it
app.listen(5000);
