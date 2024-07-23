const express = require("express");
const app = express();
const env = require("dotenv");
env.config("./.env");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const router = require("./routes/userRoute");
const db = require("./config/DbConnection");
const MsgRouter = require("./routes/messageRoute");

//Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173", // Allow your frontend URL
    credentials: true,
  })
);
//Routes
app.use("/api/v1/user", router);
app.use("/api/v1/message", MsgRouter);
db();
const Port = process.env.PORT;
app.listen(Port, () => {
  console.log(
    `server is listening at the port : http://localhost:${Port}/api/v1`
  );
});
