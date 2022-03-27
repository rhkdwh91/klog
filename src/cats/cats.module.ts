import { Module } from "@nestjs/common";
import { CatsReslover } from "./cats.resolver";

@Module({
  providers: [CatsReslover],
})
export class CatsModule {}
