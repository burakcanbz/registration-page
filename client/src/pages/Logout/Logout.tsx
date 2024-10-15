import React, { useEffect } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { logout } from '../../store/userLoginSlice'
import { endpoints } from '../../common/endpoints' 
import { toast } from 'react-toastify';

const Logout: React.FC = () => {
    const dispatch = useDispatch();
    const sendLogout = async() => {
        try{
            const response = await axios.get(endpoints.logout.url, {
                withCredentials: true
            })
            const responseData = response.data;
            if(responseData.success){
                toast.success(`${responseData.data} successfully logged out.`)
                dispatch(logout())
            }
            else{
                toast.error('error happened')
            }
        }
        catch(err){
            toast.error('something happened')
        }
    }

    useEffect(() => {
       sendLogout()
        
    }, [])
    
  return (
    <div>Logout</div>
  )
}

export default Logout;