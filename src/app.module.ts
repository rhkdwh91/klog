import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { BlogController } from "./blog/blog.controller";
import { BlogService } from "./blog/blog.service";
import { CatsModule } from "./cats/cats.module";
import { UsersModule } from "./users/users.module";

@Module({
  imports: [
    CatsModule,
    UsersModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      debug: true,
      playground: true,
      autoSchemaFile: "schema.gql",
    }),
  ],
  controllers: [BlogController],
  providers: [BlogService],
})
export class AppModule {}
