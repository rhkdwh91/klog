import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { BlogController } from "./blog/blog.controller";
import { BlogService } from "./blog/blog.service";
import { CatsModule } from "./cats/cats.module";

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      debug: true,
      playground: true,
      autoSchemaFile: "schema.gql",
    }),
    CatsModule,
  ],
  controllers: [BlogController],
  providers: [BlogService],
})
export class AppModule {}
