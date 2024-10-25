import React, { useEffect } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { logout } from '../../store/userLoginSlice'
import { endpoints } from '../../common/endpoints' 
import { toast } from 'react-toastify';
<<<<<<< HEAD
import { useNavigate } from 'react-router-dom'

const Logout: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
=======

const Logout: React.FC = () => {
    const dispatch = useDispatch();
>>>>>>> master
    const sendLogout = async() => {
        try{
            const response = await axios.get(endpoints.logout.url, {
                withCredentials: true
            })
            const responseData = response.data;
            if(responseData.success){
                toast.success(`${responseData.data} successfully logged out.`)
                dispatch(logout())
<<<<<<< HEAD
                navigate('/login')
            }
            else{
                toast.error('something happened')
=======
            }
            else{
                toast.error('error happened')
>>>>>>> master
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