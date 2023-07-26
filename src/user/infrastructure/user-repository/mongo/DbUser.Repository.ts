import { userModel } from "../../../domain/user.model";
import { User } from "../../../domain/user.interfaces";
import { userRepository } from "../../../domain/user.repository";

export class UserRepository implements userRepository {
  async getAllUser(): Promise<User[] | null> {
    const data = await userModel.find({ status: true });
    return data;
  }
}
