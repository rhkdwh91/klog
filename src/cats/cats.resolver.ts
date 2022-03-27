import { Resolver, Query } from "@nestjs/graphql";
import { Cat } from "./models/cat.model";

@Resolver()
export class CatsReslover {
  @Query(() => Cat)
  async cats() {
    return {
      id: 1,
      firstName: "Lion",
      lastName: "King",
    };
  }
  @Query(() => String)
  async angry() {
    return "No!!";
  }
}
