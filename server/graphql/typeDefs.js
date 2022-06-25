const { gql } = require('apollo-server-express')


module.exports = gql`

type Post{
       id:ID!
       body:String!
       user:[String]
       title:String! 
       username:String!
       comments:[Comment]!
       likes:[Like]!
       slug:String!
       createdAt:String!
       coverPhoto:String!
       isPublished:Boolean!   
   }
   type User{
       id:ID!
       username:String!
       email:String!
       token:String! 
       post:[ID]
       followers:[ID]
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
       getPosts:[Post!]
       getPost(id:ID!):Post!  
       deletePost:String!
       getUsers:[User]!
       getUser(username:String!):User!
   }

   type Mutation{
       login(email:String!,password:String!):User!
       register(username:String!,email:String!,password:String!,conFirmPassword:String!):User!
       userPosts(id:ID!):[Post]!
       likePost(postid:ID!):Post!
       createComment(postid:ID!,body:String!):Post
       deletePost(postid:ID!):String!
       deleteComment(postId:ID!,commentId:ID!):String! 
       SinglePost(id:ID!):Post
       deleteUsers:String!
       createPost(body:String,title:String!,coverPhoto:String!):Post!  
       findUser(username:String!):User
       deleteUser(username:String!):String
       followUser(id:ID!):User
   } 
`