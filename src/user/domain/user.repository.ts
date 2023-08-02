import { UserDTO } from "../application/user.dto";
import { User } from "./user.interfaces";

export interface userRepository {
  getAllUser(): Promise<User[] | null>;

  save(data: UserDTO): Promise<unknown>;
}
