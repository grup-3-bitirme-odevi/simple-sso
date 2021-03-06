require('dotenv').config()
const db = require("./model");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const Writable = require("stream").Writable;
const Log = db.log;

// Logger hook
class StreamHook extends Writable {
  write(line) {
    let logModule = process.env.ENV_MODULE_NAME;
    let logIp = line.split("|")[0];
    let logMethod = line.split("|")[1];
    let logUrl = line.split("|")[2];
    let logStatus = line.split("|")[3];
    let logResLength = line.split("|")[4];
    let logResTime = line.split("|")[5];

    logger(
      logModule,
      logIp,
      logMethod,
      logUrl,
      logStatus,
      logResLength,
      logResTime
    );
  }
}

// Route Path
const appRoute = require("./route/appRoute");

// Express Start
const app = express();

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Morgan Logger
let streamHook = new StreamHook();
app.use(
  morgan(
    ":remote-addr | :method | :url | :status | :res[content-length] | - :response-time ms",
    { stream: streamHook }
  )
);

// Routes
app.use("/", appRoute);

// App Start
const PORT = process.env.ENV_APP_PORT || 3200;
app.listen(PORT, () => {
  console.log("Server Started");
});

// Logger write DB
const logger = async (module, ip, method, url, status, res_length, res_ms) => {
  try {
    await Log.create({
      module: module,
      ip: ip,
      method: method,
      url: url,
      status: status,
      res_length: res_length,
      res_ms: res_ms,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = app;
