import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { UserQueryFields, UserMutationFields } from "./userSchema.js";
import { CalorieQueryFields, CalorieMutationFields } from "./calorieSchema.js";

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    ...CalorieQueryFields,
    ...UserQueryFields
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    ...CalorieMutationFields,
    ...UserMutationFields
  },
});

export default new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
