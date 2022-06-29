const { gql } = require('apollo-server-express')


module.exports = gql`

type Post{
       id:ID!
       body:String!   
       user:[ID]
       title:String! 
       username:String!
       comments:[Comment]!
       likes:[Like]!
       slug:String!
       createdAt:String!
       coverPhoto:String!
       isPublished:Boolean!   
   }
   type Followers{
    id: ID!
    createdAt: String!
    username: String!  
   }

   type Following{
    id: ID!
    createdAt: String!
    username: String!  
   }
   type User{
       id:ID!
       username:String!
       email:String!
       token:String! 
       post:[ID]
       followers:[Followers]
       following:[Following]
   }

   

   type Comment {
    id: ID!  
    createdAt: String!
    username: String!
    body: String!
  }
  type Like {
    id: ID!
    createdAt: String!
    username: String!
  }
  input RegisterInput{
      username:String!
      email:String
      password:String!
      conFirmPassword:String!
  }
   input Body {
       title:String!
       body:String!
       coverPhoto:String!
   }
   type Query{
       getPosts:[Post]
       getPost(id:ID!):Post!
       deletePost:String!
       getUsers:[User]
       getUser(username:String!):User!
   }

   type Mutation{
       login(email:String!,password:String!):User!
       register(username:String!,email:String!,password:String!,conFirmPassword:String!):User!
       userPosts(id:ID!):[Post]!
       likePost(postId: ID!): Post!
       createComment(postid:ID!,body:String!):Post
       deletePost(postid:ID!):String!
       deleteComment(postId:ID!,commentId:ID!):String! 
       findPost(slug:String!,username:String!):Post! 
       deleteUsers:String!
       createPost(body:String!,title:String!,coverPhoto:String!):Post! 
       findUser(username:String!):User
       deleteUser(username:String!):String
       followUser(userId:ID,user:ID):User
   } 
`