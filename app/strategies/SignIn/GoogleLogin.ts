import { LoginStrategy } from "../../strategies/SignIn/LoginStrategy";

export class GoogleLogin implements LoginStrategy {
  async login() {
    //logica google
    return { token: 'google-token' };
  }
}