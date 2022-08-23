const graphql = require('graphql');

//models
const user = require('../models/users');

const _ = require('lodash'); //to avoid mongoDB _id underscore

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
    //....
} = graphql;

//Types

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
    })
});

//@notice
//you can also next one object inside another by defining such in types
//check out net ninja's youtube channel for more.
//also check out graphql documentation

//Queries and Mutations

//Query is GET request in graphql terms
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        //get all Users
        users: {
            type: new GraphQLList(UserType),
            resolve(parent, args){
                return user.find({});
            }
        },

        //get specific User by email
        user:{
            type: UserType,
            args: { email: { type: GraphQLString } },
            resolve(parent, args){
                return user.findOne({email:args.email});
            }
        },
    }
});

//Mutation POST,PUT,PATCH,DELETE in graphql terms
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        //add user
        addUser: {
            type: UserType,
            args: {
                name: { type: GraphQLString },
                email : { type:GraphQLString }
            },
            resolve(parent, args){
                let user = new User({
                    name: args.name,
                    email : args.email,
                });
                return user.save();
            }
        },
        //delete user by id
        deleteUser: {
            type: UserType,
            args: {
                id : { type : GraphQLString },
            },
            resolve(parent, args){
                return user.findByIdAndRemove(args.id);
            }
        }
    }
});


module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});