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

  async getByToken(token: string): Promise<User | null> {
    const user = await userModel.findOne({ resetPassword: token });

    return user;
  }

  async updatePassword(id: string, password: string): Promise<User | null> {
    const user = await userModel.findByIdAndUpdate(
      id,
      { password: password },
      { returnDocument: "after" }
    );

    return user;
  }

  async updateUnsuccessfulAttempts(
    id: string,
    number: number | null,
    newValue: number | null
  ): Promise<unknown> {
    let updateData: any = {};

    if (number !== null) {
      updateData.$inc = { unsuccessfulAttempts: number };
    }

    if (newValue !== null) {
      updateData.unsuccessfulAttempts = newValue;
    }

    const user = userModel.findByIdAndUpdate(id, updateData, {
      returnDocument: "after",
   
    });
    return user;
  }

  async blockedUntil(id: string, number: number): Promise<unknown> {
    const user = userModel.findByIdAndUpdate(
      id,
      {
        blockedUntil: number,
      },
      { returnDocument: "after" }
    );

    return user;
  }
}
