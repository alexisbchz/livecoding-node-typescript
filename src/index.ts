import { ApolloServer } from "apollo-server";
import dataSource from "./dataSource";
import { buildSchema } from "type-graphql";
import { WildersResolver } from "./resolvers/WildersResolver";

const start = async (): Promise<void> => {
  await dataSource.initialize();

  const port = 5000;

  const schema = await buildSchema({ resolvers: [WildersResolver] });
  const server = new ApolloServer({
    schema,
  });

  try {
    const { url }: { url: string } = await server.listen({ port });
    console.log(`🚀  Server ready at ${url}`);
  } catch (err) {
    console.log("Error starting the server");
  }
};
void start();
