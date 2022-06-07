const postResolver = require('./post')
const userResolver = require('./user')
module.exports = {
    Query:{
       ...postResolver.Query,
       ...userResolver.Query
    }, 
    Mutation:{
      ...postResolver.Mutation,
      ...userResolver.Mutation
    }
}