import React, { useEffect, useState } from 'react'
import axios from 'axios'

axios.defaults.withCredentials = true;

export const User = () => {
  const[user, setUser] = useState<string>('');

    useEffect(() => {
        const sendRequest = async() => {
            const response = await axios.get('http://localhost:3000/register/user')
            const responseData = response.data;
            setUser(responseData.data)
        }
        sendRequest();
    }, [])

  return (
    <div>{user}</div>
  )
}
