import io from 'socket.io-client'
import { BASE_URL } from '../utils/constants'


export const createSocketConnection =()=>{

    //backend url for connecting backend
    return io(BASE_URL,{
        withCredentials : true
    })
}