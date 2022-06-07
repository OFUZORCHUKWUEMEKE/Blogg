const {ApolloServer} = require('apollo-server-express')
const express = require('express')
const mongoose  = require('mongoose')
const {MONGODB,SECRET_KEY} = require('./utils/config');
const typeDefs = require('./graphql/typeDefs') 
const resolvers = require('./graphql/resolvers')  
const cors = require('cors')

const startServer = async()=>{
    const app = express()

    const server = new ApolloServer({
        typeDefs,
        resolvers, 
        context:({req})=>({req}),
        csrfPrevention: true, 
        cors: {
            origin: ["http://localhost:3000/", "https://studio.apollographql.com"]
          },
    })
    await server.start()

    server.applyMiddleware({app})  

    mongoose.connect(MONGODB,async()=>{ 
        app.listen(4000,()=>console.log('Server listening On Port 4000')) 
    })

}

startServer()




