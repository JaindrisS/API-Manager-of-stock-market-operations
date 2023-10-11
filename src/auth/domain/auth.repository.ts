import { User } from "../../shared/interfaces/user.interfaces";

export interface authRepository {
  getUser(email: string): Promise<User | null>;
  ResetPassword(id: string, token: string | null): Promise<User | null>;
  getByToken(token: string): Promise<User | null>;
  updatePassword(id: string, password: string): Promise<User | null>;
  updateUnsuccessfulAttempts(
    id: string,
    number: number | null,
    newValue: number | null
  ): Promise<unknown>;
  blockedUntil(id: string, number: number): Promise<unknown>;
}
