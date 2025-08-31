import { LoginResponse } from '../interfaces/LoginResponse'
import { SignUpRequest } from '../interfaces/SignUpRequest'
import { SignUpResponse } from '../interfaces/SignUpResponse'
import { User } from '../models/User'
import { ApiService } from '../services/ApiService'

export class UserRepository {

  async getUsers(token: string): Promise<User[]> {
    try {
      return await ApiService.get<User[]>('user', token)
    } catch (error) {
      return []
    }
  }

  async signUp(req: SignUpRequest): Promise<SignUpResponse> {
    try {
      return await ApiService.postWithoutToken<SignUpResponse>( 'user', { username: req.username, passwordHash: req.password } )
    } catch (error: any) {
      return { username: '', error: true, errorMessage: error.message ?? 'Error' }
    }
  }

  async signIn(username: string, password: string): Promise<LoginResponse> {
    try {
      return await ApiService.postWithoutToken<LoginResponse>('user/login', { username, password } )
    } catch (error: any) {
      return { token: '', error: true, errorMessage: error.message ?? 'Error' }
    }
  }

}