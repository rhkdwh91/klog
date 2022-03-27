import { Module } from "@nestjs/common";
import { PrismaModule } from "../prisma/prisma.module";
import { UsersResolver } from "./users.resolver";

@Module({
  imports: [PrismaModule],
  providers: [UsersResolver],
})
export class UsersModule {}
