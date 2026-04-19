
import { useSelector } from "react-redux"
import EditProfile from "./EditProfile"


function Profile()
{
    //get user from the store
    const user = useSelector((store) => store.user)
    return(
       
        user &&(  
        <div>
           
            Profile
            <EditProfile user={user} ></EditProfile>
        </div>
        )
    )
}

export default Profile