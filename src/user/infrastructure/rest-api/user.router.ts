import { Request, Response, Router } from "express";

const app = Router();

app.get("/", (_request: Request, response: Response) => {
  return response.status(200).json("Welcome");
});

export default app;
