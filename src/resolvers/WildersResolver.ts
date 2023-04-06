import { Arg, Mutation, Query } from "type-graphql";
import dataSource from "../dataSource";
import Wilder from "../entities/Wilder";

export class WildersResolver {
  @Query(() => [Wilder])
  async getAllWilders(): Promise<Wilder[]> {
    const allWilders = await dataSource.manager.find(Wilder, {
      relations: {
        skills: true,
      },
    });
    console.log(JSON.stringify(allWilders, null, 2));
    return allWilders;
  }

  @Mutation(() => Wilder)
  async createWilder(
    @Arg("name") name: string,
    @Arg("city") city: string
  ): Promise<Wilder> {
    const wilderToCreate = new Wilder();
    wilderToCreate.name = name;
    wilderToCreate.city = city;
    return await dataSource.manager.save(Wilder, wilderToCreate);
  }
}
