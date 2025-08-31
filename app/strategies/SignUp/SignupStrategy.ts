import { SignUpResponse } from "@/app/interfaces/SignUpResponse";

export interface SignupStrategy {
  create(username: string, password: string): Promise<SignUpResponse>
}