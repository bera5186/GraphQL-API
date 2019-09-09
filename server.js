var express = require('express')
var egql = require('express-graphql')
var { buildSchema } = require('graphql')

// GraphQL Schema
var schema = buildSchema(`
    type Query {
        message: String
    }
`);

var root = {
    message: () => 'Hello world'
}

var app = express()
app.use('/graphql', egql({
    schema: schema,
    rootValue: root,
    graphiql: true
}))

app.listen(4000, () => console.log('Server Running'))