
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { addRequests } from "../utils/slices/requestsSlice"
import { useEffect } from "react"
import toast from "react-hot-toast"
import removeRequests from '../utils/slices/requestsSlice'
import {  useNavigate } from "react-router-dom"

function Requests (){
    
    //hooks
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const requests = useSelector((store) => store.requests)

    const reviewRequest = async(status,_id)=>{
        try{
           
            const res = axios.post(`http://localhost:5001/api/request/review/${status}/${_id}`,{} ,{
                withCredentials:true
            })
           
            if(status === 'accepted')
            {
                toast.success("request accepted!")
            }
            else{
                toast.error('request rejected!')
            }
            dispatch(removeRequests(_id))
              toast.success('Request accepted!')
            navigate('/connections')
          
        }catch(err)
        {

        }
    }

    useEffect(() => {
        const fetchRequest = async () => {
            try {
                const res = await axios.get('http://localhost:5001/api/user/requests/received', {
                    withCredentials: true
                })

                const data = res.data?.data ?? []
                dispatch(addRequests(data))

                if (data.length === 0) {
                    toast.error("No request received")
                }
            } catch (err) {
                toast.error("Unable to load requests")
                dispatch(addRequests([]))
            }
        }

        fetchRequest()
    }, [dispatch])

    if (requests === null || requests === undefined) {
        return <p>Loading connection requests...</p>
    }

    if (requests.length === 0) {
        return <h1>No connection requests found</h1>
    }

    return(

        <div className="text-center my-10">
            <h1 className="text-4xl font-bold">Requests</h1>

             {
                requests.map(( request )=>{
                    const {_id, firstName, lastName, photoUrl, age, gender, about} = request.fromUserId

                    return(
                       
                        <div key={_id}  className=" flex m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto">

                            <figure>
                                <img
                                src={photoUrl}
                                alt="photo" 
                                    className="w-20 h-20 rounded-full"
                                />
                                
                            </figure>

                            <div className="text-left mx-4">
                                <h2 className="text-xl font-bold">{firstName + " "+lastName}</h2>
                                   {
                                     age && gender && <p>{age +" "+gender}</p>
                                   }
                                <p>{about}</p>

                                <div className="flex flex-row mx-auto mt-3">
                                    <button className="btn btn-neutral btn-outline mr-3 bg-green-600 text-black hover:" onClick={ ()=> reviewRequest("accepted" , request._id)}>Accepted</button>
                                    <button className="btn btn-neutral btn-outline bg-red-500 text-black" onClick={ ()=> reviewRequest('rejected',request._id)}>Reject</button>
                                 </div>
                                
                            </div>

                         </div>
                    )
                })
             }
        </div>
    )
}

export default Requests