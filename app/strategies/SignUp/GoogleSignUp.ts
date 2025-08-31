import { SignUpResponse } from '@/app/interfaces/SignUpResponse';
import { UserRepository } from '../../repositories/UserRepository';
import { SignupStrategy } from './SignupStrategy';

export class GoogleSignUp implements SignupStrategy {
  private repo = new UserRepository()

  // Simula un signup vía "Google" — en realidad usa el repo.signUp
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