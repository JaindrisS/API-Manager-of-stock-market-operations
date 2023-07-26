import { HttpResponse } from "../response/httpResponse";
import { SharedMiddleware } from "./shared.middleware";

const hhtpResponse = new HttpResponse();

export const sharedMiddleware = new SharedMiddleware(hhtpResponse);
