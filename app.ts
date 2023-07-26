import express, { Application } from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import DbConnect from "./src/config/mongodb/dbConnect";
import { UserRouters } from "./src/user/infrastructure/rest-api/user.router";

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

    this.app.use(cors());

    // router
    this.app.use(this.path, this.routers());
  }

  middleware() {
    this.app.use(express.json());
  }

  async dbConnect() {
    await DbConnect.dbConnect();
  }

  // router

  routers(): Array<express.Router> {
    return [new UserRouters().router];
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
