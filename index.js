import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { Neo4jGraphQL } from "@neo4j/graphql";
import neo4j from "neo4j-driver";
import { toGraphQLTypeDefs } from "@neo4j/introspector";
import fs from "fs";

// const uri = "neo4j://10.12.34.23:32000";
const uri = "neo4j://172.30.99.120:7687";
const username = "neo4j";
const password = "password";
const driver = neo4j.driver(uri, neo4j.auth.basic(username, password));

async function main() {
  const sessionFactory = () =>
    driver.session({
      database: "atamerfacility",
    });
  const readonly = false; // We don't want to expose mutations in this case
  const typeDefs = await toGraphQLTypeDefs(sessionFactory, readonly);
  fs.writeFileSync("schema.graphql", typeDefs);
  await driver.close();
}
main();
