import { SharedMiddleware } from "../../shared/middleware/shared.middleware";
import { HttpResponse } from "../../shared/response/httpResponse";

export class AuthMiddleware extends SharedMiddleware {
  constructor(httpResponse: HttpResponse) {
    super(httpResponse);
  }
}
