import { Query, Resolver } from "@nestjs/graphql";
import { PrismaService } from "../prisma/prisma.service";
import { User } from "./models/user.model";

@Resolver()
export class UsersResolver {
  constructor(private prisma: PrismaService) {}

  @Query(() => [User])
  async users() {
    return await this.prisma.users.findMany();
  }

  /*
  async createUser(data) {
    return this.prisma.user.create({
      data,
    });
  }

  async updateUser(params) {
    const { where, data } = params;
    return this.prisma.user.update({
      data,
      where,
    });
  }

  async deleteUser(where) {
    return this.prisma.user.delete({
      where,
    });
  }
  */
}
