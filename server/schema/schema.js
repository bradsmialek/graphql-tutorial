const graphql = require('graphql');

const{GraphQLObjectType, GraphQLString, GraphQLSchema} = graphql;

//dummy data
var books = [
    {name: 'Wind', genre: 'Fantasy', id: '1'},
    {name: 'Fire', genre: 'Sci-Fi', id: '2'},
    {name: 'Ice', genre: 'Comedy', id: '3'}
];

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: ()=> ({
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        genre: {type: GraphQLString}
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: {id:{type: GraphQLString}},
            resolve(parent, args){
                // code to get data
                
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
})