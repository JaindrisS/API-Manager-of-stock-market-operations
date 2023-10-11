export type Roles = "ADMIN" | "USER";

export interface User {
  id: string;
  name: string;
  password: string;
  email: string;
  status: boolean;
  resetPassword?: string;
  rol: Roles;
  img: string;
unsuccessfulAttempts:number,
blockedUntil:number
}

export type Login = Pick<User, "email" | "password">;
