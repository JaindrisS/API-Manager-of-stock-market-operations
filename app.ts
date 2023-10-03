import express, { Application } from "express";
import morgan from "morgan";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import DbConnect from "./src/config/mongodb/dbConnect";
import { UserRouters } from "./src/user/infrastructure/rest-api/user.router";
import { AuthRouter } from "./src/auth/infrastructure/rest-api/auth.router";
import { winstonLogger } from "./src/auth/infrastructure/logger/logger";
import { sharedMiddleware } from "./src/shared/middleware/SharedDependencies";


export default class Server {
  private app: Application;
  private port: string;
  private path = "/stock-market-operations/api";

  constructor() {
    this.app = express();
    this.port = process.env.PORT || "8080";
    // middleware
    this.middleware();
    // db
    this.dbConnect();

    // router
    this.app.use(this.path, this.routers());
  }

  middleware() {
    this.app.use(cors());
    this.app.use(express.json());

    // Loggers
    this.app.use(
      morgan("combined", {
        stream: { write: (message) => winstonLogger.info(message.trim()) },
      })
    );
    this.app.use(sharedMiddleware.customLoggerMiddleware);
  }

  async dbConnect() {
    await DbConnect.dbConnect();
  }

  // router

  routers(): Array<express.Router> {
    return [new UserRouters().router, new AuthRouter().router];
  }

  // listen
  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server on port ${this.port}`);
    });
  }
}

const server = new Server();
server.listen();
