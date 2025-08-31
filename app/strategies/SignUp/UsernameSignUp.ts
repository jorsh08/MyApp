import { SignUpRequest } from '@/app/interfaces/SignUpRequest'
import { SignUpResponse } from '@/app/interfaces/SignUpResponse'
import { UserRepository } from '../../repositories/UserRepository'
import { SignupStrategy } from './SignupStrategy'

export class UsernameSignUp implements SignupStrategy {
  private repo = new UserRepository()

  // Simula un signup vía "Google" — en realidad usa el repo.signUp
  async create(username: string, password: string): Promise<SignUpResponse> {
    try {
      const req: SignUpRequest = { username, password }
      const res = await this.repo.signUp(req)
      return res
    } catch (error) {
      console.log('UsernameSignUp error:', error)
      return { username: '', error: true, errorMessage: 'Error' }
    }
  }
}