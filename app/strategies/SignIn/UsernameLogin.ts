import { UserRepository } from "../../repositories/UserRepository";
import { LoginStrategy } from "./LoginStrategy";

export class UsernameLogin implements LoginStrategy {
  repo = new UserRepository();

  async login(username: string, password: string) {
    return this.repo.signIn(username, password);
  }
}