var express = require('express')
var egql = require('express-graphql')
var { buildSchema } = require('graphql')
const data = require('./db')

// GraphQL Schema
var schema = buildSchema(`
    type Query {
        course(id: Int!): Course
        courses(topic: String): [Course]
    }

    type Course {
        id: Int
        title: String
        author: String
        description: String
        topic: String
        url: String
    }
`);

var getCourse = (args) => {
    var id = args.id;
    return data.filter((course) => {
        return course.id == id
    })[0]
}

var getCourses = (args) => {
    if(args.topic){
        var topic = args.topic
        return data.filter((course) => {
            course.topic === topic
        })

    } else {
        return data
    }
}

// Root Resolver
var root = {
    course: getCourse,
    courses: getCourses
}

var app = express()
app.use('/graphql', egql({
    schema: schema,
    rootValue: root,
    graphiql: true
}))
const PORT = 4000
app.listen(PORT, () => {
    console.log(`🚀 ⚡ Server Running at localhost:${PORT}/graphql ✨ ✨`)
})