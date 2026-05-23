const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const config = require("./config");
const { createContainer } = require("./container");
const { createApiRouter } = require("./routes/api");

const container = createContainer();
const app = express();

app.use(helmet());
app.use(
  cors({
    origin: config.corsOrigin === "*" ? true : config.corsOrigin.split(",").map((s) => s.trim()),
    credentials: true
  })
);
app.use(morgan("dev"));
app.use(express.json());

app.use("/api", createApiRouter(container));

app.use((err, req, res, next) => {
  // eslint-disable-next-line no-console
  console.error(err);
  res.status(500).json({ error: "Внутренняя ошибка сервера" });
});

app.listen(config.port, () => {
  // eslint-disable-next-line no-console
  console.log(`API listening on port ${config.port}`);
});
