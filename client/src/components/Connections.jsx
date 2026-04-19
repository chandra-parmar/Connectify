import { useEffect, useState } from "react"
import axios from "axios"
import { useDispatch, useSelector } from 'react-redux'
import { addConnections } from "../utils/slices/connectionSlice"
import { Link } from "react-router-dom"



function Connections() {
    const connections = useSelector((store) => store.connections)
    const dispatch = useDispatch()
    const [error, setError] = useState(null)

    const fetchConnections = async () => {
        try {
            const res = await axios.get('http://localhost:5001/api/user/connections', {
                withCredentials: true
            })
            console.log(res.data.data)
            dispatch(addConnections(res.data.data))
        } catch (err) {
            setError(err?.response?.data?.message || "Failed to fetch connections. Please try again.")
        }
    }

    useEffect(() => {
        fetchConnections()
    }, [])

    if (!connections) return null

    if (error) {
        return (
            <div className="flex justify-center mt-10">
                <div className="alert alert-error w-1/2">
                    <span>⚠️ {error}</span>
                </div>
            </div>
        )
    }

    if (connections.length === 0) {
        return (
            <div className="flex justify-center mt-10">
                <h1 className="text-2xl text-gray-400">No connections found</h1>
            </div>
        )
    }

    return (
        <div className="p-6">
            <h1 className="text-4xl font-bold mb-6">Connections</h1>

            <div className="flex flex-col gap-4">
                {connections.map((connection) => {
                    const { _id, firstName, lastName, photoUrl, age, gender, about } = connection

                    return (
                        <div
                            key={_id}
                            className="flex items-center gap-4 bg-base-200 rounded-xl shadow-md w-full max-w-xl p-3"
                        >
                            {/* Fixed-size image container */}
                            <div className="w-20 h-20 shrink-0 rounded-full overflow-hidden">
                                <img
                                    src={photoUrl}
                                    alt={`${firstName}'s photo`}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Text content */}
                            <div className="flex flex-col justify-center">
                                <h2 className="text-lg font-bold">{firstName + " " + lastName}</h2>
                                {age && gender && (
                                    <p className="text-sm text-gray-400">{age + " • " + gender}</p>
                                )}
                                {about && <p className="text-sm mt-1">{about}</p>}
                            </div>

                            {/* chat button */}
                            <div>

                                <Link to={ "/chat/" + _id }>
                                    <button className="btn btn-primary">Chat</button>
                                </Link>
                                 
                                 

                            </div>
                           
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Connections