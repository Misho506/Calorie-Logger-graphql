import { GraphQLObjectType, GraphQLID, GraphQLList, GraphQLNonNull, GraphQLInt, GraphQLBoolean, GraphQLString } from 'graphql';
import CalorieModel from '../models/calories.js';

const CalorieType = new GraphQLObjectType({
  name: 'Calorie',
  fields: {
    id: { type: GraphQLID },
    amount: { type: GraphQLInt },
    burned: { type: GraphQLBoolean },
    userId: { type: GraphQLString },
  },
});

const CalorieQueryFields = {
  calorie: {
    type: new GraphQLList(CalorieType),
    args: { userId: { type: GraphQLString } },
    resolve(_parent, { userId }) {
      return CalorieModel.find({ userId });
    },
  },
  calories: {
    type: new GraphQLList(CalorieType),
    resolve() {
      return CalorieModel.find({});
    },
  },
}

const CalorieMutationFields = {
  addCalorie: {
    type: CalorieType,
    args: {
      amount: { type: new GraphQLNonNull(GraphQLInt) },
      burned: { type: new GraphQLNonNull(GraphQLBoolean) },
      userId: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve(_parent, { amount, burned, userId }) {
      const calorie = new CalorieModel({
        amount,
        burned,
        userId,
      });
      return calorie.save();
    },
  },
}

export {
  CalorieQueryFields,
  CalorieMutationFields
};