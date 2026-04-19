import React, { useEffect } from 'react'
import Navbar from './components/Navbar'
import { Outlet, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from './utils/slices/userSlice'
import axios from 'axios'

function Body() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userData = useSelector((store) => store.user)

  const fetchUser = async () => {
    if (userData) {
      return
    }

    try {
      const res = await axios.get('http://localhost:5001/api/profile/view', {
        withCredentials: true,
      })
      dispatch(addUser(res.data))
    } catch (err) {
      if (err.response?.status === 401) {
        navigate('/login')
      }
      console.log(err)
    }
  }

  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      dispatch(addUser(JSON.parse(savedUser)))
    } else {
      fetchUser()
    }
  }, [])

  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  )
}

export default Body
