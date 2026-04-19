import { useDispatch } from "react-redux"
import { removeUserFromFeed } from "../utils/slices/feedSlice"
import axios from 'axios'

function Card({ user }) {
    

    const {_id , firstName, lastName, age, photoUrl, gender, about } = user
    const dispatch = useDispatch()

    const handleSendRequest = async (status, userId) =>{
        try{
          
            const res = axios.post(`http://localhost:5001/api/request/send/${status}/${userId}`,{},{
                withCredentials:true
            })

            //remove the card from the feed
            dispatch(removeUserFromFeed(userId))

        }catch(err)
        {
          setError(err?.response?.data?.message || "Failed to fetch connections. Please try again.")
        }
    }

    return(
        
            <div className="bg-base-300 w-70 shadow-xl rounded-xl">

                <figure className="rounded-xl object-fill">
                    <img
                    className="rounded-t-lg  w-full h-75 object-cover"
                    src={ photoUrl }
                    alt="Shoes" />
                </figure>

                <div className="card-body">

                    <h2 className="card-title">{firstName +" "+lastName}</h2>
                    
                    { age && gender && <p>{age + " "+ gender}</p> }
                    <p>{ about }</p>

                    <div className="card-actions justify-center my-4">

                       <button className="btn btn-primary" onClick={()=> handleSendRequest("ignored",_id)}>Ignore</button>
                       <button className="btn btn-primary" onClick={()=> handleSendRequest('interested',_id)}>Interested</button>

                    </div>
                </div>
           </div>
        
    )
}

export default Card