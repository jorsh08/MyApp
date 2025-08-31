import { SignUpResponse } from '@/app/interfaces/SignUpResponse';
import { SignupStrategy } from './SignupStrategy';

export class GoogleSignUp implements SignupStrategy {
  async create(username: string, password: string): Promise<SignUpResponse> {
    try {
      //logica google
      return { username, error: false };
    } catch (error) {
      console.log('GoogleSignUp error:', error)
      return { username: '', error: true, errorMessage: 'Error' }
    }
  }
}