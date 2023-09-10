import { User } from "../../shared/interfaces/user.interfaces";

export interface authRepository {
  getUser(email: string): Promise<User | null>;
  ResetPassword(id: string, token: string): Promise<User | null>;
}
