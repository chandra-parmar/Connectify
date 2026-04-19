
import { useDispatch, useSelector } from 'react-redux'
import { Link,  } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { removeUser } from '../utils/slices/userSlice'
import toast from 'react-hot-toast'
import { GrChatOption } from "react-icons/gr";


const Navbar = () => {

   //
   const user = useSelector((store) => store.user )
   const dispatch = useDispatch()
   const navigate = useNavigate()

   //handle logout api 
   const handleLogout = async()=>{
    try{

      const res = await axios.post('http://localhost:5001/api/logout',{},
        {
          withCredentials:true
        })

        //clear data from redux store
        dispatch(removeUser())
         
        toast.success("Logged out!")
       return navigate('/login')

    }catch(err)
    {
       console.log(err)
    }
   }

  return (
    <div className="navbar bg-base-100 shadow-sm px-4">
      <div className="flex-1">

        <Link to='/' className="btn btn-ghost normal-case text-xl">Connectify
         <span><GrChatOption /></span>
        </Link>

      </div>

      {user && (
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline text-sm">Welcome, {user.firstName}</span>

          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full overflow-hidden">
                <img alt="user photo" src={user.photoUrl} />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 w-52 bg-base-100 rounded-box p-2 shadow z-50">
              <li>

                <Link to='/profile' className="justify-between">
                  Profile
                  
                </Link>

              </li>
              <li><Link to='/connections'>Connections</Link></li>
              <li><Link to='/requests'> Requests</Link></li>
              <li><a onClick={handleLogout}>Logout</a></li>
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

export default Navbar
