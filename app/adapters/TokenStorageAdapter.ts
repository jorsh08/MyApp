import * as SecureStore from 'expo-secure-store';

export interface ITokenStorageAdapter {
  saveToken(token: string): Promise<void>
  getToken(): Promise<string | null>
  removeToken(): Promise<void>
}

export class TokenStorageAdapter implements ITokenStorageAdapter {
  private readonly key = 'access_token'

  async saveToken(token: string): Promise<void> {
    await SecureStore.setItem(this.key, token)
  }

  async getToken(): Promise<string | null> {
    return await SecureStore.getItem(this.key)
  }

  async removeToken(): Promise<void> {
    await SecureStore.deleteItemAsync(this.key)
  }
}