import React, { useState } from 'react'
import Nav from '../components/Nav'
import {Grid,Stack} from '@mui/material'
import { Link } from 'react-router-dom'
import {gql,useQuery,useMutation} from '@apollo/client'
import {useNavigate} from 'react-router-dom'

const Register = () => {
  const navigate = useNavigate()
  const [values,setValues]=useState({email:"",username:"",password:"",conFirmPassword:""})
  const [user,setUser] = useState()
  const [register,{loading,error,data}] = useMutation(REGISTERQUERY,{
    update(_,{data:{register}}){
      console.log(register)
      navigate('/')
      setUser(register)
    
    },
    onError(err){
      console.log(err.graphQLErrors)
    },
    variables:values
  })
  const onChange=(e)=>{
      setValues({...values,[e.target.name]:e.target.value})
  }
  const handleSubmit = async(e)=>{
    e.preventDefault()
    console.log(values)
    register()
  }
  return (
    <>
      <div  className='bg-[#171d24] min-h-screen'>
          <Nav/>
          <div className='grid w-[90%] mx-auto place-items-center h-[80vh]'>
              <Grid container spacing={3} justifyContent='space-between' alignItems='center'>
                  <Grid item xs={12} md={6}>
                      <h2 className='text-center text-[#3466f6] mb-6 text-[32px]'>Sign Up</h2>
                    <form onSubmit={handleSubmit}>
                         <Stack spacing={3}>
                            <input className='py-3 px-4 outline-none border-0 rounded-full bg-[#0a0e14] text-white' type='username' placeholder='username' name='username' onChange={onChange}/>
                            <input className='py-3 px-4 outline-none border-0 rounded-full bg-[#0a0e14] text-white' type='email' placeholder='email' name='email' onChange={onChange}/>
                            <input className='py-3 px-4 outline-none border-0 rounded-full bg-[#0a0e14] text-white' type='password' placeholder='password' onChange={onChange} name='password'/>
                            <input className='py-3 px-4 outline-none border-0 rounded-full bg-[#0a0e14] text-white' type='password' placeholder='confirmpassword' onChange={onChange} name='conFirmPassword'/>
                            <button type="submit" className='rounded-[50px] cursor-pointer outline-none border-0 py-3 px-6 bg-[#3466f6] text-center text-white'>Sign Up</button>
                            <p className='text-white text-center'>Already have an account ? <Link to='/login' className="text-[#3466f6]">Login</Link></p>
                         </Stack>
                    </form>
                  </Grid>
                  <Grid item xs={12} md={4}>
                     <img src="/img/login.svg" className='object-cover'/>
                  </Grid>
              </Grid>
          </div>
      </div>
    </>
  )
}

const REGISTERQUERY = gql`
mutation($username: String!, $email: String!, $password: String!, $conFirmPassword: String!){
  register(username: $username, email: $email, password: $password, conFirmPassword: $conFirmPassword) {
    id
    token
    username
    email
    post
  }
}
`

export default Register