import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { addUser } from '../utils/slices/userSlice'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'



const Login = () => {

     const [email,setEmail] = useState("")
     const [password,setPassword] = useState("")
     const [firstName , setFirstName] = useState("")
     const [lastName, setLastName] = useState("")
     const [isLogInForm , setIsLogInForm] = useState(true)
     const [error,setError] = useState("")
     const dispatch = useDispatch()
     const navigate = useNavigate()

    

      const handleLogin = async()=>{
    
         try{

            const res= await axios.post('http://localhost:5001/api/login',{
               email,
               password
           },
           { withCredentials: true })
           
           console.log("Login successful:", res.data)

           //data added to the redux store
           dispatch(addUser(res.data))
            
           toast.success("Logged In successfully!")
           return navigate('/feed')
           
        }catch(err)
        {
          
           setError(err?.response?.data || "Invalid credentials")
           
        }
            
         
      }

      const handleSignup = async()=>{

         try{

             const res = await axios.post('http://localhost:5001/api/signup',{
               firstName, lastName, email,password
             },{ withCredentials: true})
            
             dispatch(addUser(res.data))
             toast.success('register successfully!')
             return navigate('/login')
             

         }catch(err)
         {
           setError(err?.response?.data || "something went wrong")
         }
      }

  return (
    

    <div className="flex flex-row justify-center items-center mt-25">

      <div className='card bg-base-300 w-96 shadow-xl'>
         <div className='card-body'>
           <h2 className='card-title justify-center'>

            { isLogInForm ? "Login" :"Sign up"}
           </h2>

           <div className='flex flex-col gap-3 mt-5'>

             {
               !isLogInForm && (
                  <>
                     <label className="label">FirstName</label>
                     <input type="email" className="input" placeholder="firstName" value={firstName} 
                     onChange={(e)=> setFirstName(e.target.value)} required />

                     <label className="label">LastName</label>
                     <input type="email" className="input" placeholder="lastName" value={lastName} 
                      onChange={(e)=> setLastName(e.target.value)} required/>
                  </>
               )
             }


               <label className="label">Email</label>
               <input type="email" className="input" placeholder="Email" value={email} 
                  onChange={(e)=> setEmail(e.target.value)}
                  required
                  
               />

          

               <label className="label">Password</label>
               <input type="password" className="input" placeholder="Password" value={password} 
                  onChange={(e)=> setPassword(e.target.value)}
                  required
                  
               />
          
          <p className='text-red-500'>{error}</p>
          <div className='card-actions justify-center m-2'>

             <button type="submit" className="btn btn-neutral mt-4" onClick={ isLogInForm ? handleLogin : handleSignup}>
                 { isLogInForm ? 'Login' : 'Signup'}
              </button>
          </div>
          
          <p className='mx-auto cursor-pointer py-2' onClick={()=> setIsLogInForm((value) => !value)}>
            {isLogInForm ? "New user ? signup here" : "Existing user? Login here"}
          </p>
         </div>

      </div>
   </div>
      
      
        
         
      
      
    </div>
  )
}

export default Login
