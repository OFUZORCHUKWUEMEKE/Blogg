const {ApolloServer} = require('apollo-server-express')
const { PubSub } =require('graphql-subscriptions') ;
const express = require('express')
const mongoose  = require('mongoose')
const {MONGODB,SECRET_KEY} = require('./utils/config');
const typeDefs = require('./graphql/typeDefs') 
const resolvers = require('./graphql/resolvers')  
const cors = require('cors')
const createPost = require('./controllers/post');
const verifyToken = require('./middlewares/auth');

const pubsub = new PubSub();

const startServer = async()=>{
    const app = express()

    app.use(cors())

    app.use(express.json())

    app.get('/',(req,res)=>res.send('REST API WORKING'))

    app.use('/createpost',verifyToken,createPost)

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




