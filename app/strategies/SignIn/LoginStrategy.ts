import { LoginResponse } from "@/app/interfaces/LoginResponse";

export interface LoginStrategy {
  login(username?: string, password?: string): Promise<LoginResponse>;
}