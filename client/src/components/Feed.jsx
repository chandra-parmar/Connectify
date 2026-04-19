import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../utils/slices/feedSlice'
import { useEffect } from 'react'
import axios from 'axios'
import UserCard from '../components/UserCard'


function Feed() {

   const dispatch = useDispatch()
   const feed = useSelector((store) => store.feed)

  //get feed
  const getFeed = async()=>{

    try{
      
      //if feed already present then return 
      if(feed)
      {
        return 
      }

       const res = await axios.get('http://localhost:5001/api/feed',{
         withCredentials:true
       })

       //add feed data to store
       console.log('feed response:', res?.data)
       dispatch(addFeed(res?.data?.data || []))

       

    }catch(err)
    {
      console.log(err)
    }
  }

  useEffect(()=>{
    getFeed()
  },[])

 
  if(!feed)
  {
    return
  }

  if(feed.length <= 0)
  {
    return (
         
      <h1 className='flex justify-center font-bold text-4xl'>No new user found</h1>
    )
  }

  return (
    <div>
      <div className='flex justify-center my-10'>
        <UserCard user={feed[0]} />
      </div>
    </div>
  )
}

export default Feed
