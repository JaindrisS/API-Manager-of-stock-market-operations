import { User } from "../../shared/interfaces/user.interfaces";

export interface authRepository {
  getUser(email: string): Promise<User | null>;
}
