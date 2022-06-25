const {ApolloServer} = require('apollo-server-express')
const express = require('express')
const mongoose  = require('mongoose')
const {MONGODB,SECRET_KEY} = require('./utils/config');
const typeDefs = require('./graphql/typeDefs') 
const resolvers = require('./graphql/resolvers')  
const cors = require('cors')
const createPost = require('./controllers/post');
const findPost = require('./controllers/Findpost.js');
const verifyToken = require('./middlewares/auth');
const follow = require('./controllers/user')

const startServer = async()=>{
    const app = express()

    app.use(cors())

    app.use(express.json())
    
    app.get('/',(req,res)=>res.send('REST API WORKING'))
    app.use('/api',findPost)
    app.use('/api',createPost)
    app.use('/api',verifyToken,follow)
    // app.use('/createpost',verifyToken,createPost)
    

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




