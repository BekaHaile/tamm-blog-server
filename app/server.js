import express from "express";
import cors from "cors";

import db from "./models/index";
import dotenv from "dotenv";
import apiRoutes from "./routes/index";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger.json";
import cookieParser from "cookie-parser";
import { initial } from "./init.db";

const app = express();

dotenv.config();
app.use(cors({ origin: "http://localhost:3001", credentials: true }));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// parse requests of content-type - application/json
app.use(express.json());

// use our cookie parser middleware
app.use(cookieParser());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Check if the database exists and create it if not
db.sequelize
  .authenticate()
  .then(() => {
    console.log(
      "Connection to the database has been established successfully."
    );
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);

    // Create the database if it doesn't exist
    db.sequelize
      .query(`CREATE DATABASE IF NOT EXISTS ${process.env.DATABASE}`)
      .then(() => {
        console.log("Database created successfully.");
      });
  });

// force: true will drop the table if it already exists
db.sequelize.sync({ force: false }).then(() => {
  console.log("Drop and Resync Database with { force: true }");
  //Function add a default data on initial call
  //   initial();
});

app.all("/", (req, res) => {
  res.redirect("/api-docs");
});

app.use(`/api/${process.env.APP_VERSION}`, apiRoutes);

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
