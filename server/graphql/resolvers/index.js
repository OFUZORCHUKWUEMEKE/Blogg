const postResolver = require('./post')
const userResolver = require('./user')
module.exports = {
  // Post: {
  //   likeCount: (parent) => parent.likes.length,
  //   commentCount: (parent) => parent.comments.length
  // },
    Query:{
       ...postResolver.Query,
       ...userResolver.Query
    }, 
    Mutation:{
      ...postResolver.Mutation,
      ...userResolver.Mutation
    }
}