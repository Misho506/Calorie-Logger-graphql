import { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList, GraphQLNonNull } from 'graphql';
import UserModel from '../models/user.js';

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    email: { type: GraphQLString },
    userName: { type: GraphQLString },
    password: { type: GraphQLString },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
  },
});

const UserQueryFields = {
  user: {
    type: UserType,
    args: { id: { type: GraphQLID } },
    resolve(_parent, { id }) {
      return UserModel.findById(id);
    },
  },
  users: {
    type: new GraphQLList(UserType),
    resolve() {
      return UserModel.find({});
    },
  },
}

const UserMutationFields = {
  addUser: {
    type: UserType,
    args: {
      email: { type: new GraphQLNonNull(GraphQLString) },
      userName: { type: new GraphQLNonNull(GraphQLString) },
      password: { type: new GraphQLNonNull(GraphQLString) },
      firstName: { type: new GraphQLNonNull(GraphQLString) },
      lastName: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve(_parent, { email, userName, password, firstName, lastName }) {
      const user = new UserModel({
        email,
        userName,
        password,
        firstName,
        lastName,
      });
      return user.save();
    },
  },
}

export {
  UserQueryFields,
  UserMutationFields
};