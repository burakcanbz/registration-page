import React, { useEffect, useState } from 'react'
import axios from 'axios'

axios.defaults.withCredentials = true;

export const User = () => {
  let firstRender = true;
  const[user, setUser] = useState<string>('');

  const sendRequest = async() => {
      const response = await axios.get('http://localhost:3000/register/user',{
        withCredentials: true, 
      })
      const responseData = response.data;
      return responseData
  }

  const refreshToken = async() => {
    const resp = await axios.get('http://localhost:3000/register/refresh',{
      withCredentials: true
    })
    const respData = resp.data;
    console.log("refresh token data => ", respData)
    return respData;
  }
    useEffect(() => {
        if(firstRender){
          console.log(" send req for user ?")
          firstRender = false;
          sendRequest().then(data => setUser(data.data));
        }
        let interval = setInterval(() => {

          refreshToken().then(data => setUser(data.data))
        }, 1000 * 5)
        return () => clearInterval(interval)
    }, [])

  return (
    <div>{user}</div>
  )
}
