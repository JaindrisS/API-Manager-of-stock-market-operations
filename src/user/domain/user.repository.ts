import { User } from "./user.interfaces";

export interface userRepository {
  getAllUser(): Promise<User[] | null>;
}
