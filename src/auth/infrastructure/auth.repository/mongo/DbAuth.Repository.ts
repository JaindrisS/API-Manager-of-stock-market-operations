import { authRepository } from "../../../domain/auth.repository";
import { Login } from "../../../domain/auth.interfaces";
import { userModel } from "../../../../shared/models/user.model";
import { User } from "../../../../shared/interfaces/user.interfaces";

export class AuthRepository implements authRepository {
  async getUser(email: string): Promise<User | null> {
    const user = await userModel.findOne({
      email: { $regex: email, $options: "i" },
    });

    return user;
  }

  async ResetPassword(id: string, token: string): Promise<User | null> {
    const user = await userModel.findByIdAndUpdate(
      id,
      {
        resetPassword: token,
      },
      { returnDocument: "after" }
    );

    return user;
  }
}
