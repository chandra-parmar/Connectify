import { useState } from "react"
import { useDispatch } from "react-redux"
import axios from "axios"
import toast from "react-hot-toast"

function EditProfile({ user })
{

    //states 
     const [firstName,setFirstName] = useState(user.firstName)
     const [lastName, setLastName] = useState(user.lastName)
     const [age, setAge] = useState(user.age)
      const [gender, setGender] = useState(user.gender)
       const [about, setAbout] = useState(user.about)
      const [photoUrl, setPhotoUrl] = useState(user.photoUrl)
      const [error, setError] = useState("")
      const dispatch = useDispatch()

      //edit profile api
      const saveProfile = async()=>{

        try{
           const res  =  axios.patch('http://localhost:5001/api/profile/edit',{
             firstName, lastName, age, gender,about,photoUrl
           }, { withCredentials:true})
            
            toast.success("Profile updated successfully!")
           dispatch(addUser(res ))
          

        }catch(err)
        {
          setError(err.message)
        }
      }

    return(

        <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <form className="w-full max-w-lg bg-base-100 border border-base-300 rounded-2xl shadow-lg p-6">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-semibold">Edit Profile</h2>
          <p className="text-sm text-gray-500">Update your profile information</p>
        </div>

        <div className="grid gap-4">
          <div>
            <label className="label">
              <span className="label-text">First Name</span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="Edit first name"
              value={firstName}
              onChange={(e)=> setFirstName(e.target.value)}
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text">Last Name</span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="Edit last name"
              value={lastName}
              onChange={(e)=> setLastName(e.target.value)}
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text">Photo URL</span>
            </label>
            <input
              type="url"
              className="input input-bordered w-full"
              placeholder="Edit photo URL"
              value={photoUrl}
              onChange={(e)=> setPhotoUrl(e.target.value)}
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text">About</span>
            </label>
            <textarea
              className="textarea textarea-bordered w-full"
              placeholder="Edit about"
              value={about}
              onChange={(e)=> setAbout(e.target.value)}
              rows={4}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label">
                <span className="label-text">Age</span>
              </label>
              <input
                type="number"
                className="input input-bordered w-full"
                placeholder="Edit age"
                value={age}
                onChange={(e)=> setAge(e.target.value)}
              />
            </div>
            <div>
              <label className="label">
                <span className="label-text">Gender</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="Edit gender"
                value={gender}
                onChange={(e)=> setGender(e.target.value)}
              />
            </div>
          </div>

          <button type="submit" className="btn btn-neutral mt-2 w-full" onClick={saveProfile}>Save Profile</button>
        </div>
      </form>
    </div>
    )
}

export default EditProfile