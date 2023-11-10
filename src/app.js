import express from "express";
import path from "path";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

import usersRouter from "./routes/users.router.js";
import petsRouter from "./routes/pets.router.js";
import adoptionsRouter from "./routes/adoption.router.js";
import sessionsRouter from "./routes/sessions.router.js";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUiExpress from "swagger-ui-express";
import __dirname from "./utils/index.js";

const app = express();
const PORT = process.env.PORT || 8080;
const connection = mongoose.connect("mongodb://127.0.0.1:27017/adoptme");
const swaggerOptions = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "Documentacion de Adoptme",
      description: "API Rest de Adoptme",
    },
  },
  apis: [`${path.join(__dirname, "../docs/**/*.yaml")}`],
};
const specs = swaggerJSDoc(swaggerOptions);

console.log(__dirname);
app.use("/api/docs", swaggerUiExpress.serve, swaggerUiExpress.setup(specs));

app.use(express.json());
app.use(cookieParser());

app.use("/api/users", usersRouter);
app.use("/api/pets", petsRouter);
app.use("/api/adoptions", adoptionsRouter);
app.use("/api/sessions", sessionsRouter);

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
