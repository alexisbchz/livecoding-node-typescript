import { ApolloServer, gql } from "apollo-server";
import dataSource from "./dataSource";
import Wilder from "./entities/Wilder";
import Skill from "./entities/Skill";

const typeDefs = gql`
  type Wilder {
    id: ID
    name: String
    skills: [Skill]
  }
  type Skill {
    id: ID
    name: String
  }
  type Grade {
    grade: Int
    skill: Skill
  }
  type Query {
    getAllWilders: [Wilder]
  }
  type Mutation {
    createSkill(name: String): Skill
  }
`;

const resolvers = {
  Query: {
    getAllWilders: async () => {
      const allWilders = await dataSource.manager.find(Wilder, {
        relations: {
          skills: true,
        },
      });
      console.log(JSON.stringify(allWilders, null, 2));
      return allWilders;
    },
  },
  Mutation: {
    createSkill: async (_: any, args: any) => {
      console.log(args);
      const skillToCreate = new Skill();
      skillToCreate.name = args.name;
      return await dataSource.manager.save(Skill, skillToCreate);
    },
  },
};

const start = async (): Promise<void> => {
  await dataSource.initialize();

  const port = 5000;

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  try {
    const { url }: { url: string } = await server.listen({ port });
    console.log(`🚀  Server ready at ${url}`);
  } catch (err) {
    console.log("Error starting the server");
  }
};
void start();
