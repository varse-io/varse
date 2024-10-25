import { Prisma, PrismaClient, User } from '@prisma/client'
import { UserInfo } from './types'

export class UserService {
  private prisma: PrismaClient

  constructor() {
    this.prisma = new PrismaClient()
  }

  async createUser(input: Prisma.UserCreateInput): Promise<UserInfo> {
    const user = await this.prisma.user.create({
      data: input,
    })
    return { id: user.id, email: user.email }
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: { email },
    })
  }
}