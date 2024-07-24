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
const allowedOrigins = ['https://full-stack-react-chat-app-frontendpart.vercel.app'];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "Origin,X-Requested-With,Content-Type,Accept,Authorization",
  credentials: true, // Allow credentials
  preflightContinue: false,
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));

// Manually set CORS headers for all responses
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://full-stack-react-chat-app-frontendpart.vercel.app');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

// Handle preflight requests
app.options('*', cors(corsOptions));
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
