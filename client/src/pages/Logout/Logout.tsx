import React, { useEffect } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { logout } from '../../store/userLoginSlice'
import { endpoints } from '../../common/endpoints' 
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'

const Logout: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const sendLogout = async() => {
        try{
            const response = await axios.get(endpoints.logout.url, {
                withCredentials: true
            })
            const responseData = response.data;
            if(responseData.success){
                toast.success(`${responseData.data} successfully logged out.`)
                dispatch(logout())
                navigate('/login')
            }
            else{
                toast.error('something happened')
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