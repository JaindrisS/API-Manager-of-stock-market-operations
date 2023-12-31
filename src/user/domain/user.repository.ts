import { UserDTO, UpdateUserDto, IdParam } from "../application/user.dto";
import { User } from "../../shared/interfaces/user.interfaces";

export interface userRepository {
  getAllUser(): Promise<User[] | null>;

  save(data: UserDTO): Promise<unknown>;

  getByEmail(email: string): Promise<User[] | null>;

  updateUser(id: string, data: UpdateUserDto): Promise<unknown>;

  getById(id: IdParam): Promise<unknown>;

  deleteUser(id: string): Promise<unknown>;
}
