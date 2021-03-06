import "reflect-metadata";
import { createConnection } from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as helmet from "helmet";
import * as cors from "cors";
import routes from "./routes";

createConnection()
  .then(async connection => {
    // Create a new express application instance
    const app = express();

    // Call midlewares
    app.use(cors());
    app.use(helmet());
    app.use(bodyParser.json());

    //Set all routes from routes folder
    app.use("/", routes);
    app.get('/', (req, res) => {
      res.send('Yes, Server is up and running!😷')
    });

    app.listen(4001, () => {
      console.log("💃🏻 Server started on port 4001! 🕺🏻");
    });
  })
  .catch(error => console.log(error));
