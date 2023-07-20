import express, { Application } from "express";
import dotenv from "dotenv";
dotenv.config();
import DbConnect from "./src/config/mongodb/dbConnect";
import userRouter from "./src/user/infrastructure/rest-api/user.router";

export default class Server {
  private app: Application;
  private port: string;
  private path = {
    auth: "/stock-market-operations/api/auth",
    user: "/stock-market-operations/api/user",
    trades: "/stock-market-operations/api/trades",
  };

  constructor() {
    this.app = express();
    this.port = process.env.PORT || "8080";
    // middleware
    this.middleware();
    // router
    this.router()
    // db
    this.dbConnect();
  }

  middleware() {
    this.app.use(express.json());
  }

  async dbConnect() {
    await DbConnect.dbConnect();
  }

  // router

  router() {
    this.app.use(this.path.user, userRouter);
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
