import Constants from 'expo-constants'

const getExtra = () => {
  const manifest = (Constants.expoConfig ?? (Constants.manifest as any)) || {}
  return manifest.extra || {}
}

const { API_URL } = getExtra()
const baseUrl = (API_URL || 'http://localhost:3000').replace(/\/$/, '') 

export class ApiService {
  private static buildUrl(path: string) {
    const cleanPath = path.replace(/^\//, '')
    return `${baseUrl}/${cleanPath}`
  }

  static async get<T>(path: string, token?: string): Promise<T> {
    const url = this.buildUrl(path)
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      }
    })
    const text = await response.text()
    const data = text ? JSON.parse(text) : null
    if (!response.ok) {
      const msg = data?.errorMessage ?? data?.message ?? `HTTP ${response.status}`
      throw new Error(msg)
    }
    return data as T
  }

  static async post<T>(path: string, body: any, token?: string): Promise<T> {
    const url = this.buildUrl(path)
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      },
      body: JSON.stringify(body)
    })
    if (!response.ok) throw new Error('Network error')
    return response.json()
  }

  static async postWithoutToken<T>(path: string, body: any): Promise<T> {
    const url = this.buildUrl(path)
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })

    const text = await response.text()
    let data: any
    try {
      data = text ? JSON.parse(text) : null
    } catch {
      data = text
    }

    if (!response.ok) {
      const message = data?.errorMessage ?? data?.message ?? String(data) ?? 'Network error'
      throw new Error(message)
    }

    return data as T
  }
}