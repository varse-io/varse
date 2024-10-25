import { AuthService } from './auth'
import { HTTPService } from './http'
import {
  LoginRequest,
  LoginResponse,
  SignupRequest,
  SignupResponse,
} from './types'

export class BackendService {
  private httpService: HTTPService
  private authService: AuthService

  constructor(httpService: HTTPService, authService: AuthService) {
    this.httpService = httpService
    this.authService = authService
  }

  async signup(signupRequest: SignupRequest): Promise<SignupResponse> {
    const user = await this.httpService.request<SignupResponse>(
      '/user',
      'POST',
      signupRequest,
    )
    this.authService.setToken(user.token.token)
    return user
  }

  async login(loginRequest: LoginRequest): Promise<LoginResponse> {
    const user = await this.httpService.request<LoginResponse>(
      '/login',
      'POST',
      loginRequest,
    )
    this.authService.setToken(user.token.token)
    return user
  }
}
