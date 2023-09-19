import { NullLiteral } from "typescript";
import { User } from "../../shared/interfaces/user.interfaces";

export interface authRepository {
  getUser(email: string): Promise<User | null>;
  ResetPassword(id: string, token: string | null): Promise<User | null>;
  getByToken(token: string): Promise<User | null>;
  updatePassword(id: string, password: string): Promise<User | null>;
}
