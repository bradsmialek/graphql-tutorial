const graphql = require('graphql');
const _ = require('lodash');

//ES6 Destructuring
const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList } = graphql;

//dummy data
var books = [
    {name: 'Wind', genre: 'Fantasy', id: '1', authorid: '1'},
    {name: 'Fire', genre: 'Sci-Fi', id: '2', authorid: '2'},
    {name: 'Ice', genre: 'Comedy', id: '3', authorid: '3'},
    {name: 'Water', genre: 'Fantasy', id: '4', authorid: '1'},
    {name: 'Earth', genre: 'Sci-Fi', id: '5', authorid: '2'},
    {name: 'Marsh', genre: 'Comedy', id: '6', authorid: '3'}
];

var authors = [
    {name: 'Brad', age: 40, id: '1'},
    {name: 'Zach', age: 9, id: '2'},
    {name: 'Jonah', age: 7, id: '3'}
];

// Query TYPES
const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                return _.filter(books, {authorid: parent.id})
            }
        }
    })
});


const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        author: {
            type: AuthorType,
            resolve(parent, args){
                console.log(parent);
                return _.find(authors, {id: parent.authorid});
            }
        }
    })
});



//ROOT QUERY
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                // code to get data
                return _.find(books, {id: args.id});
            }
        },
        author: {
            type : AuthorType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                return _.find(authors, {id: args.id})
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                return books;
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args){
                return authors;
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: {type: GraphQLString},
                age: {type: GraphQLInt}
            },
            resolve(parent, args){
                let author = new AuthorType({
                    name: args.name,
                    age: args.age
                });
                author.save();
            }
        }
    }
})

//EXPORTING MODULE
module.exports = new GraphQLSchema({
    query: RootQuery
    // mutation: Mutation
})