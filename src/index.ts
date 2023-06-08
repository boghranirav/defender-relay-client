import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { sendMessageOnPolygon, testWebSocket } from "./testRelay";

const app = express();
const port = process.env.PORT;

// for parsing json
app.use(
  bodyParser.json({
    limit: "50mb",
  })
);
// for parsing application/x-www-form-urlencoded
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
  })
);

app.use(cors());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  next();
});

// testWebSocket().catch(console.error);
sendMessageOnPolygon();

app.listen(port, () => {
  console.log(
    `Server listening in ${
      process.env.NODE_ENV
    } mode to the port ${port} ${new Date()}`
  );
});
