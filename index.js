const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const connectDB = require("./config/db");
const router = require("./routes");

const app = express();
// var allowCrossDomain = function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
//   res.header("Access-Control-Allow-Headers", "Content-Type");
//   next();
// };
// app.use(allowCrossDomain);

app.use(cors({
    origin : ["http://localhost:3000",process.env.FRONTEND_URL],
    credentials : true
}));
// app.use(cors());


app.use(express.json());
app.use(cookieParser());

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', req.header('origin') );
  next();
});
app.use("/api", router);

const PORT = 8080 || process.env.PORT;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("connnect to DB");
    console.log("Server is running " + PORT);
  });
});
